import React from "react";

const dummyContent = `제1조 (목적)<br/>
본 약관은 테스크메이트(이하 "회사")가 제공하는 협업 플랫폼 관련 서비스(이하 "서비스")의 이용 조건 및 절차, 회원과 회사의 권리·의무 및 책임사항 등을 규정함을 목적으로 합니다.
<br/><br/>
제2조 (용어 정의)<br/>
"회원"이란 본 약관에 동의하고 서비스를 이용하는 자를 의미합니다.
"프로젝트"란 회원 간 협업을 위해 등록된 아이디어, 과제, 작업 등을 의미합니다.
"팀"이란 하나의 프로젝트를 함께 수행하는 회원들의 집합을 말합니다.
<br/><br/>
제3조 (약관의 효력 및 변경)<br/>
본 약관은 서비스 화면에 게시하거나 기타의 방법으로 회원에게 공지함으로써 효력을 발생합니다.
회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할 수 있으며, 변경된 약관은 제1항과 같은 방법으로 공지됩니다.
회원은 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단하고 탈퇴할 수 있습니다.
<br/><br/>
제4조 (서비스 이용 신청 및 승낙)<br/>
서비스 이용을 위해 회원은 회사가 정한 가입 절차에 따라 정확한 정보를 기재해야 하며, 허위정보 기재 시 서비스 이용이 제한될 수 있습니다.
회사는 신청에 대해 승낙함을 원칙으로 하나, 다음과 같은 경우 승낙을 거절하거나 유보할 수 있습니다:
타인의 명의 도용
허위 정보 기재
부정한 용도나 이익 목적
<br/><br/>
제5조 (서비스 내용)<br/>
회사가 제공하는 주요 서비스는 다음과 같습니다:
프로젝트 등록 및 팀원 모집 기능
회원 간 매칭 및 커뮤니케이션 기능
협업 및 진행 관리 기능
기타 회사가 정하는 서비스
<br/><br/>
제6조 (회원의 의무)<br/>
회원은 관계 법령, 본 약관, 서비스 이용 안내 및 주의사항 등을 준수해야 합니다.
회원은 서비스 이용 시 다음 행위를 해서는 안 됩니다:
타인의 정보 도용
음란, 폭력적, 위법한 내용 게시
회사의 운영을 방해하는 행위
허위 프로젝트 등록 또는 중도 이탈 유도
<br/><br/>
제7조 (회사의 의무)<br/>
회사는 본 약관에 따라 안정적인 서비스를 제공하기 위해 최선을 다합니다.
회원의 개인정보는 개인정보처리방침에 따라 보호됩니다.
<br/><br/>
제8조 (서비스 제공의 중지 및 변경)<br/>
회사는 시스템 점검, 고장, 천재지변 등의 사유로 인해 서비스 제공을 일시적으로 중지할 수 있으며, 이 경우 사전 또는 사후 공지합니다.
<br/><br/>
제9조 (지적재산권)<br/>
회원이 서비스 내에서 작성한 프로젝트, 게시물 등에 대한 권리는 해당 회원에게 귀속됩니다.
단, 회사는 서비스 운영, 홍보 등의 목적으로 게시물을 사용할 수 있으며, 이에 동의하지 않는 경우 게시물 삭제 요청이 가능합니다.`;

const terms = [
    {
        id: "terms1",
        label: "[필수] 테스크메이트 서비스 약관",
        content: dummyContent,
        required: true,
    },
    {
        id: "terms2",
        label: "[필수] 개인정보 수집 및 동의",
        content: dummyContent,
        required: true,
    },
    {
        id: "terms3",
        label: "[선택] 마케팅 정보 수신",
        content: dummyContent,
        required: false,
    },
];

