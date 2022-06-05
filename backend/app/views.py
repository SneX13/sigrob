from django.core.handlers.wsgi import WSGIRequest
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import User
from .serializers import UserSerializer


class UserTable(APIView):
    @staticmethod
    def get(request: WSGIRequest, id_: int = None):
        if id_ is None:
            users = User.objects.all()
        else:
            try:
                users = [User.objects.get(id=id_)]
            except User.DoesNotExist:
                return Response("User does not exist")
        users_serializer = UserSerializer(users, many=True)
        return Response(users_serializer.data)

    @staticmethod
    def post(request: WSGIRequest):
        user_data = JSONParser().parse(request)
        users_serializer = UserSerializer(data=user_data)
        if users_serializer.is_valid():
            users_serializer.save()
        return Response("Added Successfully")

    @staticmethod
    def put(request: WSGIRequest):
        user_data = JSONParser().parse(request)
        user = User.objects.get(id=user_data['id'])
        users_serializer = UserSerializer(user, data=user_data)
        if users_serializer.is_valid():
            users_serializer.save()
            return Response("Updated Successfully")
        return Response("Failed to update")

    @staticmethod
    def delete(request: WSGIRequest, id_: str = None):
        user = User.objects.get(id=id_)
        user.delete()
        return Response("Deleted Successfully")
