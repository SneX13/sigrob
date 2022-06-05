from django.urls import path

from . import views

urlpatterns = [
    path('users/', views.UserTable.as_view()),
    path('users/<int:id_>/', views.UserTable.as_view())
]
