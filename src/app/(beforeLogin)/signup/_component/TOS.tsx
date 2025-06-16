import { CheckIcon, NotCheckIcon, SmallCheckIcon, SmallNotCheckIcon } from "@/components/icons/icons";
import { Dispatch, SetStateAction, useState } from "react";

const terms1Content = `제1조 (목적)<br/>
이 약관은 Taskmate 운영팀(이하 ‘운영팀’)이 제공하는 사이드 프로젝트 협업 및 관리 플랫폼 서비스(이하 ‘서비스’)의 이용과 관련하여, 운영팀과 이용자 간의 권리, 의무, 책임사항을 규정합니다.<br/><br/>
제2조 (정의)<br/>
1. ‘서비스’란 사용자가 프로젝트를 등록하고 협업자를 모집하거나 참여하며, 각 단계를 관리할 수 있도록 운영팀이 제공하는 웹 기반 기능을 말합니다.<br/>
2. ‘회원’은 본 약관에 동의하고 운영팀이 제공하는 서비스를 이용하는 자를 말합니다.<br/><br/>
제3조 (약관의 효력 및 변경)<br/>
1. 본 약관은 서비스 화면에 게시하거나 공지함으로써 효력을 발생합니다.<br/>
2. 운영팀은 서비스 개선 및 관련 사항에 따라 약관을 사전 고지 후 변경할 수 있습니다.<br/><br/>
제4조 (회원가입)<br/>
1. 회원가입은 이용자가 약관에 동의하고, 운영팀이 정한 가입 절차를 완료함으로써 성립됩니다.<br/>
2. 운영팀은 다음과 같은 경우 가입을 제한할 수 있습니다:<br/>
   - 타인 정보 도용<br/>
   - 허위 정보 입력<br/>
   - 서비스 운영을 명백히 방해하는 경우<br/><br/>
제5조 (회원의 의무)<br/>
1. 회원은 관계 법령 및 본 약관을 준수해야 하며, 다음과 같은 행위를 해서는 안 됩니다:<br/>
   - 타인의 정보를 무단 사용하거나 권리를 침해하는 행위<br/>
   - 서비스 내에서 허위 정보 유포 또는 부적절한 콘텐츠 작성<br/>
   - 서비스의 정상적인 운영을 방해하는 행위<br/><br/>
제6조 (서비스의 제공 및 변경)<br/>
1. 운영팀은 서비스의 일부 또는 전부를 필요 시 변경하거나 일시적으로 중단할 수 있습니다.<br/>
2. 중대한 변경 시 사전에 공지하며, 불가피한 사유 발생 시 사후 공지할 수 있습니다.<br/><br/>
제7조 (계정 및 정보 관리)<br/>
회원은 자신의 계정 정보를 스스로 관리해야 하며, 계정 도용이나 부주의로 발생한 문제에 대한 책임은 회원에게 있습니다.<br/><br/>
제8조 (책임 제한)<br/>
1. 운영팀은 다음과 같은 경우 책임을 지지 않습니다:<br/>
   - 회원 간 프로젝트 진행 과정에서 발생한 문제나 분쟁<br/>
   - 회원이 작성한 프로젝트 또는 과제 콘텐츠의 진위 여부<br/>
   - 기술적 장애 또는 외부 요인으로 인한 서비스 중단<br/><br/>
제9조 (지식재산권)<br/>
서비스에 등록된 콘텐츠(글, 이미지, 과제 등)의 지식재산권은 해당 작성자에게 있으며, 무단 복제 및 도용은 금지됩니다.<br/><br/>
제10조 (준거법 및 분쟁 해결)<br/>
이 약관은 대한민국 법률에 따라 해석되며, 운영팀과 회원 간 분쟁이 발생할 경우 상호 협의를 통해 해결합니다.`;
const terms2Content = `운영팀(Taskmate)은 아래와 같이 개인정보를 수집 및 이용합니다.<br/><br/>
1. 수집 항목: 이메일 주소, 닉네임, 비밀번호(암호화 저장), 서비스 이용 기록<br/>
2. 수집 목적: 회원 식별, 서비스 제공 및 개선, 알림 기능 제공<br/>
3. 보유 기간: 회원 탈퇴 시까지 (단, 법령에 따라 필요한 경우 별도 보관)<br/>
4. 수집 거부 시: 동의를 거부할 수 있으나, 이 경우 서비스 이용이 제한됩니다.<br/><br/>
※ 위 내용을 확인하였으며, 개인정보 수집 및 이용에 동의합니다.`;
const terms3Content = `Taskmate 운영팀은 유용한 정보 제공을 위해 아래와 같이 정보를 발송할 수 있습니다.<br/><br/>
1. 발송 내용: 서비스 업데이트, 이벤트 소식, 신규 기능 안내 등<br/>
2. 발송 방법: 이메일, 푸시 알림 등<br/>
3. 수신 거부: 언제든지 수신 거부가 가능합니다.<br/><br/>
※ 본 항목은 선택사항이며, 동의하지 않아도 서비스 이용에 제한은 없습니다.`;

const terms = [
    {
        id: "terms1",
        label: "[필수] 서비스 이용약관",
        content: terms1Content,
        required: true,
    },
    {
        id: "terms2",
        label: "[필수] 개인정보 수집 및 이용 동의",
        content: terms2Content,
        required: true,
    },
    {
        id: "terms3",
        label: "[선택] 마케팅 정보 수신 동의",
        content: terms3Content,
        required: false,
    },
];

export default function TOS({
    agreements,
    setAgreements,
}: {
    agreements: { [key: string]: boolean };
    setAgreements: Dispatch<
        SetStateAction<{
            all: boolean;
            terms1: boolean;
            terms2: boolean;
            terms3: boolean;
        }>
    >;
}) {
    const [visibleTerms, setVisibleTerms] = useState<{ [key: string]: boolean }>({
        terms1: false,
        terms2: false,
        terms3: false,
    });

    const handleAgreementChange = (type: "all" | "terms1" | "terms2" | "terms3") => {
        if (type === "all") {
            setAgreements({
                all: !agreements.all,
                terms1: !agreements.all,
                terms2: !agreements.all,
                terms3: !agreements.all,
            });
        } else {
            setAgreements((prev) => {
                const newAgreements = {
                    ...prev,
                    [type]: !prev[type],
                };
                return {
                    ...newAgreements,
                    all: newAgreements.terms1 && newAgreements.terms2 && newAgreements.terms3,
                };
            });
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
                                    <div
                                        className={`w-5 h-5 rounded-full cursor-pointer flex items-center justify-center`}
                                        onClick={() => handleAgreementChange(term.id as "terms1" | "terms2" | "terms3")}
                                    >
                                        {agreements[term.id as keyof typeof agreements] ? <SmallCheckIcon /> : <SmallNotCheckIcon />}
                                    </div>
                                </div>
                                <label className="flex-1 cursor-pointer text-sm font-normal" onClick={() => handleAgreementChange(term.id as "terms1" | "terms2" | "terms3")}>
                                    {term.label}
                                </label>
                                <button type="button" onClick={() => toggleTermVisibility(term.id)} className="text-xs font-normal text-[#696f8c] underline">
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
        </div>
    );
}
