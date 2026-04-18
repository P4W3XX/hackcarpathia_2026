"use client";

<<<<<<< HEAD
import React, { useState } from "react";
import { Menu } from "./components/menu";
import { JobsPage } from "./components/jobs-page";
import { CareerProgress } from "./components/career-progress";
import { careerLevels } from "./data/jobs";

export default function Home() {
  const [currentPage, setCurrentPage] = useState<"home" | "jobs" | "career">(
    "jobs"
  );
  const [currentCareerLevel] = useState(0);

  return (
    <main className="flex min-h-screen">
      {/* Navigation Menu */}
      <Menu onNavigate={setCurrentPage} />

      {/* Content Area */}
      <div className="flex-1 overflow-auto">
        {currentPage === "jobs" && <JobsPage />}

        {currentPage === "career" && (
          <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">
            <CareerProgress
              levels={careerLevels}
              currentLevel={currentCareerLevel}
            />
          </div>
        )}

        {currentPage === "home" && (
          <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">
            <div className="max-w-4xl">
              <h1 className="text-4xl font-bold text-white mb-4">
                Witaj w panelu analiz
              </h1>
              <p className="text-slate-300 text-lg mb-8">
                Wybierz funkcję z menu po lewej stronie, aby rozpocząć pracę z
                narzędziami do analizy ofert pracy.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                  onClick={() => setCurrentPage("jobs")}
                  className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-blue-600 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-blue-500/20"
                >
                  <div className="text-3xl mb-3">💼</div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Porównaj oferty
                  </h3>
                  <p className="text-slate-400">
                    Łatwo porównuj warunki zatrudnienia, wynagrodzenie i
                    benefity między różnymi ofertami pracy.
                  </p>
                </div>

                <div
                  onClick={() => setCurrentPage("career")}
                  className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-green-600 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-green-500/20"
                >
                  <div className="text-3xl mb-3">🚀</div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Ścieżka rozwoju
                  </h3>
                  <p className="text-slate-400">
                    Poznaj wymagania do awansu i zarobienia więcej pieniędzy.
                  </p>
                </div>

                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-cyan-600 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-cyan-500/20">
                  <div className="text-3xl mb-3">✅</div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Walidacja formularza
                  </h3>
                  <p className="text-slate-400">
                    Sprawdź, czy formularz jest poprawnie wypełniony i zgodny z
                    wymogami.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
=======
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
>>>>>>> 04a75ecafbd9ec049169044a3d0d19a2602256ba
  );
}
