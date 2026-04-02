"use client";

import { useEffect, useState } from "react";

interface GreetingProps {
  displayName: string | null;
  currentStreak: number;
  completedToday: number;
  totalGoals: number;
  plantStage: number;
}

const PLANT_NAMES = ["", "seed", "sprout", "sapling", "bloom", "tree"];

export function Greeting({
  displayName,
  currentStreak,
  completedToday,
  totalGoals,
  plantStage,
}: GreetingProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const hour = new Date().getHours();
  const name = displayName || "there";

  let timeGreeting: string;
  if (hour < 6) timeGreeting = "Burning the midnight oil";
  else if (hour < 12) timeGreeting = "Good morning";
  else if (hour < 17) timeGreeting = "Good afternoon";
  else if (hour < 21) timeGreeting = "Good evening";
  else timeGreeting = "Winding down";

  let message: string;
  if (completedToday === totalGoals && totalGoals > 0) {
    message = "All goals done today! Your plant is thriving.";
  } else if (completedToday > 0) {
    message = `${completedToday} of ${totalGoals} goals done. Keep it going!`;
  } else if (currentStreak > 5) {
    message = `${currentStreak}-day streak! Don't break the chain.`;
  } else if (currentStreak > 0) {
    message = `${currentStreak}-day streak. Your ${PLANT_NAMES[plantStage]} is counting on you.`;
  } else {
    message = `Your ${PLANT_NAMES[plantStage]} is ready to grow today.`;
  }

  return (
    <div
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      <h1 className="text-2xl font-bold text-[#2D3436]">
        {timeGreeting}, {name}
      </h1>
      <p className="text-[#95A5A6] mt-1">{message}</p>
    </div>
  );
}
