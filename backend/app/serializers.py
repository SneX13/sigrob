from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import System, Component, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = 'first_name', 'last_name', 'is_staff', 'company'


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


class SystemSerializer(serializers.ModelSerializer):
    class Meta:
        model = System
        fields = 'id', 'name', 'company', 'user_in_control', 'control_state'


class ComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = (
            'id', 'name', 'system', 'x_position', 'y_position', 'rotation', 'scale',
            'mirrored', 'error_flag', 'state'
        )
