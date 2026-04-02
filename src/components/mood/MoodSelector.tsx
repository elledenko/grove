"use client";

import { useState, useTransition } from "react";
import { submitMood } from "@/app/dashboard/actions";
import { MOOD_EMOJIS, MOOD_LABELS, type MoodEntry } from "@/lib/types";

interface MoodSelectorProps {
  todayMood: MoodEntry | null;
}

export function MoodSelector({ todayMood }: MoodSelectorProps) {
  const [selectedMood, setSelectedMood] = useState<number | null>(
    todayMood?.mood ?? null
  );
  const [note, setNote] = useState(todayMood?.note ?? "");
  const [saved, setSaved] = useState(!!todayMood);
  const [isPending, startTransition] = useTransition();

  function handleSave() {
    if (!selectedMood) return;

    startTransition(async () => {
      await submitMood(selectedMood, note.trim() || null);
      setSaved(true);
    });
  }

  const moodColors = [
    "",
    "hover:bg-red-50 data-[selected=true]:bg-red-50 data-[selected=true]:ring-2 data-[selected=true]:ring-red-300",
    "hover:bg-orange-50 data-[selected=true]:bg-orange-50 data-[selected=true]:ring-2 data-[selected=true]:ring-orange-300",
    "hover:bg-yellow-50 data-[selected=true]:bg-yellow-50 data-[selected=true]:ring-2 data-[selected=true]:ring-yellow-300",
    "hover:bg-emerald-50 data-[selected=true]:bg-emerald-50 data-[selected=true]:ring-2 data-[selected=true]:ring-emerald-300",
    "hover:bg-green-50 data-[selected=true]:bg-green-50 data-[selected=true]:ring-2 data-[selected=true]:ring-green-300",
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold text-[#2D3436] mb-4">
        {saved ? "Today's mood" : "How are you feeling today?"}
      </h2>

      <div className="flex gap-3 mb-4">
        {[1, 2, 3, 4, 5].map((mood) => (
          <button
            key={mood}
            data-selected={selectedMood === mood}
            onClick={() => {
              setSelectedMood(mood);
              setSaved(false);
            }}
            className={`flex flex-col items-center gap-1 px-4 py-3 rounded-xl transition-all ${moodColors[mood]}`}
          >
            <span className="text-2xl">{MOOD_EMOJIS[mood]}</span>
            <span className="text-xs text-[#95A5A6] font-medium">
              {MOOD_LABELS[mood]}
            </span>
          </button>
        ))}
      </div>

      {selectedMood && !saved && (
        <div className="flex gap-3 items-end">
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note (optional)"
            className="flex-1 px-4 py-2.5 rounded-lg border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#4A7C59]/30 focus:border-[#4A7C59] transition-colors text-sm"
          />
          <button
            onClick={handleSave}
            disabled={isPending}
            className="px-6 py-2.5 rounded-lg bg-[#4A7C59] text-white text-sm font-medium hover:bg-[#3a6347] transition-colors disabled:opacity-50"
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>
      )}

      {saved && todayMood?.note && (
        <p className="text-sm text-[#95A5A6] italic">
          &ldquo;{todayMood.note}&rdquo;
        </p>
      )}
      {saved && note && !todayMood?.note && (
        <p className="text-sm text-[#95A5A6] italic">&ldquo;{note}&rdquo;</p>
      )}
    </div>
  );
}
