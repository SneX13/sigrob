from django.urls import path

from .views import authorization, system, component

urlpatterns = [
    path('user/', authorization.UserData.as_view()),
    path('login/', authorization.Login.as_view()),
    path('logout/', authorization.Logout.as_view()),
    path('systems/', system.SystemTable.as_view()),
    path('control/<str:action>/', system.SystemControl.as_view()),
    path('components/', component.ComponentTable.as_view())
]
