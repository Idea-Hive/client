import { onRecruitAdditionalMemberApi } from "@/apis/project/projectApis";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useCreateMutation } from "@/hooks/mutations/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RecruitAdditionalMemberButton = ({ projectId }: { projectId: number }) => {
    const router = useRouter();

    const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);

    const onRecruitAdditionalMemberMutation = useCreateMutation(onRecruitAdditionalMemberApi, "onRecruitAdditionalMember", {
        onSuccess: (data) => {
            console.log("Recruit Additional Member Success:::", data);
            setIsOpenSuccessModal(true);
        },
        onError: (error) => {
            console.log("Recruit Additional Member Error:::", error);
        },
    });

    const handleRecruitAdditionalMember = () => {
        onRecruitAdditionalMemberMutation.mutate({ projectId });
    };

    return (
        <>
            <Button label="팀원 추가모집" className="w-fit px-6" onClick={handleRecruitAdditionalMember} />

            <Modal
                isOpen={isOpenSuccessModal}
                title="추가 모집 등록 완료"
                children="추가 모집이 등록되었습니다."
                confirmText="확인"
                onConfirm={() => {
                    setIsOpenSuccessModal(false);
                    router.push("/project");
                }}
            />
        </>
    );
};

export default RecruitAdditionalMemberButton;
