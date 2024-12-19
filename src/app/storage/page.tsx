"use client";

import { useSyncExternalStore } from "react";

const key = "storage-demo";

const useStorage = () => {
  const saveValue = (newValue: string) => {
    window.localStorage.setItem(key, newValue);
    window.dispatchEvent(new StorageEvent("storage"));
  };

  const getSnapshot = () => localStorage.getItem(key);

  const subscribe = (listener: () => void) => {
    window.addEventListener("storage", listener);

    return () => {
      window.removeEventListener("storage", listener);
    };
  };

  const store = useSyncExternalStore(subscribe, getSnapshot);

  return [store, saveValue] as const;
};

export default function Page() {
  return (
    <div className="flex flex-col gap-4 m-4 items-center">
      <StorageComponent />
      <StorageComponent />
    </div>
  );
}

const StorageComponent = () => {
  const [storedValue, saveValue] = useStorage();

  return (
    <div className="flex flex-col gap-4 p-6 items-center border-black border-2">
      <div>Value: {storedValue}</div>
      <input
        className="px-4 py-2 border-blue border-2 text-black font-semibold rounded"
        onChange={(e) => saveValue(e.target.value ?? "")}
      ></input>
    </div>
  );
};
