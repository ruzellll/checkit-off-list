from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.views.static import serve
import os

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    re_path(r'^$', TemplateView.as_view(template_name='index.html')),
    re_path(r'^(?!/?static/)(?!/?api/)(?:.*)/?$',
        TemplateView.as_view(template_name='index.html')),
]