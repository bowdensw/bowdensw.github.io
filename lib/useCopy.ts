"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Copy text to the clipboard and report success for a moment afterwards.
 *
 * There is no execCommand fallback. `navigator.clipboard` is defined in every
 * secure context, the site is HTTPS on GitHub Pages, and localhost counts as
 * secure, so the 26 lines that used to sit here only ever ran on plain-HTTP
 * LAN testing, which is not a thing this site does.
 */
export function useCopy(resetAfter = 1800) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(
    async (key: string, text: string) => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        return; // Permission denied. Leave the button in its resting state.
      }
      setCopiedKey(key);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopiedKey(null), resetAfter);
    },
    [resetAfter],
  );

  return { copiedKey, copy };
}
