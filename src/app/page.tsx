import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌿</span>
          <span className="text-xl font-semibold text-[#4A7C59]">Grove</span>
        </div>
        <Link
          href="/login"
          className="text-sm font-medium text-[#4A7C59] hover:text-[#3a6347] transition-colors"
        >
          Log in
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="mb-8">
          <svg
            width="120"
            height="160"
            viewBox="0 0 120 160"
            className="mx-auto"
          >
            <ellipse
              cx="60"
              cy="150"
              rx="40"
              ry="8"
              fill="#D4A574"
              opacity="0.3"
            />
            <rect x="56" y="60" width="8" height="90" rx="4" fill="#4A7C59" />
            <ellipse
              cx="40"
              cy="50"
              rx="22"
              ry="28"
              fill="#5A9E6F"
              transform="rotate(-15 40 50)"
            />
            <ellipse
              cx="80"
              cy="48"
              rx="20"
              ry="26"
              fill="#4A7C59"
              transform="rotate(15 80 48)"
            />
            <ellipse
              cx="58"
              cy="35"
              rx="18"
              ry="24"
              fill="#6BB380"
              transform="rotate(5 58 35)"
            />
            <circle cx="45" cy="42" r="4" fill="#E8C9A0" opacity="0.6" />
            <circle cx="72" cy="38" r="3" fill="#E8C9A0" opacity="0.5" />
          </svg>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-[#2D3436] mb-4">
          Grow a plant. Grow yourself.
        </h1>
        <p className="text-lg text-[#95A5A6] max-w-md mb-8">
          Your self-care companion for the web. Complete daily goals. Track your
          mood. Watch your plant thrive.
        </p>

        <Link
          href="/signup"
          className="inline-flex items-center px-8 py-3 rounded-full bg-[#4A7C59] text-white font-medium text-lg hover:bg-[#3a6347] transition-colors shadow-lg shadow-[#4A7C59]/20"
        >
          Get Started — it&apos;s free
        </Link>
      </main>

      <footer className="text-center py-6 text-sm text-[#95A5A6]">
        Take care of your plant. Take care of you.
      </footer>
    </div>
  );
}
