import { CustomResult, ExamCategory } from "@/types/exam";
import { University } from "@/components/university";
import LoadingSkeleton from "./loadingSkeleton";

export default function Universities({ examType, data }: { examType: ExamCategory; data: Array<CustomResult> | undefined }) {
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
