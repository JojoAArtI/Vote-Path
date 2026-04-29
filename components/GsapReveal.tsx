"use client";

import { type ReactNode, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type GsapRevealProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  start?: string;
};

export function GsapReveal({ children, className = "", stagger = 0.12, start = "top 80%" }: GsapRevealProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-gsap-item]"));
    if (items.length === 0) {
      return;
    }

    gsap.set(items, {
      opacity: 0,
      y: 28,
      filter: "blur(8px)"
    });

    const tween = gsap.to(items, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.9,
      ease: "power3.out",
      stagger,
      paused: true
    });

    const trigger = ScrollTrigger.create({
      trigger: root,
      start,
      once: true,
      onEnter: () => tween.play(0)
    });

    return () => {
      trigger.kill();
      tween.kill();
    };
  }, [start, stagger]);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
