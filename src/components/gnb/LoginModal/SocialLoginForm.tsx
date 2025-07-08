import { GithubIcon, GoogleIcon, KakaoIcon } from "@/components/icons/icons";

export default function SocialLoginForm() {
    const handleSocialLogin = (provider: string) => {
        window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/oauth2/authorization/${provider}`;
    };

    return (
        <div className="flex flex-col gap-3 justify-center">
            <button className="w-full h-12 text-base font-medium rounded-md flex justify-center items-center gap-4 border border-n400" onClick={() => handleSocialLogin("google")}>
                <GoogleIcon />
                Google 로그인
            </button>
            <button className="w-full h-[46px] text-base font-medium bg-black text-white rounded-md flex justify-center items-center gap-4" onClick={() => handleSocialLogin("github")}>
                <GithubIcon />
                Github 로그인
            </button>
            <button className="w-full h-[46px] text-base font-medium bg-[#FEE500] text-[rgba(0,0,0,0.85)] rounded-md flex justify-center items-center gap-4" onClick={() => handleSocialLogin("kakao")}>
                <KakaoIcon />
                카카오 로그인
            </button>
        </div>
    );
}
