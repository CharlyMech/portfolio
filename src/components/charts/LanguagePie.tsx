'use client';

import { lazy, Suspense, useState, useEffect } from 'react';
import { Skeleton } from 'boneyard-js/react';
import type { GitHubLanguageStat } from '@/core/models/github';

const ReactECharts = lazy(() => import('echarts-for-react'));

interface Props {
  languages: GitHubLanguageStat[];
}

export function LanguagePie({ languages }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const data = languages.map((l) => ({
    name: l.name,
    value: l.count,
    itemStyle: { color: l.color || '#6b7280' },
  }));

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {d}%',
      backgroundColor: '#1a1a1a',
      borderColor: 'rgba(255,255,255,0.08)',
      textStyle: { color: '#f0f0f0', fontSize: 12 },
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
        color: '#a0a0a0',
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
            color: '#f0f0f0',
            fontFamily: 'Space Grotesk Variable, sans-serif',
          },
          scale: true,
          scaleSize: 6,
        },
        data,
      },
    ],
  };

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
