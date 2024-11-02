FROM python:3.11

# 環境変数設定
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED 1

# 必要パッケージのインストール
RUN apt update -y
RUN pip install django

# 作業ディレクトリ
RUN mkdir /code
WORKDIR /code

# 依存関係のインストール
COPY requirements.txt /code/
RUN pip install --upgrade pip && pip install -r requirements.txt

# プロジェクトファイルのコピー
COPY . /code/

RUN pip install firebase-admin
