"use client";

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
    stage >= 5
      ? 100
      : ((totalXp - currentXp) / (nextXp - currentXp)) * 100;

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <PlantSVG stage={stage} />
      </div>
      <p className="text-lg font-semibold text-[#4A7C59] mb-1">
        {stageInfo.name}
      </p>
      <p className="text-sm text-[#95A5A6] mb-3">
        {stage >= 5
          ? `${totalXp} XP — Fully grown!`
          : `${totalXp} / ${nextXp} XP`}
      </p>
      <div className="w-full max-w-48 h-2.5 bg-stone-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#4A7C59] rounded-full transition-all duration-500"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
}

function PlantSVG({ stage }: { stage: number }) {
  const size = 140;
  const cx = size / 2;

  switch (stage) {
    case 1: // Seed
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <ellipse cx={cx} cy={120} rx={50} ry={12} fill="#D4A574" opacity="0.4" />
          <rect x={cx - 30} y={100} width={60} height={25} rx={4} fill="#C4956A" />
          <rect x={cx - 26} y={95} width={52} height={12} rx={2} fill="#D4A574" />
          <ellipse cx={cx} cy={108} rx={8} ry={6} fill="#8B7355" />
          <ellipse cx={cx} cy={107} rx={6} ry={4} fill="#A0845C" />
        </svg>
      );

    case 2: // Sprout
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <ellipse cx={cx} cy={120} rx={50} ry={12} fill="#D4A574" opacity="0.4" />
          <rect x={cx - 30} y={100} width={60} height={25} rx={4} fill="#C4956A" />
          <rect x={cx - 26} y={95} width={52} height={12} rx={2} fill="#D4A574" />
          <rect x={cx - 2} y={70} width={4} height={35} rx={2} fill="#4A7C59" />
          <ellipse cx={cx - 10} cy={72} rx={10} ry={14} fill="#6BB380" transform="rotate(-20 60 72)" />
          <ellipse cx={cx + 10} cy={74} rx={9} ry={12} fill="#5A9E6F" transform="rotate(20 80 74)" />
        </svg>
      );

    case 3: // Sapling
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <ellipse cx={cx} cy={125} rx={50} ry={12} fill="#D4A574" opacity="0.4" />
          <rect x={cx - 30} y={105} width={60} height={25} rx={4} fill="#C4956A" />
          <rect x={cx - 26} y={100} width={52} height={12} rx={2} fill="#D4A574" />
          <rect x={cx - 3} y={50} width={6} height={55} rx={3} fill="#4A7C59" />
          <ellipse cx={cx - 18} cy={60} rx={16} ry={20} fill="#6BB380" transform="rotate(-15 52 60)" />
          <ellipse cx={cx + 18} cy={55} rx={14} ry={18} fill="#5A9E6F" transform="rotate(15 88 55)" />
          <ellipse cx={cx} cy={45} rx={13} ry={17} fill="#7CC48E" transform="rotate(5 70 45)" />
          <ellipse cx={cx - 22} cy={75} rx={12} ry={10} fill="#5A9E6F" transform="rotate(-25 48 75)" />
          <ellipse cx={cx + 22} cy={72} rx={11} ry={9} fill="#6BB380" transform="rotate(25 92 72)" />
        </svg>
      );

    case 4: // Bloom
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <ellipse cx={cx} cy={128} rx={50} ry={12} fill="#D4A574" opacity="0.4" />
          <rect x={cx - 30} y={108} width={60} height={25} rx={4} fill="#C4956A" />
          <rect x={cx - 26} y={103} width={52} height={12} rx={2} fill="#D4A574" />
          <rect x={cx - 3} y={40} width={6} height={68} rx={3} fill="#4A7C59" />
          <ellipse cx={cx - 22} cy={55} rx={18} ry={22} fill="#6BB380" transform="rotate(-15 48 55)" />
          <ellipse cx={cx + 22} cy={50} rx={16} ry={20} fill="#5A9E6F" transform="rotate(15 92 50)" />
          <ellipse cx={cx} cy={38} rx={15} ry={20} fill="#7CC48E" transform="rotate(5 70 38)" />
          <ellipse cx={cx - 25} cy={75} rx={14} ry={12} fill="#5A9E6F" transform="rotate(-25 45 75)" />
          <ellipse cx={cx + 25} cy={72} rx={13} ry={11} fill="#6BB380" transform="rotate(25 95 72)" />
          {/* Flowers */}
          <circle cx={cx - 15} cy={38} r={5} fill="#E8C9A0" />
          <circle cx={cx + 20} cy={42} r={4} fill="#D4A574" />
          <circle cx={cx + 5} cy={30} r={4.5} fill="#E8C9A0" opacity="0.8" />
          <circle cx={cx - 15} cy={38} r={2} fill="#C4956A" />
          <circle cx={cx + 20} cy={42} r={1.5} fill="#C4956A" />
          <circle cx={cx + 5} cy={30} r={1.8} fill="#C4956A" />
        </svg>
      );

    case 5: // Tree
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <ellipse cx={cx} cy={130} rx={55} ry={10} fill="#D4A574" opacity="0.3" />
          <rect x={cx - 5} y={70} width={10} height={62} rx={5} fill="#8B7355" />
          <rect x={cx - 8} y={85} width={4} height={20} rx={2} fill="#8B7355" transform="rotate(-30 62 85)" />
          <rect x={cx + 4} y={88} width={4} height={18} rx={2} fill="#8B7355" transform="rotate(25 74 88)" />
          <ellipse cx={cx} cy={45} rx={42} ry={38} fill="#4A7C59" />
          <ellipse cx={cx - 15} cy={38} rx={25} ry={22} fill="#5A9E6F" />
          <ellipse cx={cx + 18} cy={40} rx={22} ry={20} fill="#6BB380" />
          <ellipse cx={cx} cy={30} rx={20} ry={18} fill="#7CC48E" />
          {/* Flowers / fruits */}
          <circle cx={cx - 25} cy={40} r={4} fill="#E8C9A0" />
          <circle cx={cx + 28} cy={38} r={3.5} fill="#D4A574" />
          <circle cx={cx - 5} cy={25} r={4} fill="#E8C9A0" opacity="0.8" />
          <circle cx={cx + 12} cy={52} r={3} fill="#D4A574" opacity="0.7" />
          <circle cx={cx - 20} cy={55} r={3.5} fill="#E8C9A0" opacity="0.6" />
          <circle cx={cx - 25} cy={40} r={1.5} fill="#C4956A" />
          <circle cx={cx + 28} cy={38} r={1.3} fill="#C4956A" />
          <circle cx={cx - 5} cy={25} r={1.5} fill="#C4956A" />
        </svg>
      );

    default:
      return null;
  }
}
