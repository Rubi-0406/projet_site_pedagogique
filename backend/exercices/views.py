from rest_framework import viewsets
from .models import Category, Section
from .serializers import CategorySerializer, SectionDetailSerializer

class GetCategory(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all().order_by('chapter_num')
    serializer_class = CategorySerializer

class GetSection(viewsets.ReadOnlyModelViewSet):
    serializer_class = SectionDetailSerializer

    def get_queryset(self):
        queryset = Section.objects.select_related('category').all().order_by('section_num')
        
        category_id = self.request.query_params.get('category_id')
        if category_id is not None:
            queryset = queryset.filter(category_id=category_id)
            
        return queryset
    