import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    const cookieStore = await cookies();

    // 쿠키 삭제
    cookieStore.delete("token");
    cookieStore.delete("refreshToken");

    return NextResponse.json(
        { success: true },
        {
            status: 200,
            headers: [
                ["Set-Cookie", "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT"],
                ["Set-Cookie", "refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT"],
            ],
        }
    );
}
