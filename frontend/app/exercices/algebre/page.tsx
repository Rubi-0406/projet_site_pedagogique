"use client"; // Obligatoire dans le dossier /app pour utiliser des hooks comme useRouter

import { useRouter } from 'next/navigation'; // Changement ici : navigation au lieu de router

export default function ExercicePage() {
    const router = useRouter();

    // Puisque tu es dans le dossier spécifique "ensembles", 
    // on définit directement le contenu ici.
    const content = {
        title: "Algèbre linéaire 🔢",
        sections: [
            "Trouver les dimensions",
            "Addition et soustraction de matrices",
            "Compatibilité des matrices pour la multiplication",
            "Multiplication de matrices (matrcielle, Hadamard, sacalaire",
            "Transposition de matrices : .T",
            "Types particuliers de matrices",
            "Déterminant",
            "Matrice inverse",
            "Système d'équations linéaires: Compatibilité",
            "Méthode de substitution / combinaison linéaire (2 équations, 2 inconnues)",
            "Méthode d'élimination de Gauss (2 équations, 2 inconnues)",
            "J'ai de la chance (exercice aléatoire)",
        ]
    };

     return (
    /* h-[calc(100vh-200px)] permet de centrer par rapport à la hauteur restante après la Navbar/Footer */
    /* items-center et justify-center font le travail de centrage */
    <div className="flex flex-col items-center justify-center min-h-[70vh] container mx-auto py-16 px-6 text-center">

      <h2 className="text-3xl font-bold mb-4 text-blue-700">{content.title}</h2>
      <p className="mb-10 text-gray-600">Choisissez une section pour commencer les exercices:</p>

      {/* mx-auto sur le div des boutons pour s'assurer qu'il reste au milieu */}
      <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
        {content.sections.map((section, index) => {
          // On détecte si c'est la section "J'ai de la chance"
          const isLucky = section.includes("chance");

          return (
            <button
              key={index}
              className="flex justify-between items-center p-6 bg-white border-2 border-slate-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all group shadow-sm"
            >
              <span className="font-semibold text-lg text-slate-700 group-hover:text-blue-600">
                {section}
              </span>

              {/* Affichage conditionnel de l'icône */}
              <span className="text-blue-500 font-bold text-xl">
                {isLucky ? "🎲" : "→"}
              </span>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => router.back()}
        className="mt-12 text-gray-400 hover:text-blue-600 transition flex items-center gap-2"
      >
        <span>←</span> Retour aux catégories
      </button>

    </div>
  );
}