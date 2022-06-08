from django import http
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from rest_framework.views import APIView

from ..models import User, System
from ..serializers import SystemSerializer


class SystemTable(APIView):
    @staticmethod
    def get(request: http.HttpRequest) -> http.HttpResponse:
        system_data = JSONParser().parse(request)
        if "email" not in system_data:
            return http.HttpResponseBadRequest(
                "Get systems request should contain the email field of the user."
            )
        email = system_data["email"]
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return http.HttpResponseBadRequest(
                f"User with email '{email}' does not exist in database."
            )
        super_user = User.objects.get(is_superuser=True)
        if user.company.name == super_user.company.name:
            systems = System.objects.all()
        else:
            systems = System.objects.filter(company=user.company)
        systems_serializer = SystemSerializer(systems, many=True)
        json_data = JSONRenderer().render(systems_serializer.data)
        return http.HttpResponse(json_data)

    @staticmethod
    def post(request: http.HttpRequest) -> http.HttpResponse:
        system_data = JSONParser().parse(request)
        system_serializer = SystemSerializer(data=system_data)
        if system_serializer.is_valid():
            system_serializer.save()
            return http.HttpResponse(
                "Successfully created new system."
            )
        return http.HttpResponseBadRequest(
            "System to create is not valid."
        )

    @staticmethod
    def put(request: http.HttpRequest) -> http.HttpResponse:
        system_data = JSONParser().parse(request)
        if "id" not in system_data:
            return http.HttpResponseBadRequest(
                "Update system request should contain the id field of the system."
            )
        try:
            system = System.objects.get(id=system_data['id'])
        except System.DoesNotExist:
            return http.HttpResponseBadRequest(
                f"System with id '{system_data['id']}' does not exist in database."
            )
        system_serializer = SystemSerializer(system, data=system_data)
        if system_serializer.is_valid():
            old_name = system.name
            system_serializer.save()
            return http.HttpResponse(
                f"Successfully updated system {old_name}."
            )
        return http.HttpResponseBadRequest(
            f"System {system.name} to update is not valid."
        )

    @staticmethod
    def delete(request: http.HttpRequest) -> http.HttpResponse:
        system_data = JSONParser().parse(request)
        if "id" not in system_data:
            return http.HttpResponseBadRequest(
                "Delete system request should contain the id field of the system."
            )
        try:
            system = System.objects.get(id=system_data['id'])
        except System.DoesNotExist:
            return http.HttpResponseBadRequest(
                f"System with id '{system_data['id']}' does not exist in database."
            )
        deleted_system_name = system.name
        system.delete()
        return http.HttpResponse(
            f"Successfully deleted system '{deleted_system_name}'."
        )
