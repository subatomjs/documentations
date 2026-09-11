"use client";

import { useState } from "react";

function readSessionStorageValue<T>(key: string, initialValue: T): T {
  if (typeof window === "undefined") {
    return initialValue;
  }
  try {
    const item = window.sessionStorage.getItem(key);
    return item !== null ? JSON.parse(item) : initialValue;
  } catch (error) {
    console.warn(`Error reading sessionStorage key "${key}":`, error);
    return initialValue;
  }
}

export function useSessionStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((val: T) => T)) => void] {
  // Initialize lazily so sessionStorage is read without a follow-up state update.
  const [storedValue, setStoredValue] = useState<T>(() =>
    readSessionStorageValue(key, initialValue),
  );

  // Setter function to update both React state and sessionStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting sessionStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
