from django.contrib import admin
from django.urls import path, include

from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('user.api.urls')),
    path('job-portal/', include('jobPortal.api.urls')),
    path('mentorship/', include('mentorship.api.urls')),
    path('forum/', include('forum.api.urls')),
]

# Add each uploaded image url. Format to access from frontend: localhost:8000/images/<nameOfUploadedImage>
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)