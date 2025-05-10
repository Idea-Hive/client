import { QueryFunction } from "@tanstack/react-query";
import axios from "axios";

interface GetProjectsApiResponse {
    totalCount: number;
    projects: {
        id: number;
        title: string;
        description: string;
        hashtagNames: string[];
    }[];
}

export const getProjectsApi: QueryFunction<GetProjectsApiResponse, [_1: string, keyword: string, recruitType: string]> = async ({ queryKey }) => {
    try {
        const [, keyword, recruitType] = queryKey;
        const res = await axios.get("http://localhost:8080/api/project/search");

        if (!res.data.success) {
            throw new Error("Failed to fetch data");
        }

        return res.data;
    } catch (err) {
        console.error("getSkillStackApi error", err);
    }
};
