import { useSpinner } from "@/components/Spinner";
import { useMutation } from "@tanstack/react-query";

// spinner가 포함된 mutation wrapper
export const useMutationWithSpinner = <TData, TVariables>(
    mutationFn: (variables: TVariables) => Promise<TData>,
    options: {
        onMutate?: (variables: TVariables) => void;
        onSuccess?: (data: TData, variables: TVariables, context: any) => void;
        onError?: (error: any, variables: TVariables, context: any) => void;
        onSettled?: (data: TData | undefined, error: any, variables: TVariables, context: any) => void;
    } = {}
) => {
    const { open: openSpinner, close: closeSpinner } = useSpinner();

    return useMutation({
        mutationFn,
        onMutate: (variables) => {
            openSpinner();
            options.onMutate?.(variables);
        },
        onSuccess: (data, variables, context) => {
            options.onSuccess?.(data, variables, context);
        },
        onError: (error, variables, context) => {
            options.onError?.(error, variables, context);
        },
        onSettled: (data, error, variables, context) => {
            closeSpinner();
            options.onSettled?.(data, error, variables, context);
        },
    });
};
