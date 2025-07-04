export interface Task {
    id: number;
    key: string;
    title: string;
    assignee?: AssigneeOption;
    dueDate?: string | null;
    file?: string | null;
    isSelectedAssignee?: boolean;
    isSelectedDate?: boolean;
    isSubmittedFile?: boolean;
    isRequired?: boolean;
}

export interface TaskTableProps {
    tasks: Task[];
    onSelectAssignee: (index: number, assignee: AssigneeOption) => void;
    onSelectDate: (index: number, date: string) => void;
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