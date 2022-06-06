from django import http
from django.contrib.auth import authenticate, get_user_model, login, logout
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView


class LoginAttempt(APIView):
    @staticmethod
    def post(request: http.HttpRequest) -> http.HttpResponse:
        login_data = JSONParser().parse(request)
        if "email" not in login_data or "password" not in login_data:
            return http.HttpResponseBadRequest(
                "Login request should contain email and password fields."
            )
        email, password = login_data["email"], login_data["password"]
        user_model = get_user_model()
        try:
            user_model.objects.get(email=email)
        except user_model.DoesNotExist:
            return http.HttpResponseBadRequest(
                f"User with email '{email}' does not exist in database."
            )
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            return http.HttpResponse(
                f"Login successful for user '{email}'."
            )
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
        user_model = get_user_model()
        try:
            user_model.objects.get(email=email)
        except user_model.DoesNotExist:
            return http.HttpResponseBadRequest(
                f"User with email '{email}' does not exist in database."
            )
        logout(request)
        return http.HttpResponse(
            f"Logout successful for user '{email}'."
        )
