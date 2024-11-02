from rest_framework import serializers
from my_auth.models import UserInformation

class UserInformationSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserInformation
    fields = ['firebase_uid', 'account_name', 'birth_date', 'gender', 'icon_image']

  def create(self, validated_data):
    user = UserInformation(**validated_data)
    user.set_password(validated_data['password'])  # パスワードをハッシュ化
    user.save()
    return user