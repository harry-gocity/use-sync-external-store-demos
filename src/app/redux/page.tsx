"use client";

import { useSyncExternalStore } from "react";

type State = number;
type Selector = (state: State) => number;

const createStore = (initialState: number) => {
  let state: State = initialState;
  const listeners = new Set<() => void>();

  return {
    getState: () => {
      return state;
    },
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    dispatch: (action: "INCREMENT" | "DECREMENT") => {
      state = reducer(state, action);
      listeners.forEach((listener) => listener());
    },
  };
};

const reducer = (state: State, action: "INCREMENT" | "DECREMENT") => {
  switch (action) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      throw Error("Something has gone seriously wrong");
  }
};

const store = createStore(0);

const useStore = (selector: Selector) => {
  const getSnapshot = () => selector(store.getState());

  return useSyncExternalStore(store.subscribe, getSnapshot);
};

export default function Page() {
  return (
    <div className="flex flex-col gap-4 m-4 items-center">
      <StoreComponent />
      <StoreComponent />
    </div>
  );
}

const StoreComponent = () => {
  const count = useStore((state) => state);

  return (
    <div className="flex flex-col gap-4 p-6 items-center border-black border-2">
      <div>Count: {count}</div>
      <button
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        onClick={() => store.dispatch("INCREMENT")}
      >
        Increment
      </button>
      <button
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        onClick={() => store.dispatch("DECREMENT")}
      >
        Decrement
      </button>
    </div>
  );
};
