from rest_framework import viewsets
from .models import Category, Section
from .serializers import CategorySerializer, SectionSerializer

class GetCategory(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all().order_by('chapter_num')
    serializer_class = CategorySerializer

class SectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer