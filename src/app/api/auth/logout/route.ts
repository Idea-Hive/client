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

    // 모든 가능한 도메인에 대해 쿠키 삭제
    const cookiesToDelete = [];

    if (isProduction) {
        // 프로덕션 환경: 여러 도메인에 대해 쿠키 삭제
        cookiesToDelete.push(
            // api.task-mate.co.kr 도메인용
            `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Secure; Domain=api.task-mate.co.kr`,
            `refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Secure; Domain=api.task-mate.co.kr`,
            // .task-mate.co.kr 도메인용 (서브도메인 포함)
            `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Secure; Domain=.task-mate.co.kr`,
            `refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Secure; Domain=.task-mate.co.kr`,
            // 현재 호스트명용
            `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Secure; Domain=${hostname}`,
            `refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Secure; Domain=${hostname}`
        );
    } else {
        // 로컬 환경
        cookiesToDelete.push(`token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`, `refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`);
    }

    return NextResponse.json(
        { success: true },
        {
            status: 200,
            headers: cookiesToDelete.map((cookie) => ["Set-Cookie", cookie]),
        }
    );
}
