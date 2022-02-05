from django.urls import path
from . import views


# Refer to the corresponding view function for more detials of the url routes
urlpatterns = [ 
    path('', views.getRoutes, name="index"),
    path('add/', views.addJob, name="addJob" ),
    path('delete/<int:id>', views.removeJob, name="removeJob" ),
    path('get-jobs/', views.getJobs, name='getJobs'),
    path('company/jobs/', views.getCompanyJobs, name='getCompanyJobs'),
]
