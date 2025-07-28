import { User } from "@/types/user";
import { Apis } from "@/utils/api";
import { getToken } from "@/utils/utils";

export interface EditUserInfoRequest {
    name: string;
    job: string;
    career: number;
    skillStackIds: number[];
}
export const onEditUserInfoApi = async (body: EditUserInfoRequest): Promise<User> => {
    const token = getToken();

    if (!token) throw new Error("토큰이 없습니다.");

    try {
        return await Apis.put("/member/update", body, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (err) {
        console.error("API Error:", err);
        throw err;
    }
};
