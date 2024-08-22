export function University({ university, className, classFaculty, tbs2024, tbs2023 }: { university: string; className: string; classFaculty: string; tbs2024: string; tbs2023: string }) {
    return (
        <tr className="bg-zinc-800 border border-zinc-700">
            <td className="capitalize font-normal text-left px-3 py-2 text-lg">{university.toLocaleLowerCase("tr")}</td>
            <td className="font-normal text-base px-3 py-2">
                {className}
                <br />
                <div className="font-extralight text-xs">{classFaculty}</div>
            </td>
            <td className="px-3 py-2 font-normal text-lg">{tbs2024}</td>
            <td className="px-3 py-2 font-light">{tbs2023}</td>
        </tr>
    );
}
