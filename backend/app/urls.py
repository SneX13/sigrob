from django.urls import path

from .views import authorization, system, component

# Set up URLs for API endpoints
urlpatterns = [
    path('components/', component.ComponentTable.as_view()),
    path('components/control/<str:action>', component.ComponentControl.as_view()),
    path('login/', authorization.LoginAttempt.as_view()),
    path('logout/', authorization.Logout.as_view()),
    path('user/', authorization.UserData.as_view()),
    path('systems/', system.SystemTable.as_view()),
    path('systems/systemId/', system.OneSystem.as_view()),
    path('systems/control/<str:action>', system.SystemControl.as_view()),
]
