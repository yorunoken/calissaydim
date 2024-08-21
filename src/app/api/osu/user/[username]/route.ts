import { API_BASE } from "@/lib";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const username = url.pathname.split("/").pop();

    const data = await fetch(API_BASE + `osu/user/${username}`).then((res) => res.json());

    return Response.json(data);
}
