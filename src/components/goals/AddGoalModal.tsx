"use client";

import { useState, useTransition } from "react";
import { addGoal } from "@/app/dashboard/actions";
import { X } from "lucide-react";

const CATEGORIES = [
  { value: "hydration", label: "Hydration" },
  { value: "movement", label: "Movement" },
  { value: "mindfulness", label: "Mindfulness" },
  { value: "social", label: "Social" },
  { value: "nutrition", label: "Nutrition" },
  { value: "rest", label: "Rest" },
  { value: "custom", label: "Custom" },
];

interface AddGoalModalProps {
  onClose: () => void;
}

export function AddGoalModal({ onClose }: AddGoalModalProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("custom");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    startTransition(async () => {
      await addGoal(title.trim(), category);
      onClose();
    });
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Add a goal</h3>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="goal-title"
              className="block text-sm font-medium text-[#2D3436] mb-1"
            >
              What do you want to do?
            </label>
            <input
              id="goal-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Read for 20 minutes"
              className="w-full px-4 py-2.5 rounded-lg border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#4A7C59]/30 focus:border-[#4A7C59] transition-colors"
              autoFocus
            />
          </div>

          <div>
            <label
              htmlFor="goal-category"
              className="block text-sm font-medium text-[#2D3436] mb-1"
            >
              Category
            </label>
            <select
              id="goal-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#4A7C59]/30 focus:border-[#4A7C59] transition-colors"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isPending || !title.trim()}
            className="w-full py-2.5 rounded-lg bg-[#4A7C59] text-white font-medium hover:bg-[#3a6347] transition-colors disabled:opacity-50"
          >
            {isPending ? "Adding..." : "Add Goal"}
          </button>
        </form>
      </div>
    </div>
  );
}
