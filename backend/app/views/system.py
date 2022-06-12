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
