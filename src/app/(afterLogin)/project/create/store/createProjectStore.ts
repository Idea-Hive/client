import { SaveProjectRequest } from "@/apis/project/projectApis";
import { create } from "zustand";

// Required Form Data
export interface CreateProjectRequiredFormData {
    name: string;
    title: string;
    description: string;
    idea: string;
    maxMembers: number;
    dueDateFrom: string | null;
    dueDateTo: string | null;
    contact: string;
}

// Optional Form Data
export interface CreateProjectOptionalFormData {
    hashTags: string[];
    skills: number[];
}

// Error
export interface CreateProjectError {
    name: string;
    title: string;
    description: string;
    maxMembers: string;
    dueDateFrom: string;
    dueDateTo: string;
    contact: string;
}

interface CreateProjectStore {
    // Form data
    requiredFormData: CreateProjectRequiredFormData;
    optionalFormData: CreateProjectOptionalFormData;
    setRequiredFormData: (field: keyof CreateProjectRequiredFormData, value: string | number | null) => void;
    setOptionalFormData: (field: keyof CreateProjectOptionalFormData, value: string[] | number[]) => void;

    setMultipleRequiredFormData: (data: Partial<CreateProjectRequiredFormData>) => void;
    setMultipleOptionalFormData: (data: Partial<CreateProjectOptionalFormData>) => void;

    // ids
    projectId: number;
    setProjectId: (projectId: number) => void;

    // Error 처리
    errors: CreateProjectError;
    setErrors: (field: keyof CreateProjectError, value: string) => void;
    setMultipleErrors: (data: Partial<CreateProjectError>) => void;

    // utils
    validate: () => boolean;
    getRequestBody: (userId: number, projectId: number) => SaveProjectRequest;
}

const initialState: {
    requiredFormData: CreateProjectRequiredFormData;
    optionalFormData: CreateProjectOptionalFormData;
    errors: CreateProjectError;
} = {
    requiredFormData: {
        name: "",
        title: "",
        description: "",
        idea: "",
        maxMembers: 0,
        dueDateFrom: "",
        dueDateTo: "",
        contact: "",
    },
    optionalFormData: {
        hashTags: [],
        skills: [],
    },
    errors: {
        name: "",
        title: "",
        description: "",
        maxMembers: "",
        dueDateFrom: "",
        dueDateTo: "",
        contact: "",
    },
};

const useCreateProjectStore = create<CreateProjectStore>((set, get) => ({
    // Form data
    requiredFormData: initialState.requiredFormData,
    optionalFormData: initialState.optionalFormData,
    setRequiredFormData: (field, value) => {
        set((state) => ({
            requiredFormData: {
                ...state.requiredFormData,
                [field]: value,
            },
        }));
    },
    setOptionalFormData: (field, value) => {
        set((state) => ({
            optionalFormData: {
                ...state.optionalFormData,
                [field]: value,
            },
        }));
    },
    setMultipleRequiredFormData: (data) => {
        set((state) => ({
            requiredFormData: {
                ...state.requiredFormData,
                ...data,
            },
        }));
    },
    setMultipleOptionalFormData: (data) => {
        set((state) => ({
            optionalFormData: {
                ...state.optionalFormData,
                ...data,
            },
        }));
    },

    // ids
    projectId: 0,
    setProjectId: (projectId: number) => {
        set({ projectId });
    },

    // Error 처리
    errors: initialState.errors,
    setErrors: (field, value) => {
        set((state) => ({
            errors: {
                ...state.errors,
                [field]: value,
            },
        }));
    },
    setMultipleErrors: (data) => {
        set((state) => ({
            errors: {
                ...state.errors,
                ...data,
            },
        }));
    },

    // utils
    validate: () => {
        const { requiredFormData, errors, setMultipleErrors } = get();

        const validations = {
            name: "프로젝트명을 입력해주세요.",
            title: "프로젝트 제목을 입력해주세요.",
            description: "프로젝트 설명을 입력해주세요.",
            // idea: "프로젝트 아이디어를 입력해주세요.",
            maxMembers: "모집 인원을 입력해주세요.",
            dueDateFrom: "예상 일정을 입력해주세요.",
            dueDateTo: "예상 일정을 입력해주세요.",
            contact: "연락수단을 입력해주세요.",
        };

        const newErrors = { ...errors };
        let isValid = true;

        Object.entries(validations).forEach(([field, message]) => {
            const value = requiredFormData[field as keyof CreateProjectRequiredFormData];
            if (field === "dueDateFrom" || field === "dueDateTo") {
                if (value === "") {
                    newErrors[field as keyof CreateProjectError] = message;
                    isValid = false;
                }
            } else if (!value || (field === "maxMembers" && value === 0)) {
                newErrors[field as keyof CreateProjectError] = message;
                isValid = false;
            }
        });

        setMultipleErrors(newErrors);
        return isValid;
    },

    getRequestBody: (userId: number, projectId: number) => {
        const { requiredFormData, optionalFormData } = get();
        const { name, title, description, idea, maxMembers, dueDateFrom, dueDateTo, contact } = requiredFormData;
        const { hashTags, skills } = optionalFormData;

        const requestBody: SaveProjectRequest = {
            projectId: projectId === 0 ? null : projectId,
            userId,
            name,
            title,
            description,
            idea,
            contact,
            maxMembers,
            dueDateFrom,
            dueDateTo,
            skillStackIds: skills,
            hashtags: hashTags,
            isSave: true,
        };

        return requestBody;
    },
}));

export default useCreateProjectStore;
