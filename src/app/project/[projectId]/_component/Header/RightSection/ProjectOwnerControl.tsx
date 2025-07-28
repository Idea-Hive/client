import { HamburgerIcon } from "@/components/icons/icons";
import Toast from "@/components/Toast";
import { useClickOutside } from "@/hooks/hooks";
import { useCreateMutation } from "@/hooks/mutations/hooks";
import { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { onPullUpProjectApi } from "../../../_api/api";

export default function ProjectOwnerControl() {
    const { projectId } = useParams();

    const [isDotsThreeVerticalOpen, setIsDotsThreeVerticalOpen] = useState(false); // DotsThreeVertical Dropdown 오픈
    const dotsThreeVerticalRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useClickOutside(dotsThreeVerticalRef, () => setIsDotsThreeVerticalOpen(false));

    const onClickEdit = () => {
        setIsDotsThreeVerticalOpen(false);
        router.push(`/project/edit/${projectId}`);
    };

    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>("");
    const [toastType, setToastType] = useState<"success" | "error">("success");

    const pullUpMutation = useCreateMutation(onPullUpProjectApi, "pullUpProject", {
        onSuccess: () => {
            setToastMessage("끌어올리기 처리가 완료되었습니다.");
            setToastType("success");
            setShowToast(true);
        },
        onError: (error: AxiosError) => {
            setToastMessage(error.response?.data as string);
            setToastType("error");
            setShowToast(true);
        },
    });
    const onClickPullUp = () => {
        setIsDotsThreeVerticalOpen(false);
        pullUpMutation.mutate({
            projectId: Number(projectId),
        });
    };

    return (
        <div>
            <div className="relative" ref={dotsThreeVerticalRef}>
                <div className=" w-8 h-8 rounded-[4px] border border-n500 flex justify-center items-center cursor-pointer" onClick={() => setIsDotsThreeVerticalOpen(!isDotsThreeVerticalOpen)}>
                    <HamburgerIcon />
                </div>

                {isDotsThreeVerticalOpen && (
                    <div className="absolute w-[120px] top-10 right-0 border border-n400 rounded-[4px] shadow-elevation2 bg-white">
                        <button className="w-full h-12 text-sm text-n800 px-3 text-start hover:bg-n75 rounded-t-[4px]" onClick={onClickEdit}>
                            수정
                        </button>
                        <button className="w-full h-12 text-sm text-n800 px-3 text-start hover:bg-n75 rounded-t-[4px]" onClick={onClickPullUp}>
                            끌어올리기
                        </button>
                    </div>
                )}
            </div>

            {showToast && <Toast message={toastMessage} type={toastType} onClose={() => setShowToast(false)} />}
        </div>
    );
}
