'use client';

import { useEffect, useId, useMemo } from 'react';

type AfriAdsSlotProps = {
  zoneId: number;
  websiteId: number;
  label?: string;
  format?: 'leaderboard' | 'billboard' | 'rectangle' | 'native';
  className?: string;
};

declare global {
  interface Window {
    AfriAds?: {
      loadAd: (config: { zoneId: number; websiteId: number; containerId: string }) => void;
    };
    __afriAdsWidgetLoading?: Promise<void>;
  }
}

const widgetUrl = process.env.NEXT_PUBLIC_AFRIADS_WIDGET_URL;

export default function AfriAdsSlot({
  zoneId,
  websiteId,
  label = 'Sponsored',
  format = 'leaderboard',
  className = '',
}: AfriAdsSlotProps) {
  const reactId = useId();
  const containerId = useMemo(
    () => `afriads-zone-${zoneId}-${reactId.replace(/[^a-zA-Z0-9_-]/g, '')}`,
    [reactId, zoneId]
  );

  useEffect(() => {
    if (!widgetUrl) return;

    const loadWidget = () => {
      if (window.AfriAds) return Promise.resolve();
      if (window.__afriAdsWidgetLoading) return window.__afriAdsWidgetLoading;

      window.__afriAdsWidgetLoading = new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = widgetUrl;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load AfriAds widget'));
        document.head.appendChild(script);
      });

      return window.__afriAdsWidgetLoading;
    };

    loadWidget()
      .then(() => {
        window.AfriAds?.loadAd({ zoneId, websiteId, containerId });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [containerId, websiteId, zoneId]);

  return (
    <section className={`w-full px-4 py-10 sm:px-6 ${className}`} aria-label="Advertisement">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            {label}
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
            AfriAds
          </span>
        </div>
        <div
          id={containerId}
          className={`group relative flex w-full items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 text-slate-400 shadow-sm transition hover:border-slate-300 ${slotSize[format]}`}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(15,23,42,0.08),transparent_32%)]" />
          <div className="relative text-center">
            <p className="text-sm font-semibold text-slate-500">Advertisement</p>
            <p className="mt-1 text-xs text-slate-400">
              {widgetUrl ? 'Loading verified placement...' : 'Placement ready for live campaigns'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const slotSize = {
  leaderboard: 'min-h-[110px]',
  billboard: 'min-h-[220px]',
  rectangle: 'mx-auto max-w-[420px] min-h-[300px]',
  native: 'min-h-[180px]',
};
