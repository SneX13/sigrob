from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
# from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    # path('token-auth/', obtain_jwt_token),
    path('admin/', admin.site.urls),
    path('api/', include("app.urls")),
    # path('', include('app.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
