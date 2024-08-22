import { BASE_URL } from "@/lib";
import { useState, useEffect } from "react";
import { CustomResult, ExamCategory } from "@/types/exam";
import { University } from "@/components/university";
import LoadingSkeleton from "./loadingSkeleton";

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
                        break;
                    default:
                        console.log("fetching ayt: ", examType);
                        res = await fetch(`${BASE_URL}api/ayt/${examType}?query=${query}`);
                        break;
                }

                if (!res.ok) {
                    setError(true);
                    console.log("There was an error: ", res);
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

    let examTypeText = "";
    if (examType === ExamCategory.SAY) {
        examTypeText = "Sayısal";
    } else if (examType === ExamCategory.SOZ) {
        examTypeText = "Sözel";
    } else if (examType === ExamCategory.EA) {
        examTypeText = "Eşit ağırlık";
    } else if (examType === ExamCategory.DIL) {
        examTypeText = "Dil";
    } else if (examType === ExamCategory.TYT) {
        examTypeText = "TYT";
    } else {
        examTypeText = examType;
    }

    if (error) {
        return <div className="mt-4 text-red-600">Veri yüklenirken hata ile karşılaşıldı.</div>;
    }

    if (!data) {
        return <LoadingSkeleton />;
    }

    if (data.length === 0) {
        return <div className="mt-8 text-green-400">{examTypeText} sınavında oyun sıralamanız ile girebileceğiniz üniversite yok. Tebrik ederim.</div>;
    }

    return (
        <div className="overflow-x-auto mt-8 items-center flex flex-col h-full">
            <span className="font-extrabold text-xl uppercase pb-2">{examTypeText}</span>
            <table className="table-auto border border-slate-900 rounded w-full text-sm text-left rtl:text-right text-gray-300">
                <thead className="text-xs uppercase bg-[#1e1e1e] text-gray-300">
                    <tr>
                        <th scope="col" className="normal-case px-3 py-2 font-bold text-xl">
                            ÜNİVERSİTE
                        </th>
                        <th scope="col" className="capitalize px-3 py-2 font-normal text-xl">
                            bölüm
                        </th>
                        <th scope="col" className="capitalize px-3 py-2 text-left">
                            sıralama 2024
                        </th>
                        <th scope="col" className="capitalize px-3 py-2 text-left">
                            sıralama 2023
                        </th>
                    </tr>
                </thead>
                <tbody className="border-collapse">
                    {data.map((result, index) => (
                        <University key={index} university={result.universityName} className={result.className} classFaculty={result.classFaculty} tbs2023={result.tbs2023} tbs2024={result.tbs2024} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
