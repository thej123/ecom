from rest_framework import viewsets
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from .serializers import OrderSerializer
from .Order import Order
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

def validate_user_session(id, token):
    # gets the connection ready to all the Usermodels
    UserModel = get_user_model()
    try:
        # Finds the user by filtering through user ID
        user = UserModel.objects.get(pk=id)
        # validating if the user still has a vallid session (i.e making sure no ones logged him out)
        if user.session_token == token:
            return True
        return False
    except UserModel.DoesNotExist:
        return False