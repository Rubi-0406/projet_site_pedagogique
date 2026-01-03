"use client";

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ExercicePage() {
  const router = useRouter();

  // On transforme les strings en objets avec des slugs pour les URLs
  const content = {
    title: "Sécurité Informatique 🛡️",
    sections: [
        { name: "Chiffrement César", slug: "cesar" },  
        { name: "Chiffrement de Vigenère", slug: "vigenere" }, 
        { name: "Indice de coïncidence (IC)", slug: "ic" }, 
        { name: "Cryptographie symétrique: AES", slug: "aes" }, 
        { name: "Cryptographie asymétrique: RSA", slug: "rsa" }, 
        { name: "J'ai de la chance", slug: "chance" }, 
    ]
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] container mx-auto py-16 px-6 text-center">
      <h2 className="text-3xl font-bold mb-4 text-blue-700">{content.title}</h2>
      <p className="mb-10 text-gray-600">Choisissez une section pour commencer les exercices :</p>

      <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
        {content.sections.map((section, index) => {
          const isLucky = section.slug === "chance";
          
          return (
            /* On utilise Link pour la navigation */
            /* L'URL sera : /exercices/securite/cesar, etc. */
            <Link href={`/exercices/securite/${section.slug}`} key={index}>
              <div className="flex justify-between items-center p-6 bg-white border-2 border-slate-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all group shadow-sm cursor-pointer">
                <span className="font-semibold text-lg text-slate-700 group-hover:text-blue-600">
                  {section.name}
                </span>
                <span className="text-blue-500 font-bold text-xl group-hover:translate-x-1 transition-transform">
                  {isLucky ? "🎲" : "→"}
                </span>
              </div>
            </Link>
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