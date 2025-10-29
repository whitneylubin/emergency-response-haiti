'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const LITE_COOKIE = process.env.NEXT_PUBLIC_LITE_COOKIE ?? 'supporthaiti_lite';

interface LiteContextValue {
  lite: boolean;
  setLite: (next: boolean) => void;
  suggested: boolean;
  dismissSuggestion: () => void;
}

const LiteContext = createContext<LiteContextValue | undefined>(undefined);

export function LiteProvider({ children }: { children: React.ReactNode }) {
  const [lite, setLiteState] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return document.cookie.includes(`${LITE_COOKIE}=1`) || localStorage.getItem(LITE_COOKIE) === '1';
  });
  const [suggested, setSuggested] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const connection = (navigator as any).connection;
    if (connection && (connection.downlink < 1.2 || ['2g', 'slow-2g'].includes(connection.effectiveType))) {
      setLite(true);
      setSuggested(true);
    }
  }, []);

  const setLite = useCallback((next: boolean) => {
    setLiteState(next);
    if (typeof document !== 'undefined') {
      document.cookie = `${LITE_COOKIE}=${next ? '1' : '0'};path=/;max-age=31536000`;
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(LITE_COOKIE, next ? '1' : '0');
    }
  }, []);

  const dismissSuggestion = useCallback(() => setSuggested(false), []);

  const value = useMemo(() => ({ lite, setLite, suggested, dismissSuggestion }), [lite, suggested, setLite, dismissSuggestion]);

  return <LiteContext.Provider value={value}>{children}</LiteContext.Provider>;
}

export function useLiteMode() {
  const ctx = useContext(LiteContext);
  if (!ctx) throw new Error('useLiteMode must be used within LiteProvider');
  return ctx;
}

export function LiteGuard({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  const { lite } = useLiteMode();
  if (lite) return <>{fallback ?? null}</>;
  return <>{children}</>;
}
