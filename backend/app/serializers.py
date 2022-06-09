from rest_framework import serializers

from .models import System, Component


class SystemSerializer(serializers.ModelSerializer):
    class Meta:
        model = System
        fields = 'id', 'name', 'parent', 'company'


class ComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = 'id', 'name', 'system'
