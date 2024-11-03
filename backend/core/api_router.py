from django.urls import path, include

urlpatterns = [
  path('authentication/', include('my_auth.urls')),
]
app_name = 'api'