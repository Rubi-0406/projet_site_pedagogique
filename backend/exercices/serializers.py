from rest_framework.serializers import ModelSerializer
from .models import (
    Category, 
    Section, 
    ExerciseAttempt
)
# Récupere les différentes sections associées
class SectionSerializer(ModelSerializer):
    class Meta:
        model = Section
        fields = [
            'id', 
            'section_num',
            'name', 
            'icon',
            'slug',
        ]

# On définit la Catégorie qui utilise le SectionSerializer
class CategorySerializer(ModelSerializer):
    # Cette ligne est CRUCIALE pour que 'sections' fonctionne dans fields
    sections = SectionSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'icon', 'slug', 'chapter_num', 'sections']

# Un serializer léger pour les infos de base de la catégorie
class CategoryMinimalSerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'chapter_num', 'name','slug', 'icon']

class SectionDetailSerializer(ModelSerializer):
    # On utilise le serializer léger ici
    category = CategoryMinimalSerializer(read_only=True)

    class Meta:
        model = Section
        fields = [
            'id', 
            'section_num', 
            'name', 
            'icon', 
            'slug', 
            'category'
        ]
class ExerciseAttemptSerializer(ModelSerializer):
    """Pour envoyer les résultats des exercices au backend"""
    class Meta:
        model = ExerciseAttempt
        fields = ['id', 'section', 'success', 'created_at']