from django.middleware.csrf import CsrfViewMiddleware
from django.core.cache import cache
import random

class CustomCsrfViewMiddleware(CsrfViewMiddleware):
  def get_token(self, request):
    # キャッシュキー
    cache_key = 'csrf_token'

    # キャッシュからトークンを取得
    token = cache.get(cache_key)

    # キャッシュにトークンが存在しない場合、または一定の確率で新しいトークンを生成
    if not token or random.random() < 0.1:
      token = super().get_token(request)  # 元のミドルウェアのメソッドを呼び出してトークンを生成
      print('token: ', token)
      cache.set(cache_key, token, 3600)  # キャッシュに1時間保存

    return token
  
  # リクエスト処理時にCSRFトークンをリクエストオブジェクトに設定
  def process_request(self, request):
    # CSRFトークンの処理を行う
    super().process_request(request)

    # レスポンスにトークンを設定
    if hasattr(request, 'csrf_token'):
      token = request.csrf_token
      print('リクエストに含まれているトークン: ', token)
      # 必要に応じてリクエストにトークンを保存するロジックを追加

  # リクエストオブジェクトからCSRFトークン取得、レスポンスヘッダーに追加
  def process_response(self, request, response):
    # レスポンスにCSRFトークンを追加する
    if hasattr(request, 'csrf_token'):
      response['X-CSRFToken'] = request.csrf_token
      print('レスポンスにCSRFトークンを追加しました: ', request.csrf_token)

    return response