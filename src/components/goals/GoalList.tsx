"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { toggleGoal, removeGoal } from "@/app/dashboard/actions";
import { AddGoalModal } from "./AddGoalModal";
import { CATEGORY_COLORS, type Goal, type GoalCategory } from "@/lib/types";
import { Check, Plus, X, Sparkles } from "lucide-react";
import { showXpToast } from "@/components/ui/XpToast";

interface GoalListProps {
  goals: Goal[];
  completedGoalIds: Set<string>;
  today: string;
}

export function GoalList({ goals, completedGoalIds, today }: GoalListProps) {
  const [showModal, setShowModal] = useState(false);
  const completedCount = goals.filter((g) => completedGoalIds.has(g.id)).length;
  const allDone = completedCount === goals.length && goals.length > 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-[#2D3436]">
          Today&apos;s Goals
        </h2>
        <div className="flex items-center gap-2">
          {allDone && (
            <span className="flex items-center gap-1 text-xs font-medium text-[#4A7C59] bg-[#4A7C59]/10 px-2 py-1 rounded-full animate-fade-in">
              <Sparkles size={12} />
              All done!
            </span>
          )}
          <span className="text-sm text-[#95A5A6]">
            {completedCount} / {goals.length}
          </span>
        </div>
      </div>

      {/* Progress bar for today's goals */}
      <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-[#4A7C59] to-[#6BB380] rounded-full transition-all duration-700 ease-out"
          style={{
            width: goals.length > 0 ? `${(completedCount / goals.length) * 100}%` : "0%",
          }}
        />
      </div>

      {goals.length === 0 ? (
        <p className="text-sm text-[#95A5A6] py-4 text-center">
          No goals yet. Add one to get started!
        </p>
      ) : (
        <ul className="space-y-2">
          {goals.map((goal, i) => (
            <GoalItem
              key={goal.id}
              goal={goal}
              isCompleted={completedGoalIds.has(goal.id)}
              today={today}
              index={i}
            />
          ))}
        </ul>
      )}

      <button
        onClick={() => setShowModal(true)}
        className="mt-4 flex items-center gap-2 text-sm text-[#4A7C59] hover:text-[#3a6347] font-medium transition-colors group"
      >
        <Plus size={16} className="group-hover:rotate-90 transition-transform duration-200" />
        Add custom goal
      </button>

      {showModal && <AddGoalModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

function GoalItem({
  goal,
  isCompleted,
  today,
  index,
}: {
  goal: Goal;
  isCompleted: boolean;
  today: string;
  index: number;
}) {
  const [isPending, startTransition] = useTransition();
  const [justCompleted, setJustCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const wasCompleted = useRef(isCompleted);

  useEffect(() => {
    setTimeout(() => setMounted(true), index * 50);
  }, [index]);

  useEffect(() => {
    if (isCompleted && !wasCompleted.current) {
      setJustCompleted(true);
      setTimeout(() => setJustCompleted(false), 700);
    }
    wasCompleted.current = isCompleted;
  }, [isCompleted]);

  function handleToggle() {
    if (!isCompleted) {
      showXpToast(goal.xp_value);
    }
    startTransition(() => toggleGoal(goal.id, today));
  }

  function handleRemove() {
    startTransition(() => removeGoal(goal.id));
  }

  return (
    <li
      className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
        isCompleted
          ? "bg-[#4A7C59]/5"
          : "bg-stone-50 hover:bg-stone-100"
      } ${isPending ? "opacity-50 scale-[0.98]" : ""} ${
        justCompleted ? "animate-goal-complete" : ""
      } ${mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
      style={{ transition: "all 0.3s ease" }}
    >
      <button
        onClick={handleToggle}
        disabled={isPending}
        className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
          isCompleted
            ? "bg-[#4A7C59] border-[#4A7C59] text-white scale-110"
            : "border-stone-300 hover:border-[#4A7C59] hover:scale-110 active:scale-95"
        }`}
      >
        {isCompleted && (
          <Check size={14} className={justCompleted ? "animate-check-pop" : ""} />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium transition-all duration-300 ${
            isCompleted ? "line-through text-[#95A5A6]" : "text-[#2D3436]"
          }`}
        >
          {goal.title}
        </p>
      </div>

      <span
        className={`text-xs px-2 py-0.5 rounded-full font-medium transition-all duration-300 ${
          CATEGORY_COLORS[goal.category as GoalCategory] ?? CATEGORY_COLORS.custom
        } ${isCompleted ? "opacity-50" : ""}`}
      >
        +{goal.xp_value}xp
      </span>

      {!goal.is_preset && (
        <button
          onClick={handleRemove}
          disabled={isPending}
          className="text-stone-300 hover:text-red-400 hover:scale-110 transition-all"
        >
          <X size={14} />
        </button>
      )}
    </li>
  );
}
