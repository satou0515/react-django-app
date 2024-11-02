from django.urls import path, include
from rest_framework import routers
from my_auth.views import UserInformatoinViewSet

router = routers.DefaultRouter()
router.register(r'users', UserInformatoinViewSet)

urlpatterns = [
  path('authentication/', include('my_auth.urls')),
] + router.urls
app_name = 'api'