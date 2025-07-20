import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const cookieStore = await cookies();
    const url = new URL(request.url);
    const hostname = url.hostname;

    // 쿠키 삭제
    cookieStore.delete("token");
    cookieStore.delete("refreshToken");

    // 배포 환경과 로컬 환경에 따른 쿠키 삭제 설정
    const isProduction = process.env.NODE_ENV === "production";
    const domainOption = isProduction ? `; Domain=${hostname}` : "";

    return NextResponse.json(
        { success: true },
        {
            status: 200,
            headers: [
                ["Set-Cookie", `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=${isProduction ? "None" : "Lax"}${domainOption}`],
                ["Set-Cookie", `refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=${isProduction ? "None" : "Lax"}; HttpOnly; Domain=.task-mate.co.kr`],
                ["Set-Cookie", `refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=${isProduction ? "None" : "Lax"}; HttpOnly; Domain=api.task-mate.co.kr`],
            ],
        }
    );
}
