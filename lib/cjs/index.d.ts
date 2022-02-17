export declare type UseNetworkStateReturn = {
    data: unknown;
    meta: {
        isLoading: boolean;
        isError: boolean;
        errorMessage: string;
    };
    signal: AbortSignal;
    actions: {
        startRequest: () => void;
        endRequest: () => void;
        abortRequest: () => void;
        setErrorState: (message: string) => void;
        setRequestData: (data: unknown) => void;
    };
};
export default function useNetworkState(): UseNetworkStateReturn;
