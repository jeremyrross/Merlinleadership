"use client";

import { useCallback, useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile: {
      render: (
        container: string | HTMLElement,
        options: Record<string, unknown>
      ) => string;
      reset: (widgetId: string) => void;
      execute: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

let scriptPromise: Promise<void> | null = null;

// Loads the Turnstile script once per page session. Works on client-side
// navigation too, where next/script's onLoad would not fire a second time.
function loadTurnstile(): Promise<void> {
  if (typeof window !== "undefined" && window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error("Turnstile failed to load"));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

/**
 * Renders an invisible-unless-needed Turnstile widget into the returned ref
 * and gives back getToken(), which runs a fresh challenge at submit time.
 * Asking at submit time means the token is never stale or already used,
 * even if the visitor spends ten minutes writing their message.
 */
export function useTurnstile() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetId = useRef<string | null>(null);
  const pending = useRef<{
    resolve: (token: string) => void;
    reject: (err: Error) => void;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadTurnstile()
      .then(() => {
        if (cancelled || !containerRef.current || widgetId.current) return;
        widgetId.current = window.turnstile.render(containerRef.current, {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
          theme: "light",
          appearance: "interaction-only",
          execution: "execute",
          callback: (token: string) => {
            pending.current?.resolve(token);
            pending.current = null;
          },
          "error-callback": (code: string) => {
            pending.current?.reject(new Error(`Turnstile error ${code}`));
            pending.current = null;
            return true;
          },
        });
      })
      .catch(() => {
        // Surfaced at submit time by getToken().
      });
    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current);
      }
      widgetId.current = null;
    };
  }, []);

  const getToken = useCallback(async (): Promise<string> => {
    await loadTurnstile();
    // Give the render effect a moment if the script only just arrived.
    for (let i = 0; i < 20 && !widgetId.current; i++) {
      await new Promise((r) => setTimeout(r, 100));
    }
    const id = widgetId.current;
    if (!id) throw new Error("Turnstile not ready");

    return new Promise<string>((resolve, reject) => {
      // Allow time for a visitor who has to tick the checkbox.
      const timer = setTimeout(() => {
        pending.current = null;
        reject(new Error("Turnstile timed out"));
      }, 90_000);
      pending.current = {
        resolve: (t) => {
          clearTimeout(timer);
          resolve(t);
        },
        reject: (e) => {
          clearTimeout(timer);
          reject(e);
        },
      };
      window.turnstile.reset(id);
      window.turnstile.execute(id);
    });
  }, []);

  return { containerRef, getToken };
}
