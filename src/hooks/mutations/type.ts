import { AxiosError } from "axios";

// useMutation의 옵션 타입
export type UseMutationProps = {
    onMutate?: () => void;
    onSuccess?: (data: any, ...args: any[]) => void;
    onError?: (error: AxiosError) => void;
    onSettled?: () => void;
};
