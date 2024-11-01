from django.urls import path
from .views import (
  Index
)

urlpatterns = [
    path('login/', view=Index.as_view(), name='login'),
]
