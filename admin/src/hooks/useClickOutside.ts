/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useEventListener } from "./useEventListener";

export function useClickOutside(
  ref: React.RefObject<any> | Array<React.RefObject<any>>,
  handler: (e: Event) => any,
  event = "mousedown"
) {
  useEventListener(event, (event) => {
    if (Array.isArray(ref)) {
      const els = ref.map((r) => r.current);
      if (els.some((el) => el && el.contains(event.target))) {
        return;
      }
    } else {
      const el = ref?.current;

      if (!el || el.contains(event.target)) {
        return;
      }
    }

    handler(event);
  });
}
