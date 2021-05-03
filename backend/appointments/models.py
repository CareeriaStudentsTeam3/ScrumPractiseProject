from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class Appointment(models.Model):
    first_name = models.CharField("first_name", max_length=30)
    last_name = models.CharField("last_name", max_length=50)
    email = models.EmailField("email", max_length=50)
    phone = models.CharField("phone", max_length=20)
    group_size = models.IntegerField("group_size")
    service = models.ForeignKey("Service", verbose_name="service", on_delete=models.SET_NULL, null=True)
    appointment_date = models.ForeignKey("Appointment_timespan", verbose_name="appointment_date", on_delete=models.SET_NULL, null=True)
    place = models.CharField("place", max_length=50)
    info = models.CharField("info", max_length=200)
    confirmed = models.BooleanField("confirmed")

    def __str__(self):
        return self.last_name
    

class Service(models.Model):
    service_name = models.CharField("service_name", max_length=50)
    duration = models.IntegerField("duration") 
    price = models.DecimalField("price", decimal_places=2,max_digits=6) 
    max_group_size = models.IntegerField("max_group_size")
    category = models.ForeignKey("Category",verbose_name="category", on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.service_name
    

class Category(models.Model):
    category_name = models.CharField("category", max_length=50)

    def __str__(self):
        return self.category_name
    

class Appointment_timespan(models.Model):
    beginning = models.DateTimeField("beginning")
    end = models.DateTimeField("end")
    max_group_size = models.IntegerField("max_group_size")
    status = models.CharField("status", max_length=50, choices=[("FREE", "vapaa"), ("UNCONFIRMED", "vahvistamaton varaus"), ("CONFIRMED", "varattu")], default="FREE") 

    def __str__(self):
        return f"{self.beginning}/{self.end}"
    

class Hairmodel(models.Model):
    first_name = models.CharField("first_name", max_length=30)
    last_name = models.CharField("last_name", max_length=50)
    city = models.CharField("city", max_length=50)
    phone = models.CharField("phone", max_length=20)
    email = models.EmailField("email", max_length=50)
    age = models.IntegerField("age")
    gender = models.CharField("gender", max_length=50, choices=[("FEMALE", "nainen"), ("MALE", "mies"), ("OTHER", "muu/en halua määritellä")], default="OTHER")
    hair_length = models.CharField("hair_length", max_length=20, choices=[("LONG", "pitkät"), ("MEDIUM", "puolipitkät"), ("SHORT", "lyhyet")], default="MEDIUM")
    hair_procedures = models.CharField("hair_procedures", max_length=200)
    image = models.ImageField("image", null=True, upload_to="images/")

    def __str__(self):
        return self.last_name
    

class User(AbstractUser):
    pass