export default function TOS({ setStep }: { setStep: (step: number) => void }) {
    const [agreements, setAgreements] = React.useState({
        all: false,
        terms1: false,
        terms2: false,
        terms3: false,
    });

    const [visibleTerms, setVisibleTerms] = React.useState<{ [key: string]: boolean }>({
        terms1: true,
        terms2: false,
        terms3: false,
    });

    const handleAgreementChange = (type: "all" | "terms1" | "terms2") => {
        if (type === "all") {
            setAgreements({
                all: !agreements.all,
                terms1: !agreements.all,
                terms2: !agreements.all,
                terms3: !agreements.all,
            });
        } else {
            const newAgreements = {
                ...agreements,
                [type]: !agreements[type],
            };
            setAgreements({
                ...newAgreements,
                all: newAgreements.terms1 && newAgreements.terms2 && newAgreements.terms3,
            });
        }
    };

    const onClickNextBtn = () => {
        if (agreements.terms1 && agreements.terms2) {
            setStep(2);
        } else {
            alert("모든 약관에 동의해주세요.");
        }
    };

    const toggleTermVisibility = (termId: string) => {
        setVisibleTerms((prev) => ({
            ...prev,
            [termId]: !prev[termId],
        }));
    };

    return (
        <div>
            <div className="border rounded-lg border-[#d8dae5] p-10">
                <div className="flex items-center gap-2 mb-4">
                    <div className="relative">
                        <div className={`w-6 h-6 rounded-full cursor-pointer flex items-center justify-center`} onClick={() => handleAgreementChange("all")}>
                            {agreements.all ? <CheckIcon /> : <NotCheckIcon />}
                        </div>
                    </div>
                    <label className="cursor-pointer text-base font-medium" onClick={() => handleAgreementChange("all")}>
                        전체 이용약관에 동의합니다
                    </label>
                </div>

                <div className="flex flex-col gap-4">
                    {terms.map((term) => (
                        <div key={term.id} className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <div className={`w-5 h-5 rounded-full cursor-pointer flex items-center justify-center`} onClick={() => handleAgreementChange(term.id as "terms1" | "terms2")}>
                                        {agreements[term.id as keyof typeof agreements] ? <SmallCheckIcon /> : <SmallNotCheckIcon />}
                                    </div>
                                </div>
                                <label className="flex-1 cursor-pointer text-sm font-normal" onClick={() => handleAgreementChange(term.id as "terms1" | "terms2")}>
                                    {term.label}
                                </label>
                                <button onClick={() => toggleTermVisibility(term.id)} className="text-xs font-normal text-[#696f8c] underline">
                                    {visibleTerms[term.id] ? "접기" : "보기"}
                                </button>
                            </div>
                            {visibleTerms[term.id] && (
                                <div
                                    className="h-40 overflow-y-auto p-4 border border-[#e6e8f0] bg-[#f9fafc] rounded text-xs leading-[18px] text-[#8f95b2]"
                                    dangerouslySetInnerHTML={{ __html: term.content }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <button className="w-full h-12 mt-6 py-2.5 px-4 bg-[#ff6363] text-white rounded-md" onClick={onClickNextBtn}>
                다음
            </button>
        </div>
    );
}

const CheckIcon = () => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10 0.25C8.07164 0.25 6.18657 0.821828 4.58319 1.89317C2.97982 2.96451 1.73013 4.48726 0.992179 6.26884C0.254225 8.05042 0.061142 10.0108 0.437348 11.9021C0.813554 13.7934 1.74215 15.5307 3.10571 16.8943C4.46928 18.2579 6.20656 19.1865 8.09787 19.5627C9.98919 19.9389 11.9496 19.7458 13.7312 19.0078C15.5127 18.2699 17.0355 17.0202 18.1068 15.4168C19.1782 13.8134 19.75 11.9284 19.75 10C19.7473 7.41498 18.7192 4.93661 16.8913 3.10872C15.0634 1.28084 12.585 0.25273 10 0.25ZM14.2806 8.28063L9.03063 13.5306C8.96097 13.6004 8.87826 13.6557 8.78721 13.6934C8.69616 13.7312 8.59857 13.7506 8.5 13.7506C8.40144 13.7506 8.30385 13.7312 8.2128 13.6934C8.12175 13.6557 8.03903 13.6004 7.96938 13.5306L5.71938 11.2806C5.57865 11.1399 5.49959 10.949 5.49959 10.75C5.49959 10.551 5.57865 10.3601 5.71938 10.2194C5.86011 10.0786 6.05098 9.99958 6.25 9.99958C6.44903 9.99958 6.6399 10.0786 6.78063 10.2194L8.5 11.9397L13.2194 7.21937C13.2891 7.14969 13.3718 7.09442 13.4628 7.0567C13.5539 7.01899 13.6515 6.99958 13.75 6.99958C13.8486 6.99958 13.9461 7.01899 14.0372 7.0567C14.1282 7.09442 14.2109 7.14969 14.2806 7.21937C14.3503 7.28906 14.4056 7.37178 14.4433 7.46283C14.481 7.55387 14.5004 7.65145 14.5004 7.75C14.5004 7.84855 14.481 7.94613 14.4433 8.03717C14.4056 8.12822 14.3503 8.21094 14.2806 8.28063Z"
                fill="#FF6363"
            />
        </svg>
    );
};

const NotCheckIcon = () => {
    return <div className="w-5 h-5 rounded-full border border-[#8F95B2]"></div>;
};

const SmallCheckIcon = () => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10 0.25C8.07164 0.25 6.18657 0.821828 4.58319 1.89317C2.97982 2.96451 1.73013 4.48726 0.992179 6.26884C0.254225 8.05042 0.061142 10.0108 0.437348 11.9021C0.813554 13.7934 1.74215 15.5307 3.10571 16.8943C4.46928 18.2579 6.20656 19.1865 8.09787 19.5627C9.98919 19.9389 11.9496 19.7458 13.7312 19.0078C15.5127 18.2699 17.0355 17.0202 18.1068 15.4168C19.1782 13.8134 19.75 11.9284 19.75 10C19.7473 7.41498 18.7192 4.93661 16.8913 3.10872C15.0634 1.28084 12.585 0.25273 10 0.25ZM14.2806 8.28063L9.03063 13.5306C8.96097 13.6004 8.87826 13.6557 8.78721 13.6934C8.69616 13.7312 8.59857 13.7506 8.5 13.7506C8.40144 13.7506 8.30385 13.7312 8.2128 13.6934C8.12175 13.6557 8.03903 13.6004 7.96938 13.5306L5.71938 11.2806C5.57865 11.1399 5.49959 10.949 5.49959 10.75C5.49959 10.551 5.57865 10.3601 5.71938 10.2194C5.86011 10.0786 6.05098 9.99958 6.25 9.99958C6.44903 9.99958 6.6399 10.0786 6.78063 10.2194L8.5 11.9397L13.2194 7.21937C13.2891 7.14969 13.3718 7.09442 13.4628 7.0567C13.5539 7.01899 13.6515 6.99958 13.75 6.99958C13.8486 6.99958 13.9461 7.01899 14.0372 7.0567C14.1282 7.09442 14.2109 7.14969 14.2806 7.21937C14.3503 7.28906 14.4056 7.37178 14.4433 7.46283C14.481 7.55387 14.5004 7.65145 14.5004 7.75C14.5004 7.84855 14.481 7.94613 14.4433 8.03717C14.4056 8.12822 14.3503 8.21094 14.2806 8.28063Z"
                fill="#FF6363"
            />
        </svg>
    );
};

const SmallNotCheckIcon = () => {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M9 0.875C7.39303 0.875 5.82214 1.35152 4.486 2.24431C3.14985 3.1371 2.10844 4.40605 1.49348 5.8907C0.87852 7.37535 0.717618 9.00901 1.03112 10.5851C1.34463 12.1612 2.11846 13.6089 3.25476 14.7452C4.39106 15.8815 5.8388 16.6554 7.4149 16.9689C8.99099 17.2824 10.6247 17.1215 12.1093 16.5065C13.594 15.8916 14.8629 14.8502 15.7557 13.514C16.6485 12.1779 17.125 10.607 17.125 9C17.1227 6.84581 16.266 4.78051 14.7427 3.25727C13.2195 1.73403 11.1542 0.877275 9 0.875ZM9 15.875C7.64026 15.875 6.31105 15.4718 5.18046 14.7164C4.04987 13.9609 3.16868 12.8872 2.64833 11.6309C2.12798 10.3747 1.99183 8.99237 2.2571 7.65875C2.52238 6.32513 3.17716 5.10013 4.13864 4.13864C5.10013 3.17716 6.32514 2.52237 7.65876 2.2571C8.99238 1.99183 10.3747 2.12798 11.631 2.64833C12.8872 3.16868 13.9609 4.04987 14.7164 5.18045C15.4718 6.31104 15.875 7.64025 15.875 9C15.8729 10.8227 15.1479 12.5702 13.8591 13.8591C12.5702 15.1479 10.8227 15.8729 9 15.875Z"
                fill="#8F95B2"
            />
        </svg>
    );
};
