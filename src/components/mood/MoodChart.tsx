"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { MOOD_LABELS, type MoodEntry } from "@/lib/types";

interface MoodChartProps {
  entries: MoodEntry[];
}

export function MoodChart({ entries }: MoodChartProps) {
  const data = entries.map((e) => ({
    date: new Date(e.entry_date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    mood: e.mood,
    label: MOOD_LABELS[e.mood],
  }));

  return (
    <div>
      <h2 className="text-lg font-semibold text-[#2D3436] mb-4">
        Mood History
      </h2>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: "#95A5A6" }}
              tickLine={false}
              axisLine={{ stroke: "#e5e5e5" }}
            />
            <YAxis
              domain={[1, 5]}
              ticks={[1, 2, 3, 4, 5]}
              tick={{ fontSize: 12, fill: "#95A5A6" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value: number) =>
                MOOD_LABELS[value] ?? ""
              }
              width={50}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const d = payload[0].payload;
                return (
                  <div className="bg-white px-3 py-2 rounded-lg shadow-md border border-stone-100 text-sm">
                    <p className="font-medium">{d.date}</p>
                    <p className="text-[#4A7C59]">{d.label}</p>
                  </div>
                );
              }}
            />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="#4A7C59"
              strokeWidth={2}
              dot={{ r: 4, fill: "#4A7C59", strokeWidth: 0 }}
              activeDot={{ r: 6, fill: "#4A7C59", strokeWidth: 2, stroke: "#fff" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
