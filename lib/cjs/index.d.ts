export type UseNetworkStateReturn<D> = {
    data: D | undefined;
    meta: {
        loading: boolean;
        error: boolean;
        errorMessage: string;
    };
    signal: AbortSignal;
    actions: {
        start: () => void;
        end: () => void;
        abort: () => void;
        resetError: () => void;
        setError: (message?: string) => void;
        setData: (data: D) => void;
        setLoading: (laoding: boolean) => void;
        resetSignal: () => void;
        setController: (controller: AbortController) => void;
    };
};
export default function useNetworkState<D = unknown>(): UseNetworkStateReturn<D>;
