from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import Group

from jobPortal.models import Job


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addJob(request):

    name = request.data['name']
    description = request.data['description']
    location = request.data['location']
    website = request.data['website']

    if not name or not description or not location or not website:
        return Response("ERROR: All data is required!")

    # Save the job in DB
    data = Job(name=name, description=description, location=location, website=website, poster=request.user)
    data.save()

    return Response('Job Added ✅')


# ------------------------------------
@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/job-portal/add',
    ]

    return Response(routes)



