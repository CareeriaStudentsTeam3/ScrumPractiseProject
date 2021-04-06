from rest_framework import serializers
from .models import Hairmodel, Appointment_timespan, Appointment, Category, Service

class HairModelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Hairmodel
        fields = ["id","first_name", "last_name", "city", "phone", "email", "age", "gender", "hair_length", "hair_procedures", "image"]

class AppointmentTimeSpanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment_timespan
        fields = ["id","beginning", "end", "max_group_size"]

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ["id", "first_name", "last_name", "email", "phone", "group_size", "service", "appointment_date", "place", "info", "confirmed"]

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "category_name"]

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ["id", "service_name", "duration", "price", "max_group_size", "category"]
