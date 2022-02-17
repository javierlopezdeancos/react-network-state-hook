# React Network State Hook

A react hook to handle your network requests state.

## Activity

[![License](https://img.shields.io/github/license/javierlopezdeancos/react-network-state-hook?style=flat-square)](LICENSE)
![GitHub issues](https://img.shields.io/github/issues-raw/javierlopezdeancos/react-network-state-hook?style=flat)
![GitHub all releases](https://img.shields.io/github/downloads/javierlopezdeancos/react-network-state-hook/total)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/javierlopezdeancos/react-network-state-hook/publish-react-network-state-hook-in-npm-on-release)
![npm](https://img.shields.io/npm/v/react-network-state-hook)

## Use example

### useFetchFromMyApi.hook.ts

```ts
import { useNetworkState, UseNetworkStateReturn } from 'useNetworkSate'

type UseFetchFromMyApiReturn = {
  data: unknown,
  meta: {
    isLoading: boolean,
    isError: boolean,
    errorMessage: string,
  },
  fetchFromMyApiExampleByName: (name: string) => UseNetworkStateReturn,
}

export default function useFetchFromMyApi():UseFetchFromMyApiReturn {
  const { data, meta, actions, signal } = useNetworkState();

  const fetchFromMyApiExample = async (name = 'defaultName') => {
    actions.startRequest();

    try {
      const response = await fetch(`https://my-api.com/?name=${name}`, signal);
    } catch (error) {
      actions.setErrorState(error);
    } finally {
      actions.endRequest();
    }
  }

  return {data, meta, fetchFromMyApiExampleByName}
}
```

### App.component.ts

```tsx
import { useEffect } from 'react'
import useFetchFromMyApi from './useFetchFromMyApi'

export default function App() {
  const { data, meta, fetchFromMyApiExampleByName } = useFetchFromMyApi();

  useEffect(() => {
    fetchFromMyApiExampleByName('Rick');
  }, [])

  if (meta.isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>data: {JSON.stringify(data, null)}</div>
  )
}
```
