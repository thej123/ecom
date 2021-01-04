from django.urls import path, include
from rest_framework.authtoken import views
from .views import home

# obtain_auth_token is not used for this project
# It basically allows user to get token through django instead of our own token creation method in user.signin


urlpatterns = [
    path('', home, name='api.home'),
    path('category/', include('api.category.urls')),
    path('product/', include('api.product.urls')),
    path('user/', include('api.user.urls')),
    path('order/', include('api.order.urls')),
    path('api-token-auth/', views.obtain_auth_token, name='api_token_auth')
]