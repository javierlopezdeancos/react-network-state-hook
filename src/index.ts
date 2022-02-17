import { useState } from 'react';

export type UseNetworkStateReturn = {
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

export default function useNetworkState(): UseNetworkStateReturn {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [data, setData] = useState<unknown>({});

  const controller = new AbortController();

  return {
    data,
    meta: {
      isLoading,
      isError,
      errorMessage,
    },
    signal: controller.signal,
    actions: {
      startRequest: () => setIsLoading(true),
      endRequest: () => setIsLoading(false),
      abortRequest: () => controller.abort(),
      setErrorState: (message = '') => {
        setIsError(true);
        setErrorMessage(message);
      },
      setRequestData: (data: unknown) => setData(data),
    },
  };
}
