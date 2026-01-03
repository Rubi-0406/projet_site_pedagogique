//page.tsx

"use client"; // Obligatoire car on utilise du state
import { useEffect, useState } from "react";
import Link from "next/link";



interface Category {
  id: number;
  name: string;
  icon: string;
  slug: string;
  chapter_num: number;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Appel à ton API Django
    fetch(`${apiUrl}/api/get_category/`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des catégories:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-center">Chargement des cours...</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <main className="container mx-auto py-16 px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="mainTitle">Plateforme de Révision du cours de Mathématique appliqués à l'informatique à EAFC</h2>
          <p className="text-gray-600 text-lg">
            Générez des exercices aléatoires adaptés au programme de bachelier en informatique de gestion.
          </p>
        </div>

        {/* Grille de boutons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <Link href={`/exercices/section_liste?category_id=${cat.id}`} key={index}>
              <div className="mathButton cursor-pointer hover:scale-105 transition-transform">
                Chapitre {cat.chapter_num} <span className="buttonIcon">{cat.icon}</span>
                {cat.name}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}