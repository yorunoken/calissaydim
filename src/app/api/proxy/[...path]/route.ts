import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const searchParams = request.nextUrl.searchParams;
    const path = pathname.replace("/api/proxy", "");

    const url = new URL(`http://localhost:3030/api${path}`);
    searchParams.forEach((value, key) => {
        url.searchParams.append(key, value);
    });

    const response = await fetch(url);
    const data = await response.json();

    return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const path = pathname.replace("/api/proxy", "");

    const url = new URL(`http://localhost:3030/api${path}`);

    const response = await fetch(url, {
        method: "POST",
        headers: request.headers,
        body: request.body,
    });
    const data = await response.json();

    return NextResponse.json(data);
}
