from django.urls import path

from .views import authorization, system

urlpatterns = [
    path('', authorization.get_routes),
    # path('token/', authorization.MyTokenObtainPairView.as_view(),
    #      name='token_obtain_pair'),
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('hello/', authorization.HelloView.as_view(), name='hello'),
    # path('', authorization.get_routes),
    # path('login/', obtain_jwt_token),
    # path('test/', authorization.test_end_point, name='test'),
    path('login/', authorization.LoginAttempt.as_view()),
    # path('logout/', authorization.Logout.as_view()),
    path('systems/', system.SystemTable.as_view()),
    # path('components/', component.ComponentTable.as_view())
]
