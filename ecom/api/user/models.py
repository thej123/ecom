from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

# creating a new user model by inheriting AbstractUser model and changing username to email
# Also updating a few extra fields like phone, gender and session token
class CustomUser(AbstractUser):
    name = models.CharField(max_length=50, default='Anonymous')
    email = models.EmailField(max_length=254, unique=True)

    username = None
    # username will be governed by email instead of default username value
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    phone = models.CharField(max_length=20, blank=True, null=True)
    gender = models.CharField(max_length=10, blank=True, null=True)

    session_token = models.CharField(max_length=10, default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)