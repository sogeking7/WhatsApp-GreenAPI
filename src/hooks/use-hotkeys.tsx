import { useEffect, useRef } from "react";

type CombinationKey = "alt" | "ctrl" | "meta" | "shift";

export const useHotkeys = (
  key: string,
  combinationKey: CombinationKey | null,
  callback: (event: KeyboardEvent) => void,
) => {
  const callbackRef = useRef(callback);
  const keyRef = useRef(key);
  const comboKeyRef = useRef(combinationKey);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (
        (!comboKeyRef.current || (event as any)[`${comboKeyRef.current}Key`]) &&
        event.key === keyRef.current
      ) {
        callbackRef.current(event);
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);
};
