import { useState } from 'react';
export default function useNetworkState() {
    var _a = useState(false), loading = _a[0], setLoading = _a[1];
    var _b = useState(false), error = _b[0], setError = _b[1];
    var _c = useState(''), errorMessage = _c[0], setErrorMessage = _c[1];
    var _d = useState(), data = _d[0], setData = _d[1];
    var _e = useState(new AbortController()), controller = _e[0], setController = _e[1];
    var resetSignal = function () {
        setController(new AbortController());
    };
    return {
        data: data,
        meta: {
            loading: loading,
            error: error,
            errorMessage: errorMessage,
        },
        signal: controller.signal,
        actions: {
            start: function () { return setLoading(true); },
            end: function () { return setLoading(false); },
            abort: function () {
                controller.abort();
                setLoading(false);
            },
            resetError: function () {
                setError(false);
                setErrorMessage('');
            },
            setError: function (message) {
                if (message === void 0) { message = ''; }
                setLoading(false);
                setError(true);
                setErrorMessage(message);
            },
            setLoading: function (loading) { return setLoading(loading); },
            setData: function (data) { return setData(data); },
            resetSignal: function () { return resetSignal(); },
            setController: function (controller) { return setController(controller); },
        },
    };
}
