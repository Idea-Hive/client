export interface RequiredValues {
    title: string;
    description: string;
    idea: string;
    maxMembers: number;
    dueDateFrom: string | null;
    dueDateTo: string | null;
    contact: string;
}

export interface SkillStack {
    id: number;
    name: string;
    category: string;
}
