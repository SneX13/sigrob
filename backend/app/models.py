from django.db import models


class Users(models.Model):
    UserId = models.AutoField(primary_key=True)
    Email = models.CharField(max_length=500)
    UserName = models.CharField(max_length=500)
    Password = models.CharField(max_length=500)
    UserRole = models.CharField(max_length=500)
