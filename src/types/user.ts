// User type
export interface User {
    id: number;
    name: string;
    email: string;
    createdDate: string;
    job: string;
    career: number;
    type: string;
    modifiedDate: string;
    profileUrl: string;
    SkillStacks: {
        id: number;
        category: string;
        name: string;
    }[];
    isDeleted: boolean;
    isVerified: boolean;
}
