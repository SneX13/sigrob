from rest_framework import serializers

from backend.models import Users


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('UserId', 'Email', 'UserName', 'Password', 'UserRole')
