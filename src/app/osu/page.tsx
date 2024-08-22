"use client";
import Header from "@/components/header";
import Universities from "@/components/universities";
import { useState } from "react";
import { ExamCategory } from "@/types/exam";
import { fetchUserDetails } from "@/lib/osu";
import LoadingSkeleton from "@/components/loadingSkeleton";
import Rating from "@/components/rating";

export default function Osu() {
    const [username, setUsername] = useState("");
    const [warning, setWarning] = useState<string | null>(null);
    const [ranking, setRanking] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (username.trim() !== "") {
            setLoading(true);
            setRanking(null);
            const data = await fetchUserDetails(username);
            if (data) {
                if (data.statistics.global_rank === null) {
                    setWarning("Sıralama bulunamadı. Sıralamadaki aktifliğinizi kontrol edin.");
                } else {
                    setRanking(data.statistics.global_rank);
                    setUsername(data.username);
                    setWarning(null);
                }
            } else {
                setWarning("Girdiğiniz isim yanlış. Lütfen tekrar deneyin.");
            }
            setLoading(false);
        } else {
            setWarning("Lütfen bir isim girin.");
        }
    }

    return (
        <section className="w-full">
            <Header activeGame="osu" />
            <div className="bg-[#292929] flex min-h-screen flex-col items-center">
                <div className="flex flex-col text-center mb-6">
                    <span className="text-4xl mt-8 pb-5">
                        <span className="font-bold italic pr-2">YKS Çalışsaydım </span>
                        <span className="font-normal">ne kazanırdım?</span>
                    </span>
                    <span className="text-xl pb-1">
                        <span className="text-pink-300 font-bold">osu!</span> oynamak yerine ders çalışsaydınız hangi üniversiteleri kazanırdınız?
                    </span>
                </div>
                <form onSubmit={handleSubmit}>
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
                {ranking && (
                    <>
                        <div className="grid gap-2 px-4 mx-auto">
                            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
                                <Universities examType={ExamCategory.SAY} ranking={ranking} />
                                <Universities examType={ExamCategory.EA} ranking={ranking} />
                                <Universities examType={ExamCategory.DIL} ranking={ranking} />
                                <Universities examType={ExamCategory.SOZ} ranking={ranking} />
                            </div>
                        </div>
                        <div className="flex flex-col px-4 mt-4 justify-center mb-12">
                            <Universities examType={ExamCategory.TYT} ranking={ranking} />
                            <Rating />
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
