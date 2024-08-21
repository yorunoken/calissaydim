"use client";
import Header from "@/components/header";
import Universities from "@/components/universities";
import { useState } from "react";
import { BASE_URL } from "@/lib/index";
import { userDetails } from "@/types";
import Rating from "@/components/rating";

export default function Osu() {
    const [username, setUsername] = useState("");
    const [warning, setWarning] = useState<string | null>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const res = await fetch(`${BASE_URL}api/osu/user/${username}`);
        if (!res.ok) {
            setWarning("Girdiğiniz isim yanlış. Lütfen tekrar deneyin.");
            return;
        }

        setWarning(null);
        const data: userDetails = await res.json();
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
                <Universities percentage={10} />
                <Rating />
            </div>
        </section>
    );
}
