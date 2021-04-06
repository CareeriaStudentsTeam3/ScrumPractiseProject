from django.shortcuts import render
from rest_framework import viewsets
from .models import Hairmodel, Appointment_timespan, Appointment, Category, Service
from django.db.models import F, ExpressionWrapper, DurationField
from .serializers import HairModelSerializer, AppointmentTimeSpanSerializer, AppointmentSerializer, CategorySerializer, ServiceSerializer
from datetime import datetime,timedelta

# Create your views here.

class HairModelViewSet(viewsets.ModelViewSet):
    queryset = Hairmodel.objects.all()
    serializer_class = HairModelSerializer

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

class AppointmentTimeSpanViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentTimeSpanSerializer
    def get_queryset(self):
        queryset = Appointment_timespan.objects.all()
        group_size = self.request.query_params.get("group_size")
        duration = self.request.query_params.get("duration")
        if group_size and duration is not None:
            group_size = int(group_size)
            queryset = Appointment_timespan.objects.annotate(timediff=ExpressionWrapper(F("end")-F("beginning"), output_field=DurationField())).filter(max_group_size__gte=group_size, timediff=timedelta(hours=int(duration)))
        return queryset

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ServiceViewSet(viewsets.ModelViewSet):
    serializer_class = ServiceSerializer
    def get_queryset(self):
        queryset = Service.objects.all()
        group_size = self.request.query_params.get("group_size")
        if group_size is not None:
            group_size = int(group_size)
            queryset = queryset.filter(max_group_size__gte=group_size)
        return queryset
    