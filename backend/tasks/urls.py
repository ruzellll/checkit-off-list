from django.urls import path
from .views import TaskViewSet

urlpatterns = [
    path('tasks/', TaskViewSet.as_view({
        'get': 'list',
        'post': 'create'
    })),
    path('tasks/<str:pk>/', TaskViewSet.as_view({
        'put': 'update',
        'delete': 'destroy'
    })),
]