from my_auth.views import UserInformatoinViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'my_auth', UserInformatoinViewSet, basename='my_auth')

urlpatterns = router.urls

app_name = 'my_auth'