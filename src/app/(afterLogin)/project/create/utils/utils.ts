import { useSearchParams } from "next/navigation";

export const getProjectId = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    return id;
};
