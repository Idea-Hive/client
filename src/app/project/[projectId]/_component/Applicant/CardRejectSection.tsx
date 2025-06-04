import { SmallUserImgIcon } from "@/components/icons/icons";

export default function CardRejectSection({ projectCreatorName, rejectionMessage }: { projectCreatorName: string; rejectionMessage: string }) {
    return (
        <div className="w-full p-6 bg-n75 border-t border-n300">
            <div className="flex items-center gap-2 text-baseEmphasize text-n900 mb-2.5">
                <SmallUserImgIcon />
                {projectCreatorName}
            </div>

            <div className="text-base text-n900">{rejectionMessage}</div>
        </div>
    );
}
