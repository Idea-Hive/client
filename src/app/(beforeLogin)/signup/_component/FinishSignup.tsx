import { redirect } from "next/navigation";

export default function FinishSignup() {
    const onClickMainPage = () => {
        redirect("/");
    };

    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold text-center">가입이 완료되었습니다</h1>
            <div className="text-sm text-center">
                이제 프로젝트를 탐색하고 팀원을 모집할 수 있어요.
                <br />
                지금 바로 원하는 프로젝트를 찾아보세요.
            </div>
            <button onClick={onClickMainPage} className="bg-blue-500 text-white px-4 py-2 rounded-md mx-auto block">
                메인페이지 이동
            </button>
        </div>
    );
}
