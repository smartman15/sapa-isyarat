"use client";

import { useRef, useCallback, useEffect } from "react";

type UseGestureBufferOptions = {
  /** Number of consecutive matching predictions required to confirm a gesture. */
  threshold?: number;
  /** Called once when a gesture is confirmed. */
  onGesture: (label: string) => void;
};

/**
 * Accumulates consecutive predictions from the backend.
 * Fires onGesture exactly once when the same label is predicted
 * `threshold` times in a row, then resets.
 *
 * Returns a `pushLabel` function to call on each backend response.
 */
export function useGestureBuffer({
  threshold = 10,
  onGesture,
}: UseGestureBufferOptions) {
  const currentLabelRef = useRef<string>("");
  const countRef = useRef<number>(0);
  const firedRef = useRef<boolean>(false);

  const onGestureRef = useRef(onGesture);

  // Keep callback ref in sync to avoid stale closures in pushLabel
  useEffect(() => {
    onGestureRef.current = onGesture;
  }, [onGesture]);


  const pushLabel = useCallback(
    (label: string) => {
      if (label === currentLabelRef.current) {
        countRef.current += 1;
        if (countRef.current >= threshold && !firedRef.current) {
          firedRef.current = true;
          onGestureRef.current(label);
        }
      } else {
        // Label changed — reset buffer
        currentLabelRef.current = label;
        countRef.current = 1;
        firedRef.current = false;
      }
    },
    [threshold]
  );

  const reset = useCallback(() => {
    currentLabelRef.current = "";
    countRef.current = 0;
    firedRef.current = false;
  }, []);

  return { pushLabel, reset };
}
