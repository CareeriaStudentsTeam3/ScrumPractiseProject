from rest_framework import serializers
from django.contrib.auth.models import Group
from .models import Hairmodel, Appointment_timespan, Appointment, Category, Service, User
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password

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
    password = serializers.CharField(max_length=128, required=False, write_only=True, validators=[validate_password])
    password_again = serializers.CharField(max_length=128, required=False, write_only=True, validators=[validate_password])
    groups = serializers.SlugRelatedField(many=True, slug_field="name", queryset=Group.objects.all())
    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "password", "password_again", "is_active", "groups"]

    def create(self, validated_data):
        groups = validated_data.pop("groups")
        password = validated_data.pop("password")
        password_again = validated_data.pop("password_again")
        if len(groups) >=2:
            raise serializers.ValidationError("Only one group allowed.")
        else:
            user = User.objects.create(**validated_data)
            if password == password_again:
                user.set_password(password)
            else:
                raise serializers.ValidationError("Passwords are not similar.")
            user.save()
            for group in groups:
                user.groups.add(group)
            return user
    
    def update(self, instance, validated_data):
        groups = validated_data.pop("groups")
        password = validated_data.pop("password", None)
        password_again = validated_data.pop("password_again", None)
        if groups:
            if len(groups) >=2:
                raise serializers.ValidationError("Only one group allowed.")
            else:
                instance.groups.set(groups)
                instance.save()
        if password and password == password_again:
            instance.set_password(password)
            instance.save()
        elif password and password != password_again:
            raise serializers.ValidationError("Passwords are not similar.")
        return instance

