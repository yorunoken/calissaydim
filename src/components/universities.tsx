import { useState, useEffect } from "react";
import { CustomResult, ExamCategory } from "@/types/exam";
import { University } from "@/components/university";
import LoadingSkeleton from "./loadingSkeleton";

async function getExamData({ examType, query }: { examType: ExamCategory; query: string }): Promise<[any, true | null]> {
    let res;
    switch (examType) {
        case ExamCategory.TYT:
            console.log("fetching tyt");
            res = await fetch(`/api/proxy/${examType}?query=${query}`);
            break;
        default:
            console.log("fetching ayt: ", examType);
            res = await fetch(`/api/proxy/ayt/${examType}?query=${query}`);
            break;
    }

    if (!res.ok) {
        console.log("There was an error: ", res);
        return [null, true];
    }

    const resultData = await res.json();

    return [resultData, null];
}

export default function Universities({ ranking, examType }: { ranking: number; examType: ExamCategory }) {
    const [data, setData] = useState<Array<CustomResult> | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            let query = `WHERE CAST(tbs_2024 AS INTEGER) >= ${ranking} ORDER BY CAST(tbs_2024 AS INTEGER) ASC LIMIT 5;`;

            let resultData = await getExamData({ examType, query });
            if (!resultData) {
                let query = `WHERE base_score_2024 IS NULL ORDER BY RANDOM() LIMIT 5;`;
                resultData = await getExamData({ examType, query });
            }

            if (!resultData) {
                setError(true);
                return;
            }

            const [data] = resultData;

            const mappedResults: Array<CustomResult> = data.map((result: any) => ({
                universityName: result.university_name ?? "",
                classFaculty: result.faculty ?? "",
                className: result.class_name ?? "",
                tbs2024: (Number(result.tbs_2024) || "-").toLocaleString(),
            }));

            setData(mappedResults);
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
                    </tr>
                </thead>
                <tbody className="border-collapse">
                    {data.map((result, index) => (
                        <University key={index} university={result.universityName} className={result.className} classFaculty={result.classFaculty} tbs2024={result.tbs2024} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
