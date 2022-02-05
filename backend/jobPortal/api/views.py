from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import Group
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status

from jobPortal.models import Job
from jobPortal.api.serializers import JobSerializer


# To get all the jobs listed by all the companies
@api_view(['GET'])
def getJobs(request):

    jobs = Job.objects.all()
    return Response([job.serializer() for job in jobs])



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


# To delete a job
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def removeJob(request, id):

    try:
        job = Job.objects.get(id=id, poster=request.user)
        job.delete()
    except ObjectDoesNotExist:
        return Response({'No job with that ID exists'}, status=status.HTTP_406_NOT_ACCEPTABLE)

    return Response({'Job Deleted ✅'})



# To get the jobs listed by the requested company
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCompanyJobs(request):

    jobs = Job.objects.filter(poster=request.user)
    serializer = JobSerializer(jobs, many=True)

    return Response(serializer.data)





# ------------------------------------
@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/job-portal/add',
    ]

    return Response(routes)



