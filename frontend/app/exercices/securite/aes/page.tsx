"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AESExercise() {
  const router = useRouter();

  // États de l'exercice
  const [stateMatrix, setStateMatrix] = useState<string[][]>([]);
  const [subKey, setSubKey] = useState<string[][]>([]);
  const [step, setStep] = useState(0); 

  // Fonction pour générer des données hexadécimales aléatoires
  const generateHex = () => Math.floor(Math.random() * 255).toString(16).toUpperCase().padStart(2, '0');

  const generateExercise = () => {
    const matrix = Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => generateHex()));
    const key = Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => generateHex()));
    setStateMatrix(matrix);
    setSubKey(key);
    setStep(0);
  };

  useEffect(() => {
    generateExercise();
  }, []);

  // --- LOGIQUE AES SIMPLIFIÉE ---

  // 1. AddRoundKey
  const getAddRoundKey = () => {
    return stateMatrix.map((row, i) =>
      row.map((val, j) => {
        const res = parseInt(val, 16) ^ parseInt(subKey[i][j], 16);
        return res.toString(16).toUpperCase().padStart(2, '0');
      })
    );
  };

  // 2. SubBytes (x + 1)
  const getSubBytes = (matrix: string[][]) => {
    return matrix.map(row =>
      row.map(val => {
        const res = (parseInt(val, 16) + 1) % 256;
        return res.toString(16).toUpperCase().padStart(2, '0');
      })
    );
  };

  // 3. ShiftRows
  const getShiftRows = (matrix: string[][]) => {
    return matrix.map((row, i) => {
      const newRow = [...row];
      for (let s = 0; s < i; s++) {
        newRow.push(newRow.shift()!);
      }
      return newRow;
    });
  };

// 4. MixColumns (Sécurisée contre le rendu initial vide)
  const getMixColumns = (matrix: string[][]) => {
    // Si la matrice n'est pas encore générée, on retourne une matrice vide par défaut
    if (!matrix || matrix.length === 0) {
      return Array.from({ length: 4 }, () => Array(4).fill("00"));
    }

    const M = [
      [2, 3, 1, 1],
      [1, 2, 3, 1],
      [1, 1, 2, 3],
      [3, 1, 1, 2]
    ];
    let result = Array.from({ length: 4 }, () => Array(4).fill("00"));

    for (let c = 0; c < 4; c++) {
      for (let r = 0; r < 4; r++) {
        let sum = 0;
        for (let i = 0; i < 4; i++) {
          // Sécurité supplémentaire sur l'accès aux index
          const hexVal = matrix[i] && matrix[i][c] ? matrix[i][c] : "00";
          sum += M[r][i] * parseInt(hexVal, 16);
        }
        result[r][c] = (sum % 256).toString(16).toUpperCase().padStart(2, '0');
      }
    }
    return result;
  };

  // Affichage d'une matrice
  const MatrixDisplay = ({ data, title, color }: { data: string[][], title: string, color: string }) => (
    <div className="flex flex-col items-center p-4">
      <h4 className={`text-sm font-bold mb-2 uppercase ${color}`}>{title}</h4>
      <div className="grid grid-cols-4 gap-2 bg-slate-100 p-2 rounded-lg border border-slate-200 font-mono text-xs">
        {data.map((row, i) => row.map((val, j) => (
          <div key={`${i}-${j}`} className="w-10 h-10 flex items-center justify-center bg-white border border-slate-300 rounded shadow-sm">
            {val}
          </div>
        )))}
      </div>
    </div>
  );

  // Calculs intermédiaires pour l'affichage
  const ark = getAddRoundKey();
  const sb = getSubBytes(ark);
  const sr = getShiftRows(sb);
  const mc = getMixColumns(sr); // Définition de mc pour le JSX

  return (
    <div className="flex flex-col items-center justify-center min-h-screen container mx-auto p-6 text-center">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">AES : Tour Complet (Simplifié) 🔑</h2>

      <div className="bg-white p-8 rounded-3xl shadow-xl border-2 border-slate-100 max-w-5xl w-full">
        
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          <MatrixDisplay data={stateMatrix} title="Bloc Initial (State)" color="text-slate-600" />
          <div className="flex items-center text-2xl font-bold text-slate-400">⊕</div>
          <MatrixDisplay data={subKey} title="Sous-Clé" color="text-purple-600" />
        </div>

        <div className="space-y-6">
          {/* ÉTAPE 1 */}
          <section className="border-t pt-6">
            <button onClick={() => setStep(1)} className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
              1. Voir AddRoundKey (XOR)
            </button>
            {step >= 1 && (
              <div className="mt-4 flex flex-col items-center animate-fadeIn">
                 <MatrixDisplay data={ark} title="Résultat AddRoundKey" color="text-blue-600" />
              </div>
            )}
          </section>

          {/* ÉTAPE 2 */}
          {step >= 1 && (
            <section className="border-t pt-6">
              <button onClick={() => setStep(2)} className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition">
                2. Voir SubBytes (x + 1)
              </button>
              {step >= 2 && (
                <div className="mt-4 flex flex-col items-center">
                   <MatrixDisplay data={sb} title="Résultat SubBytes" color="text-green-600" />
                </div>
              )}
            </section>
          )}

          {/* ÉTAPE 3 */}
          {step >= 2 && (
            <section className="border-t pt-6">
              <button onClick={() => setStep(3)} className="bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition">
                3. Voir ShiftRows
              </button>
              {step >= 3 && (
                <div className="mt-4 flex flex-col items-center">
                   <MatrixDisplay data={sr} title="Résultat ShiftRows" color="text-amber-600" />
                </div>
              )}
            </section>
          )}
          
          {/* ÉTAPE 4 */}
          {step >= 3 && (
            <section className="border-t pt-6">
              <button onClick={() => setStep(4)} className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition">
                4. Voir MixColumns (Mélange des colonnes)
              </button>
              {step >= 4 && (
                <div className="mt-4 flex flex-col items-center">
                   <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border">
                      <div className="text-[10px] font-mono text-gray-500 leading-tight">
                          [2 3 1 1]<br/>
                          [1 2 3 1]<br/>
                          [1 1 2 3]<br/>
                          [3 1 1 2]
                      </div>
                      <div className="text-xl">×</div>
                      <MatrixDisplay data={sr} title="State" color="text-amber-600" />
                      <div className="text-xl">=</div>
                      <MatrixDisplay data={mc} title="Résultat Final" color="text-red-600" />
                   </div>
                   <div className="mt-4 max-w-md text-left text-xs text-gray-600 bg-white p-4 rounded border">
                      <p className="font-bold mb-2 underline">Exemple pour la 1ère colonne (C0) :</p>
                      <p>L0 = (2 × {sr[0][0]}) + (3 × {sr[1][0]}) + (1 × {sr[2][0]}) + (1 × {sr[3][0]}) mod 256</p>
                   </div>
                </div>
              )}
            </section>
          )}
        </div>

        <button onClick={generateExercise} className="mt-12 bg-slate-800 text-white px-8 py-3 rounded-xl hover:bg-slate-900 transition flex items-center gap-2 mx-auto">
           Nouvel exercice complet 🎲
        </button>
      </div>

      <button onClick={() => router.back()} className="mt-10 text-gray-400 flex items-center gap-2 hover:text-blue-600 transition text-sm">
        ← Retour aux exercices
      </button>
    </div>
  );
}