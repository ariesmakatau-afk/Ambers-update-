"use client";

import { useEffect } from "react";
import { CentaurFigure } from "@/components/ornament/Centaur";

/**
 * The wall the whole site hangs on: whitewash with the shop's centaur
 * wallpaper printed over it in blue, and the warmth of the coals coming up
 * from the bottom of the screen.
 *
 * Fixed behind the page; every section is a veil over it, so the wallpaper
 * carries on under the content. Scroll progress is written to `--heat`
 * (0 → 1) on <html>: the further down the page, the closer to the grill,
 * and the stronger the glow (see `.shop-heat` in globals.css). The embers
 * themselves are live, drawn by <EmberField />.
 */
export default function ShopBackdrop() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    function update() {
      frame = 0;
      const max = root.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      root.style.setProperty("--heat", progress.toFixed(4));
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Page height changes on client-side navigation and as images load.
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden="true" className="shop-backdrop">
      <div className="shop-layer shop-wall" />

      {/* The centaur wallpaper: archers in alternating rows, one row facing
          each way, between thin ruled bands — as it hangs in the shop. */}
      <svg className="shop-layer shop-wallpaper" width="100%" height="100%">
        <defs>
          <pattern id="centaur-wallpaper" width="220" height="200" patternUnits="userSpaceOnUse">
            <g transform="translate(20 12) scale(0.62)">
              <CentaurFigure />
            </g>
            <g transform="translate(200 112) scale(-0.62 0.62)">
              <CentaurFigure />
            </g>
            {/* Ruled bands under each row, with a small key between */}
            <path d="M0 88 H220 M0 92 H220" stroke="currentColor" strokeWidth="1" opacity="0.6" />
            <path d="M0 188 H220 M0 192 H220" stroke="currentColor" strokeWidth="1" opacity="0.6" />
            <path
              d="M150 40 h8 v8 h-4 v-4 M40 140 h8 v8 h-4 v-4"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#centaur-wallpaper)" />
      </svg>

      <div className="shop-layer shop-heat" />
    </div>
  );
}
