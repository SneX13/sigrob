from django import http
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from ..models import User
from ..serializers import UserSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        pass

    # We can customize the token claim. Set what is going to be encrypted into the
    # token.
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add the information from the user object, encrypt the value
        token['email'] = user.email
        token['first name'] = user.first_name
        token['last name'] = user.last_name
        token['company'] = user.company_id

        # The value is returned
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    # Customized version of TokenObtainPairView.
    # Add the returned token value as a serializer class
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def get_routes(request):
    routes = [
        '/app/token',
        '/app/token/refresh',
    ]

    return Response(routes)


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
            User.objects.get(email=email)
        except User.DoesNotExist:
            return http.HttpResponseBadRequest(
                f"User with email '{email}' does not exist in database."
            )
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            user = User.objects.filter(email=email)
            user_serializer = UserSerializer(user, many=True)
            json_data = JSONRenderer().render(user_serializer.data)
            return http.HttpResponse(json_data
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
        try:
            User.objects.get(email=email)
        except User.DoesNotExist:
            return http.HttpResponseBadRequest(
                f"User with email '{email}' does not exist in database."
            )
        logout(request)
        return http.HttpResponse(
            f"Logout successful for user '{email}'."
        )
