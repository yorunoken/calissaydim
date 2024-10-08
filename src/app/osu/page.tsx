"use client";
import Header from "@/components/header";
import Universities from "@/components/universities";
import { useState } from "react";
import { CustomResult, ExamCategory } from "@/types/exam";
import { fetchUserDetails } from "@/lib/osu";
import LoadingSkeleton from "@/components/loadingSkeleton";
import Rating from "@/components/rating";
import { fetchUniversities } from "@/lib/fetchUniversities";

export default function Osu() {
    const [username, setUsername] = useState("");
    const [warning, setWarning] = useState<string | null>(null);
    const [dataLoaded, setDataLoaded] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [universitiesData, setUniversitiesData] = useState<Record<ExamCategory, Array<CustomResult>>>({} as Record<ExamCategory, Array<CustomResult>>);

    const game = "osu";

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (username.trim() === "") {
            setWarning("Lütfen bir isim girin.");
            return;
        }

        setLoading(true);

        const data = await fetchUserDetails(username);
        if (!data) {
            setWarning("Girdiğiniz isim yanlış. Lütfen tekrar deneyin.");
            setLoading(false);

            return;
        }

        const { rank } = data;

        if (rank === null) {
            setWarning("Sıralama bulunamadı. Sıralamadaki aktifliğinizi kontrol edin.");
            setLoading(false);

            return;
        }

        setUsername(data.username);
        setWarning(null);

        const allUniversitiesData = await fetchUniversities(rank);
        setUniversitiesData(allUniversitiesData);

        setDataLoaded(true);

        setLoading(false);
    }

    return (
        <section className="w-full">
            <Header activeGame="osu" />
            <div className="bg-[#292929] flex min-h-screen flex-col items-center">
                <div className="flex flex-col text-center mb-6 mx-6">
                    <span className="text-4xl mt-8 pb-5">
                        <span className="font-bold italic pr-2">YKS Çalışsaydım </span>
                        <span className="font-normal">ne kazanırdım?</span>
                    </span>
                    <span className="text-xl pb-1">
                        <span className="text-pink-300 font-bold">osu!</span> oynamak yerine ders çalışsaydınız hangi üniversiteleri kazanırdınız?
                    </span>
                </div>
                <form onSubmit={handleSubmit} className="mx-6">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="osu! isminizi giriniz"
                            className="flex-grow px-4 py-2 bg-[#1e1e1e] text-gray-200 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-[#61dafb]"
                        ></input>
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
