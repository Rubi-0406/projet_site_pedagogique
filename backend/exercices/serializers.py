from rest_framework import serializers
from .models import Category, Section, ExerciseAttempt

class SectionSerializer(serializers.ModelSerializer):
    """Transforme les sections (exercices) en JSON"""
    class Meta:
        model = Section
        fields = [
            'id', 
            'order',
            'name', 
            'slug', 
            'theory_content', 
            'python_example'
        ]

class CategorySerializer(serializers.ModelSerializer):
    """Transforme les catégories en JSON et inclut leurs sections"""
    # On affiche la liste des sections à l'intérieur de la catégorie
    sections = SectionSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'icon', 'slug', 'chapter_num', 'sections']

class ExerciseAttemptSerializer(serializers.ModelSerializer):
    """Pour envoyer les résultats des exercices au backend"""
    class Meta:
        model = ExerciseAttempt
        fields = ['id', 'section', 'success', 'created_at']