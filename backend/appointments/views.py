from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Hairmodel, Appointment_timespan, Appointment, Category, Service, User
from django.db.models import F, ExpressionWrapper, DurationField
from .serializers import HairModelSerializer, AppointmentTimeSpanSerializer, AppointmentSerializer, CategorySerializer, ServiceSerializer, UserLoginSerializer, UserSerializer
from datetime import datetime,timedelta
from django.contrib.auth import login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import DjangoModelPermissions, DjangoModelPermissionsOrAnonReadOnly
from .permissions import CreateOnly, CustomModelPerm

# Create your views here.

class HairModelViewSet(viewsets.ModelViewSet):
    authentication_classes = [SessionAuthentication]
    permission_classes = [CreateOnly | (DjangoModelPermissions)]
    queryset = Hairmodel.objects.all()
    serializer_class = HairModelSerializer

class AppointmentViewSet(viewsets.ModelViewSet):
    authentication_classes = [SessionAuthentication]
    permission_classes = [CreateOnly | (DjangoModelPermissions)]
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

class AppointmentTimeSpanViewSet(viewsets.ModelViewSet):
    authentication_classes = [SessionAuthentication]
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    serializer_class = AppointmentTimeSpanSerializer
    def get_queryset(self):
        queryset = Appointment_timespan.objects.all()
        group_size = self.request.query_params.get("group_size")
        duration = self.request.query_params.get("duration")
        if group_size and duration is not None:
            group_size = int(group_size)
            queryset = queryset.annotate(timediff=ExpressionWrapper(F("end")-F("beginning"), output_field=DurationField())).filter(max_group_size__gte=group_size, timediff=timedelta(minutes=int(duration)))
        return queryset

class CategoryViewSet(viewsets.ModelViewSet):
    authentication_classes = [SessionAuthentication]
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ServiceViewSet(viewsets.ModelViewSet):
    authentication_classes = [SessionAuthentication]
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    serializer_class = ServiceSerializer
    def get_queryset(self):
        queryset = Service.objects.all()
        group_size = self.request.query_params.get("group_size")
        if group_size is not None:
            group_size = int(group_size)
            queryset = queryset.filter(max_group_size__gte=group_size)
        return queryset

class UserLoginView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        login(request, user)
        return Response({"username": user.username, "user_group": user.groups.values_list("name",flat=True), "login_success": True})

class UserLogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({"logout_success": True})

class UserViewSet(viewsets.ModelViewSet):
    authentication_classes = [SessionAuthentication]
    permission_classes = [DjangoModelPermissions & CustomModelPerm]
    queryset = User.objects.all()
    serializer_class = UserSerializer

