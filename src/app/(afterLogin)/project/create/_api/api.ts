import { Apis } from "@/utils/api";
import { QueryFunction } from "@tanstack/react-query";
import { SkillStack } from "../_types/type";

export const getSkillStackApi: QueryFunction<SkillStack[], [_1: string]> = async ({ queryKey }) => {
    try {
        const res = await Apis.get("/skillstack");

        if (!res.data.success) {
            throw new Error("Failed to fetch data");
        }

        return res.data;
    } catch (err) {
        console.error("getSkillStackApi error", err);
    }
};
