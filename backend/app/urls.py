from django.urls import re_path

from . import views

urlpatterns = [
    re_path(r'^users/$', views.user_table_methods),
    re_path(r'^users/([0-9]+)/$', views.user_table_methods)
]
