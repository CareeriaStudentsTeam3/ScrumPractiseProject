from django.core.management import BaseCommand
from django.contrib.auth.models import Group, Permission

PERMISSIONS = ["add", "view", "change", "delete"]
MODELS = ["appointment", "service", "category", "appointment_timespan", "hairmodel", "user"]
VIEW_MODELS = ["appointment", "service", "category", "appointment_timespan", "hairmodel"]

class Command(BaseCommand):
    def handle(self,*args, **kwargs):
        teacher, created = Group.objects.get_or_create(name="teacher")
        for model in MODELS:
            for permission in PERMISSIONS:
                name = f"{permission}_{model}"
                add_permission = Permission.objects.get(codename=name)
                teacher.permissions.add(add_permission)
        student, created = Group.objects.get_or_create(name="student")
        for model in VIEW_MODELS:
            name = f"view_{model}"
            add_permission = Permission.objects.get(codename=name)
            student.permissions.add(add_permission)

