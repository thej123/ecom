from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer
from .models import CustomUser
from django.http import JsonResponse, HttpResponse
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login, logout

import random
import re
# Create your views here.

def generate_session_token(length=10):
    # chr(97) give 'a', chr(122) gives 'z'
    # chr(i) for i in range(97,123) - gives all the letters from a to Z.
    # str(5) give string '5'
    # str(i) for i in range(10) - gives all the numbers from 0 to 9
    # for _ in range(length) - the _ - simply says we dont care to give the data a key
    # The whole thing basically creates a 10 character long string made of letters and numbers
    return ''.join(random.SystemRandom().choice([chr(i) for i in range(97,123)] + [str(i) for i in range(10)]) for _ in range(length))

# using csrf_exempt decorator so that outside source can access this method i.e reactJS
# we will be doing signin from other origin request like postman also
@csrf_exempt
def signin(request):
    if not request.method == 'POST':
        return JsonResponse({'error': 'Send a post request with valid parameter only'})
    
    # This is expecting input as FORM data format instead of JSON format
    username = request.POST['email']
    password = request.POST['password']

    # validation part
    if not re.match("^[\w\.\+\-]+\@[\w]+\.[a-z]{2,3}$", username):
        return JsonResponse({'error': 'Enter a valid email'})
    
    if len(password) < 3:
        return JsonResponse({'error': 'Password needs to be atleast 3 characters'})
    
    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(email=username)
        # check_password() is built in method of django 3
        if user.check_password(password):
            usr_dict = UserModel.objects.filter(email=username).values().first()
            # we pop out the password because we will returning the rest of back to the frontend
            usr_dict.pop('password')
            
            # Checking session token to see if he is already logged in, in which case we put the token to zero and let user know it
            if user.session_token != "0":
                user.session_token = "0"
                user.save()
                return JsonResponse({'error': 'Previous session exits!'})

            token = generate_session_token()
            user.session_token = token
            user.save()

            # Django built in method login()
            login(request, user)
            return JsonResponse({'token': token, 'user': usr_dict})

        else:
            return JsonResponse({'error': 'Invalid Password'})


    except UserModel.DoesNotExist:
        return JsonResponse({'error': 'Invalid Email'})

# id is captured through the url in urls.py
def signout(request, id):
    # Django built in logout method
    logout(request)

    # Gets/Prepares all the user models data
    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(pk=id)
        user.session_token = "0"
        user.save()
    
    except UserModel.DoesNotExist:
        return JsonResponse({'error': 'Invalid User ID'})
    
    return JsonResponse({'success': 'Logout sucess'})

# This allow us to give full permission to all users. Can be customized for SuperUser etc
# Used in urls.py
class UserViewSet(viewsets.ModelViewSet):
    permission_classes_by_action = {'create': [AllowAny]}

    queryset = CustomUser.objects.all().order_by('id')
    serializer_class = UserSerializer

    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return [permission() for permission in self.permission_classes]


