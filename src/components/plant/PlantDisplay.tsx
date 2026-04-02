"use client";

import { useState, useEffect, useCallback } from "react";
import { PLANT_STAGES, getNextStageXp, getCurrentStageXp } from "@/lib/types";

interface PlantDisplayProps {
  stage: number;
  totalXp: number;
}

export function PlantDisplay({ stage, totalXp }: PlantDisplayProps) {
  const stageInfo = PLANT_STAGES.find((s) => s.stage === stage)!;
  const currentXp = getCurrentStageXp(stage);
  const nextXp = getNextStageXp(stage);
  const progress =
    stage >= 5 ? 100 : ((totalXp - currentXp) / (nextXp - currentXp)) * 100;

  const [bounce, setBounce] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);
  const [prevXp, setPrevXp] = useState(totalXp);

  // Bounce when XP changes
  useEffect(() => {
    if (totalXp !== prevXp && totalXp > prevXp) {
      setBounce(true);
      setTimeout(() => setBounce(false), 600);
    }
    setPrevXp(totalXp);
  }, [totalXp, prevXp]);

  // Sparkle on hover/click
  const handleInteract = useCallback(() => {
    const newSparkles = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: 30 + Math.random() * 80,
      y: 20 + Math.random() * 80,
    }));
    setSparkles(newSparkles);
    setTimeout(() => setSparkles([]), 1000);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div
        className={`mb-4 relative cursor-pointer select-none transition-transform duration-500 ${
          bounce ? "animate-plant-bounce" : "animate-plant-sway"
        }`}
        onClick={handleInteract}
        title="Click me!"
      >
        <PlantSVG stage={stage} />

        {/* Sparkle particles */}
        {sparkles.map((s) => (
          <div
            key={s.id}
            className="absolute animate-sparkle pointer-events-none"
            style={{ left: s.x, top: s.y }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12">
              <path
                d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5Z"
                fill="#E8C9A0"
              />
            </svg>
          </div>
        ))}
      </div>

      <p className="text-lg font-semibold text-[#4A7C59] mb-1">
        {stageInfo.name}
      </p>
      <p className="text-sm text-[#95A5A6] mb-3">
        {stage >= 5
          ? `${totalXp} XP — Fully grown!`
          : `${totalXp} / ${nextXp} XP`}
      </p>

      {/* Animated XP bar */}
      <div className="w-full max-w-48 h-3 bg-stone-100 rounded-full overflow-hidden relative">
        <div
          className="h-full bg-gradient-to-r from-[#4A7C59] to-[#6BB380] rounded-full transition-all duration-700 ease-out relative"
          style={{ width: `${Math.min(progress, 100)}%` }}
        >
          <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        </div>
      </div>

      {stage < 5 && (
        <p className="text-xs text-[#95A5A6] mt-2">
          {nextXp - totalXp} XP to {PLANT_STAGES.find((s) => s.stage === stage + 1)?.name}
        </p>
      )}
    </div>
  );
}

