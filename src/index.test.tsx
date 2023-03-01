/** @jest-environment jsdom */
import React from 'react';
import { screen, fireEvent, render } from '@testing-library/react';
import useNetworkState from './index';
import '@testing-library/jest-dom';

const BUTTON_START_DATA_TEST_ID = 'actions-start-test';
const BUTTON_END_DATA_TEST_ID = 'actions-end-test';
const BUTTON_ABORT_DATA_TEST_ID = 'actions-abort-test';
const BUTTON_RESET_ERROR_DATA_TEST_ID = 'actions-reset-error-test';
const BUTTON_SET_ERROR_DATA_TEST_ID = 'actions-set-error-test';
const BUTTON_SET_LOADING_DATA_TEST_ID = 'actions-set-loading-test';
const BUTTON_SET_DATA_DATA_TEST_ID = 'actions-set-data-test';
const BUTTON_RESET_SIGNAL_DATA_TEST_ID = 'actions-reset-signal-test';
const BUTTON_SET_CONTROLLER_DATA_TEST_ID = 'actions-set-controller-test';
const DATA_MOCK = 'data-mock';
const ERROR_MOCK = 'error-mock';
const LOADING_MOCK = 'loading-mock';
const DATA_TEST_ID = 'data-test';
const ERROR_TEST_ID = 'loading-test';
const LOADING_TEST_ID = 'error-test';

interface Props {
  controller?: AbortController;
}

function UseNetworkStateExampleMock({ controller }: Props) {
  const { data, meta, signal, actions } = useNetworkState<string>();

  return (
    <>
      {meta?.loading && <span data-testid={LOADING_TEST_ID}>{LOADING_MOCK}</span>}
      {meta?.error && <span data-testid={ERROR_TEST_ID}>{ERROR_MOCK}</span>}
      {data && <span data-testid={DATA_TEST_ID}>{data}</span>}
      {(signal as AbortSignal) && <span>There are an abort signal</span>}
      <button onClick={actions.start} data-testid={BUTTON_START_DATA_TEST_ID}>
        start
      </button>
      <button onClick={actions.end} data-testid={BUTTON_END_DATA_TEST_ID}>
        end
      </button>
      <button onClick={actions.abort} data-testid={BUTTON_ABORT_DATA_TEST_ID}>
        abort
      </button>
      <button onClick={actions.resetError} data-testid={BUTTON_RESET_ERROR_DATA_TEST_ID}>
        reset error
      </button>
      <button
        onClick={() => {
          actions.setError(ERROR_MOCK);
        }}
        data-testid={BUTTON_SET_ERROR_DATA_TEST_ID}
      >
        set error
      </button>
      <button onClick={actions.start} data-testid={BUTTON_SET_LOADING_DATA_TEST_ID}>
        set loading
      </button>
      <button
        onClick={() => {
          actions.setData(DATA_MOCK);
        }}
        data-testid={BUTTON_SET_DATA_DATA_TEST_ID}
      >
        set data
      </button>
      <button onClick={actions.resetSignal} data-testid={BUTTON_RESET_SIGNAL_DATA_TEST_ID}>
        reset signal
      </button>
      <button
        onClick={() => {
          if (controller) actions.setController(controller);
        }}
        data-testid={BUTTON_SET_CONTROLLER_DATA_TEST_ID}
      >
        set controller
      </button>
    </>
  );
}

test('should set data', () => {
  render(<UseNetworkStateExampleMock />);

  const setDataButtonNode = screen.getByTestId(BUTTON_SET_DATA_DATA_TEST_ID);
  fireEvent.click(setDataButtonNode);

  const dataNode = screen.getByTestId(DATA_TEST_ID);

  expect(dataNode).toBeDefined();
  expect(dataNode).toHaveTextContent(DATA_MOCK);
});

test('should reset and set an error', () => {
  render(<UseNetworkStateExampleMock />);

  const setErrorButtonNode = screen.getByTestId(BUTTON_SET_ERROR_DATA_TEST_ID);
  fireEvent.click(setErrorButtonNode);

  const errorNode = screen.getByTestId(ERROR_TEST_ID);

  expect(errorNode).toBeDefined();
  expect(errorNode).toHaveTextContent(ERROR_MOCK);

  const resetErrorButtonNode = screen.getByTestId(BUTTON_RESET_ERROR_DATA_TEST_ID);
  fireEvent.click(resetErrorButtonNode);

  expect(screen.queryByTestId(ERROR_TEST_ID)).not.toBeInTheDocument();
});

test('should set loading', () => {
  render(<UseNetworkStateExampleMock />);

  const setLoadingButtonNode = screen.getByTestId(BUTTON_SET_LOADING_DATA_TEST_ID);
  fireEvent.click(setLoadingButtonNode);

  const loadingNode = screen.getByTestId(LOADING_TEST_ID);

  expect(loadingNode).toBeDefined();
  expect(loadingNode).toHaveTextContent(LOADING_MOCK);
});

test('should set the start state', () => {
  render(<UseNetworkStateExampleMock />);

  const startButtonNode = screen.getByTestId(BUTTON_START_DATA_TEST_ID);
  fireEvent.click(startButtonNode);

  const loadingNode = screen.getByTestId(LOADING_TEST_ID);

  expect(loadingNode).toBeDefined();
  expect(loadingNode).toHaveTextContent(LOADING_MOCK);
});

jest.fn(() => Promise.resolve(DATA_MOCK));

test('should set the end state', () => {
  render(<UseNetworkStateExampleMock />);

  const endButtonNode = screen.getByTestId(BUTTON_END_DATA_TEST_ID);
  fireEvent.click(endButtonNode);

  expect(screen.queryByTestId(LOADING_TEST_ID)).not.toBeInTheDocument();
});

test('should abort a controller', () => {
  const c = new AbortController();

  render(<UseNetworkStateExampleMock controller={c} />);

  const setControllerButtonNode = screen.getByTestId(BUTTON_SET_CONTROLLER_DATA_TEST_ID);
  fireEvent.click(setControllerButtonNode);

  const abortButtonNode = screen.getByTestId(BUTTON_ABORT_DATA_TEST_ID);
  fireEvent.click(abortButtonNode);

  expect(c.signal.aborted).toBe(true);
  expect(screen.queryByTestId(LOADING_TEST_ID)).not.toBeInTheDocument();
});

test('should reset the signal with a new one', () => {
  const c = new AbortController();

  render(<UseNetworkStateExampleMock controller={c} />);

  const setControllerButtonNode = screen.getByTestId(BUTTON_SET_CONTROLLER_DATA_TEST_ID);
  fireEvent.click(setControllerButtonNode);

  const resetSignalButtonNode = screen.getByTestId(BUTTON_RESET_SIGNAL_DATA_TEST_ID);
  fireEvent.click(resetSignalButtonNode);

  const abortButtonNode = screen.getByTestId(BUTTON_ABORT_DATA_TEST_ID);
  fireEvent.click(abortButtonNode);

  expect(c.signal.aborted).toBe(false);
});
