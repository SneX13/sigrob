from django.db import models


class Company(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)


class User(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    company = models.ForeignKey(Company, models.CASCADE, to_field='name')
    is_admin = models.BooleanField()


class System(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    parent = models.IntegerField()
    company = models.ForeignKey(Company, models.CASCADE)


class Component(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    system = models.OneToOneField(System, models.CASCADE)
