"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  angle: number;
  velocity: number;
}

const COLORS = ["#4A7C59", "#6BB380", "#D4A574", "#E8C9A0", "#5A9E6F", "#8B7355"];

let confettiListeners: Set<() => void> = new Set();

export function triggerConfetti() {
  confettiListeners.forEach((fn) => fn());
}

export function ConfettiCanvas() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const handler = () => {
      const newParticles: Particle[] = Array.from({ length: 40 }, (_, i) => ({
        id: Date.now() + i,
        x: 50 + (Math.random() - 0.5) * 20,
        y: 35,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 4 + Math.random() * 6,
        angle: Math.random() * Math.PI * 2,
        velocity: 2 + Math.random() * 4,
      }));
      setParticles(newParticles);
      setTimeout(() => setParticles([]), 2000);
    };
    confettiListeners.add(handler);
    return () => { confettiListeners.delete(handler); };
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            transform: `rotate(${p.angle}rad)`,
            "--confetti-x": `${(Math.random() - 0.5) * 200}px`,
            "--confetti-y": `${150 + Math.random() * 200}px`,
            "--confetti-r": `${Math.random() * 720 - 360}deg`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
