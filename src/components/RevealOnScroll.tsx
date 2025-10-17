

"use client";

import { motion, useAnimation, Variants } from "framer-motion";
import { useEffect, useRef } from "react";

type RevealOnScrollProps = {
  children: React.ReactNode;
  /** Optional custom variants override */
  variants?: Variants;
  /** Intersection threshold 0..1 */
  threshold?: number;
  /** Additional class names on wrapper */
  className?: string;
};

export default function RevealOnScroll({
  children,
  variants,
  threshold = 0.15,
  className,
}: RevealOnScrollProps) {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controls.start("visible");
          }
        });
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [controls, threshold]);

  const defaultVariants: Variants = variants ?? {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={defaultVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}


