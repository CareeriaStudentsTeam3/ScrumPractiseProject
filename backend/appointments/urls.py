from django.urls import include,path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r"hairmodel", views.HairModelViewSet)

urlpatterns = [
    path("api/", include((router.urls, "appointment_app"))),
]
