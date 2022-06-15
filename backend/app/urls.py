from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from . import serializers
from .views import authorization, system, component

urlpatterns = [

    path('', authorization.get_routes),
    path('token/', serializers.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('login/', obtain_jwt_token),
    path('login/', authorization.LoginAttempt.as_view()),
    path('user/', authorization.UserData.as_view()),
    # path('login/', authorization.Login.as_view()),

    path('logout/', authorization.Logout.as_view()),
    path('systems/', system.SystemTable.as_view()),
    path('systems/systemId/', system.OneSystem.as_view()),
    path('systems/control/<str:action>', system.SystemControl.as_view()),
    path('components/', component.ComponentTable.as_view()),
    path('components/control/<str:action>', component.ComponentControl.as_view()),
]
