from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class Appointment(models.Model):
    first_name = models.CharField("first_name", max_length=30)
    last_name = models.CharField("last_name", max_length=50)
    email = models.EmailField("email", max_length=50)
    phone = models.CharField("phone", max_length=10)
    group_size = models.IntegerField("group_size")
    service = models.ForeignKey("Service", verbose_name="service", on_delete=models.SET_NULL, null=True)
    appointment_date = models.DateTimeField("appointment")
    place = models.CharField("place", max_length=50)
    info = models.CharField("info", max_length=200)
    confirmed = models.BooleanField("confirmed")

class Service(models.Model):
    service_name = models.CharField("service_name", max_length=50)
    duration = models.IntegerField("duration") #DurationField?
    price = models.DecimalField("price", decimal_places=1,max_digits=4)
    max_group_size = models.IntegerField()
    category = models.ForeignKey("Category",verbose_name="category", on_delete=models.SET_NULL, null=True)

class Category(models.Model):
    category_name = models.CharField("category", max_length=50)

class Appointment_timespan(models.Model):
    beginning = models.DateTimeField("beginning")
    end = models.DateTimeField("end")
    max_group_size = models.IntegerField("max_group_size")

class Hairmodel(models.Model):
    first_name = models.CharField("first_name", max_length=30)
    last_name = models.CharField("last_name", max_length=50)
    city = models.CharField("city", max_length=50)
    phone = models.CharField("phone", max_length=10)
    email = models.EmailField("email", max_length=50)
    age = models.IntegerField("age")
    gender = models.CharField("gender", max_length=10)
    hair_length = models.CharField("hair_length", max_length=20)
    hair_procedures = models.CharField("hair_procedures", max_length=20)
    image = models.ImageField("image", null=True, upload_to="images/")

class User(AbstractUser):
    pass



