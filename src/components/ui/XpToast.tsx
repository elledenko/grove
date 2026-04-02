"use client";

import { useEffect, useState } from "react";

interface Toast {
  id: number;
  xp: number;
  x: number;
}

let toastId = 0;
const listeners: Set<(toast: Toast) => void> = new Set();

export function showXpToast(xp: number) {
  const toast: Toast = {
    id: toastId++,
    xp,
    x: 30 + Math.random() * 40, // random horizontal position 30-70%
  };
  listeners.forEach((fn) => fn(toast));
}

export function XpToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const handler = (toast: Toast) => {
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 1500);
    };
    listeners.add(handler);
    return () => { listeners.delete(handler); };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="absolute animate-xp-float"
          style={{ left: `${toast.x}%`, top: "40%" }}
        >
          <span className="text-lg font-bold text-[#4A7C59] drop-shadow-sm">
            +{toast.xp} XP
          </span>
        </div>
      ))}
    </div>
  );
}
