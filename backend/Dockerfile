FROM python:3.11

# 環境変数設定
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED 1

# 必要パッケージのインストール
RUN apt update -y
RUN pip install django
RUN apt-get update && apt-get install -y \
    libsystemd-dev \
    && rm -rf /var/lib/apt/lists/*

# 作業ディレクトリ
RUN mkdir /code
WORKDIR /code

# 依存関係のインストール
COPY requirements.txt /code/

# setuptoolsを先にインストール
RUN pip install setuptools==56.0.0
RUN pip install --upgrade pip && pip install -r requirements.txt

# プロジェクトファイルのコピー
COPY . /code/
COPY .env .env

RUN pip install firebase-admin
RUN pip install django-cors-headers
