from rest_framework import viewsets
from .serializers import CategorySerializers
from .models import Category

# Create your views here.

# This by default gives you all the necessary CRUD operations for Category model through Django libs
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializers