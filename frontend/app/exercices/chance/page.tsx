"use client";

import { useRouter } from 'next/navigation';

export default function ExercicePage() {
  const router = useRouter();

  const content = {
    title: "J'ai de la chance 🍀",
    sections: [
        "Exercice aléatoire 1",
    ]
  };

  return (
    /* h-[calc(100vh-200px)] permet de centrer par rapport à la hauteur restante après la Navbar/Footer */
    /* items-center et justify-center font le travail de centrage */
    <div className="flex flex-col items-center justify-center min-h-[70vh] container mx-auto py-16 px-6 text-center">
      
      <h2 className="text-3xl font-bold mb-4 text-blue-700">{content.title}</h2>
      <p className="mb-10 text-gray-600">Cliquez sur le bouton pour lancer un exercice au hasard :</p>

      {/* mx-auto sur le div des boutons pour s'assurer qu'il reste au milieu */}
      <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
        {content.sections.map((section, index) => (
          <button 
            key={index} 
            className="flex justify-between items-center p-6 bg-white border-2 border-slate-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all group shadow-sm"
          >
            <span className="font-semibold text-lg text-slate-700 group-hover:text-blue-600">
              {section}
            </span>
            <span className="text-blue-500 font-bold text-xl">🎲</span>
          </button>
        ))}
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