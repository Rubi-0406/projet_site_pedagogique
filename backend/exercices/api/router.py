from django.urls import path, include
from rest_framework.routers import DefaultRouter
from exercices.views import (
    GetCategory,
    GetSection,
)

router = DefaultRouter()
router.register(r'get_category', GetCategory, basename='get_category')
router.register(r'get_section', GetSection, basename='get_section')


urlpatterns = [
    path('', include(router.urls)),   
]

