import { useEffect, useRef } from 'react';

export type CanvasMood = 'neutral' | 'physics' | 'biology' | 'warm';

interface NightCanvasProps {
  mood: CanvasMood;
  paused: boolean;
}

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  alpha: number;
  phase: number;
  kind: 'star' | 'spore' | 'gold';
}

export function NightCanvas({ mood, paused }: NightCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const moodRef = useRef<CanvasMood>(mood);
  const pausedRef = useRef<boolean>(paused);

  moodRef.current = mood;
  pausedRef.current = paused;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const count = width < 480 ? 44 : 68;
    const particles: Particle[] = Array.from({ length: count }, (_, i) => {
      const kind: Particle['kind'] =
        i % 3 === 0 ? 'star' : i % 3 === 1 ? 'spore' : 'gold';
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r: kind === 'spore' ? 1.1 + Math.random() * 1.5 : 0.7 + Math.random() * 1.1,
        vx: (Math.random() - 0.5) * 0.14,
        vy: kind === 'spore' ? -(0.06 + Math.random() * 0.12) : (Math.random() - 0.5) * 0.08,
        alpha: 0.18 + Math.random() * 0.42,
        phase: Math.random() * Math.PI * 2,
        kind,
      };
    });

    let rafId = 0;
    let time = 0;

    const drawFrame = (advance: boolean) => {
      if (advance) time += 0.008;

      ctx.clearRect(0, 0, width, height);

      // Soft nocturnal ambient washes (strictly midnight blue, steel sky, warm gold, emerald teal - zero violet)
      const currentMood = moodRef.current;
      const topLeftColor =
        currentMood === 'biology'
          ? 'rgba(34, 148, 120, 0.13)'
          : currentMood === 'warm'
            ? 'rgba(217, 184, 114, 0.11)'
            : 'rgba(66, 125, 214, 0.13)';

      const bottomRightColor =
        currentMood === 'physics'
          ? 'rgba(217, 184, 114, 0.09)'
          : currentMood === 'warm'
            ? 'rgba(82, 224, 183, 0.09)'
            : 'rgba(54, 184, 149, 0.11)';

      const grad1 = ctx.createRadialGradient(
        width * 0.16,
        height * 0.14,
        0,
        width * 0.16,
        height * 0.14,
        Math.max(width, height) * 0.65,
      );
      grad1.addColorStop(0, topLeftColor);
      grad1.addColorStop(1, 'rgba(7, 11, 18, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(
        width * 0.86,
        height * 0.82,
        0,
        width * 0.86,
        height * 0.82,
        Math.max(width, height) * 0.65,
      );
      grad2.addColorStop(0, bottomRightColor);
      grad2.addColorStop(1, 'rgba(7, 11, 18, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Subtle celestial orbital geometry
      ctx.save();
      ctx.translate(width * 0.5, height * 0.44);
      ctx.rotate(time * 0.06);
      ctx.strokeStyle =
        currentMood === 'biology'
          ? 'rgba(82, 224, 183, 0.06)'
          : 'rgba(106, 169, 255, 0.065)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(0, 0, Math.min(width, 460) * 0.44, Math.min(width, 460) * 0.24, -0.35, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(217, 184, 114, 0.045)';
      ctx.beginPath();
      ctx.ellipse(0, 0, Math.min(width, 460) * 0.34, Math.min(width, 460) * 0.48, 0.5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Particles
      for (const p of particles) {
        if (advance) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;
        }

        const pulse = 0.72 + 0.28 * Math.sin(time * 2.2 + p.phase);
        const a = p.alpha * pulse;

        if (p.kind === 'star') {
          ctx.fillStyle = `rgba(148, 194, 255, ${a})`;
        } else if (p.kind === 'spore') {
          ctx.fillStyle = `rgba(92, 226, 186, ${a * 0.92})`;
        } else {
          ctx.fillStyle = `rgba(222, 193, 128, ${a * 0.85})`;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = () => {
      drawFrame(!pausedRef.current && !reducedMotion);
      rafId = window.requestAnimationFrame(tick);
    };

    drawFrame(false);
    if (!reducedMotion) {
      rafId = window.requestAnimationFrame(tick);
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
