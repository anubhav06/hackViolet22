from django.urls import path
from . import views


# Refer to the corresponding view function for more detials of the url routes
urlpatterns = [ 
    path('', views.getRoutes, name="index"),
    path('get-mentors/', views.getMentors, name="getMentors"),
    path('user/schedule-meet/', views.scheduleMeet, name='scheduleMeet'),
    path('user/get-meetings/', views.getMeetings, name='getMeetings'),
    path('mentor/get-meetings/', views.getMentorMeetings, name='getMentorMeetings'), 
    path('mentor/confirm-meeting/<str:id>', views.confirmMeeting, name='confirmMeetng'),

    path('twilio/token/', views.twilioToken, name='twilioToken'),
]
