'use client';

import { useMemo, useState, useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';

type CarouselItem = {
  _id: string;
  name: string;
  subject?: string;
  message: string;
  createdAt?: string;
};

type Props = {
  items: CarouselItem[];
  /** base speed for the top lane in ms per full loop */
  speedMs?: number;
};

function Card({ item }: { item: CarouselItem }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-20, 20], [6, -6]);
  const rotateY = useTransform(mx, [-20, 20], [-6, 6]);

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;
        mx.set((relX - rect.width / 2) / 10);
        my.set((relY - rect.height / 2) / 10);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      style={{ rotateX, rotateY }}
      className="relative w-[320px] sm:w-[360px] shrink-0 flex-none rounded-2xl border-2 border-[#E2DDB4] bg-white p-6 shadow-sm hover:shadow-lg transition-shadow will-change-transform"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-full bg-[#E43636] text-[#F6EFD2] flex items-center justify-center font-bold">
          {item.name?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        <div>
          <div className="font-semibold text-[#000000]">{item.name}</div>
          {item.createdAt && (
            <div className="text-sm text-[#8B7355]">
              {new Date(item.createdAt).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
      {item.subject && (
        <div className="text-sm font-semibold text-[#E43636] mb-2">{item.subject}</div>
      )}
      <p className="text-[#000000] leading-relaxed">{item.message}</p>

      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5" />
    </motion.div>
  );
}

/**
 * One endlessly-looping lane.
 * direction = 1 (left -> right), -1 (right -> left)
 */
function Lane({
  laneItems,
  speedMs,
  direction,
  paused,
}: {
  laneItems: CarouselItem[];
  speedMs: number;
  direction: 1 | -1;
  paused: boolean;
}) {
  const controls = useAnimation();

  // Duplicate items enough times for seamless scroll
  const track = useMemo(() => {
    const base = laneItems.length < 6 ? [...laneItems, ...laneItems] : laneItems;
    return [...base, ...base]; // double for smoothness
  }, [laneItems]);

  // Start/stop the loop on pause state
  useEffect(() => {
    if (paused) {
      controls.stop();
      return;
    }
    const from = direction === 1 ? '0%' : '-100%';
    const to = direction === 1 ? '100%' : '0%';
    controls.start({
      x: [from, to],
      transition: { duration: speedMs / 1000, ease: 'linear', repeat: Infinity },
    });
  }, [controls, speedMs, direction, paused]);

  return (
    <motion.div
      className="inline-flex flex-nowrap items-stretch gap-6"
      animate={controls}
      style={{ willChange: 'transform' }}
    >
      {track.map((item, idx) => (
        <Card key={`${item._id}-${idx}`} item={item} />
      ))}
    </motion.div>
  );
}

export default function TestimonialsCarousel({
  items,
  speedMs = 20000, // top lane
}: Props) {
  // Split items into two lanes (odd/even) for variety
  const [laneA, laneB] = useMemo(() => {
    const a: CarouselItem[] = [];
    const b: CarouselItem[] = [];
    items.forEach((it, i) => (i % 2 === 0 ? a : b).push(it));
    // fallback to avoid empty lane
    if (a.length === 0) a.push(...items);
    if (b.length === 0) b.push(...items);
    return [a, b];
  }, [items]);

  // Pause both lanes when hovering the whole section
  const [paused, setPaused] = useState(false);

  return (
    <div
      className="relative w-full overflow-hidden py-4 group"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* edge fades */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10" />

      {/* LANE A (top) — left to right */}
      <div className="mb-6">
        <Lane laneItems={laneA} speedMs={speedMs} direction={1} paused={paused} />
      </div>

      {/* LANE B (bottom) — right to left, slightly slower for contrast */}
      <Lane laneItems={laneB} speedMs={Math.round(speedMs * 1.25)} direction={-1} paused={paused} />
    </div>
  );
}
