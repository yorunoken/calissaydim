import Image from "next/image";
import Link from "next/link";

export default function Header({ activeGame }: { activeGame?: string }) {
    return (
        <header className="bg-[#1e1e1e] text-white flex flex-col lg:flex-row items-center px-6 py-4">
            <div className="flex items-center justify-center lg:justify-start mb-4 lg:mb-0 w-full lg:w-auto">
                <Link href="/" className="flex items-center">
                    <Image src="/ahmet.png" width={223} height={226} className="h-[50px] w-[50px] mr-3 rounded-lg" alt="Calissaydim logo" />
                    <span className="text-xl font-semibold whitespace-nowrap dark:text-white">YKS Çalışsaydım</span>
                </Link>
            </div>
            <div className="flex flex-wrap font-medium items-center justify-center lg:pl-10 lg:justify-start space-x-6 w-full lg:w-auto">
                <Link href="/" className={`${activeGame === "main" ? "text-white" : "text-gray-400"}`}>
                    Ana Sayfa
                </Link>
                <Link href="/osu" className={`${activeGame === "osu" ? "text-pink-300" : "text-gray-400"}`}>
                    osu!
                </Link>
                <Link href="/valorant" className={`${activeGame === "valorant" ? "text-rose-600" : "text-gray-400"}`}>
                    Valorant
                </Link>
                <Link href="/cs2" className={`${activeGame === "cs2" ? "text-yellow-300" : "text-gray-400"}`}>
                    CS2
                </Link>
            </div>
        </header>
    );
}
