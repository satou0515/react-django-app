from users_post.views import UsersPostViewSet
from rest_framework.routers import DefaultRouter
from django.urls import path
from users_post.views import get_csrf_token

router = DefaultRouter()
router.register(r'users_post', UsersPostViewSet, basename='users_post')

urlpatterns = [
    path('get-csrf-token/', get_csrf_token, name='get_csrf_token'),
    # 他のURLパターン
] + router.urls

app_name = 'users_post'