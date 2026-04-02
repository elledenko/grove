import { Flame, Trophy } from "lucide-react";

interface StreakCounterProps {
  currentStreak: number;
  longestStreak: number;
}

export function StreakCounter({
  currentStreak,
  longestStreak,
}: StreakCounterProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
          <Flame size={20} className="text-orange-500" />
        </div>
        <div>
          <p className="text-2xl font-bold text-[#2D3436]">{currentStreak}</p>
          <p className="text-xs text-[#95A5A6]">Day streak</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
          <Trophy size={20} className="text-amber-500" />
        </div>
        <div>
          <p className="text-2xl font-bold text-[#2D3436]">{longestStreak}</p>
          <p className="text-xs text-[#95A5A6]">Best streak</p>
        </div>
      </div>
    </div>
  );
}
