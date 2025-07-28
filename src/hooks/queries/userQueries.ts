import { useQuery } from "@tanstack/react-query";
import { getUserInfoApi } from "./apis";

export const useUserInfo = () => {
    const { data: user, isPending: userIsPending } = useQuery({
        queryKey: ["isLoggedIn"],
        queryFn: getUserInfoApi,
    });
    return { user, userIsPending };
};
