from django import http
from django.contrib.auth import authenticate, login, logout
from django.core import serializers
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView

from .models import System, User
from .serializers import SystemSerializer


class LoginAttempt(APIView):
    @staticmethod
    def post(request: http.HttpRequest) -> http.HttpResponse:
        login_data = JSONParser().parse(request)
        if "email" not in login_data or "password" not in login_data:
            return http.HttpResponseBadRequest(
                "Login request should contain email and password fields."
            )
        email, password = login_data["email"], login_data["password"]
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return http.HttpResponse(
                f"User with email '{email}' does not exist in database."
            )
        authenticated_user = authenticate(request, email=email, password=password)
        if authenticated_user is not None:
            login(request, authenticated_user)
            user_data = serializers.serialize("json", [user])
            return http.HttpResponse(user_data)
        else:
            return http.HttpResponse(
                f"Wrong password for email '{email}'."
            )


class Logout(APIView):
    @staticmethod
    def post(request: http.HttpRequest) -> http.HttpResponse:
        logout_data = JSONParser().parse(request)
        if "email" not in logout_data:
            return http.HttpResponseBadRequest(
                "Logout request should contain the email field of the user."
            )
        email = logout_data["email"]
        try:
            User.objects.get(email=email)
        except User.DoesNotExist:
            return http.HttpResponse(
                f"User with email '{email}' does not exist in database."
            )
        logout(request)
        return http.HttpResponse(
            f"Logout successful for user '{email}'."
        )


class GetSystems(APIView):
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
            return http.HttpResponse(
                f"User with email '{email}' does not exist in database."
            )
        super_user = User.objects.get(is_superuser=True)
        if user.company.name == super_user.company.name:
            systems = System.objects.all()
            systems_serializer = SystemSerializer(systems, many=True)
            return http.HttpResponse(systems_serializer.data)
        else:
            systems = System.objects.filter(company=user.company)
            systems_serializer = SystemSerializer(systems, many=True)
            return http.HttpResponse(systems_serializer.data)
