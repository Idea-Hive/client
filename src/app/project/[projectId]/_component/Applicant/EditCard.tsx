import { Applicant } from "@/apis/project/projectApis";
import Button from "@/components/Button";
import Toast from "@/components/Toast";
import { useCreateMutation } from "@/hooks/mutations/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";
import { useIdsForApplicant } from "../../store/store";
import { updateApplicantApplicationMessageApi } from "./_api/apis";

export default function EditCard({ setIsEdit, applicant }: { setIsEdit: Dispatch<SetStateAction<boolean>>; applicant: Applicant }) {
    const { projectId } = useIdsForApplicant();

    const queryClient = useQueryClient();

    const [isError, setIsError] = useState<boolean>(false);

    const [value, setValue] = useState<string>(applicant.applicationMessage);
    const onChangeApplicationMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };

    const onUpdateApplicationMessageMutation = useCreateMutation(updateApplicantApplicationMessageApi, "updateApplicantApplicationMessage", {
        onSuccess: (response) => {
            console.log("onUpdateApplicationMessageMutation Success:::", response);
            queryClient.invalidateQueries({ queryKey: ["getApplicantInfo", { projectId: Number(projectId), page: 1, size: 4 }] });
            setIsEdit(false);
        },
        onError: (error) => {
            console.error("onUpdateApplicationMessageMutation Error:::", error);
            setIsError(true);
        },
    });

    const onUpdateApplicationMessage = () => {
        onUpdateApplicationMessageMutation.mutate({
            projectId,
            memberId: applicant.memberId,
            applyId: applicant.applyId,
            message: value,
        });
    };

    return (
        <>
            <div className="w-full h-fit p-4 border border-n300 rounded-[4px] flex gap-2">
                <textarea
                    className="w-full h-fit min-h-12 resize-none border-none text-base text-n800 focus:outline-none"
                    value={value}
                    onChange={onChangeApplicationMessage}
                    maxLength={20}
                ></textarea>
                <div className="flex flex-col justify-end text-xs text-n800">{value.length}/20</div>
            </div>
            <div className="w-full flex justify-end gap-2">
                <Button btnType="line" label="취소" size="small" className="w-[74px] !rounded-[4px]" onClick={() => setIsEdit(false)} />
                <Button btnType="primary" label="저장" size="small" className="w-[74px] !rounded-[4px]" onClick={onUpdateApplicationMessage} />
            </div>

            {isError && <Toast message="지원 메시지 수정에 실패했습니다." onClose={() => setIsError(false)} />}
        </>
    );
}
