"use client";

import { useEffect, useState } from "react";

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE?.replace(/\/$/, "") || "http://127.0.0.1:8000";

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, init);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${path}`);
  return res.json() as Promise<T>;
}

export interface ResourceState<T> {
  data: T | undefined;
  loading: boolean;
  error: Error | undefined;
  refetch: () => void;
}

/**
 * Lightweight fetch hook. Polls every `pollMs` if provided.
 * Replaces the useEffect+fetch ceremony repeated on every page.
 */
export function useResource<T>(
  path: string | null,
  opts: { pollMs?: number; initial?: T } = {},
): ResourceState<T> {
  const [data, setData] = useState<T | undefined>(opts.initial);
  const [loading, setLoading] = useState<boolean>(path !== null);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (path === null) return;
    let cancelled = false;
    const run = () => {
      api<T>(path)
        .then((d) => { if (!cancelled) { setData(d); setError(undefined); } })
        .catch((e) => { if (!cancelled) setError(e instanceof Error ? e : new Error(String(e))); })
        .finally(() => { if (!cancelled) setLoading(false); });
    };
    run();
    let id: ReturnType<typeof setInterval> | undefined;
    if (opts.pollMs) id = setInterval(run, opts.pollMs);
    return () => { cancelled = true; if (id) clearInterval(id); };
  }, [path, opts.pollMs, tick]);

  return { data, loading, error, refetch: () => setTick((t) => t + 1) };
}
