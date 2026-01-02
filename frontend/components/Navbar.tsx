export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between">
      <h1 className="text-lg font-bold">Maths IG</h1>
      <ul className="flex gap-4">
        <li className="cursor-pointer hover:underline">Accueil</li>
        <li className="cursor-pointer hover:underline">Exercices</li>
        <li className="cursor-pointer hover:underline">Solutions</li>
      </ul>
    </nav>
  );
}
