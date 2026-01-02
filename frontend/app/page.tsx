// pages/index.js

export default function HomePage() {
  const categories = [
  { name: "Théorie des ensembles", icon: "🌀" }, 
  { name: "Logique mathématiques", icon: "🧠" }, 
  { name: "Algèbre linéaire", icon: "🔢" },     
  { name: "Théorie des graphes", icon: "🕸️" },  
  { name: "Sécurité informatique", icon: "🛡️" }  
];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation avec classe CSS Module */}
      <nav className="navContainer">
        <div className="container mx-auto flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎓</span>
            <h1 className="text-xl font-bold tracking-wider">Maths appliqués à l'informatique</h1>
          </div>
          <ul className="hidden md:flex gap-8 font-medium">
            <li className="hover:text-blue-200 cursor-pointer transition">Cours</li>
            <li className="hover:text-blue-200 cursor-pointer transition">Exercices</li>
            <li className="bg-white text-blue-600 px-4 py-1 rounded-full text-sm">Mon Compte</li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto py-16 px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="mainTitle">Plateforme de Révision du cour de Mathématique appliqués à l'informatique à EAFC</h2>
          <p className="text-gray-600 text-lg">
            Générez des exercices aléatoires adaptés au programme de bachelier en informatique de gestion.
          </p>
        </div>

        {/* Grille de boutons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((cat, index) => (
            <button key={index} className="mathButton">
              <span className="buttonIcon">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </main>

      {/* Petit footer simple */}
      <footer className="mt-20 py-8 border-t border-gray-200 text-center text-gray-400 text-sm">
        © 2026 Maths appliqués à l'informatique - Bachelier Informatique de Gestion EAFC Evere
      </footer>
    </div>
  );
}