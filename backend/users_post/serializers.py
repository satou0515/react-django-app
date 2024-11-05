from rest_framework import serializers
from django.utils import timezone

class UsersPostSerializer(serializers.Serializer):
  firebase_uid = serializers.CharField(max_length=255)
  content = serializers.CharField(max_length=255)
  created_at = serializers.DateTimeField(default=timezone.now)
