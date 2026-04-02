"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleSignOut}
      className="p-2 rounded-lg text-[#95A5A6] hover:text-[#2D3436] hover:bg-stone-100 transition-colors"
      title="Sign out"
    >
      <LogOut size={18} />
    </button>
  );
}
