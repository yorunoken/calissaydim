"use client";
import Header from "@/components/header";
import Universities from "@/components/universities";
import { useState } from "react";
import { CustomResult, ExamCategory } from "@/types/exam";
import { fetchRankDetails } from "@/lib/valorant";
import LoadingSkeleton from "@/components/loadingSkeleton";
import Rating from "@/components/rating";
import CustomDropdown from "@/components/customDropdown";
import { fetchUniversities } from "@/lib/fetchUniversities";

const valorantRanks = [
    "Iron 1",
    "Iron 2",
    "Iron 3",
    "Bronze 1",
    "Bronze 2",
    "Bronze 3",
    "Silver 1",
    "Silver 2",
    "Silver 3",
    "Gold 1",
    "Gold 2",
    "Gold 3",
    "Platinum 1",
    "Platinum 2",
    "Platinum 3",
    "Diamond 1",
    "Diamond 2",
    "Diamond 3",
    "Immortal 1",
    "Immortal 2",
    "Immortal 3",
    "Radiant",
];

export default function Valorant() {
    const [rank, setRank] = useState<string | null>(null);
    const [warning, setWarning] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [dataLoaded, setDataLoaded] = useState<boolean>(false);
    const [universitiesData, setUniversitiesData] = useState<Record<ExamCategory, Array<CustomResult>>>({} as Record<ExamCategory, Array<CustomResult>>);

    const game = "valorant";

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!rank) {
            setWarning("Lütfen rankınızı seçin.");
            return;
        }

        setLoading(true);

        const data = await fetchRankDetails(rank.replace(" ", ""));

        if (!data) {
            setWarning("Bir şeyler yanlış gitti. Lütfen tekrar deneyin.");
            setLoading(false);

            return;
        }

        setWarning(null);

        const allUniversitiesData = await fetchUniversities(data.estimate_rank);
        setUniversitiesData(allUniversitiesData);

        setDataLoaded(true);
        setLoading(false);
    }

    return (
        <section className="w-full">
            <Header activeGame="valorant" />
            <div className="bg-[#292929] flex min-h-screen flex-col items-center">
                <div className="flex flex-col text-center mb-6 mx-6">
                    <span className="text-4xl mt-8 pb-5">
                        <span className="font-bold italic pr-2">YKS Çalışsaydım </span>
                        <span className="font-normal">ne kazanırdım?</span>
                    </span>
                    <span className="text-xl pb-1">
                        <span className="text-rose-600 font-bold">Valorant</span> oynamak yerine ders çalışsaydınız hangi üniversiteleri kazanırdınız?
                    </span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex gap-2">
                        <CustomDropdown options={valorantRanks} onChange={setRank} placeholder="Rank seçiniz" />
                        <button
                            type="submit"
                            className="px-4 py-1 bg-[#61dafb] text-[#1e1e1e] font-semibold rounded-md hover:bg-[#4fa8c7] focus:outline-none focus:ring-2 focus:ring-[#61dafb] transition duration-200"
                        >
                            Üniversite ara
                        </button>
                    </div>
                </form>
                {warning && <div className="text-red-500 text-sm mt-1">{warning}</div>}
                {loading && (
                    <>
                        <div className="grid gap-4 px-24 mx-auto">
                            <div className="grid grid-cols-2 gap-4">
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <LoadingSkeleton key={index} />
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col mt-4 justify-center mb-12">
                            <LoadingSkeleton />
                        </div>
                    </>
                )}
                {dataLoaded && (
                    <>
                        <div className="grid gap-2 px-4 mx-auto">
                            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
                                <Universities examType={ExamCategory.SAY} data={universitiesData[ExamCategory.SAY]} />
                                <Universities examType={ExamCategory.EA} data={universitiesData[ExamCategory.EA]} />
                                <Universities examType={ExamCategory.DIL} data={universitiesData[ExamCategory.DIL]} />
                                <Universities examType={ExamCategory.SOZ} data={universitiesData[ExamCategory.SOZ]} />
                            </div>
                        </div>
                        <div className="flex flex-col px-4 mt-4 justify-center mb-12">
                            <Universities examType={ExamCategory.TYT} data={universitiesData[ExamCategory.TYT]} />
                            <Rating game={game} />
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