function PlantSVG({ stage }: { stage: number }) {
  const size = 160;
  const cx = size / 2;

  switch (stage) {
    case 1: // Seed
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <ellipse cx={cx} cy={135} rx={50} ry={12} fill="#D4A574" opacity="0.4" />
          <rect x={cx - 30} y={115} width={60} height={25} rx={4} fill="#C4956A" />
          <rect x={cx - 26} y={110} width={52} height={12} rx={2} fill="#D4A574" />
          <ellipse cx={cx} cy={123} rx={8} ry={6} fill="#8B7355">
            <animate attributeName="ry" values="6;6.5;6" dur="3s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx={cx} cy={122} rx={6} ry={4} fill="#A0845C" />
        </svg>
      );

    case 2: // Sprout
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <ellipse cx={cx} cy={135} rx={50} ry={12} fill="#D4A574" opacity="0.4" />
          <rect x={cx - 30} y={115} width={60} height={25} rx={4} fill="#C4956A" />
          <rect x={cx - 26} y={110} width={52} height={12} rx={2} fill="#D4A574" />
          <rect x={cx - 2} y={80} width={4} height={35} rx={2} fill="#4A7C59" />
          <ellipse cx={cx - 10} cy={82} rx={10} ry={14} fill="#6BB380" transform="rotate(-20 70 82)">
            <animateTransform attributeName="transform" type="rotate" values="-20 70 82;-15 70 82;-20 70 82" dur="4s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx={cx + 10} cy={84} rx={9} ry={12} fill="#5A9E6F" transform="rotate(20 90 84)">
            <animateTransform attributeName="transform" type="rotate" values="20 90 84;15 90 84;20 90 84" dur="4.5s" repeatCount="indefinite" />
          </ellipse>
        </svg>
      );

    case 3: // Sapling
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <ellipse cx={cx} cy={140} rx={50} ry={12} fill="#D4A574" opacity="0.4" />
          <rect x={cx - 30} y={120} width={60} height={25} rx={4} fill="#C4956A" />
          <rect x={cx - 26} y={115} width={52} height={12} rx={2} fill="#D4A574" />
          <rect x={cx - 3} y={60} width={6} height={60} rx={3} fill="#4A7C59" />
          <g>
            <animateTransform attributeName="transform" type="rotate" values="-1 80 120;1 80 120;-1 80 120" dur="5s" repeatCount="indefinite" />
            <ellipse cx={cx - 18} cy={70} rx={16} ry={20} fill="#6BB380" transform="rotate(-15 62 70)" />
            <ellipse cx={cx + 18} cy={65} rx={14} ry={18} fill="#5A9E6F" transform="rotate(15 98 65)" />
            <ellipse cx={cx} cy={55} rx={13} ry={17} fill="#7CC48E" transform="rotate(5 80 55)" />
            <ellipse cx={cx - 22} cy={85} rx={12} ry={10} fill="#5A9E6F" transform="rotate(-25 58 85)" />
            <ellipse cx={cx + 22} cy={82} rx={11} ry={9} fill="#6BB380" transform="rotate(25 102 82)" />
          </g>
        </svg>
      );

    case 4: // Bloom
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <ellipse cx={cx} cy={143} rx={50} ry={12} fill="#D4A574" opacity="0.4" />
          <rect x={cx - 30} y={123} width={60} height={25} rx={4} fill="#C4956A" />
          <rect x={cx - 26} y={118} width={52} height={12} rx={2} fill="#D4A574" />
          <rect x={cx - 3} y={48} width={6} height={75} rx={3} fill="#4A7C59" />
          <g>
            <animateTransform attributeName="transform" type="rotate" values="-1 80 120;1 80 120;-1 80 120" dur="5s" repeatCount="indefinite" />
            <ellipse cx={cx - 22} cy={63} rx={18} ry={22} fill="#6BB380" transform="rotate(-15 58 63)" />
            <ellipse cx={cx + 22} cy={58} rx={16} ry={20} fill="#5A9E6F" transform="rotate(15 102 58)" />
            <ellipse cx={cx} cy={46} rx={15} ry={20} fill="#7CC48E" transform="rotate(5 80 46)" />
            <ellipse cx={cx - 25} cy={88} rx={14} ry={12} fill="#5A9E6F" transform="rotate(-25 55 88)" />
            <ellipse cx={cx + 25} cy={85} rx={13} ry={11} fill="#6BB380" transform="rotate(25 105 85)" />
            {/* Animated flowers */}
            <circle cx={cx - 15} cy={46} r={5} fill="#E8C9A0">
              <animate attributeName="r" values="5;5.8;5" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx={cx + 20} cy={50} r={4} fill="#D4A574">
              <animate attributeName="r" values="4;4.6;4" dur="3.5s" repeatCount="indefinite" />
            </circle>
            <circle cx={cx + 5} cy={38} r={4.5} fill="#E8C9A0" opacity="0.8">
              <animate attributeName="r" values="4.5;5.2;4.5" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx={cx - 15} cy={46} r={2} fill="#C4956A" />
            <circle cx={cx + 20} cy={50} r={1.5} fill="#C4956A" />
            <circle cx={cx + 5} cy={38} r={1.8} fill="#C4956A" />
          </g>
        </svg>
      );

    case 5: // Tree
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <ellipse cx={cx} cy={148} rx={55} ry={10} fill="#D4A574" opacity="0.3" />
          <rect x={cx - 5} y={85} width={10} height={65} rx={5} fill="#8B7355" />
          <rect x={cx - 8} y={100} width={4} height={20} rx={2} fill="#8B7355" transform="rotate(-30 72 100)" />
          <rect x={cx + 4} y={103} width={4} height={18} rx={2} fill="#8B7355" transform="rotate(25 84 103)" />
          <g>
            <animateTransform attributeName="transform" type="rotate" values="-0.5 80 120;0.5 80 120;-0.5 80 120" dur="6s" repeatCount="indefinite" />
            <ellipse cx={cx} cy={55} rx={45} ry={42} fill="#4A7C59" />
            <ellipse cx={cx - 15} cy={48} rx={28} ry={24} fill="#5A9E6F" />
            <ellipse cx={cx + 18} cy={50} rx={24} ry={22} fill="#6BB380" />
            <ellipse cx={cx} cy={38} rx={22} ry={20} fill="#7CC48E" />
            {/* Animated fruits/flowers */}
            <circle cx={cx - 28} cy={50} r={4} fill="#E8C9A0">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx={cx + 30} cy={48} r={3.5} fill="#D4A574">
              <animate attributeName="opacity" values="1;0.7;1" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx={cx - 5} cy={32} r={4} fill="#E8C9A0" opacity="0.8">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx={cx + 14} cy={65} r={3} fill="#D4A574" opacity="0.7" />
            <circle cx={cx - 22} cy={68} r={3.5} fill="#E8C9A0" opacity="0.6" />
            <circle cx={cx - 28} cy={50} r={1.5} fill="#C4956A" />
            <circle cx={cx + 30} cy={48} r={1.3} fill="#C4956A" />
            <circle cx={cx - 5} cy={32} r={1.5} fill="#C4956A" />
          </g>
        </svg>
      );

    default:
      return null;
  }
}
