'use client';

import { motion } from 'framer-motion';
import { useTranslations } from '@/hooks/use-translations';

export default function CTASection() {
  const t = useTranslations();
  const headingLines = t.cta.heading.split('\n');

  return (
    <div className="relative overflow-hidden min-h-[320px] sm:min-h-[360px]">
      {/* Circuit fills entire section */}
      <CircuitPattern />

      {/* Dark gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/70" />

      {/* Content centered over the circuit */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-12 text-center z-10">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-heading-cta mb-3"
        >
          {headingLines[0]}<br />{headingLines[1]}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          viewport={{ once: true }}
        >
          <a href="/contact" className="btn-primary inline-flex">
            {t.cta.button}
            <span className="font-mono">→</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
}

function CircuitPattern() {
  return (
    <svg
      className="w-full h-full min-h-[320px] sm:min-h-[360px]"
      viewBox="0 0 800 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <filter id="particle-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="800" height="360" style={{ fill: 'rgb(var(--bg-elevated))' }} />

      {/* Grid */}
      {Array.from({ length: 19 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 44} y1="0" x2={i * 44} y2="360" style={{ stroke: 'rgb(var(--border) / var(--border-opacity, 0.08))' }} strokeWidth="0.5" />
      ))}
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 44} x2="800" y2={i * 44} style={{ stroke: 'rgb(var(--border) / var(--border-opacity, 0.08))' }} strokeWidth="0.5" />
      ))}

      {/* Left-side input traces → center CPU */}
      <path id="circuit-a" d="M0 88 H88 V176 H220 V132 H308" stroke="var(--primary-500)" strokeWidth="1.5" />
      <path id="circuit-b" d="M0 264 H132 V220 H308" stroke="var(--primary-500)" strokeWidth="1.5" />

      {/* Center CPU block (400,160) → right output traces */}
      <path id="circuit-c" d="M492 176 H580 V132 H712 V88 H800" stroke="var(--primary-500)" strokeWidth="1.5" />
      <path id="circuit-d" d="M492 220 H624 V264 H800" stroke="var(--primary-500)" strokeWidth="1.5" />

      {/* Top/bottom power rails — enter/exit CPU top (y=120) and bottom (y=240) */}
      <path id="circuit-e" d="M176 44 H352 V120" stroke="var(--primary-500)" strokeWidth="1" />
      <path id="circuit-f" d="M176 316 H352 V240" stroke="var(--primary-500)" strokeWidth="1" />
      <path id="circuit-g" d="M448 120 V44 H624" stroke="var(--primary-500)" strokeWidth="1" />
      <path id="circuit-h" d="M448 240 V316 H624" stroke="var(--primary-500)" strokeWidth="1" />

      {/* Particles — left inputs */}
      <circle r="2" fill="var(--primary-500)" filter="url(#particle-glow)">
        <animateMotion dur="3.5s" repeatCount="indefinite" begin="0s"><mpath href="#circuit-a" /></animateMotion>
      </circle>
      <circle r="1.5" fill="var(--primary-500)" filter="url(#particle-glow)">
        <animateMotion dur="3.5s" repeatCount="indefinite" begin="-1.75s"><mpath href="#circuit-a" /></animateMotion>
      </circle>
      <circle r="2" fill="var(--primary-500)" filter="url(#particle-glow)">
        <animateMotion dur="4s" repeatCount="indefinite" begin="-0.8s"><mpath href="#circuit-b" /></animateMotion>
      </circle>

      {/* Particles — right outputs */}
      <circle r="2" fill="var(--primary-500)" filter="url(#particle-glow)">
        <animateMotion dur="3.5s" repeatCount="indefinite" begin="-0.4s"><mpath href="#circuit-c" /></animateMotion>
      </circle>
      <circle r="1.5" fill="var(--primary-500)" filter="url(#particle-glow)">
        <animateMotion dur="3.5s" repeatCount="indefinite" begin="-2s"><mpath href="#circuit-c" /></animateMotion>
      </circle>
      <circle r="2" fill="var(--primary-500)" filter="url(#particle-glow)">
        <animateMotion dur="4s" repeatCount="indefinite" begin="-1.5s"><mpath href="#circuit-d" /></animateMotion>
      </circle>

      {/* Particles — top/bottom rails */}
      <circle r="1.5" fill="var(--primary-500)" filter="url(#particle-glow)">
        <animateMotion dur="5s" repeatCount="indefinite" begin="0s"><mpath href="#circuit-e" /></animateMotion>
      </circle>
      <circle r="1.5" fill="var(--primary-500)" filter="url(#particle-glow)">
        <animateMotion dur="5s" repeatCount="indefinite" begin="-2s"><mpath href="#circuit-f" /></animateMotion>
      </circle>
      <circle r="1.5" fill="var(--primary-500)" filter="url(#particle-glow)">
        <animateMotion dur="5s" repeatCount="indefinite" begin="-1s"><mpath href="#circuit-g" /></animateMotion>
      </circle>
      <circle r="1.5" fill="var(--primary-500)" filter="url(#particle-glow)" >
        <animateMotion dur="5s" repeatCount="indefinite" begin="-3s"><mpath href="#circuit-h" /></animateMotion>
      </circle>

      {/* Connection nodes */}
      {[
        [88, 176], [220, 176], [220, 132], [308, 132],
        [308, 220], [132, 220], [132, 264],
        [492, 176], [580, 176], [580, 132], [712, 132],
        [492, 220], [624, 220], [624, 264],
        [352, 88], [352, 264], [448, 88], [448, 264],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="3" style={{ fill: 'rgb(var(--bg-elevated))' }} stroke="var(--primary-500)" strokeWidth="1.5" />
          <circle cx={x} cy={y} r="1" fill="var(--primary-500)" />
        </g>
      ))}

      {/* Center CPU chip — content sits on top via absolute positioning */}
      <rect x="308" y="120" width="184" height="120" rx="4"
        style={{ fill: 'rgb(var(--bg-overlay))' }} stroke="var(--primary-500)" strokeWidth="1.5" />
      <rect x="316" y="128" width="168" height="104" rx="2"
        style={{ fill: 'rgb(var(--bg-elevated))', stroke: 'rgb(var(--border) / var(--border-opacity, 0.08))' }} strokeWidth="1" />

      {/* Pin marks on CPU sides */}
      {[140, 160, 180, 200, 220].map((y, i) => (
        <g key={`lpin-${i}`}>
          <line x1="296" y1={y} x2="308" y2={y} stroke="var(--primary-500)" strokeWidth="1" />
          <line x1="492" y1={y} x2="504" y2={y} stroke="var(--primary-500)" strokeWidth="1" />
        </g>
      ))}
      {[352, 376, 400, 424, 448].map((x, i) => (
        <g key={`tpin-${i}`}>
          <line x1={x} y1="108" x2={x} y2="120" stroke="var(--primary-500)" strokeWidth="1" />
          <line x1={x} y1="240" x2={x} y2="252" stroke="var(--primary-500)" strokeWidth="1" />
        </g>
      ))}

      {/* Small decorative labels */}
      <text x="20" y="82" fill="var(--primary-500)" fontSize="7" fontFamily="monospace" >IN_A</text>
      <text x="20" y="258" fill="var(--primary-500)" fontSize="7" fontFamily="monospace" >IN_B</text>
      <text x="724" y="82" fill="var(--primary-500)" fontSize="7" fontFamily="monospace" >OUT_A</text>
      <text x="724" y="258" fill="var(--primary-500)" fontSize="7" fontFamily="monospace" >OUT_B</text>
    </svg>
  );
}
