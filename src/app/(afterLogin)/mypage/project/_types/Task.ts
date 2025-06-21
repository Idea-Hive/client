export interface Task {
    key: string;
    title: string;
    assignee?: { label: string; value: string };
    dueDate?: string | null;
    file?: string | null;
    isSelectedAssignee?: boolean;
    isSelectedDate?: boolean;
    isSubmittedFile?: boolean;
    isRequired?: boolean;
}

export interface TaskTableProps {
    tasks: Task[];
    onSelectAssignee: (index: number, assignee: { label: string; value: string }) => void;
    checkedIds: string[];
    onCheck: (indexs: string[]) => void;
}

export interface DropboxProps {
    task: Task;
    index: number;
    onSelectAssignee: (index: number, assignee: { label: string; value: string }) => void;
}
