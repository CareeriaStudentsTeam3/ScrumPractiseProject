from rest_framework import serializers
from .models import Hairmodel

class HairModelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Hairmodel
        fields = ["id","first_name", "last_name", "city", "phone", "email", "age", "gender", "hair_length", "hair_procedures", "image"]

