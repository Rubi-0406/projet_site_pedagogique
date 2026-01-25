"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VigenereExercise() {
  const router = useRouter();

  // États pour l'exercice
  const [message, setMessage] = useState("");
  const [key, setKey] = useState("");
  const [userResponse, setUserResponse] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const wordsList = ["SECURITE", "RESEAU", "DONNEES", "CRYPTO", "TABLEAU", "PROJET"];
  const keysList = ["CLE", "CODE", "INFO", "MATH", "WEB"];

  // Fonction pour générer un exercice
  const generateExercise = () => {
    const randomMessage = wordsList[Math.floor(Math.random() * wordsList.length)];
    const randomKey = keysList[Math.floor(Math.random() * keysList.length)];
    setMessage(randomMessage);
    setKey(randomKey);
    setUserResponse("");
    setShowResult(false);
  };

  useEffect(() => {
    generateExercise();
  }, []);

  // Logique de Vigenère
  const processVigenere = (msg: string, k: string) => {
    const result: { letter: string; keyChar: string; shift: number; res: string }[] = [];
    const msgUpper = msg.toUpperCase();
    const keyUpper = k.toUpperCase();

    for (let i = 0; i < msgUpper.length; i++) {
      const pCode = msgUpper.charCodeAt(i) - 65; // A=0, B=1...
      const kChar = keyUpper[i % keyUpper.length];
      const kCode = kChar.charCodeAt(0) - 65; // Décalage basé sur la clé
      
      const cCode = (pCode + kCode) % 26;
      const cChar = String.fromCharCode(cCode + 65);

      result.push({
        letter: msgUpper[i],
        keyChar: kChar,
        shift: kCode,
        res: cChar
      });
    }
    return result;
  };

  const checkAnswer = () => {
    const detailedResult = processVigenere(message, key);
    const finalResult = detailedResult.map(r => r.res).join("");
    setIsCorrect(userResponse.toUpperCase().trim() === finalResult);
    setShowResult(true);
  };

  const currentDetails = processVigenere(message, key);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] container mx-auto p-6 text-center">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">Chiffre de Vigenère 🛡️</h2>

      <div className="bg-white p-8 rounded-3xl shadow-xl border-2 border-slate-100 max-w-2xl w-full">
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-xl">
            <p className="text-sm text-blue-600 font-bold uppercase">Message</p>
            <p className="text-2xl font-mono font-black">{message}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-xl">
            <p className="text-sm text-purple-600 font-bold uppercase">Clé</p>
            <p className="text-2xl font-mono font-black">{key}</p>
          </div>
        </div>

        <p className="text-gray-600 mb-4">Trouve le message chiffré :</p>

        <input
          type="text"
          value={userResponse}
          onChange={(e) => setUserResponse(e.target.value)}
          placeholder="Réponse attendue..."
          className="w-full p-4 border-2 border-slate-200 rounded-xl mb-4 text-center text-xl uppercase focus:border-blue-500 outline-none transition"
        />

        <button
          onClick={checkAnswer}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition"
        >
          Vérifier la réponse
        </button>

        {showResult && (
          <div className={`mt-6 p-6 rounded-xl text-left ${isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
            <p className={`font-bold text-lg mb-4 ${isCorrect ? "text-green-700" : "text-red-700"}`}>
              {isCorrect ? "✅ Excellent ! C'est parfaitement juste." : "❌ Ce n'est pas correct. Regarde le développement :"}
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-mono border-collapse">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="p-2 text-left">Msg</th>
                    {currentDetails.map((d, i) => <td key={i} className="p-2 text-center font-bold">{d.letter}</td>)}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <th className="p-2 text-left">Clé</th>
                    {currentDetails.map((d, i) => <td key={i} className="p-2 text-center text-purple-600">{d.keyChar}</td>)}
                  </tr>
                  <tr className="border-b border-slate-100">
                    <th className="p-2 text-left">Décal.</th>
                    {currentDetails.map((d, i) => <td key={i} className="p-2 text-center text-gray-400">+{d.shift}</td>)}
                  </tr>
                  <tr className="bg-blue-50">
                    <th className="p-2 text-left">Rés.</th>
                    {currentDetails.map((d, i) => <td key={i} className="p-2 text-center font-bold text-blue-600">{d.res}</td>)}
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-center font-bold text-lg">
              Résultat final : {currentDetails.map(d => d.res).join("")}
            </p>
          </div>
        )}

        <button onClick={generateExercise} className="mt-6 text-blue-600 font-medium hover:underline flex items-center justify-center gap-2 mx-auto">
           Nouveau message 🎲
        </button>
      </div>

      <button onClick={() => router.back()} className="mt-10 text-gray-400 flex items-center gap-2 hover:text-blue-600 transition">
        ← Retour aux exercices
      </button>
    </div>
  );
}