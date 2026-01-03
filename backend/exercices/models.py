from django.db import models

class Category(models.Model):
    chapter_num = models.IntegerField(default=0)
    name = models.CharField(max_length=100) # ex: Sécurité informatique
    icon = models.CharField(max_length=10)   # ex: 🛡️
    slug = models.SlugField(unique=True)     # ex: securite

    def __str__(self):
        return self.name

class Section(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='sections')
    name = models.CharField(max_length=100) # ex: Chiffrement César
    slug = models.SlugField()
    order = models.IntegerField(default=0)
    
    # Pour la partie théorie
    theory_content = models.TextField(blank=True) # Texte en Markdown
    python_example = models.TextField(blank=True) # Bloc de code python

    def __str__(self):
        return f"{self.category.name} - {self.name}"

class ExerciseAttempt(models.Model):
    # Utile si vous voulez des stats (même sans compte élève, pour l'admin)
    section = models.ForeignKey(Section, on_delete=models.CASCADE)
    success = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)