export interface Task {
    key: string;
    title: string;
    assignee?: string;
    dueDate?: string;
    file?: string;
    isSelectedAssignee?: boolean;
    isSelectedDate?: boolean;
    isSubmittedFile?: boolean;
}

export interface TaskTableProps {
    tasks: Task[];
    onSelectAssignee: (index: number, assignee: { label: string; value: string }) => void;
}

export interface DropboxProps {
    task: Task;
    index: number;
    onSelectAssignee: (index: number, assignee: { label: string; value: string }) => void;
}
