import { BASE_URL } from "@/lib/index";
import { userDetails } from "@/types/osu";

export async function fetchUserDetails(username: string): Promise<userDetails | null> {
    const res = await fetch(`${BASE_URL}api/osu/user/${username}`);
    if (!res.ok) {
        console.log(res);
        return null;
    }

    const data: userDetails = await res.json();
    return data;
}
