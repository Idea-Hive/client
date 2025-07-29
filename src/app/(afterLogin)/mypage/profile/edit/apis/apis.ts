import { User } from "@/types/user";
import { Apis } from "@/utils/api";

export interface EditUserInfoRequest {
    name: string;
    job: string;
    career: number;
    skillStackIds: number[];
}
export const onEditUserInfoApi = async (body: EditUserInfoRequest): Promise<User> => {
    try {
        return await Apis.putAuth("/member/update", body);
    } catch (err) {
        console.error("API Error:", err);
        throw err;
    }
};
