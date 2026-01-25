from django.urls import path, include
from rest_framework.routers import DefaultRouter
from exercices.views import (
    GetCategory,
    GetSection,
    GetPostExercice
)

router = DefaultRouter()
router.register(r'get_category', GetCategory, basename='get_category')
router.register(r'get_section', GetSection, basename='get_section')
router.register(r'get_post_exercice', GetPostExercice, basename='get_post_exercice')

urlpatterns = [
    path('', include(router.urls)),   
]

