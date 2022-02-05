from django.urls import path
from . import views


# Refer to the corresponding view function for more detials of the url routes
urlpatterns = [ 
    path('', views.getRoutes, name="index"),

    path('add-post/', views.addPost, name='add'),
    path('get-posts/', views.getPosts, name='getPosts'),
    path('add-comment/', views.addComment, name='addComment'),
    path('like/<int:id>', views.like, name='like'),

]
