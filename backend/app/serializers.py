from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import System, Component


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['password'] = user.password
        return token


# class RegisterSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(
#         write_only=True, required=True, validators=[validate_password])
#     password2 = serializers.CharField(write_only=True, required=True)
#
#     class Meta:
#         model = User
#         fields = ('email', 'password', 'password2')
#
#     def validate(self, attrs, password2=None):
#         if attrs['password'] == attrs[password2]:
#             raise serializers.ValidationError(
#                 {"password": "Password fields did not match"}
#             )
#         return attrs
#
#     def create(self, validated_data):
#         user = User.objects.create(
#             email=validated_data['email']
#         )
#         user.set_password(validated_data['password'])
#         user.save()
#
#         return user
#


class SystemSerializer(serializers.ModelSerializer):
    class Meta:
        model = System
        fields = 'id', 'name', 'parent', 'company'


class ComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = 'id', 'name', 'system'
