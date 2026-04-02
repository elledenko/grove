export interface Profile {
  id: string;
  display_name: string | null;
  plant_stage: number;
  total_xp: number;
  current_streak: number;
  longest_streak: number;
  last_active_date: string | null;
  timezone: string;
  created_at: string;
  updated_at: string;
}

export interface Goal {
  id: string;
  user_id: string;
  title: string;
  category: GoalCategory;
  xp_value: number;
  is_preset: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export type GoalCategory =
  | "hydration"
  | "movement"
  | "mindfulness"
  | "social"
  | "nutrition"
  | "rest"
  | "custom";

export interface GoalCompletion {
  id: string;
  user_id: string;
  goal_id: string;
  completed_date: string;
  xp_earned: number;
  created_at: string;
}

export interface MoodEntry {
  id: string;
  user_id: string;
  mood: number;
  note: string | null;
  entry_date: string;
  created_at: string;
}

export const PLANT_STAGES = [
  { stage: 1, name: "Seed", xpRequired: 0 },
  { stage: 2, name: "Sprout", xpRequired: 100 },
  { stage: 3, name: "Sapling", xpRequired: 300 },
  { stage: 4, name: "Bloom", xpRequired: 600 },
  { stage: 5, name: "Tree", xpRequired: 1000 },
] as const;

export const MOOD_LABELS = ["", "Awful", "Bad", "Okay", "Good", "Great"] as const;

export const MOOD_EMOJIS = ["", "😫", "😔", "😐", "🙂", "😊"] as const;

export const CATEGORY_COLORS: Record<GoalCategory, string> = {
  hydration: "bg-blue-100 text-blue-700",
  movement: "bg-orange-100 text-orange-700",
  mindfulness: "bg-purple-100 text-purple-700",
  social: "bg-pink-100 text-pink-700",
  nutrition: "bg-green-100 text-green-700",
  rest: "bg-indigo-100 text-indigo-700",
  custom: "bg-stone-100 text-stone-700",
};

export function getPlantStage(totalXp: number): number {
  if (totalXp >= 1000) return 5;
  if (totalXp >= 600) return 4;
  if (totalXp >= 300) return 3;
  if (totalXp >= 100) return 2;
  return 1;
}

export function getNextStageXp(currentStage: number): number {
  const next = PLANT_STAGES.find((s) => s.stage === currentStage + 1);
  return next?.xpRequired ?? 1000;
}

export function getCurrentStageXp(currentStage: number): number {
  const current = PLANT_STAGES.find((s) => s.stage === currentStage);
  return current?.xpRequired ?? 0;
}
