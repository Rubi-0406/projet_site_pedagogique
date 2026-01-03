"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ICExercise() {
    const router = useRouter();

    const [word, setWord] = useState("");
    const [userResponse, setUserResponse] = useState("");
    const [showResult, setShowResult] = useState(false);

    const wordsList = ["COMMUNICATION", "INFORMATIQUE", "ALGORITHME", "CRYPTOGRAPHIE", "SECURITE", "RESEAUX"];

    const generateExercise = () => {
        const randomWord = wordsList[Math.floor(Math.random() * wordsList.length)];
        setWord(randomWord);
        setUserResponse("");
        setShowResult(false);
    };

    useEffect(() => {
        generateExercise();
    }, []);

    // Logique de calcul de l'IC
    const calculateIC = (text: string) => {
        const n = text.length;
        const frequencies: { [key: string]: number } = {};

        // Compter les occurrences
        for (const char of text) {
            frequencies[char] = (frequencies[char] || 0) + 1;
        }

        // Calculer la somme des ni(ni-1)
        let sumNi = 0;
        const details = Object.entries(frequencies).map(([char, count]) => {
            const val = count * (count - 1);
            sumNi += val;
            return { char, count, val };
        });

        const denominator = n * (n - 1);
        const ic = sumNi / denominator;

        return { n, sumNi, denominator, ic, details };
    };

    const results = calculateIC(word);

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] container mx-auto p-6 text-center">
            <h2 className="text-3xl font-bold mb-6 text-blue-700">Indice de Coïncidence (IC) 📊</h2>

            <div className="bg-white p-8 rounded-3xl shadow-xl border-2 border-slate-100 max-w-2xl w-full">
                <p className="text-gray-600 mb-2 font-medium">Calculez l'IC du mot suivant :</p>
                <p className="text-4xl font-mono font-black tracking-[0.2em] mb-8 bg-slate-50 py-4 rounded-xl border border-dashed border-slate-300">
                    {word}
                </p>

                <div className="flex flex-col gap-4 mb-6">
                    <label className="text-left text-sm font-bold text-slate-500 uppercase">Ta réponse (format 0.000) :</label>
                    <input
                        type="number"
                        step="0.001"
                        value={userResponse}
                        onChange={(e) => setUserResponse(e.target.value)}
                        placeholder="Ex: 0.064"
                        className="w-full p-4 border-2 border-slate-200 rounded-xl text-center text-xl focus:border-blue-500 outline-none transition"
                    />
                </div>

                <button
                    onClick={() => setShowResult(true)}
                    className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition"
                >
                    Vérifier et voir le développement
                </button>

                {showResult && (
                    <div className="mt-8 p-6 bg-slate-50 rounded-2xl text-left border border-slate-200">
                        <h3 className="font-bold text-lg mb-4 text-slate-800 underline">Développement :</h3>

                        <p className="mb-4 font-mono"><strong>N = {results.n}</strong> (Nombre de lettres)</p>

                        <p className="font-bold mb-2">Fréquences :</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
                            {results.details.map((item, i) => (
                                <div key={i} className="text-sm p-2 bg-white rounded border border-slate-100">
                                    <span className="font-bold">{item.char}</span> = {item.count}
                                    <span className="text-slate-400 text-xs ml-2">({item.count}×{item.count - 1} = {item.val})</span>
                                </div>
                            ))}
                        </div>

                        <div className="font-mono bg-white p-4 rounded-xl border border-slate-200">
                            <p>Somme n<sub>i</sub>(n<sub>i</sub>-1) = <strong>{results.sumNi}</strong></p>
                            <p>Dénominateur N(N-1) = {results.n} × {results.n - 1} = <strong>{results.denominator}</strong></p>

                            <div className="flex items-center gap-2 mt-4 py-2 border-t border-slate-100">
                                <span className="text-lg">IC =</span>
                                <div className="flex flex-col items-center px-2">
                                    <span className="border-b border-slate-800 px-2">{results.sumNi}</span>
                                    <span>{results.denominator}</span>
                                </div>
                                <span className="text-lg">≈</span>
                                <span className="text-blue-600 font-bold text-2xl">{results.ic.toFixed(3)}</span>
                            </div>
                        </div>

                        <div className="mt-4 text-xs text-gray-500 italic">
                            Note : Un IC proche de 0.067 indique une langue naturelle (français), un IC proche de 0.038 indique un texte aléatoire (chiffré).
                        </div>
                    </div>
                )}

                <button onClick={generateExercise} className="mt-6 text-blue-600 font-medium hover:underline flex items-center justify-center gap-2 mx-auto">
                    Générer un autre mot 🎲
                </button>
            </div>

            <button onClick={() => router.back()} className="mt-10 text-gray-400 flex items-center gap-2 hover:text-blue-600 transition">
                ← Retour aux exercices
            </button>
        </div>
    );
}