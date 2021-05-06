from rest_framework import serializers
from .models import Hairmodel, Appointment_timespan, Appointment, Category, Service, User
from django.contrib.auth import authenticate

class HairModelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Hairmodel
        fields = ["id","first_name", "last_name", "city", "phone", "email", "age", "gender", "hair_length", "hair_procedures", "image"]

class AppointmentTimeSpanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment_timespan
        fields = ["id","beginning", "end", "max_group_size", "status"]

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

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "is_active", "groups"]
    
    def create(self, validated_data):
        groups = validated_data.pop("groups")
        if len(groups) >=2:
            raise serializers.ValidationError("Only one group allowed.")
        else:
            user = User.objects.create(**validated_data)
            for group in groups:
                user.groups.add(group)
            return user

