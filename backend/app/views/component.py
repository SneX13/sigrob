from django import http
from django.core.handlers.wsgi import WSGIRequest
from django.http import HttpResponse, HttpResponseBadRequest
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from rest_framework.views import APIView

from ..models import Component
from ..serializers import ComponentSerializer


class ComponentTable(APIView):
    @staticmethod
    def get(request: WSGIRequest) -> HttpResponse:
        get_id = "system"
        try:
            if request.body:
                system_data = JSONParser().parse(request)
                id_ = system_data.get(get_id)
            else:
                id_ = request.GET.get(get_id)
        except KeyError:
            return HttpResponseBadRequest(
                "Component request should contain the ID of its system."
            )
        components = Component.objects.filter(system=id_)
        component_serializer = ComponentSerializer(components, many=True)
        json_data = JSONRenderer().render(component_serializer.data)
        return HttpResponse(json_data)

    @staticmethod
    def post(request: WSGIRequest) -> HttpResponse:
        component_data = JSONParser().parse(request)
        component_serializer = ComponentSerializer(data=component_data)
        if component_serializer.is_valid():
            component_serializer.save()
            json_data = JSONRenderer().render(component_serializer.data)
            return HttpResponse(json_data)
        return HttpResponseBadRequest(
            f"Component to create is not valid."
        )

    @staticmethod
    def put(request: WSGIRequest) -> HttpResponse:
        component_data = JSONParser().parse(request)
        if "system" not in component_data:
            return HttpResponseBadRequest(
                f"Update component request should contain the id field of its system."
            )
        try:
            component = Component.objects.get(id=component_data['id'])
        except Component.DoesNotExist:
            return HttpResponseBadRequest(
                f"Component with id '{component_data['id']}' does not exist in the "
                f"database."
            )
        component_serializer = ComponentSerializer(component, data=component_data)
        if component_serializer.is_valid():
            old_name = component.name
            component_serializer.save()
            return HttpResponse(
                f"Successfully updated component '{old_name}'."
            )
        return HttpResponseBadRequest(
            f"Update of '{component.name}' is not valid."
        )

    @staticmethod
    def delete(request: WSGIRequest) -> HttpResponse:
        component_data = JSONParser().parse(request)
        if "id" not in component_data:
            return HttpResponseBadRequest(
                "Delete component request should contain the id field of the component."
            )
        try:
            component = Component.objects.get(id=component_data['id'])
        except Component.DoesNotExist:
            return HttpResponseBadRequest(
                f"Component with id '{component_data['id']} does not exist in the "
                f"database."
            )
        deleted_component_id = component.id
        component.delete()
        return HttpResponse(
            f"Successfully deleted component with id '{deleted_component_id}'"
        )


class ComponentControl(APIView):
    class ACTIONS:
        START = 'start'
        STOP = 'stop'
        RESET = 'reset'
        AUTO = 'auto'

        ALL = START, STOP, RESET, AUTO

    def post(self, request: WSGIRequest, action: str = None) -> HttpResponse:
        if action not in self.ACTIONS.ALL:
            return HttpResponseBadRequest(
                f"System control action must be defined as '../control/<action>/', "
                f"the available actions are: \n{self.ACTIONS.ALL}"
            )
        get_id = "id"
        try:
            if request.body:
                body = JSONParser().parse(request)
                id_ = body.get(get_id)
            else:
                id_ = request.GET.get(get_id)
        except KeyError:
            return HttpResponseBadRequest(
                "Component control request should contain the ID field of the "
                "component."
            )
        try:
            component = Component.objects.get(id=id_)
        except Component.DoesNotExist:
            return HttpResponseBadRequest(
                f"Component with ID '{id_}' does not exist in database."
            )
        if component.error_flag:
            component.error_mode()
        elif action == self.ACTIONS.START:
            component.start()
        elif action == self.ACTIONS.STOP:
            component.stop()
        elif action == self.ACTIONS.RESET:
            component.reset()
        elif action == self.ACTIONS.AUTO:
            component.auto_mode()
        else:
            raise NotImplementedError
        component.atomic_save()
        component_serializer = ComponentSerializer(component, many=False)
        json_data = JSONRenderer().render(component_serializer.data)
        return HttpResponse(json_data)
