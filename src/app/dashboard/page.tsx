import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { PlantDisplay } from "@/components/plant/PlantDisplay";
import { GoalList } from "@/components/goals/GoalList";
import { MoodSelector } from "@/components/mood/MoodSelector";
import { MoodChart } from "@/components/mood/MoodChart";
import { StreakCounter } from "@/components/dashboard/StreakCounter";
import { Greeting } from "@/components/dashboard/Greeting";
import { XpToastContainer } from "@/components/ui/XpToast";
import { ConfettiCanvas } from "@/components/ui/Confetti";
import type { Profile, Goal, GoalCompletion, MoodEntry } from "@/lib/types";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const today = new Date().toISOString().split("T")[0];

  const [profileRes, goalsRes, completionsRes, todayMoodRes, moodHistoryRes] =
    await Promise.all([
      supabase.from("profiles").select("*").eq("id", user.id).single(),
      supabase
        .from("goals")
        .select("*")
        .eq("user_id", user.id)
        .eq("is_active", true)
        .order("sort_order"),
      supabase
        .from("goal_completions")
        .select("*")
        .eq("user_id", user.id)
        .eq("completed_date", today),
      supabase
        .from("mood_entries")
        .select("*")
        .eq("user_id", user.id)
        .eq("entry_date", today)
        .single(),
      supabase
        .from("mood_entries")
        .select("*")
        .eq("user_id", user.id)
        .order("entry_date", { ascending: true })
        .gte(
          "entry_date",
          new Date(Date.now() - 14 * 86400000).toISOString().split("T")[0]
        ),
    ]);

  const profile = profileRes.data as Profile;
  const goals = (goalsRes.data ?? []) as Goal[];
  const completions = (completionsRes.data ?? []) as GoalCompletion[];
  const todayMood = todayMoodRes.data as MoodEntry | null;
  const moodHistory = (moodHistoryRes.data ?? []) as MoodEntry[];

  const completedGoalIds = new Set(completions.map((c) => c.goal_id));

  return (
    <>
      <XpToastContainer />
      <ConfettiCanvas />

      <div className="space-y-8">
        {/* Greeting */}
        <Greeting
          displayName={profile.display_name}
          currentStreak={profile.current_streak}
          completedToday={completions.length}
          totalGoals={goals.length}
          plantStage={profile.plant_stage}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column: Plant + Streak */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 hover:shadow-md transition-shadow duration-300">
              <PlantDisplay
                stage={profile.plant_stage}
                totalXp={profile.total_xp}
              />
            </div>
            <StreakCounter
              currentStreak={profile.current_streak}
              longestStreak={profile.longest_streak}
            />
          </div>

          {/* Right column: Goals */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 hover:shadow-md transition-shadow duration-300">
            <GoalList
              goals={goals}
              completedGoalIds={completedGoalIds}
              today={today}
            />
          </div>
        </div>

        {/* Mood section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 hover:shadow-md transition-shadow duration-300">
          <MoodSelector todayMood={todayMood} />
        </div>

        {/* Mood history chart */}
        {moodHistory.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 hover:shadow-md transition-shadow duration-300">
            <MoodChart entries={moodHistory} />
          </div>
        )}
      </div>
    </>
  );
}
