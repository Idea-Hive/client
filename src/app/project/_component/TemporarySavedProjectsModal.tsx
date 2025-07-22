import { TemporarySavedProject } from "@/apis/project/projectApis";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function TemporarySavedProjectsModal({ projects, onClose }: { projects: TemporarySavedProject[]; onClose: () => void }) {
    const router = useRouter();
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black bg-opacity-50" />
            <div className="relative w-[400px] shadow-elavation1 bg-white rounded-lg p-10 pt-[50px]">
                <div className="absolute right-5 top-5">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" onClick={onClose}>
                        <path
                            d="M19.2806 18.2194C19.3502 18.2891 19.4055 18.3718 19.4432 18.4629C19.4809 18.5539 19.5003 18.6515 19.5003 18.7501C19.5003 18.8486 19.4809 18.9462 19.4432 19.0372C19.4055 19.1283 19.3502 19.211 19.2806 19.2807C19.2109 19.3504 19.1281 19.4056 19.0371 19.4433C18.9461 19.4811 18.8485 19.5005 18.7499 19.5005C18.6514 19.5005 18.5538 19.4811 18.4628 19.4433C18.3717 19.4056 18.289 19.3504 18.2193 19.2807L11.9999 13.0604L5.78055 19.2807C5.63982 19.4214 5.44895 19.5005 5.24993 19.5005C5.05091 19.5005 4.86003 19.4214 4.7193 19.2807C4.57857 19.1399 4.49951 18.9491 4.49951 18.7501C4.49951 18.551 4.57857 18.3602 4.7193 18.2194L10.9396 12.0001L4.7193 5.78068C4.57857 5.63995 4.49951 5.44907 4.49951 5.25005C4.49951 5.05103 4.57857 4.86016 4.7193 4.71943C4.86003 4.5787 5.05091 4.49963 5.24993 4.49963C5.44895 4.49963 5.63982 4.5787 5.78055 4.71943L11.9999 10.9397L18.2193 4.71943C18.36 4.5787 18.5509 4.49963 18.7499 4.49963C18.949 4.49963 19.1398 4.5787 19.2806 4.71943C19.4213 4.86016 19.5003 5.05103 19.5003 5.25005C19.5003 5.44907 19.4213 5.63995 19.2806 5.78068L13.0602 12.0001L19.2806 18.2194Z"
                            fill="#474D66"
                        />
                    </svg>
                </div>
                <h2 className="text-h2 text-n900 mb-4">임시저장</h2>

                <div className="w-full flex justify-between items-center mb-6">
                    <div className="text-xs text-n700">총 {projects.length}개</div>
                    <Button
                        label="새 글 작성"
                        size="small"
                        btnType="line_red"
                        onClick={() => {
                            router.push("/project/create");
                        }}
                    />
                </div>

                <div className="w-full border-t border-n500 max-h-[168px] overflow-y-auto">
                    {projects.map((project) => {
                        return (
                            <div
                                key={project.projectId}
                                className="border-b border-n500 px-2 py-4 text-base text-n800 cursor-pointer hover:bg-n50"
                                onClick={() => {
                                    router.push(`/project/create?id=${project.projectId}`);
                                }}
                            >
                                {project.name}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
