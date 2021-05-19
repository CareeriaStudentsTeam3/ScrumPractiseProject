from rest_framework import permissions


class CreateOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        METHODS = ["POST"]
        return (
            request.method in METHODS
            )

class CustomModelPerm(permissions.DjangoModelPermissions):
    def __init__(self):
        self.perms_map['GET'] = ['%(app_label)s.view_%(model_name)s']

