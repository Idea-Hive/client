import { Apis } from "@/utils/api";
import { QueryFunction } from "@tanstack/react-query";
import { SkillStack } from "../_types/type";

export const getSkillStackApi: QueryFunction<SkillStack[], [_1: string]> = async ({ queryKey }) => {
    try {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];
        const res = await Apis.get("/skillstack", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return res;
    } catch (err) {
        console.error("getSkillStackApi error", err);
    }
};
