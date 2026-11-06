"use client";

import { useEffect } from "react";
import type { RefObject } from "react";

const revealTargets = [
  ".section-heading", ".price-categories", ".price-group",
  ".master-profile", ".portfolio-item", ".about-photo", ".about-copy",
  ".review", ".faq-section > div", ".contact-heading", ".contact-detail", ".site-footer",
].join(",");
const staggerTargets = ".master-profile,.portfolio-item,.review,.contact-detail";

export function usePageMotion(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = scope.current;
    if (!root || !("IntersectionObserver" in window) || typeof root.animate !== "function") return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const seen = new WeakSet<HTMLElement>();
    const pending = new Set<HTMLElement>();
    const animations = new Map<HTMLElement, Animation>();
    let observer: IntersectionObserver | undefined;

    const finish = (element: HTMLElement) => {
      element.classList.remove("motion-pending");
      pending.delete(element);
      observer?.unobserve(element);
      animations.get(element)?.cancel();
      animations.delete(element);
    };

    const reveal = (element: HTMLElement, animated = true) => {
      seen.add(element);
      finish(element);
      if (!animated || preference.matches) return;

      const siblings = element.matches(staggerTargets)
        ? Array.from(element.parentElement?.children ?? []).filter((child) => child.matches(staggerTargets))
        : [];
      const delay = Math.min(Math.max(siblings.indexOf(element), 0), 3) * 85;
      const frames: Keyframe[] = element.matches(".about-photo")
        ? [
          { opacity: 0, transform: "translateY(24px)", clipPath: "inset(6% 0 0 0)" },
          { opacity: 1, transform: "translateY(0)", clipPath: "inset(0 0 0 0)" },
        ]
        : [{ opacity: 0, transform: "translateY(24px)" }, { opacity: 1, transform: "translateY(0)" }];
      const animation = element.animate(frames, {
        duration: 820, delay, easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards",
      });
      animations.set(element, animation);
      const release = () => { if (animations.get(element) === animation) animations.delete(element); };
      void animation.finished.then(release, release);
    };

    const reset = () => {
      observer?.disconnect();
      for (const element of new Set([...pending, ...animations.keys()])) finish(element);
    };

    const setup = () => {
      reset();
      if (preference.matches) return;
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting && pending.has(element)) reveal(element);
        }
      }, { threshold: .06, rootMargin: "0px 0px -40px 0px" });

      root.querySelectorAll<HTMLElement>(revealTargets).forEach((element) => {
        if (seen.has(element)) return;
        // Never hide content already on screen, including restored scroll
        // positions and direct links to a section. Without JS everything shows.
        if (element.getBoundingClientRect().top < window.innerHeight || element.contains(document.activeElement)) {
          seen.add(element);
          return;
        }
        pending.add(element);
        element.classList.add("motion-pending");
        observer?.observe(element);
      });
    };

    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Node)) return;
      for (const element of new Set([...pending, ...animations.keys()])) {
        if (element.contains(event.target)) reveal(element, false);
      }
    };

    setup();
    root.addEventListener("focusin", onFocus);
    preference.addEventListener("change", setup);
    return () => {
      root.removeEventListener("focusin", onFocus);
      preference.removeEventListener("change", setup);
      reset();
    };
  }, [scope]);
}
