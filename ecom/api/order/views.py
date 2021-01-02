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

@csrf_exempt
def add(request, id, token):
    if not validate_user_session(id, token):
        return JsonResponse({'error': 'Please login first', 'code': '400'})

    if request.method == 'POST':
        user_id = id
        transcation_id = request.POST['transaction_id']
        amount = request.POST['amount']
        products = request.POST['prouducts']
        
        # to get the total products, we split the product list by ',', get the length of the return array and reduce by 1
        total_product = len(products.split(',')[:-1])

        # Getting the user details
        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(pk=user_id)
        except UserModel.DoesNotExist:
            return JsonResponse({'error': 'User does not exist'})
        
        # Creating and saving a new order to the DB
        order = Order(user=user, product_name=products, total_product=total_product, transcation_id=transcation_id, total_amount=amount)
        order.save()
        return JsonResponse({'success': True, 'error': False, 'msg': 'Order Placed Successfully'})

# This by default gives all the CRUD capabilities for Order model
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('id')
    serializer_class = OrderSerializers