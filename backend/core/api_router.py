from django.conf import settings
from django.urls import path, include
from rest_framework import routers
from my_auth.views import UserLoginView, UserSignUpView

router = routers.DefaultRouter()
router.register('users', UserSignUpView, basename='user')  # ユーザー登録用

urlpatterns = [
  path('', include(router.urls)),
  path('login/', UserLoginView.as_view()),
]

app_name = 'api'