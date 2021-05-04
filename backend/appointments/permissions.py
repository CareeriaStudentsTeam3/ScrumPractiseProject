from rest_framework import permissions

class CreateOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        METHODS = ["POST"]
        return (
            request.method in METHODS
            )
