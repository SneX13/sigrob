from django import http
from django.contrib.auth import authenticate, login
from django.core.handlers.wsgi import WSGIRequest
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView


class LoginAttempt(APIView):
    @staticmethod
    def post(request: WSGIRequest):
        login_data = JSONParser().parse(request)
        if "email" not in login_data or "password" not in login_data:
            return http.HttpResponseBadRequest(
                "Login request should contain email and password fields"
            )
        email, password = login_data["email"], login_data["password"]
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            return http.HttpResponse(
                "Login successful"
            )
        else:
            return http.HttpResponse(
                "Wrong email and password combination"
            )
