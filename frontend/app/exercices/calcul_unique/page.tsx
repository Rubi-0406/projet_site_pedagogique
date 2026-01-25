"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

export default function CesarExercise() {
  const router = useRouter();
  
  // États pour l'exercice
  const [exerciseData, setExerciseData] = useState<{ word: string; shift: number ,answer: string} | null>(null);
  const [userResponse, setUserResponse] = useState("");
  const [loading, setLoading] = useState(false);
  
  // États pour le résultat du backend
  const [result, setResult] = useState<{ correct: boolean; message: string, explanation: string[] } | null>(null);

  // 1. Appeler le backend pour générer l'exercice
  const fetchNewExercise = async () => {
    setLoading(true);
    setResult(null);
    setUserResponse("");
    try {
      const res = await fetch(`${apiUrl}/api/get_post_exercice/cesar/get_exercise/`);
      const data = await res.json();
      setExerciseData(data); // Reçoit { word: "...", shift: ... }
    } catch (error) {
      console.error("Erreur lors de la récupération:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewExercise();
  }, []);

  // 2. Envoyer la réponse au backend pour vérification
  const handleCheckAnswer = async () => {
    if (!exerciseData) return;

    try {
      const res = await fetch(`${apiUrl}/api/get_post_exercice/cesar/check_answer/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            answer: userResponse,      // Ce que l'utilisateur a écrit
            word: exerciseData.word,   // Le mot à chiffrer
            shift: exerciseData.shift, // Le décalage utilisé
        }),
      });

      const data = await res.json();
      setResult(data); // Reçoit { correct: boolean, message: "..." }
    } catch (error) {
      console.error("Erreur lors de la vérification:", error);
    }
  };

  if (!exerciseData && loading) return <div className="p-8 text-center">Chargement...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] container mx-auto p-6 text-center">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">Chiffrement de César 🔐</h2>

      <div className="bg-white p-8 rounded-3xl shadow-xl border-2 border-slate-100 max-w-lg w-full">
        {exerciseData && (
          <>
            <p className="text-lg mb-4">
              Chiffre le mot suivant avec un décalage de : 
              <span className="font-bold text-blue-600 ml-2">
                {exerciseData.shift > 0 ? `+${exerciseData.shift}` : exerciseData.shift}
              </span>
            </p>
            <p className="text-4xl font-mono font-black tracking-widest mb-8 text-slate-800">
              {exerciseData.word}
            </p>
          </>
        )}

        <input
          type="text"
          value={userResponse}
          onChange={(e) => setUserResponse(e.target.value)}
          placeholder="Ta réponse ici..."
          className="w-full p-4 border-2 border-slate-200 rounded-xl mb-4 text-center text-xl uppercase focus:border-blue-500 outline-none transition"
        />

        <button
          onClick={handleCheckAnswer}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {loading ? "Vérification..." : "Vérifier la réponse"}
        </button>

{/* Vérification que result existe ET que explanation existe */}
{result && result.explanation && (
  <div className={`mt-6 p-4 rounded-xl text-left ${result.correct ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
    <p className="font-bold text-lg mb-2">
      {result.message}
    </p>
    <div className="mt-4 border-t border-current pt-2">
      <p className="font-semibold underline">Détails du calcul :</p>
      <ul className="grid grid-cols-2 gap-x-4 mt-2 font-mono text-sm">
        {result.explanation.map((step, index) => (
          <li key={index} className="ml-4 list-disc">
            {step}
          </li>
        ))}
      </ul>
    </div>
  </div>
)}

        <button
          onClick={fetchNewExercise}
          className="mt-6 text-blue-600 font-medium hover:underline flex items-center justify-center gap-2 mx-auto"
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