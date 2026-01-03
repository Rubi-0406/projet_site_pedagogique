"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CesarExercise() {
  const router = useRouter();
  
  // États pour l'exercice
  const [word, setWord] = useState("");
  const [shift, setShift] = useState(0);
  const [userResponse, setUserResponse] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const wordsList = ["SECURITE", "RESEAU", "CRYPTO", "ALGORITHME", "DONNEES", "VULNERABILITE", "CLEF"];

  // Fonction pour générer un exercice
  const generateExercise = () => {
    const randomWord = wordsList[Math.floor(Math.random() * wordsList.length)];
    const randomShift = Math.floor(Math.random() * 11) - 5; // Entre -5 et +5
    setWord(randomWord);
    setShift(randomShift === 0 ? 3 : randomShift); // Éviter un décalage de 0
    setUserResponse("");
    setShowResult(false);
  };

  // Générer le premier exercice au chargement
  useEffect(() => {
    generateExercise();
  }, []);

  // Fonction de chiffrement pour la correction
  const encryptCesar = (text: string, s: number) => {
    return text
      .split("")
      .map((char) => {
        const code = char.charCodeAt(0);
        // On gère uniquement les majuscules A-Z (65-90)
        let shifted = ((code - 65 + s) % 26);
        if (shifted < 0) shifted += 26; // Gérer les décalages négatifs
        return String.fromCharCode(shifted + 65);
      })
      .join("");
  };

  const checkAnswer = () => {
    const correctAnswer = encryptCesar(word, shift);
    setIsCorrect(userResponse.toUpperCase().trim() === correctAnswer);
    setShowResult(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] container mx-auto p-6 text-center">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">Chiffrement de César 🔐</h2>

      <div className="bg-white p-8 rounded-3xl shadow-xl border-2 border-slate-100 max-w-lg w-full">
        <p className="text-lg mb-4">
          Chiffre le mot suivant avec un décalage de <span className="font-bold text-blue-600">{shift > 0 ? `+${shift}` : shift}</span> :
        </p>
        <p className="text-4xl font-mono font-black tracking-widest mb-8 text-slate-800">
          {word}
        </p>

        <input
          type="text"
          value={userResponse}
          onChange={(e) => setUserResponse(e.target.value)}
          placeholder="Ta réponse ici..."
          className="w-full p-4 border-2 border-slate-200 rounded-xl mb-4 text-center text-xl uppercase focus:border-blue-500 outline-none transition"
        />

        <button
          onClick={checkAnswer}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition"
        >
          Vérifier la réponse
        </button>

        {showResult && (
          <div className={`mt-6 p-4 rounded-xl text-left ${isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            <p className="font-bold text-lg mb-2">
              {isCorrect ? "✅ Bravo ! C'est correct." : "❌ Dommage, ce n'est pas ça."}
            </p>
            <div className="text-sm">
              <p className="font-semibold underline">Explication :</p>
              <ul className="list-disc ml-5 mt-2">
                {word.split("").map((letter, i) => (
                  <li key={i}>{letter} → {encryptCesar(letter, shift)}</li>
                ))}
              </ul>
              <p className="mt-2 font-bold">Le mot final était : {encryptCesar(word, shift)}</p>
            </div>
          </div>
        )}

        <button
          onClick={generateExercise}
          className="mt-6 text-blue-600 font-medium hover:underline"
        >
          Générer un autre mot 🎲
        </button>
      </div>

      <button onClick={() => router.back()} className="mt-10 text-gray-400 flex items-center gap-2">
        ← Retour
      </button>
    </div>
  );
}