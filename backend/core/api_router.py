from django.urls import path, include

urlpatterns = [
  path('authentication/', include('my_auth.urls')),
  path('post/', include('users_post.urls')),
]
app_name = 'api'