'use client';

import { useEffect } from 'react';

const LAST_RELOAD_KEY = 'bigbangmadevip:chunk-reload-at';
const RELOAD_COOLDOWN_MS = 60_000;

function isChunkLoadFailure(value: unknown) {
  const message =
    value instanceof Error
      ? `${value.name} ${value.message}`
      : typeof value === 'string'
        ? value
        : '';

  return /ChunkLoadError|Loading chunk|Failed to fetch dynamically imported module|Importing a module script failed|_next\/static\/(chunks|css)/i.test(
    message,
  );
}

export function ChunkLoadRecovery() {
  useEffect(() => {
    const reloadOnce = () => {
      const lastReloadAt = Number(sessionStorage.getItem(LAST_RELOAD_KEY) ?? 0);

      if (Date.now() - lastReloadAt < RELOAD_COOLDOWN_MS) return;

      sessionStorage.setItem(LAST_RELOAD_KEY, String(Date.now()));
      window.location.reload();
    };

    const handleError = (event: ErrorEvent | Event) => {
      if (
        event.target instanceof HTMLScriptElement &&
        event.target.src.includes('/_next/static/')
      ) {
        reloadOnce();
        return;
      }

      if (
        event instanceof ErrorEvent &&
        (isChunkLoadFailure(event.error) ||
          isChunkLoadFailure(event.message) ||
          isChunkLoadFailure(event.filename))
      ) {
        reloadOnce();
      }
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      if (isChunkLoadFailure(event.reason)) reloadOnce();
    };

    window.addEventListener('error', handleError, true);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('error', handleError, true);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  return null;
}

