"use client";
import React, { useState, useCallback } from "react";
import { Menu } from "@/components/menu";
import { JobsPage } from "@/components/jobs-page";
import { CareerProgress } from "@/components/career-progress";
import { careerLevels } from "./data/jobs";
import { careerPaths } from "./data/careers";
import { UserProgress, CareerPath } from "./types";

// Static user progress data
const userProgress: UserProgress = {
  currentLevel: 2,
  completedRequirements: {
    1: [0, 1, 2, 3],
    2: [0, 1, 2, 3, 4],
    3: [0, 1],
    4: [],
  },
  acquiredSkills: {
    1: [0, 1, 2, 3],
    2: [0, 1, 2, 3, 4],
    3: [0, 1],
    4: [],
  },
  experienceYears: 3,
};

const calculateCurrentLevel = (progress: UserProgress, levels: typeof careerLevels): UserProgress => {
  let calculatedLevel = levels.length - 1;
  for (let i = 0; i < levels.length; i++) {
    const level = levels[i];
    const levelNumber = level.level;
    const completedReqs = progress.completedRequirements[levelNumber] || [];
    const completedSkills = progress.acquiredSkills[levelNumber] || [];
    const allRequirementsCompleted = completedReqs.length === level.requirements.length;
    const allSkillsCompleted = completedSkills.length === level.skills.length;
    if (!allRequirementsCompleted || !allSkillsCompleted) {
      calculatedLevel = i;
      break;
    }
  }
  return { ...progress, currentLevel: calculatedLevel };
};

export default function Home() {
  const [currentPage, setCurrentPage] = useState<"home" | "jobs" | "career">("jobs");
  const [isMenuExpanded, setIsMenuExpanded] = useState(true);
  const [selectedCareerPath, setSelectedCareerPath] = useState<CareerPath | null>(null);

  const handleToggleMenu = useCallback(() => {
    setIsMenuExpanded(prev => !prev);
  }, []);

  const progressWithCalculatedLevel = calculateCurrentLevel(userProgress, careerLevels);

  return (
    <main className="flex min-h-screen">
      <Menu onNavigate={setCurrentPage} isExpanded={isMenuExpanded} onToggleMenu={handleToggleMenu} />

      <div className={`flex-1 overflow-auto transition-all duration-500 ease-in-out ${
        isMenuExpanded ? "ml-90" : "ml-20"
      }`}>
        {currentPage === "jobs" && <JobsPage />}

        {currentPage === "career" && (
          <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">
            <div className="max-w-5xl mx-auto">
              <div className="mb-12 bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-8 border-2 border-slate-600">
                <h2 className="text-3xl font-bold text-white mb-2">🎯 Ścieżki Rozwoju Kariery</h2>
                <p className="text-slate-300 mb-8">Wybierz ścieżkę kariery, którą chcesz śledzić</p>

                {careerPaths.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {careerPaths.map((path) => (
                      <button
                        key={path.id}
                        onClick={() => setSelectedCareerPath(path)}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          selectedCareerPath?.id === path.id
                            ? "bg-blue-500/30 border-blue-500 shadow-lg shadow-blue-500/20"
                            : "bg-slate-800/50 border-slate-600 hover:border-slate-500"
                        }`}
                      >
                        <div className="text-3xl mb-2">{path.emoji}</div>
                        <div className="font-semibold text-white text-lg">{path.name}</div>
                        <div className="text-sm text-slate-400">{path.description}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {selectedCareerPath && (
                <CareerProgress
                  levels={selectedCareerPath.levels}
                  userProgress={progressWithCalculatedLevel}
                />
              )}
            </div>
          </div>
        )}

        {currentPage === "home" && (
          <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">
            <div className="max-w-4xl">
              <h1 className="text-4xl font-bold text-white mb-4">Witaj w panelu analiz</h1>
              <p className="text-slate-300 text-lg mb-8">
                Wybierz funkcję z menu po lewej stronie, aby rozpocząć pracę z narzędziami do analizy ofert pracy.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                  onClick={() => setCurrentPage("jobs")}
                  className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-blue-600 transition-all cursor-pointer hover:shadow-lg hover:shadow-blue-500/20"
                >
                  <div className="text-3xl mb-3">💼</div>
                  <h3 className="text-xl font-semibold text-white mb-2">Porównaj oferty</h3>
                  <p className="text-slate-400">Łatwo porównuj warunki zatrudnienia, wynagrodzenie i benefity między różnymi ofertami pracy.</p>
                </div>
                <div
                  onClick={() => setCurrentPage("career")}
                  className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-green-600 transition-all cursor-pointer hover:shadow-lg hover:shadow-green-500/20"
                >
                  <div className="text-3xl mb-3">🚀</div>
                  <h3 className="text-xl font-semibold text-white mb-2">Ścieżka rozwoju</h3>
                  <p className="text-slate-400">Poznaj wymagania do awansu i zarobienia więcej pieniędzy.</p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-cyan-600 transition-all cursor-pointer hover:shadow-lg hover:shadow-cyan-500/20">
                  <div className="text-3xl mb-3">✅</div>
                  <h3 className="text-xl font-semibold text-white mb-2">Walidacja formularza</h3>
                  <p className="text-slate-400">Sprawdź, czy formularz jest poprawnie wypełniony i zgodny z wymogami.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
