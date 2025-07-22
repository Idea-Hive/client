import { getTemporarySavedProjectApi, TemporarySavedProject } from "@/apis/project/projectApis";
import { useMutation } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TemporarySavedProjectsModal from "./TemporarySavedProjectsModal";

const FloatBtn = dynamic(
    () =>
        Promise.resolve(({ userId }: { userId: number }) => {
            const router = useRouter();

            const [isOpenTemporarySavedProjectsModal, setIsOpenTemporarySavedProjectsModal] = useState(false);
            const [temporarySavedProjects, setTemporarySavedProjects] = useState<TemporarySavedProject[]>([]);

            const getTemporarySavedProjectMutation = useMutation({
                mutationFn: () => getTemporarySavedProjectApi(userId),
                onSuccess: (data) => {
                    if (data.length > 0) {
                        setIsOpenTemporarySavedProjectsModal(true);
                        setTemporarySavedProjects(data);
                    } else {
                        router.push("/project/create");
                    }
                },
                onError: (error) => {
                    console.log(error);
                },
            });

            const onClick = () => {
                getTemporarySavedProjectMutation.mutate();
            };

            return (
                <>
                    <button
                        className="fixed right-[calc((100%-1200px)/2+40px)] bottom-[40px] w-[70px] h-[70px] bg-taskmateRed rounded-full flex items-center justify-center hover:bg-[#f54b4a]"
                        onClick={onClick}
                    >
                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M27.5775 7.53112L21.469 1.42115C21.2658 1.21797 21.0247 1.0568 20.7592 0.946835C20.4938 0.836871 20.2093 0.780273 19.922 0.780273C19.6347 0.780273 19.3502 0.836871 19.0847 0.946835C18.8193 1.0568 18.5781 1.21797 18.375 1.42115L1.51622 18.2813C1.31221 18.4837 1.15046 18.7246 1.04038 18.9901C0.930307 19.2555 0.874093 19.5402 0.875011 19.8276V25.9376C0.875011 26.5177 1.10548 27.0741 1.51571 27.4844C1.92595 27.8946 2.48235 28.1251 3.06251 28.1251H9.17247C9.45984 28.126 9.74453 28.0698 10.01 27.9597C10.2754 27.8496 10.5164 27.6879 10.7188 27.4838L27.5775 10.6251C27.7807 10.4219 27.9419 10.1808 28.0519 9.91532C28.1618 9.64989 28.2184 9.3654 28.2184 9.07809C28.2184 8.79078 28.1618 8.50628 28.0519 8.24085C27.9419 7.97542 27.7807 7.73425 27.5775 7.53112ZM9.17247 25.9376H3.06251V19.8276L15.0938 7.79635L21.2037 13.9063L9.17247 25.9376ZM22.75 12.3587L16.64 6.25006L19.9213 2.96881L26.0313 9.0774L22.75 12.3587Z"
                                fill="white"
                            />
                        </svg>
                    </button>

                    {isOpenTemporarySavedProjectsModal && <TemporarySavedProjectsModal projects={temporarySavedProjects} onClose={() => setIsOpenTemporarySavedProjectsModal(false)} />}
                </>
            );
        }),
    { ssr: false }
);

export default FloatBtn;
