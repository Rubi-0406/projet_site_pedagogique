
export default function Navbar() {
  return (
    // J'ajoute une classe de fond (bg-blue-600) au cas où ton CSS navContainer ne le fait pas
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
  );
}