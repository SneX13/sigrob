from django.urls import path

from . import views

urlpatterns = [
    path('login/', views.LoginAttempt.as_view()),
]
