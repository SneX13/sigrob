from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import authorization, system

urlpatterns = [
    path('', authorization.get_routes),
    path('token/', authorization.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('', authorization.get_routes),
    # path('login/', obtain_jwt_token),
    path('login/', authorization.LoginAttempt.as_view()),
    # path('logout/', authorization.Logout.as_view()),
    path('systems/', system.SystemTable.as_view()),
    # path('components/', component.ComponentTable.as_view())
]
