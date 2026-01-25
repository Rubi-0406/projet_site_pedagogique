from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import(
    Category, 
    Section,
    ExerciseAttempt)

admin.site.register(Category)
admin.site.register(Section)
admin.site.register(ExerciseAttempt)