from rest_framework import viewsets
from .models import Category, Section
from rest_framework.decorators import action
from rest_framework.response import Response
from .generators import ExerciseGenerator,AnswerGenerator
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


class GetPostExercice(viewsets.ReadOnlyModelViewSet):
    serializer_class = SectionDetailSerializer
    queryset = Section.objects.all()
    lookup_field = 'slug'

    @action(detail=True, methods=['get'])
    def get_exercise(self, request, slug=None):
        section = self.get_object()
        
        generators = {
            'cesar': ExerciseGenerator.generate_cesar
        }
        
        gen_func = generators.get(section.slug)
        if gen_func:
            data = gen_func()
            return Response(data)
        return Response({"error": "Générateur non trouvé"}, status=404)


    @action(detail=True, methods=['post'])
    def check_answer(self, request, slug=None):
        # 1. Récupération sécurisée des données
        user_answer = request.data.get('answer', '').upper().strip()
        params = request.data.get('params') 
        
        # 2. Vérification si params est présent
        if not params or not isinstance(params, dict):
            return Response({"error": "Données 'params' manquantes ou invalides"}, status=400)
        
        word = params.get('word')
        shift = params.get('shift')

        # 3. Vérification des valeurs individuelles
        if word is None or shift is None:
            return Response({"error": "Le mot original ou le décalage est manquant"}, status=400)
        
        # Calcul et comparaison
        correct_word = AnswerGenerator.answer_cesar(word, int(shift))
        
        if user_answer == correct_word:
            return Response({
                "correct": True, 
                "message": "Félicitations ! C'est la bonne réponse."
            })
        else:
            return Response({
                "correct": False, 
                "message": f"Dommage ! La réponse était {correct_word}."
            })