from rest_framework import serializers
from .models import Hairmodel, Appointment_timespan

class HairModelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Hairmodel
        fields = ["id","first_name", "last_name", "city", "phone", "email", "age", "gender", "hair_length", "hair_procedures", "image"]

class AppointmentTimeSpanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment_timespan
        fields = ["beginning", "end", "max_group_size"]