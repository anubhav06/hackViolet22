from django.urls import path
from . import views
from .views import MyTokenObtainPairView

# Refer to: https://django-rest-framework-simplejwt.readthedocs.io/en/latest/getting_started.html#installation 
# for installation of JWT with DRF

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

# Refer to the corresponding view function for more detials of the url routes
urlpatterns = [ 
    path('', views.getRoutes, name="index"),
    path('register-user/', views.registerUser, name="register" ),
    path('register-company/', views.registerCompany, name="registerCompany"),

    path('add-info/', views.addInfo, name='addInfo'),
    path('get-info/', views.getInfo, name='getInfo'),

    # For user authentication
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]
