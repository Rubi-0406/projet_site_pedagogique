"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

// On définit l'interface pour matcher ton nouveau JSON imbriqué
interface Section {
    id: number;
    section_num: number;
    name: string;
    icon: string;
    slug: string;
    category: {
        id: number;
        name: string;
        icon: string;
        chapter_num: number;
    };
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

export default function ExercicePage() {
    const router = useRouter();
    const [sections, setSections] = useState<Section[]>([]);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const categoryId = searchParams.get("category_id");
    useEffect(() => {
        // Appel à l'API filtrée par catégorie
        fetch(`${apiUrl}/api/get_section/?category_id=${categoryId}`)
            .then((res) => res.json())
            .then((data: Section[]) => {
                setSections(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erreur:", error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="p-8 text-center">Chargement...</div>;
    if (sections.length === 0) return <div className="p-8 text-center">Aucune section trouvée.</div>;

    // Puisque toutes les sections ont la même catégorie (filtrage id=5), 
    // on récupère les infos de la catégorie depuis la première section.
    const categoryInfo = sections[0].category;

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] container mx-auto py-16 px-6 text-center">
            <h1 className="text-5xl font-bold mb-4 text-blue-700">
                Chapitre {categoryInfo.chapter_num}
            </h1>
            
            <h2 className="text-3xl font-bold mb-4 text-blue-700">
                {categoryInfo.icon} {categoryInfo.name}
            </h2>
            <p className="mb-10 text-gray-600">Choisissez une section pour commencer :</p>

            <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
                {sections.map((section) => (
                    <Link href={`/exercices/${categoryInfo.id}/${section.slug}`} key={section.id}>
                        <div className="flex justify-between items-center p-6 bg-white border-2 border-slate-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all group shadow-sm cursor-pointer">
                            <span className="font-semibold text-lg text-slate-700 group-hover:text-blue-600">
                                {section.section_num}. {section.name}
                            </span>
                            <span className="text-blue-500 font-bold text-xl group-hover:translate-x-1 transition-transform">
                                {section.icon}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>

            <button
                onClick={() => router.back()}
                className="mt-12 text-gray-400 hover:text-blue-600 transition flex items-center gap-2"
            >
                <span>←</span> Retour aux catégories
            </button>
        </div>
    );
}