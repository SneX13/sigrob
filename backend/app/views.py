from django.core.handlers.wsgi import WSGIRequest
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser

from .models import User
from .serializers import UserSerializer


@csrf_exempt
def user_table_methods(request: WSGIRequest, id_: str = None):
    if request.method == 'GET':
        if id_ is None:
            users = User.objects.all()
        else:
            try:
                users = [User.objects.get(id=id_)]
            except User.DoesNotExist:
                return JsonResponse("User does not exist", safe=False)
        users_serializer = UserSerializer(users, many=True)
        return JsonResponse(users_serializer.data, safe=False)
    elif request.method == 'POST':
        user_data = JSONParser().parse(request)
        users_serializer = UserSerializer(data=user_data)
        if users_serializer.is_valid():
            users_serializer.save()
        return JsonResponse("Added Successfully", safe=False)
    elif request.method == 'PUT':
        user_data = JSONParser().parse(request)
        user = User.objects.get(id=user_data['id'])
        users_serializer = UserSerializer(user, data=user_data)
        if users_serializer.is_valid():
            users_serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to update")
    elif request.method == 'DELETE':
        user = User.objects.get(id=id_)
        user.delete()
        return JsonResponse("Deleted Successfully", safe=False)
