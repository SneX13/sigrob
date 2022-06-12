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
