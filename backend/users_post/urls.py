from users_post.views import UsersPostViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'users_post', UsersPostViewSet, basename='users_post')

urlpatterns = router.urls

app_name = 'users_post'