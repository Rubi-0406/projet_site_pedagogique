from rest_framework import viewsets
from .models import Category, Section
from .serializers import CategorySerializer, SectionDetailSerializer

class GetCategory(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all().order_by('chapter_num')
    serializer_class = CategorySerializer

class GetSection(viewsets.ReadOnlyModelViewSet):
    serializer_class = SectionDetailSerializer

    def get_queryset(self):
        # 1. On utilise 'category' (le nom dans models.py) pour le select_related
        queryset = Section.objects.select_related('category').all().order_by('section_num')
        
        # 2. On récupère le paramètre dans l'URL (ex: ?category_id=1)
        category_id = self.request.query_params.get('category_id')
        
        if category_id is not None:
            # 3. On filtre sur le champ 'category_id' du modèle
            queryset = queryset.filter(category_id=category_id)

        return queryset