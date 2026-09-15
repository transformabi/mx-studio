'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Code2, Compass, PenTool, Rocket } from 'lucide-react';

const icons = [Compass, PenTool, Code2, Rocket];

const stepVariants = {
  dim: { opacity: 0.4 },
  lit: { opacity: 1 },
};
const iconVariants = {
  dim: { backgroundColor: 'rgba(255,255,255,0.04)', color: '#ffffff', scale: 1 },
  lit: { backgroundColor: '#c6ff3b', color: '#000000', scale: 1.08 },
};

export function ProcessTimeline({ steps }: { steps: { title: string; duration: string; text: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 55%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div ref={ref} className="relative">
      <div aria-hidden className="absolute bottom-10 left-7 top-10 w-px bg-white/10" />
      <motion.div
        aria-hidden
        style={{ scaleY }}
        className="absolute bottom-10 left-7 top-10 w-px origin-top bg-gradient-to-b from-[#c6ff3b] to-[#ff8a5c]"
      />
      <ol className="space-y-4">
        {steps.map((s, i) => {
          const Icon = icons[i];
          return (
            <motion.li
              key={s.title}
              variants={stepVariants}
              initial="dim"
              whileInView="lit"
              viewport={{ margin: '-35% 0px -35% 0px' }}
              transition={{ duration: 0.5 }}
              className="relative flex gap-6 rounded-3xl p-4 sm:p-5"
            >
              <motion.span
                variants={iconVariants}
                transition={{ duration: 0.5 }}
                className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-white/15"
              >
                <Icon className="h-5 w-5" />
              </motion.span>
              <div className="min-w-0 pt-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs text-white/40">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">{s.title}</h3>
                  <span className="rounded-full border border-[#c6ff3b]/30 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#c6ff3b]">
                    {s.duration}
                  </span>
                </div>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-white/60">{s.text}</p>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
