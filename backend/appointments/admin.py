from django.contrib import admin
from . import models
from django.contrib.auth.admin import UserAdmin
# Register your models here.

admin.site.register(models.Appointment)
admin.site.register(models.Service)
admin.site.register(models.Category)
admin.site.register(models.Appointment_timespan)
admin.site.register(models.Hairmodel)
admin.site.register(models.User,UserAdmin)