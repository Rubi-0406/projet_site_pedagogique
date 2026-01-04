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
        # On récupère les données du JSON envoyé
        data = request.data
        user_answer = data.get('answer', '').upper().strip()
        word = data.get('word')
        shift = data.get('shift')

        # Validation de sécurité
        if not word or shift is None:
            return Response({"error": "Champs 'word' et 'shift' requis"}, status=400)

        try:
            # Calcul de la réponse attendue côté serveur
            correct_word, steps = AnswerGenerator.answer_cesar(word, int(shift))
            
            is_correct = (user_answer == correct_word)
            
            return Response({
                "correct": is_correct, 
                "message": "✅ Correct !" if is_correct else f"❌ Incorrect. La réponse était {correct_word}",
                "explanation": steps 
            })
        except Exception as e:
            # Capture l'erreur précise pour le debug
            return Response({"error": str(e)}, status=500)