import os
import firebase_admin
from firebase_admin import credentials, auth
from rest_framework import viewsets
from rest_framework import serializers, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from users_post.firestore import FirebaseClient
from users_post.serializers import UsersPostSerializer
from django.middleware.csrf import get_token
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_protect

# @csrf_protect
class UsersPostViewSet(viewsets.ViewSet):
  parser_classes = (IsAuthenticated,)
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
    serializer = UsersPostSerializer(users, many=True)
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

# @csrf_protect
class GetContextData(APIView):
  parser_classes = (IsAuthenticated,)
  def get(self, request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})
