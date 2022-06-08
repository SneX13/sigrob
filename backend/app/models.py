from django.contrib.auth.models import AbstractUser
from django.db import models


class Company(models.Model):
    name = models.CharField(max_length=255, unique=True)
    logo = models.ImageField(upload_to="images/", default=None, null=True)

    def __str__(self):
        return self.name


class User(AbstractUser):
    username = None
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    company = models.ForeignKey(Company, models.CASCADE, to_field='name', null=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = [
        "username", "password", "first_name", "last_name", "is_staff", "company_id"
    ]

    def __str__(self):
        string = f'{self.company} | {self.first_name} {self.last_name}'
        if self.is_superuser:
            string += f' (superuser)'
        elif self.is_staff:
            string += f' (admin)'
        return string


class System(models.Model):
    name = models.CharField(max_length=255)
    parent = models.IntegerField(null=True)
    company = models.ForeignKey(Company, models.CASCADE)

    def __str__(self):
        return f'{self.company} | {self.name}'


class Component(models.Model):
    name = models.CharField(max_length=255)
    system = models.OneToOneField(System, models.CASCADE)

    def __str__(self):
        return f'{self.system} | {self.name} {self.id}'
