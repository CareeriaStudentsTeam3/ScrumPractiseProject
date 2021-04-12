from rest_framework import serializers
from .models import Hairmodel, Appointment_timespan, Appointment, Category, Service
from django.contrib.auth import authenticate

class HairModelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Hairmodel
        fields = ["id","first_name", "last_name", "city", "phone", "email", "age", "gender", "hair_length", "hair_procedures", "image"]

class AppointmentTimeSpanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment_timespan
        fields = ["id","beginning", "end", "max_group_size"]

class AppointmentSerializer(serializers.ModelSerializer):
    ##appointment_date = AppointmentTimeSpanSerializer()
    class Meta:
        model = Appointment
        fields = ["id", "first_name", "last_name", "email", "phone", "group_size", "service", "appointment_date", "place", "info", "confirmed"]

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "category_name"]

class ServiceSerializer(serializers.ModelSerializer):
    ##category = CategorySerializer()
    class Meta:
        model = Service
        fields = ["id", "service_name", "duration", "price", "max_group_size", "category"]

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150, required=True) 
    password = serializers.CharField(max_length=128, required=True)

    def validate(self,data):
        username = data.get("username")
        password = data.get("password")

        request=self.context.get("request")
        user = authenticate(request, username=username, password=password)
        data["user"] = user

        if not user:
            raise serializers.ValidationError("User not found.")
            
        return data
