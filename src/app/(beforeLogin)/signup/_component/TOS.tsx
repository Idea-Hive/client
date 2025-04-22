import React from "react";

export default function TOS({ setStep }: { setStep: (step: number) => void }) {
    const [agreements, setAgreements] = React.useState({
        all: false,
        terms1: false,
        terms2: false,
    });

    const handleAgreementChange = (type: "all" | "terms1" | "terms2") => {
        if (type === "all") {
            setAgreements({
                all: !agreements.all,
                terms1: !agreements.all,
                terms2: !agreements.all,
            });
        } else {
            const newAgreements = {
                ...agreements,
                [type]: !agreements[type],
            };
            setAgreements({
                ...newAgreements,
                all: newAgreements.terms1 && newAgreements.terms2,
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

    return (
        <div className="p-4">
            <div className="space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="terms1" checked={agreements.terms1} onChange={() => handleAgreementChange("terms1")} />
                        <label htmlFor="terms1">서비스 이용약관 동의 (필수)</label>
                    </div>
                    <div className="p-2 border rounded bg-gray-50">서비스 이용약관 내용이 들어갑니다...</div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="terms2" checked={agreements.terms2} onChange={() => handleAgreementChange("terms2")} />
                        <label htmlFor="terms2">개인정보 수집 및 이용 동의 (필수)</label>
                    </div>
                    <div className="p-2 border rounded bg-gray-50">개인정보 수집 및 이용 동의 내용이 들어갑니다...</div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <input type="checkbox" id="all" checked={agreements.all} onChange={() => handleAgreementChange("all")} />
                <label htmlFor="all">전체 이용약관에 동의합니다</label>
            </div>

            <button className="w-full mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={onClickNextBtn}>
                다음
            </button>
        </div>
    );
}
