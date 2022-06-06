from django.contrib import admin

from .models import User, Company, System, Component

admin.site.register(User)
admin.site.register(Company)
admin.site.register(System)
admin.site.register(Component)
