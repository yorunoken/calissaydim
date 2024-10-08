import Header from "@/components/header";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    const games = ["osu!", "Valorant", "CS2"];

    return (
        <section className="w-full">
            <Header activeGame="main" />
            <div className="bg-[#292929] flex min-h-screen flex-col items-center">
                <div className="flex flex-col text-center">
                    <span className="text-4xl mt-8 pb-5">
                        <span className="font-bold italic pr-2">YKS Çalışsaydım </span>
                        <span className="font-normal">ne kazanırdım?</span>
                    </span>
                    <span className="text-xl pb-1">Ders çalışmak yerine oyunu tercih edenler için bu siteyi geliştirdik.</span>
                    <span className="font-extralight">
                        Aşağıdan oyun seçerek başla ve <span className="font-bold italic pr-1">hayalinin üniversitesi</span> oyundaki sıralamana değer miymiş hemen gör!
                    </span>
                </div>
                <div className="flex flex-row mt-8 space-x-8">
                    {games.map((game, index) => (
                        <GameCards key={index} gameName={game} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function GameCards({ gameName }: { gameName: string }) {
    const formattedGame = gameName.replace("!", "").toLowerCase();
    return (
        <Link href={`/${formattedGame}`}>
            <div className="flex flex-col items-center">
                <Image src={`/games/${formattedGame}.png`} width={100} height={100} className="rounded-sm" alt={`${formattedGame} logo`} priority />
                <span className="font-medium mt-2">{gameName}</span>
            </div>
        </Link>
    );
}
