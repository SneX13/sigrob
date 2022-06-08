from django.urls import path

from .views import authorization, system, component

urlpatterns = [
    path('login/', authorization.LoginAttempt.as_view()),
    path('logout/', authorization.Logout.as_view()),
    path('systems/', system.SystemTable.as_view()),
    path('components/', component.ComponentTable.as_view())
]
