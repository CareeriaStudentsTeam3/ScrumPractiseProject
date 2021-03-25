from django.shortcuts import render
from rest_framework import viewsets
from .models import Hairmodel
from .serializers import HairModelSerializer

# Create your views here.

class HairModelViewSet(viewsets.ModelViewSet):
    queryset = Hairmodel.objects.all()
    serializer_class = HairModelSerializer



