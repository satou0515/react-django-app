import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

from django.conf import settings

class FirebaseClient:
  def __init__(self):
    try:
      firebase_admin.get_app()
    except ValueError:
      firebase_admin.initialize_app(
        credentials.Certificate(settings.FIREBASE_ADMIN_CERT)
      )

    # firestoreのuser-informationコレクションを取得
    self._db = firestore.client()
    self._collection = self._db.collection(u'user-information')

  # user-informationコレクションにデータを作成
  def create(self, data):
    doc_ref = self._collection.document()
    doc_ref.set(data)

  # IDを使用してデータ更新
  def update(self, id, data):
    doc_ref = self._collection.document(id)
    doc_ref.update(data)

  # IDを使用してデータ削除
  def delete_by_id(self, id):
    self._collection.document(id).delete()

  # ID使用してデータ取得
  def get_by_id(self, id):
    doc_ref = self._collection.document(id)
    doc = doc_ref.get()

    if doc.exists:
      return {**doc.to_dict(), "id": doc.id}
    return

  # user-informationコレクションのデータをすべて取得
  def all(self):
    docs = self._collection.stream()
    return [{**doc.to_dict(), "id": doc.id} for doc in docs]

  # フィルタリングしてデータ取得
  def filter(self, field, condition, value):
    docs = self._collection.where(field, condition, value).stream()
    return [{**doc.to_dict(), "id": doc.id} for doc in docs]
