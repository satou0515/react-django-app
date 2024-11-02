from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator
import uuid

class UserInformation(AbstractUser):
  firebase_uid = models.CharField(max_length=255, unique=True)
  account_name = models.CharField(max_length=50, unique=True)
  birth_date = models.DateField(null=True, blank=True)
  GENDER_CHOICES = [('male', '男性'), ('female', '女性'), ('other', 'その他')]
  gender = models.CharField(max_length=10, choices=GENDER_CHOICES, blank=True)
  icon_image = models.ImageField(upload_to='user_icons/', null=True, blank=True)

  class Meta:
    db_table = 'user_information'
