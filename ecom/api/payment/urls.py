from django.urls import path, include
from . import views

# the name in the path are not used for any connection - it is there for just clarity
urlpatterns = [
    path('gettoken/<str:id>/<str:token>/', views.generate_token, name='token.generate'),
    path('process/<str:id>/<str:token>/', views.process_payment, name='payment.process'),
]

