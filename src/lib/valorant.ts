import { BASE_URL } from "@/lib/index";
import { userDetails } from "@/types/valorant";

export async function fetchRankDetails(rank: string): Promise<userDetails | null> {
    const res = await fetch(`${BASE_URL}api/valorant/estimate/${rank}`);
    if (!res.ok) {
        console.log(res);
        return null;
    }

    const data: userDetails = await res.json();
    return data;
}
