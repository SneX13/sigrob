from django.urls import path

from . import views

urlpatterns = [
    path('login/', views.LoginAttempt.as_view()),
    path('logout/', views.Logout.as_view()),
    path('systems/', views.GetSystems.as_view()),
]
