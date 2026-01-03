//page.tsx

import Link from "next/link";

export default function HomePage() {
  const categories = [
  { name: "Théorie des ensembles", icon: "🌀", slug: "ensembles", chapter_num: 1 }, 
  { name: "Logique mathématique", icon: "🧠", slug: "logique", chapter_num: 2 }, 
  { name: "Algèbre linéaire", icon: "🔢", slug: "algebre", chapter_num: 3 },     
  { name: "Théorie des graphes", icon: "🕸️", slug: "graphes", chapter_num: 4 },  
  { name: "Sécurité informatique", icon: "🛡️", slug: "securite", chapter_num: 5 },  
  { name: "J'ai de la chance (exo aléatoire)", icon: "🍀", slug: "chance", chapter_num: 6 }  
];

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
            <Link href={`/exercices/${cat.slug}`} key={index}>
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