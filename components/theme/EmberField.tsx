"use client";

import { useEffect, useRef } from "react";

type Ember = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number; // seconds remaining
  maxLife: number;
  size: number;
  phase: number; // for the side-to-side flutter
};

const MAX_EMBERS = 700;
// The dark bands, the mobile menu and the footer are drawn as coal beds;
// sparks rise off them.
const COAL_SELECTOR = ".coal-bed, .footer-coals, .menu-panel--grill";

/**
 * Live embers over the whole site, drawn on one canvas.
 *
 * - A few sparks always drift up from the bottom of the screen, more the
 *   further down the page you are (closer to the grill).
 * - Every coal bed on screen (the dark bands, the footer) throws off its own
 *   steady stream from its bottom edge.
 * - Tapping or clicking anywhere stirs the coals: a burst of embers spreads
 *   out from that point and floats away.
 *
 * The canvas never takes pointer events, so it can sit above the content
 * without getting in the way of a single click. It pauses when the tab is
 * hidden, and it switches off entirely for people who ask for reduced motion.
 */
export default function EmberField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const embers: Ember[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let last = performance.now();
    let coals: Element[] = [];
    // Fractional spawn carry, so low rates still emit at the right average.
    const carry = new Map<Element | "floor", number>();

    // Glow sprites, pre-rendered once: white-hot, orange, and cooling red.
    const sprites = [
      makeSprite("255,244,214", "255,176,84"),
      makeSprite("255,184,92", "240,98,30"),
      makeSprite("240,110,40", "170,40,12"),
    ];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function findCoals() {
      coals = Array.from(document.querySelectorAll(COAL_SELECTOR));
    }

    function spawn(x: number, y: number, vx: number, vy: number, life: number, size: number) {
      if (embers.length >= MAX_EMBERS) embers.shift();
      embers.push({ x, y, vx, vy, life, maxLife: life, size, phase: Math.random() * Math.PI * 2 });
    }

    // Emit `rate` embers per second along a horizontal edge.
    function emitAlong(key: Element | "floor", left: number, right: number, y: number, rate: number, dt: number) {
      const due = (carry.get(key) ?? 0) + rate * dt;
      const count = Math.floor(due);
      carry.set(key, due - count);
      for (let i = 0; i < count; i++) {
        spawn(
          left + Math.random() * (right - left),
          y - Math.random() * 12,
          (Math.random() - 0.5) * 20,
          -(40 + Math.random() * 90),
          2 + Math.random() * 3,
          0.8 + Math.random() * 1.8
        );
      }
    }

    // Stir the coals: a burst from wherever the reader taps.
    function onPointerDown(e: PointerEvent) {
      const count = e.pointerType === "touch" ? 34 : 46;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 60 + Math.random() * 260;
        spawn(
          e.clientX,
          e.clientY,
          Math.cos(angle) * speed,
          Math.sin(angle) * speed - 60, // heat lifts the whole burst
          1.1 + Math.random() * 1.9,
          1.2 + Math.random() * 2.8
        );
      }
    }

    function tick(now: number) {
      frame = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      const heat = parseFloat(document.documentElement.style.getPropertyValue("--heat")) || 0;
      const narrow = width < 640;

      // The floor of the screen: a light, constant drift of sparks.
      emitAlong("floor", 0, width, height + 8, (narrow ? 3 : 6) + heat * (narrow ? 8 : 16), dt);

      // Each coal bed on screen feeds its own stream.
      for (const el of coals) {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > height) continue;
        const bottom = Math.min(r.bottom, height + 8);
        emitAlong(el, r.left, r.right, bottom, r.width / (narrow ? 70 : 110), dt);
      }

      ctx!.clearRect(0, 0, width, height);
      ctx!.globalCompositeOperation = "lighter";

      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.life -= dt;
        if (e.life <= 0 || e.y < -20) {
          embers.splice(i, 1);
          continue;
        }
        e.phase += dt * 3;
        // Buoyancy, drag and a little flutter as the air moves.
        e.vy -= 24 * dt;
        e.vx *= 1 - 1.4 * dt;
        e.vy *= 1 - 0.6 * dt;
        e.x += (e.vx + Math.sin(e.phase) * 14) * dt;
        e.y += e.vy * dt;

        const t = e.life / e.maxLife; // 1 → 0 as it cools
        const sprite = sprites[t > 0.66 ? 0 : t > 0.33 ? 1 : 2];
        // Embers flicker as they burn out.
        ctx!.globalAlpha = Math.min(1, t * 1.6) * (0.75 + Math.random() * 0.25);
        const s = e.size * (1.8 + t * 2);
        ctx!.drawImage(sprite, e.x - s, e.y - s, s * 2, s * 2);
      }
      ctx!.globalAlpha = 1;
    }

    function onVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    }

    resize();
    findCoals();
    // Pages change under us on client-side navigation.
    const observer = new MutationObserver(findCoals);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("resize", resize);
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="ember-field" />;
}

function makeSprite(core: string, edge: string) {
  const size = 32;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, `rgba(${core},1)`);
  grad.addColorStop(0.18, `rgba(${core},0.95)`);
  grad.addColorStop(0.35, `rgba(${edge},0.55)`);
  grad.addColorStop(1, `rgba(${edge},0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  return c;
}
