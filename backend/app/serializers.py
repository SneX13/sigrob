from rest_framework import serializers

from .models import System, Component, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = 'first_name', 'last_name', 'is_staff', 'company'


class SystemSerializer(serializers.ModelSerializer):
    class Meta:
        model = System
        fields = 'id', 'name', 'parent', 'company'


class ComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = 'id', 'name', 'system'
