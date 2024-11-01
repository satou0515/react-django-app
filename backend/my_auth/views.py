import firebase_admin
from firebase_admin import credentials, auth
from django.views import View
from django.shortcuts import redirect, render

class FirebaseService:
  def __init__(self):
    # Service Accountのキーファイルのパスを指定
    cred = credentials.Certificate('path/to/serviceAccountKey.json')

    # Firebaseアプリを初期化
    if not firebase_admin._apps:
        firebase_admin.initialize_app(cred)

    # Firestoreに接続
    self.db = firebase_admin.firestore()

  def get_users(self, request):
    # コレクションからドキュメントを取得する
    docs = self.db.collection('users').stream()
    # 取得したドキュメントをリストに格納
    users = []
    for doc in docs:
      users.append(doc.to_dict())

    return render(request, 'user_list.html', {'users': users})

class Login():
  def signup(request):
    # POSTリクエストの場合、新規ユーザー登録処理
    if request.method == 'POST':
      email = request.POST.get('email')
      password = request.POST.get('password')

      try:
        user = auth.create_user(
            email=email,
            password=password
        )
        # ユーザー登録成功時の処理
        return redirect('/login')  # ログインページへリダイレクト
      except auth.AuthError as e:
        # エラー処理
        return render(request, '/login', {'error': str(e)})

    # GETリクエストの場合、サインアップフォームを表示
    return render(request, '/login')

class UserListView(View):
  def get(self, request):
    firebase_service = FirebaseService()
    users = firebase_service.get_users()
    return render(request, 'user_list.html', {'users': users})