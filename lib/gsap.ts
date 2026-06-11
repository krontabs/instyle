"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export { gsap, ScrollTrigger, SplitText, useGSAP };

export const EASE = "power3.out";

/** Standard once-only scroll reveal: fade + rise with staggered children. */
export function sectionReveal(
  scope: HTMLElement,
  targets: gsap.DOMTarget,
  options: { y?: number; stagger?: number; start?: string } = {}
) {
  const { y = 32, stagger = 0.1, start = "top 78%" } = options;
  const mm = gsap.matchMedia(scope);

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    gsap.fromTo(
      targets,
      { autoAlpha: 0, y },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: EASE,
        stagger,
        scrollTrigger: { trigger: scope, start, once: true },
      }
    );
  });

  mm.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set(targets, { autoAlpha: 1 });
  });

  return mm;
}
