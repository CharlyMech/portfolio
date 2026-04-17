'use client';

import { lazy, Suspense, useState, useEffect, useMemo, useRef } from 'react';
import type { GitHubContributionDay } from '@/core/models/github';
import { useContributionsStore } from '@/stores/contributionsStore';
import { useThemeStore } from '@/stores/themeStore';
import { useLocaleStore } from '@/stores/localeStore';

const ReactECharts = lazy(() => import('echarts-for-react'));

function buildFullYearData(
  contributions: GitHubContributionDay[],
  year: number,
): [string, number][] {
  const known = new Map(contributions.map((d) => [d.date, d.count]));
  const result: [string, number][] = [];
  const d = new Date(`${year}-01-01T00:00:00`);
  const end = new Date(`${year}-12-31T00:00:00`);
  while (d <= end) {
    const iso = d.toISOString().slice(0, 10);
    result.push([iso, known.get(iso) ?? 0]);
    d.setDate(d.getDate() + 1);
  }
  return result;
}

interface Props {
  initialContributions: GitHubContributionDay[];
  initialYear: number;
  selectedYear: number;
}

function getCSSVar(name: string): string {
  const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  // Channel vars (e.g. "39 39 39") need rgb() wrapping for ECharts
  return /^\d+\s+\d+\s+\d+$/.test(val) ? `rgb(${val})` : val;
}

