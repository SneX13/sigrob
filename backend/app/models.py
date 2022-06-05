from django.db import models


class Company(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class User(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    password = models.CharField(max_length=255)
    company = models.ForeignKey(Company, models.CASCADE, to_field='name')
    is_admin = models.BooleanField()

    def __str__(self):
        string = f'{self.company} | {self.name}'
        if self.is_admin:
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
