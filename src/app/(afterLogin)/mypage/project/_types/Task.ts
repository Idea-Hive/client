export interface Task {
    id: number;
    key: string;
    title: string;
    assignee?: AssigneeOption;
    dueDate?: string | null;
    attachedLink?: string | null; //링크 1개
    file?: string | null; //파일 1개
    isSelectedAssignee?: boolean;
    isSelectedDate?: boolean;
    isSubmittedContent?: boolean;
    isRequired?: boolean;
}

export interface TaskTableProps {
    projectId: string;
    taskType: "PLANNING" | "DESIGN" | "DEVELOP" | "DEPLOY" | "COMPLETE";
    tasks: Task[];
    onSelectAssignee: (index: number, assignee: AssigneeOption) => void;
    onSelectDate: (index: number, date: string) => void;
    onSubmitLink: (index: number, updates?: Partial<Task>) => void;
    checkedIds: string[];
    onCheck: (indexs: string[]) => void;
}

export interface AssigneeOption {
    label: string;
    value: string;
    profileUrl?: string;
}

export interface DropboxProps {
    task: Task;
    index: number;
    assigneeList: AssigneeOption[];
    onSelectAssignee: (index: number, assignee: AssigneeOption) => void;
}

export interface TableDateProps {
    task: Task;
    index: number;
    onSelectDate: (index: number, date: string) => void;
}
