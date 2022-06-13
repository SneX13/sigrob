from django import http
from django.core.handlers.wsgi import WSGIRequest
from django.http import HttpResponse, HttpResponseBadRequest
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from rest_framework.views import APIView

from ..models import User, System
from ..serializers import SystemSerializer


class SystemTable(APIView):
    @staticmethod
    def get(request: WSGIRequest) -> HttpResponse:
        get_id = "user"
        try:
            if request.body:
                body = JSONParser().parse(request)
                id_ = body.get(get_id)
            else:
                id_ = request.GET.get(get_id)
        except KeyError:
            return HttpResponseBadRequest(
                "Get systems request should contain the ID field of the user."
            )
        try:
            user = User.objects.get(id=id_)
        except User.DoesNotExist:
            return HttpResponseBadRequest(
                f"User with ID '{id_}' does not exist in database."
            )
        super_user = User.objects.get(is_superuser=True)
        if user.company.name == super_user.company.name:
            systems = System.objects.all()
        else:
            systems = System.objects.filter(company=user.company)
        systems_serializer = SystemSerializer(systems, many=True)
        json_data = JSONRenderer().render(systems_serializer.data)
        return HttpResponse(json_data)

    @staticmethod
    def post(request: WSGIRequest) -> HttpResponse:
        system_data = JSONParser().parse(request)
        system_serializer = SystemSerializer(data=system_data)
        if system_serializer.is_valid():
            system_serializer.save()
            json_data = JSONRenderer().render(system_serializer.data)
            return HttpResponse(json_data)
        return HttpResponseBadRequest(
            "System to create is not valid."
        )

    @staticmethod
    def put(request: WSGIRequest) -> HttpResponse:
        system_data = JSONParser().parse(request)
        if "id" not in system_data:
            return HttpResponseBadRequest(
                "Update system request should contain the ID field of the system."
            )
        try:
            system = System.objects.get(id=system_data['id'])
        except System.DoesNotExist:
            return HttpResponseBadRequest(
                f"System with ID '{system_data['id']}' does not exist in database."
            )
        system_serializer = SystemSerializer(system, data=system_data)
        if system_serializer.is_valid():
            old_name = system.name
            system_serializer.save()
            return HttpResponse(
                f"Successfully updated system {old_name}."
            )
        return HttpResponseBadRequest(
            f"System {system.name} to update is not valid."
        )

    @staticmethod
    def delete(request: WSGIRequest) -> HttpResponse:
        system_data = JSONParser().parse(request)
        if "id" not in system_data:
            return HttpResponseBadRequest(
                "Delete system request should contain the ID field of the system."
            )
        try:
            system = System.objects.get(id=system_data['id'])
        except System.DoesNotExist:
            return HttpResponseBadRequest(
                f"System with ID '{system_data['id']}' does not exist in database."
            )
        deleted_system_name = system.name
        system.delete()
        return HttpResponse(
            f"Successfully deleted system '{deleted_system_name}'."
        )


class SystemControl(APIView):
    class ACTIONS:
        REQUEST = 'request'
        RELEASE = 'release'
        ALLOW_TRANSFER = 'transfer'

        ALL = REQUEST, RELEASE, ALLOW_TRANSFER

    def post(self, request: WSGIRequest, action: str = None) -> HttpResponse:
        if action not in self.ACTIONS.ALL:
            return HttpResponseBadRequest(
                f"System control action must be defined as '../control/<action>/', "
                f"the available actions are: \n{self.ACTIONS.ALL}"
            )
        get_system_id, get_user_id = "id", "user"
        try:
            if request.body:
                body = JSONParser().parse(request)
                system_id = body.get(get_system_id)
                user_id = body.get(get_user_id)
            else:
                system_id = request.GET.get(get_system_id)
                user_id = request.GET.get(get_user_id)
        except KeyError:
            return HttpResponseBadRequest(
                f"System control request should contain the ID field of the system "
                f"defined by '{get_system_id}', as well as the ID of the user defined "
                f"by '{get_user_id}'."
            )
        try:
            system = System.objects.get(id=system_id)
        except System.DoesNotExist:
            return HttpResponseBadRequest(
                f"System with ID '{system_id}' does not exist in database."
            )
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return HttpResponseBadRequest(
                f"User with ID '{user_id}' does not exist in database."
            )
        if action == self.ACTIONS.REQUEST:
            if system.user_in_control:
                system.request_control_from_user()
            else:
                system.acquire_system_control()
                system.user_in_control = user
        elif action == self.ACTIONS.RELEASE:
            system.release_system_control()
            system.user_in_control = None
        elif action == self.ACTIONS.ALLOW_TRANSFER:
            system.transfer_control_to_user()
            system.user_in_control = user
        else:
            raise NotImplementedError
        system.atomic_save()
        system_serializer = SystemSerializer(system, many=False)
        json_data = JSONRenderer().render(system_serializer.data)
        return HttpResponse(json_data)
