from django.urls import path
from .views import (
  UserLoginView,
  UserSignUpView,
  GetUserRole,
)

urlpatterns = [
    path('login/', view=UserLoginView.as_view(), name='login'),
    path('signUp/', view=UserSignUpView.as_view(), name='signUp'),
    path('userRole/', view=GetUserRole.as_view(), name='userRole'),
]
