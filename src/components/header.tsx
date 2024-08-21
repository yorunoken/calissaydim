import Image from "next/image";
import Link from "next/link";

export default function Header({ activeGame }: { activeGame?: string }) {
    return (
        <header className="bg-[#1e1e1e] text-white flex items-center px-6 py-3 space-x-8 divide-x divide-gray-600">
            <div className="flex items-center">
                <Link href="/" className="flex items-center">
                    <Image src="/ahmet.png" width={223} height={226} className="h-[50px] w-[50px] mr-3 rounded-lg" alt="Calissaydim logo" />
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">YKS Çalışsaydım</span>
                </Link>
            </div>
            <div className="flex font-medium space-x-6 pl-8">
                <Link href="/">Ana Sayfa</Link>
                <Link href="/osu" className={`${activeGame === "osu" ? "text-pink-300" : "text-gray-400"}`}>
                    osu!
                </Link>
            </div>
        </header>
    );
}
