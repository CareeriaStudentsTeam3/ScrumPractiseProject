from rest_framework import permissions

class IsAuthenticatedOrCreateOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True
        else:
            METHODS = ["POST"]
            return (
                request.method in METHODS
            )
