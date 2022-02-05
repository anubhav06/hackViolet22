from django.urls import path
from . import views


# Refer to the corresponding view function for more detials of the url routes
urlpatterns = [ 
    path('', views.getRoutes, name="index"),
    path('add/', views.addJob, name="addJob" ),

]
