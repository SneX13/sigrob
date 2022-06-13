from rest_framework import serializers

from .models import System, Component, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = 'first_name', 'last_name', 'is_staff', 'company'


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
