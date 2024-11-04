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

from users_post.firestore import FirebaseClient
from users_post.serializers import UsersPostSerializer
from django.middleware.csrf import get_token
from django.http import JsonResponse

class UsersPostViewSet(viewsets.ViewSet):
  firebase_client = FirebaseClient()

  def create(self, request, *args, **kwargs):
    data=request.data
    print('>>>>> ', data)
    serializer = UsersPostSerializer(data=data)
    if not serializer.is_valid(raise_exception=True):
      print('Validation Errors: ', serializer.errors)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    # firestoreに保存
    self.firebase_client.create(serializer.data)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
  
  # すべてのデータを取得
  def list(self, request):
    users = self.firebase_client.all()
    serializer = UsersPostSerializer(users)
    return Response(serializer.data)

  # 特定のデータを取得
  def retrieve(self, request, pk=None):
    user = self.firebase_client.get_by_id(pk)

    if user:
      serializer = UsersPostSerializer(user)
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
    serializer = UsersPostSerializer(data=request.data)
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
  serializer_class = UsersPostSerializer

  def post(self, request):
    serializer = UsersPostSerializer(data=request.data)
    if serializer.is_valid():
      # firebase　Authenticationでユーザーの作成
      try:
        user = auth.create_user(
          email=serializer.validated_data['email'],
          password=serializer.validated_data['password'],
        )
      except auth.AuthError as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
      
      print('>>>>> UsersPost create')
      # カスタムユーザーモデルの作成
      UsersPostSerializer.objects.create(
        firebase_uid=user.uid,
        account_name=serializer.validated_data['account_name'],
        birth_date=serializer.validated_data['birth_date'],
        gender=serializer.validated_data['gender'],
        icon_image=serializer.validated_data['icon_image']
      )
      return Response({'message': '登録しました。'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})
