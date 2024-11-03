from rest_framework import serializers
from my_auth.constants import GENDER_CHOICES

class UserInformationSerializer(serializers.Serializer):
  firebase_uid = serializers.CharField(max_length=255, read_only=True)
  account_name = serializers.CharField(max_length=50)
  birth_date = serializers.DateField(required=False, allow_null=True)
  gender = serializers.ChoiceField(choices=GENDER_CHOICES)
  icon_image = serializers.ImageField(required=False, allow_null=True)
