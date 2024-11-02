import firebase_admin
from firebase_admin import credentials, auth
from django.views import View
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework import serializers, status
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
import logging

from my_auth.serializers import UserInformationSerializer
from my_auth.models import UserInformation

class FirebaseService:
  def __init__(self):
    # Service Accountのキーファイルのパスを指定
    cred = credentials.Certificate('path/to/serviceAccountKey.json')

    try:
      # Firebaseアプリを初期化
      firebase_admin.initialize_app(cred)
      # Firestoreに接続
      self.db = firebase_admin.firestore()
      logging.info('Firebaseに接続しました。')
    except Exception as e:
      logging.error(f'Firebaseへの接続に失敗しました。')

  def get_users(self, request):
    # コレクションからドキュメントを取得する
    docs = self.db.collection('users').stream()
    # 取得したドキュメントをリストに格納
    users = []
    for doc in docs:
      users.append(doc.to_dict())

    return render(request, 'user_list.html', {'users': users})

class UserListView(View):
  def get(self, request):
    try:
      firebase_service = FirebaseService()
      users = firebase_service.get_users()
      logging.info(users)
    except Exception as e:
      return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GetUserRole(APIView):
  def get(self, request):
    user = request.user
    return Response({'data': user}, status=status.HTTP_200_OK)

# ログイン
class UserLoginView(APIView):
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
class UserSignUpView(viewsets.ModelViewSet):
  serializer_class = UserInformationSerializer

  def post(self, serializer):
    if serializer.is_valid():
      # firebase　Authenticationでユーザーの作成
      try:
        user = auth.create_user(
          email=serializer.validated_data['email'],
          password=serializer.validated_data['password'],
        )
      except auth.AuthError as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
      
      # カスタムユーザーモデルの作成
      UserInformation.objects.create(
        firebase_uid=user.uid,
        user_id=serializer.validated_data['user_id'],
        account_name=serializer.validated_data['account_name'],
        birth_date=serializer.validated_data['birth_date'],
        sex=serializer.validated_data['sex'],
        icon_image=serializer.validated_data['icon_image']
      )
      return Response({'message': '登録しました。'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
