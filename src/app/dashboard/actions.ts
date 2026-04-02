"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleGoal(goalId: string, date: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  // Check if already completed
  const { data: existing } = await supabase
    .from("goal_completions")
    .select("id, xp_earned")
    .eq("goal_id", goalId)
    .eq("completed_date", date)
    .single();

  if (existing) {
    // Uncomplete
    await supabase.from("goal_completions").delete().eq("id", existing.id);
  } else {
    // Complete — get goal's xp_value
    const { data: goal } = await supabase
      .from("goals")
      .select("xp_value")
      .eq("id", goalId)
      .single();

    if (!goal) throw new Error("Goal not found");

    await supabase.from("goal_completions").insert({
      user_id: user.id,
      goal_id: goalId,
      completed_date: date,
      xp_earned: goal.xp_value,
    });
  }

  // Recalculate XP
  await supabase.rpc("recalculate_xp", { p_user_id: user.id });

  // Update streak
  await updateStreak(user.id);

  revalidatePath("/dashboard");
}

export async function addGoal(title: string, category: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { data: maxOrder } = await supabase
    .from("goals")
    .select("sort_order")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .order("sort_order", { ascending: false })
    .limit(1)
    .single();

  await supabase.from("goals").insert({
    user_id: user.id,
    title,
    category,
    xp_value: 10,
    is_preset: false,
    sort_order: (maxOrder?.sort_order ?? 0) + 1,
  });

  revalidatePath("/dashboard");
}

export async function removeGoal(goalId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  await supabase
    .from("goals")
    .update({ is_active: false })
    .eq("id", goalId)
    .eq("user_id", user.id);

  revalidatePath("/dashboard");
}

export async function submitMood(mood: number, note: string | null) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const today = new Date().toISOString().split("T")[0];

  // Upsert mood for today
  const { data: existing } = await supabase
    .from("mood_entries")
    .select("id")
    .eq("user_id", user.id)
    .eq("entry_date", today)
    .single();

  if (existing) {
    await supabase
      .from("mood_entries")
      .update({ mood, note })
      .eq("id", existing.id);
  } else {
    await supabase.from("mood_entries").insert({
      user_id: user.id,
      mood,
      note,
      entry_date: today,
    });
  }

  revalidatePath("/dashboard");
}

async function updateStreak(userId: string) {
  const supabase = await createClient();

  // Get all unique completion dates, ordered desc
  const { data: completions } = await supabase
    .from("goal_completions")
    .select("completed_date")
    .eq("user_id", userId)
    .order("completed_date", { ascending: false });

  if (!completions || completions.length === 0) {
    await supabase
      .from("profiles")
      .update({ current_streak: 0, last_active_date: null, updated_at: new Date().toISOString() })
      .eq("id", userId);
    return;
  }

  // Get unique dates
  const uniqueDates = [...new Set(completions.map((c) => c.completed_date))].sort().reverse();

  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  // Streak must include today or yesterday
  if (uniqueDates[0] !== today && uniqueDates[0] !== yesterday) {
    await supabase
      .from("profiles")
      .update({
        current_streak: 0,
        last_active_date: uniqueDates[0],
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);
    return;
  }

  let streak = 1;
  for (let i = 0; i < uniqueDates.length - 1; i++) {
    const current = new Date(uniqueDates[i]);
    const next = new Date(uniqueDates[i + 1]);
    const diffDays = (current.getTime() - next.getTime()) / 86400000;
    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }

  // Get current profile for longest streak comparison
  const { data: profile } = await supabase
    .from("profiles")
    .select("longest_streak")
    .eq("id", userId)
    .single();

  const longestStreak = Math.max(profile?.longest_streak ?? 0, streak);

  await supabase
    .from("profiles")
    .update({
      current_streak: streak,
      longest_streak: longestStreak,
      last_active_date: uniqueDates[0],
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);
}
