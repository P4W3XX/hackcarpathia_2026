"use client";
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

  );
}
