import os
import firebase_admin
from firebase_admin import credentials, auth
from django.views import View
from django.shortcuts import get_object_or_404, render
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework import serializers, status, permissions
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from my_auth.firestore import FirebaseClient

from my_auth.serializers import UserInformationSerializer

class UserInformatoinViewSet(viewsets.ViewSet):
  firebase_client = FirebaseClient()

  def create(self, request, *args, **kwargs):
    data=request.data
    if 'icon_image' not in data:
      data['icon_image'] = None
    if 'birth_date' not in data:
      data['birth_date'] = None
    serializer = UserInformationSerializer(data=data)
    if not serializer.is_valid():
      print('>>>>>>>>', serializer.errors)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    serializer.is_valid(raise_exception=True)

    # firestoreに保存
    self.firebase_client.create(serializer.data)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
  
  # すべてのデータを取得
  def list(self, request):
    users = self.firebase_client.all()
    serializer = UserInformationSerializer(users)
    return Response(serializer.data)

  # 特定のデータを取得
  def retrieve(self, request, pk=None):
    user = self.firebase_client.get_by_id(pk)

    if user:
      serializer = UserInformationSerializer(user)
      return Response(serializer.data)
    
    return Response({"error": "アカウントが見つかりません。"}, status=status.HTTP_404_NOT_FOUND)

  # データの削除
  def destroy(self, request, *args, **kwargs):
    pk = kwargs.get('uid')
    self.firebase_client.delete_by_id(pk)
    return Response({"status": "削除しました。"}, status=status.HTTP_204_NO_CONTENT)

  # データの更新
  def update(self, request, *args, **kwargs):
    pk = kwargs.get('uid')
    serializer = UserInformationSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    self.firebase_client.update(pk, serializer.data)

    return Response(serializer.data, status=status.HTTP_200_OK)

class GetUserRole(APIView):
  firebase_client = FirebaseClient()
  def get(self, request):
    user = request.user
    return Response({'data': user}, status=status.HTTP_200_OK)

# # ログイン
class UserLoginView(APIView):
  firebase_client = FirebaseClient()
  def post(self, request):
    email = request.data.get('email')
    password = request.data.get('password')

    try:
      user = auth.sign_in_with_email_and_password(email, password)
      # トークンの発行
      token, createed = Token.objects.get_or_create(user=user)
      return Response({'token': token.key})
    except auth.AuthError as e:
      return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

# ユーザー登録
class UserSignUpView(APIView):
  firebase_client = FirebaseClient()
  permission_classes = (permissions.AllowAny,)
  serializer_class = UserInformationSerializer

  def post(self, request):
    serializer = UserInformationSerializer(data=request.data)
    if serializer.is_valid():
      # firebase　Authenticationでユーザーの作成
      try:
        user = auth.create_user(
          email=serializer.validated_data['email'],
          password=serializer.validated_data['password'],
        )
      except auth.AuthError as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
      
      print('>>>>> UserInformation create')
      # カスタムユーザーモデルの作成
      UserInformationSerializer.objects.create(
        firebase_uid=user.uid,
        account_name=serializer.validated_data['account_name'],
        birth_date=serializer.validated_data['birth_date'],
        gender=serializer.validated_data['gender'],
        icon_image=serializer.validated_data['icon_image']
      )
      return Response({'message': '登録しました。'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
