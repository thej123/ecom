from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt

import braintree
# Create your views here.

gateway = braintree.BraintreeGateway(
    braintree.Configuration(
        braintree.Environment.Sandbox,
        merchant_id="gz7pd3zff8v7y8nq",
        public_key="drtqthbbcz9pjtfz",
        private_key="be500bbcf6c2c0dcce71a8a45ee092b9"
    )
)

# check if user is signed in or not
def validate_user_session(id, token):
    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(pk=id)
        if user.session_token == token:
            return True
        return False
    except UserModel.DoesNotExist:
        return False
    
@csrf_exempt
def generate_token(request, id, token):
    if not validate_user_session(id, token):
        return JsonResponse({'error': 'Invalid session. Please login again!'})
    
    return JsonResponse({'cient_token': gateway.client_token.generate(), 'success': True})