export function ContributionHeatmap({ initialContributions, initialYear, selectedYear }: Props) {
  const [mounted, setMounted] = useState(false);
  const outerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(800);

  const { byYear, loadingYear, fetchYear } = useContributionsStore();
  const { theme } = useThemeStore();
  const { locale } = useLocaleStore();

  useEffect(() => {
    setMounted(true);
    if (!outerRef.current) return;
    const ro = new ResizeObserver(([e]) => setContainerWidth(e.contentRect.width));
    ro.observe(outerRef.current);
    return () => ro.disconnect();
  }, []);

  const chartColors = useMemo(() => {
    if (!mounted) return {
      emptyCell: '#1e1e1e',
      tooltipBg: '#272727',
      tooltipBorder: 'rgba(255,255,255,0.08)',
      tooltipText: '#f0f0f0',
      labelColor: '#555555',
      primary200: '#bfdbfe',
      primary400: '#60a5fa',
      primary600: '#2563eb',
      primary800: '#1e40af',
    };
    const isDark = theme === 'dark';
    return {
      emptyCell: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)',
      tooltipBg: getCSSVar('--bg-surface'),
      tooltipBorder: (() => {
        const ch = getComputedStyle(document.documentElement).getPropertyValue('--border').trim();
        const op = getComputedStyle(document.documentElement).getPropertyValue('--border-opacity').trim() || '0.08';
        return `rgb(${ch} / ${op})`;
      })(),
      tooltipText: getCSSVar('--foreground'),
      labelColor: getCSSVar('--foreground-muted'),
      primary200: getCSSVar('--primary-200'),
      primary400: getCSSVar('--primary-400'),
      primary600: getCSSVar('--primary-600'),
      primary800: getCSSVar('--primary-800'),
    };
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted) return;
    if (selectedYear !== initialYear && !byYear[selectedYear]) {
      fetchYear(selectedYear);
    }
  }, [selectedYear, mounted]);

  const contributions: GitHubContributionDay[] =
    selectedYear === initialYear && !byYear[selectedYear]
      ? initialContributions
      : (byYear[selectedYear] ?? []);

  const isLoading = loadingYear === selectedYear;

  const dateFormatter = useMemo(() => {
    const localeTag = locale === 'es' ? 'es-ES' : 'en-US';
    return new Intl.DateTimeFormat(localeTag, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, [locale]);

  const option = useMemo(() => {
    const data = buildFullYearData(contributions, selectedYear);
    const maxCount = Math.max(...contributions.map((d) => d.count), 1);

    const labelLeft = 30;
    const labelRight = 10;
    const cellSize = Math.max(
      10,
      Math.floor((containerWidth - labelLeft - labelRight) / 53) - 2,
    );
    const radius = Math.max(2, Math.floor(cellSize * 0.1));
    const gap = Math.max(2, Math.floor(cellSize * 0.15));

    const t1 = Math.ceil(maxCount * 0.25);
    const t2 = Math.ceil(maxCount * 0.5);
    const t3 = Math.ceil(maxCount * 0.75);

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        backgroundColor: chartColors.tooltipBg,
        borderColor: chartColors.tooltipBorder,
        textStyle: { color: chartColors.tooltipText, fontSize: 11, fontFamily: 'JetBrains Mono, monospace' },
        formatter: (params: { value: [string, number] }) => {
          const [dateStr, count] = params.value;
          const formatted = dateFormatter.format(new Date(dateStr + 'T00:00:00'));
          return `<span style="font-family:JetBrains Mono,monospace;font-size:11px">${formatted}<br/><b>${count}</b> contribution${count !== 1 ? 's' : ''}</span>`;
        },
        extraCssText: 'border-radius:4px;padding:6px 10px;',
      },
      visualMap: {
        show: false,
        type: 'piecewise',
        pieces: [
          { value: 0, color: chartColors.emptyCell },
          { gte: 1, lte: t1, color: chartColors.primary200 },
          { gte: t1 + 1, lte: t2, color: chartColors.primary400 },
          { gte: t2 + 1, lte: t3, color: chartColors.primary600 },
          { gte: t3 + 1, color: chartColors.primary800 },
        ],
      },
      calendar: {
        top: 20,
        left: labelLeft,
        right: labelRight,
        cellSize: [cellSize, cellSize],
        range: [`${selectedYear}-01-01`, `${selectedYear}-12-31`],
        itemStyle: {
          borderWidth: gap,
          borderColor: 'transparent',
          borderRadius: radius,
          color: chartColors.emptyCell,
        },
        yearLabel: { show: false },
        monthLabel: {
          color: chartColors.labelColor,
          fontSize: 10,
          fontFamily: 'Space Grotesk Variable, sans-serif',
        },
        dayLabel: {
          color: chartColors.labelColor,
          fontSize: 9,
          firstDay: 1,
          nameMap: ['', 'Mon', '', 'Wed', '', 'Fri', ''],
          fontFamily: 'Space Grotesk Variable, sans-serif',
        },
        splitLine: { show: false },
      },
      series: [
        {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data,
          itemStyle: { borderRadius: radius },
        },
      ],
    };
  }, [contributions, chartColors, selectedYear, dateFormatter, containerWidth]);

  const cellSize = Math.max(10, Math.floor((containerWidth - 40) / 53) - 2);
  const chartHeight = cellSize * 7 + 28;
  const skeleton = <div style={{ height: `${chartHeight}px` }} className="animate-pulse rounded-xs bg-surface" />;

  const legendColors = [
    chartColors.emptyCell,
    chartColors.primary200,
    chartColors.primary400,
    chartColors.primary600,
    chartColors.primary800,
  ];
  const legendRadius = Math.max(2, Math.floor(cellSize * 0.3));

  const legend = (
    <div className="flex items-center justify-end gap-1.5 flex-shrink-0">
      <span className="text-[9px] font-mono text-foreground-muted uppercase tracking-wider">Less</span>
      {legendColors.map((color, i) => (
        <span
          key={i}
          style={{ backgroundColor: color, width: cellSize, height: cellSize, borderRadius: legendRadius }}
          className="inline-block flex-shrink-0"
        />
      ))}
      <span className="text-[9px] font-mono text-foreground-muted uppercase tracking-wider">More</span>
    </div>
  );

  if (!mounted) return (
    <div ref={outerRef} className="flex flex-col gap-2">
      <div>{skeleton}</div>
      {legend}
    </div>
  );

  return (
    <div ref={outerRef} className="flex flex-col gap-2">
      <div className="overflow-x-auto">
        <div ref={containerRef} style={{ minWidth: 600 }}>
          {isLoading ? (
            skeleton
          ) : (
            <Suspense fallback={skeleton}>
              <ReactECharts
                option={option}
                style={{ height: `${chartHeight}px`, width: '100%' }}
                opts={{ renderer: 'canvas', width: 'auto' }}
              />
            </Suspense>
          )}
        </div>
      </div>
      {legend}
    </div>
  );
}
