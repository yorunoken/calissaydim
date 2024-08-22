export default function LoadingSkeleton() {
    return (
        <div className="relative overflow-x-auto mt-8 items-center justify-center flex flex-col">
            <div className="bg-[#1e1e1e] h-8 w-60 mb-2 rounded animate-pulse"></div>
            <table className="table-auto  rounded w-full text-sm text-left rtl:text-right text-gray-300">
                <thead className="text-xs uppercase bg-[#1e1e1e] text-gray-300">
                    <tr>
                        <th scope="col" className="normal-case px-6 py-2 font-bold text-2xl">
                            <div className="bg-[#1e1e1e] h-8 w-48 rounded animate-pulse"></div>
                        </th>
                        <th scope="col" className="normal-case px-6 py-2 font-normal text-2xl">
                            <div className="bg-[#1e1e1e] h-8 w-48 rounded animate-pulse"></div>
                        </th>
                        <th scope="col" className="normal-case px-6 py-2 text-xl">
                            <div className="bg-[#1e1e1e] h-8 w-24 rounded animate-pulse"></div>
                        </th>
                        <th scope="col" className="normal-case px-6 py-2 text-xl">
                            <div className="bg-[#1e1e1e] h-8 w-24 rounded animate-pulse"></div>
                        </th>
                    </tr>
                </thead>
                <tbody className="border-collapse">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <tr key={index} className="bg-[#292929]">
                            <td className="px-6 py-4">
                                <div className="bg-[#1e1e1e] h-7 w-48 rounded animate-pulse"></div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="bg-[#1e1e1e] h-7 w-48 rounded animate-pulse"></div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="bg-[#1e1e1e] h-7 w-24 rounded animate-pulse"></div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="bg-[#1e1e1e] h-7 w-24 rounded animate-pulse"></div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
