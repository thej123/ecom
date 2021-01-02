from rest_framework import serializers
from .models import Order

class OrderSerializer(serializers.HyperlinkedModels):
    class Meta:
        model = Order
        fields = ('user')
        #TODO: add product and quantity