import { SetStateAction, useState } from "react";

export default function Rating() {
    const [rating, setRating] = useState(0);

    const handleRating = (rate: SetStateAction<number>) => {
        setRating(rate);
        sendRatingToDatabase(rate); // Placeholder function to send the rating to the database
    };

    const sendRatingToDatabase = (rate: any) => {
        console.log(`Rating sent to database: ${rate}`);
        // Implement your database logic here
    };

    return (
        <div className="mt-6 flex flex-col items-center">
            <span className="italic font-light">"Sonuçlar beklediğiniz gibi miydi?"</span>
            <div className="flex py-2 justify-center items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                        key={star}
                        onClick={() => handleRating(star)}
                        className={`w-4 h-4 ms-1 hover:cursor-pointer ${rating >= star ? "text-yellow-300" : "text-gray-300 dark:text-gray-500"}`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                    >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                ))}
            </div>
        </div>
    );
}
