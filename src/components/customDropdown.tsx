import Image from "next/image";
import { useState } from "react";

type CustomDropdownProps = {
    options: Array<string>;
    onChange: (selectedOption: string) => void;
    placeholder?: string;
};

export default function CustomDropdown({ options, onChange, placeholder = "Rank seçiniz" }: CustomDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRank, setSelectedRank] = useState<string | null>(null);

    function handleToggle(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setIsOpen(!isOpen);
    }

    function handleSelect(option: string) {
        setSelectedRank(option);
        setIsOpen(false);
        onChange(option);
    }

    function getImagePath(rank: string): string {
        const baseName = rank.replace(" ", "_");
        return `/ranks_valorant/${baseName}.png`;
    }

    return (
        <div className="relative">
            <button
                onClick={handleToggle}
                type="button"
                className="w-full px-4 py-2 bg-[#1e1e1e] text-gray-200 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#61dafb] shadow-md hover:bg-[#252525] transition-all duration-300 flex items-center justify-between"
            >
                <span className="flex items-center">
                    {selectedRank ? (
                        <>
                            <Image src={getImagePath(selectedRank)} width={25} height={25} alt={selectedRank} className="w-6 h-6 inline-block mr-2" />
                            {selectedRank}
                        </>
                    ) : (
                        placeholder
                    )}
                </span>
                <svg className={`ml-1 w-5 h-5 transition-transform duration-300 ${isOpen ? "transform rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
            {isOpen && (
                <ul className="absolute w-full mt-1 max-h-60 overflow-y-auto bg-[#292929] border border-gray-700 rounded-md shadow-lg z-10 transition-all duration-300 ease-in-out scrollbar-thin scrollbar-thumb-[#61dafb] scrollbar-track-[#1e1e1e]">
                    {options.map((rank, index) => (
                        <li
                            key={index}
                            onClick={() => {
                                handleSelect(rank);
                            }}
                            className="px-4 py-2 hover:bg-[#333333] cursor-pointer transition-colors duration-200 flex items-center"
                        >
                            <Image src={getImagePath(rank)} width={25} height={25} alt={rank} className="w-6 h-6 inline-block mr-2" />
                            {rank}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
