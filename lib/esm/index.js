import { useState } from 'react';
export default function useNetworkState() {
    var _a = useState(false), isLoading = _a[0], setIsLoading = _a[1];
    var _b = useState(false), isError = _b[0], setIsError = _b[1];
    var _c = useState(''), errorMessage = _c[0], setErrorMessage = _c[1];
    var _d = useState({}), data = _d[0], setData = _d[1];
    var controller = new AbortController();
    return {
        data: data,
        meta: {
            isLoading: isLoading,
            isError: isError,
            errorMessage: errorMessage,
        },
        signal: controller.signal,
        actions: {
            startRequest: function () { return setIsLoading(true); },
            endRequest: function () { return setIsLoading(false); },
            abortRequest: function () { return controller.abort(); },
            setErrorState: function (message) {
                if (message === void 0) { message = ''; }
                setIsError(true);
                setErrorMessage(message);
            },
            setRequestData: function (data) { return setData(data); },
        },
    };
}
