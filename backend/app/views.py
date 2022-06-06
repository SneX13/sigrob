from django import http
from django.core.handlers.wsgi import WSGIRequest
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView

from .models import User


class LoginAttempt(APIView):
    @staticmethod
    def post(request: WSGIRequest):
        login_data = JSONParser().parse(request)
        if "email" not in login_data or "password" not in login_data:
            return http.HttpResponseBadRequest(
                "Login request should contain email and password fields"
            )
        email = login_data["email"]
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return http.HttpResponse(
                "User email does not exist in database"
            )
        if login_data["password"] == user.password:
            return http.HttpResponse(
                "Login successful"
            )
        else:
            return http.HttpResponse(
                "Incorrect password"
            )
