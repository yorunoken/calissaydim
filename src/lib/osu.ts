import { userDetails } from "@/types/osu";

export async function fetchUserDetails(username: string): Promise<userDetails | null> {
    const res = await fetch(`/api/proxy/osu/user/${username}`);
    if (!res.ok) {
        console.log(res);
        return null;
    }

    const data: userDetails = await res.json();
    return data;
}
