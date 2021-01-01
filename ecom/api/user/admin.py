from django.contrib import admin
from .models import CustomUser
# Register your models here.

# This makes sure the rest_framework can access the CustomUser DB
admin.site.register(CustomUser)