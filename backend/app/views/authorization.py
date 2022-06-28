from django.contrib.auth import authenticate, login, logout
from django.http import HttpRequest, HttpResponse, HttpResponseBadRequest
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from rest_framework.views import APIView

from ..models import User
from ..serializers import UserSerializer


class UserData(APIView):
    @classmethod
    def get(cls, request: HttpRequest) -> HttpResponse:
        email, = extract_request_fields(request, "email")
        if email is None:
            return no_email_field_response(cls.__name__)
        user = get_user_by_email_field(email)
        if user is None:
            return user_does_not_exist_response(email)
        return user_data_response(user, many=False)


class LoginAttempt(APIView):
    @classmethod
    def post(cls, request: HttpRequest) -> HttpResponse:
        email, password = extract_request_fields(request, "email", "password")
        if email is None:
            return no_email_field_response(cls.__name__)
        if password is None:
            return no_password_field_response(cls.__name__)
        user = get_user_by_email_field(email)
        if user is None:
            return user_does_not_exist_response(email)
        authentication = authenticate(request, email=email, password=password)
        if authentication is None:
            return HttpResponse(
                f"Email and password combination is not correct."
            )
        login(request, authentication)
        return user_data_response([user], many=True)


class Logout(APIView):
    @classmethod
    def post(cls, request: HttpRequest) -> HttpResponse:
        email, = extract_request_fields(request, "email")
        if email is None:
            return no_email_field_response(cls.__name__)
        user = get_user_by_email_field(email)
        if user is None:
            return user_does_not_exist_response(email)
        logout(request)
        return HttpResponse(
            f"Logout successful for user '{email}'."
        )


def no_password_field_response(request_type: str) -> HttpResponseBadRequest:
    return HttpResponseBadRequest(
        f"{request_type} request should contain the password field for the user."
    )


def user_does_not_exist_response(email: str) -> HttpResponseBadRequest:
    return HttpResponseBadRequest(
        f"User with email '{email}' does not exist in database."
    )


def no_email_field_response(request_type: str) -> HttpResponseBadRequest:
    return HttpResponseBadRequest(
        f"{request_type} request should contain the email field for the user."
    )


def extract_request_fields(request: HttpRequest, *fields: str) -> list[str | None]:
    data = JSONParser().parse(request)
    values = []
    for field in fields:
        if field not in data:
            values.append(None)
        else:
            values.append(data[field])
    return values


def get_user_by_email_field(email: str) -> User | None:
    try:
        return User.objects.get(email=email)
    except User.DoesNotExist:
        return None


def user_data_response(user: User | list[User], many: bool) -> HttpResponse:
    user_serializer = UserSerializer(user, many=many)
    json_data = JSONRenderer().render(user_serializer.data)
    return HttpResponse(json_data)
