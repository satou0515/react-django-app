from rest_framework import serializers
from my_auth.models import UserInformation

class UserInformationSerializer(serializers.ModelSerializer):
  account_name = serializers.CharField(max_length=50)
  email = serializers.EmailField()
  password = serializers.CharField()
  birth_date = serializers.DateField(required=False, allow_null=True)
  sex = serializers.ChoiceField(choices=UserInformation.GENDER_CHOICES, required=False, allow_null=True)
  icon_image = serializers.ImageField(required=False, allow_null=True)