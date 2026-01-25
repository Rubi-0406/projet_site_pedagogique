import Link from "next/link"; // N'oublie pas l'import !

export default function Navbar() {
  return (
    <nav className="navContainer">
      <div className="container mx-auto flex justify-between items-center text-white">
        
        {/* Logo enveloppé dans un Link */}
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <span className="text-2xl group-hover:scale-110 transition-transform">
            🎓
          </span>
          <h1 className="text-xl font-bold tracking-wider group-hover:text-blue-200 transition-colors">
            Maths appliqués à l'informatique
          </h1>
        </Link>

        <ul className="hidden md:flex gap-8 font-medium">
          <li className="hover:text-blue-200 cursor-pointer transition">
            <Link href="/">Cours</Link>
          </li>
          <li className="hover:text-blue-200 cursor-pointer transition">
            <Link href="/">Exercices</Link>
          </li>
          <li className="bg-white text-blue-600 px-4 py-1 rounded-full text-sm cursor-pointer hover:bg-blue-50 transition">
            Mon Compte
          </li>
        </ul>
      </div>
    </nav>
  );
}