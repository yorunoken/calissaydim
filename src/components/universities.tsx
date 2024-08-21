export default function Universities({ percentage }: { percentage?: number }) {
    return (
        <div className="relative overflow-x-auto mt-4">
            <table className="table-auto border border-slate-900 rounded w-full text-sm text-left rtl:text-right text-gray-300">
                <thead className="text-xs uppercase bg-[#1e1e1e] text-gray-300">
                    <tr>
                        <th scope="col" className="normal-case px-3 py-2 font-bold text-xl">
                            ÜNİVERSİTE
                        </th>
                        <th scope="col" className="normal-case px-3 py-2 font-normal text-xl">
                            Bölüm
                        </th>
                        <th scope="col" className="normal-case px-3 py-2 text-l">
                            Sıralama 2024
                        </th>
                        <th scope="col" className="normal-case px-3 py-2 text-l">
                            Sıralama 2023
                        </th>
                    </tr>
                </thead>
                {/* tbody içine HTML constructor yazılacak */}
                <tbody className="border-collapse">
                    <University
                        university="İSTANBUL TEKNİK ÜNİVERSİTESİ"
                        className="Siber Güvenlik Analistliği ve Operatörlüğü"
                        classFaculty="Siber Güvenlik Meslek Yüksekokulu"
                        tbs2023="72154"
                        tbs2024="76635"
                    />
                    <University
                        university="İSTANBUL TEKNİK ÜNİVERSİTESİ"
                        className="Siber Güvenlik Analistliği ve Operatörlüğü"
                        classFaculty="Siber Güvenlik Meslek Yüksekokulu"
                        tbs2023="72154"
                        tbs2024="76635"
                    />
                    <University
                        university="İSTANBUL TEKNİK ÜNİVERSİTESİ"
                        className="Siber Güvenlik Analistliği ve Operatörlüğü"
                        classFaculty="Siber Güvenlik Meslek Yüksekokulu"
                        tbs2023="72154"
                        tbs2024="76635"
                    />
                </tbody>
            </table>
        </div>
    );
}

function University({ university, className, classFaculty, tbs2024, tbs2023 }: { university: string; className: string; classFaculty: string; tbs2024: string; tbs2023: string }) {
    return (
        <tr className="bg-zinc-800 border border-zinc-700">
            <td className="font-normal text-l px-3 py-2 text-lg">{university}</td>
            <td className="font-normal text-base px-3 py-2">
                {className}
                <br />
                <div className="font-extralight text-xs">{classFaculty}</div>
            </td>
            <td className="px-3 py-2 text-xl font-normal text-base">{tbs2024}</td>
            <td className="px-3 py-2 text-l font-light">{tbs2023}</td>
        </tr>
    );
}
