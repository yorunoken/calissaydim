import { BASE_URL } from "@/lib";
import { useState, useEffect } from "react";
import { CustomResult, ExamCategory } from "@/types/exam";
import { University } from "@/components/university";
import Rating from "./rating";

export default function Universities({ ranking, examType }: { ranking: number; examType: ExamCategory }) {
    const [data, setData] = useState<Array<CustomResult> | null>(null);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        async function fetchData() {
            const query = `WHERE CAST(tbs_2024 AS INTEGER) >= ${ranking} ORDER BY CAST(tbs_2024 AS INTEGER) ASC LIMIT 5;`;

            try {
                let res;
                switch (examType) {
                    case ExamCategory.TYT:
                        console.log("fetching tyt");
                        res = await fetch(`${BASE_URL}api/${examType}?query=${query}`);
                        console.log(res);
                        break;
                    default:
                        res = await fetch(`${BASE_URL}api/ayt/${examType}?query=${query}`);
                        break;
                }

                if (!res.ok) {
                    setError(true);
                    console.log(`There was an error: ${res}`);
                    return;
                }

                const resultData = await res.json();

                const mappedResults: Array<CustomResult> = resultData.map((result: any) => ({
                    universityName: result.university_name ?? "",
                    classFaculty: result.faculty ?? "",
                    className: result.class_name ?? "",
                    tbs2023: (Number(result.tbs_2023) || "-").toLocaleString(),
                    tbs2024: (Number(result.tbs_2024) || "-").toLocaleString(),
                }));

                setData(mappedResults);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(true);
            }
        }

        fetchData();
    }, [ranking, examType]);

    if (error) {
        return <div className="mt-4 text-red-600">Veri yüklenirken hata ile karşılaşıldı.</div>;
    }

    if (!data) {
        return <div className="mt-4 text-red-600">Loading...</div>;
    }

    if (data.length === 0) {
        return <div className="mt-4 text-red-600">Profil verisi bulunamadı. osu!standard modunda aktif olduğunuzdan emin olun.</div>;
    }

    return (
        <div className="relative overflow-x-auto mt-8">
            <table className="table-auto border border-slate-900 rounded w-full text-sm text-left rtl:text-right text-gray-300">
                <thead className="text-xs uppercase bg-[#1e1e1e] text-gray-300">
                    <tr>
                        <th scope="col" className="normal-case px-3 py-2 font-bold text-xl">
                            ÜNİVERSİTE
                        </th>
                        <th scope="col" className="normal-case px-3 py-2 font-normal text-xl">
                            Bölüm
                        </th>
                        <th scope="col" className="normal-case px-3 py-2 text-l">
                            Sıralama 2024
                        </th>
                        <th scope="col" className="normal-case px-3 py-2 text-l">
                            Sıralama 2023
                        </th>
                    </tr>
                </thead>
                {/* tbody içine HTML constructor yazılacak */}
                <tbody className="border-collapse">
                    {data.map((result, index) => (
                        <University key={index} university={result.universityName} className={result.className} classFaculty={result.classFaculty} tbs2023={result.tbs2023} tbs2024={result.tbs2024} />
                    ))}
                </tbody>
            </table>
            <Rating />
        </div>
    );
}
