"use client";

import { useUserStore } from "@/store/user";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export default function Home() {
  const { user, setUser } = useUserStore();
  const [isMounted, setIsMounted] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsMounted(true);
    });
    const fetchUser = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser && !user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', authUser.id)
          .single();

        setUser({
          id: authUser.id,
          email: authUser.email!,
          name: profile?.full_name || authUser.user_metadata.full_name || "User",
        });
      }
    };
    fetchUser();
  }, [setUser, user, supabase]);

  if (!isMounted) return null;

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to out page</h1>
        {user ? (
          <div className="space-y-4">
            <p className="text-xl">Logged in as <span className="font-semibold text-primary">{user.name}</span></p>
            <Button asChild>
              <Link href="/trasa">Go to Dashboard</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xl text-muted-foreground">You are not logged in.</p>
            <Button asChild variant="default">
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
