from django.urls import include,path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r"hairmodel", views.HairModelViewSet)
router.register(r"appointment", views.AppointmentViewSet)
router.register(r"appointment_timespan", views.AppointmentTimeSpanViewSet,"appointment_timespan")
router.register(r"category", views.CategoryViewSet)
router.register(r"service", views.ServiceViewSet, "service")

urlpatterns = [
    path("api/", include((router.urls, "appointment_app"))),
]
