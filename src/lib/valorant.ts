import { userDetails } from "@/types/valorant";

export async function fetchRankDetails(
    rank: string,
): Promise<userDetails | null> {
    const res = await fetch(`/api/valorant/estimate/${rank}`);
    if (!res.ok) {
        console.log(res);
        return null;
    }

    const data: userDetails = await res.json();
    return data;
}
