from django.urls import re_path

from backend import views

urlpatterns = [
    re_path(r'^backend_user$', views.user_table_methods),
    re_path(r'^backend_user/([0-9]+)$', views.user_table_methods)
]
