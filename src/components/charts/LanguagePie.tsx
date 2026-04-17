'use client';

import { lazy, Suspense, useState, useEffect, useMemo } from 'react';
import { Skeleton } from 'boneyard-js/react';
import type { GitHubLanguageStat } from '@/core/models/github';
import { useThemeStore } from '@/stores/themeStore';

const ReactECharts = lazy(() => import('echarts-for-react'));

interface Props {
  languages: GitHubLanguageStat[];
}

function getCSSVar(name: string): string {
  const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return /^\d+\s+\d+\s+\d+$/.test(val) ? `rgb(${val})` : val;
}

export function LanguagePie({ languages }: Props) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useThemeStore();

  useEffect(() => { setMounted(true); }, []);

  const tooltipColors = useMemo(() => {
    if (!mounted) return { bg: '#272727', border: 'rgba(255,255,255,0.08)', text: '#f0f0f0' };
    return {
      bg: getCSSVar('--bg-surface'),
      border: (() => {
        const s = getComputedStyle(document.documentElement);
        const ch = s.getPropertyValue('--border').trim();
        const op = s.getPropertyValue('--border-opacity').trim() || '0.08';
        return `rgb(${ch} / ${op})`;
      })(),
      text: getCSSVar('--foreground'),
    };
  }, [theme, mounted]);

  const option = useMemo(() => {
    const data = languages.map((l) => ({
      name: l.name,
      value: l.count,
      itemStyle: { color: l.color || '#6b7280' },
    }));

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {d}%',
        backgroundColor: tooltipColors.bg,
        borderColor: tooltipColors.border,
        textStyle: { color: tooltipColors.text, fontSize: 12 },
      },
      legend: {
        orient: 'vertical',
        right: 0,
        top: 'middle',
        icon: 'circle',
        itemWidth: 7,
        itemHeight: 7,
        itemGap: 12,
        formatter: (name: string) => {
          const lang = languages.find((l) => l.name === name);
          return lang ? `${name} ${lang.percentage}%` : name;
        },
        textStyle: {
          color: tooltipColors.text,
          fontSize: 10,
          fontFamily: 'Space Grotesk Variable, sans-serif',
        },
      },
      series: [
        {
          type: 'pie',
          radius: ['45%', '70%'],
          center: ['35%', '50%'],
          avoidLabelOverlap: false,
          label: { show: false },
          labelLine: { show: false },
          emphasis: {
            label: {
              show: true,
              fontSize: 12,
              fontWeight: 'bold',
              color: tooltipColors.text,
              fontFamily: 'Space Grotesk Variable, sans-serif',
            },
            scale: true,
            scaleSize: 6,
          },
          data,
        },
      ],
    };
  }, [languages, tooltipColors]);

  return (
    <Skeleton name="language-pie" loading={!mounted} className='w-full'>
      <Suspense fallback={<Skeleton name="language-pie" loading><div style={{ height: '260px' }} /></Skeleton>}>
        <ReactECharts
          option={option}
          style={{ height: '260px', width: '100%' }}
          opts={{ renderer: 'svg' }}
        />
      </Suspense>
    </Skeleton>
  );
}
