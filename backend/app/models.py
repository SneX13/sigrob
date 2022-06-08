from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models


class Company(models.Model):
    name = models.CharField(max_length=255, unique=True)
    logo = models.ImageField(upload_to="images/", default=None, null=True)

    def __str__(self):
        return self.name


class UserManager(BaseUserManager):
    # A custom user manager to be able to add user with email authentication from:

    # https://koenwoortman.com/python-django-email-as-username/#:~:text=By%20default%
    # 20these%20Django%20users,migrations%20for%20the%20first%20time.
    use_in_migration = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('Users require an email field')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class User(AbstractUser):
    username = None
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    company = models.ForeignKey(Company, models.CASCADE, to_field='name', null=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    # REQUIRED_FIELDS = [
    #     "username", "password", "first_name", "last_name", "is_staff", "company_id"
    # ]

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
