from rest_framework import viewsets
from .models import Clinic
from rest_framework.response import Response
from .serializers import ClinicSerializer

class ClinicViewSet(viewsets.ModelViewSet):
    queryset = Clinic.objects.all()
    serializer_class = ClinicSerializer