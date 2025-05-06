import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken");

    if (!refreshToken) {
        return NextResponse.json({ error: "No refresh token found" }, { status: 401 });
    }

    return NextResponse.json({ success: true, refreshToken: refreshToken.value });
}
