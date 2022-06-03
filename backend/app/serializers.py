from rest_framework import serializers

from backend.app.models import Users


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('UserId', 'Email', 'UserName', 'Password', 'UserRole')
