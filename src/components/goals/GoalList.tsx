"use client";

import { useState, useTransition } from "react";
import { toggleGoal, removeGoal } from "@/app/dashboard/actions";
import { AddGoalModal } from "./AddGoalModal";
import { CATEGORY_COLORS, type Goal, type GoalCategory } from "@/lib/types";
import { Check, Plus, X } from "lucide-react";

interface GoalListProps {
  goals: Goal[];
  completedGoalIds: Set<string>;
  today: string;
}

export function GoalList({ goals, completedGoalIds, today }: GoalListProps) {
  const [showModal, setShowModal] = useState(false);
  const completedCount = goals.filter((g) => completedGoalIds.has(g.id)).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-[#2D3436]">
          Today&apos;s Goals
        </h2>
        <span className="text-sm text-[#95A5A6]">
          {completedCount} / {goals.length}
        </span>
      </div>

      {goals.length === 0 ? (
        <p className="text-sm text-[#95A5A6] py-4 text-center">
          No goals yet. Add one to get started!
        </p>
      ) : (
        <ul className="space-y-2">
          {goals.map((goal) => (
            <GoalItem
              key={goal.id}
              goal={goal}
              isCompleted={completedGoalIds.has(goal.id)}
              today={today}
            />
          ))}
        </ul>
      )}

      <button
        onClick={() => setShowModal(true)}
        className="mt-4 flex items-center gap-2 text-sm text-[#4A7C59] hover:text-[#3a6347] font-medium transition-colors"
      >
        <Plus size={16} />
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
}: {
  goal: Goal;
  isCompleted: boolean;
  today: string;
}) {
  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    startTransition(() => toggleGoal(goal.id, today));
  }

  function handleRemove() {
    startTransition(() => removeGoal(goal.id));
  }

  return (
    <li
      className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
        isCompleted
          ? "bg-[#4A7C59]/5"
          : "bg-stone-50 hover:bg-stone-100"
      } ${isPending ? "opacity-50" : ""}`}
    >
      <button
        onClick={handleToggle}
        disabled={isPending}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
          isCompleted
            ? "bg-[#4A7C59] border-[#4A7C59] text-white"
            : "border-stone-300 hover:border-[#4A7C59]"
        }`}
      >
        {isCompleted && <Check size={14} />}
      </button>

      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium ${
            isCompleted ? "line-through text-[#95A5A6]" : "text-[#2D3436]"
          }`}
        >
          {goal.title}
        </p>
      </div>

      <span
        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
          CATEGORY_COLORS[goal.category as GoalCategory] ?? CATEGORY_COLORS.custom
        }`}
      >
        +{goal.xp_value}xp
      </span>

      {!goal.is_preset && (
        <button
          onClick={handleRemove}
          disabled={isPending}
          className="text-stone-300 hover:text-red-400 transition-colors"
        >
          <X size={14} />
        </button>
      )}
    </li>
  );
}
