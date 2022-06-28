from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import System, Component, User


class ComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = (
            'id', 'name', 'system', 'x_position', 'y_position', 'rotation', 'scale',
            'mirrored', 'error_flag', 'state'
        )


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = 'id', 'first_name', 'last_name', 'is_staff', 'company'


class SystemSerializer(serializers.ModelSerializer):
    class Meta:
        model = System
        fields = 'id', 'name', 'company', 'user_in_control', 'control_state'


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        pass

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['company'] = user.company_id
        token['email'] = user.email
        token['first name'] = user.first_name
        token['last name'] = user.last_name
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
