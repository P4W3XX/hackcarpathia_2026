"use client";
import React, { useState } from "react";
import { Menu } from "./components/menu";
import { JobsPage } from "./components/jobs-page";
import { CareerProgress } from "./components/career-progress";
import { careerLevels } from "./data/jobs";
import { careerPaths } from "./data/careers";
import { UserProgress, CareerPath } from "./types";

// Static user progress data
const userProgress: UserProgress = {
  currentLevel: 2, // Currently at Mid-level Designer (level 2)
  completedRequirements: {
    1: [0, 1, 2, 3], // Junior: 3/4 requirements done
    2: [0, 1, 2, 3, 4], // Mid-level: 2/5 requirements done
    3: [0, 1], // Senior: 0/5 requirements done
    4: [],
  },
  acquiredSkills: {
    1: [0, 1, 2, 3], // Junior: 4/5 skills acquired
    2: [0, 1, 2, 3, 4], // Mid-level: 2/5 skills acquired
    3: [0, 1],
    4: [],
  },
  experienceYears: 3,
};

// Function to calculate current level based on completion status
const calculateCurrentLevel = (progress: UserProgress, levels: typeof careerLevels): UserProgress => {
  let calculatedLevel = levels.length - 1; // Default to last level if all completed
  
  for (let i = 0; i < levels.length; i++) {
    const level = levels[i];
    const levelNumber = level.level;
    
    // Get completed requirements and skills for this level
    const completedReqs = progress.completedRequirements[levelNumber] || [];
    const completedSkills = progress.acquiredSkills[levelNumber] || [];
    
    // Check if all requirements and skills are completed
    const allRequirementsCompleted = completedReqs.length === level.requirements.length;
    const allSkillsCompleted = completedSkills.length === level.skills.length;
    
    if (!allRequirementsCompleted || !allSkillsCompleted) {
      // Found first incomplete level - this becomes current
      calculatedLevel = i;
      break;
    }
  }
  
  return {
    ...progress,
    currentLevel: calculatedLevel,
  };
};

export default function Home() {
  const [currentPage, setCurrentPage] = useState<"home" | "jobs" | "career">(
    "jobs"
  );
  const [selectedCareerPath, setSelectedCareerPath] = useState<CareerPath | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  
  // Custom career levels
  const [customLevels, setCustomLevels] = useState<any[]>([]);
  const [showLevelForm, setShowLevelForm] = useState(false);
  const [levelTitle, setLevelTitle] = useState("");
  const [levelSalary, setLevelSalary] = useState({ current: 0, next: 0 });
  const [levelRequirements, setLevelRequirements] = useState<string[]>([]);
  const [levelSkills, setLevelSkills] = useState<string[]>([]);
  const [newRequirement, setNewRequirement] = useState("");
  const [newSkill, setNewSkill] = useState("");
  
  // Calculate current level based on completion status
  const progressWithCalculatedLevel = calculateCurrentLevel(userProgress, careerLevels);

  // Create custom career path from custom levels
  const customCareerPath: CareerPath | null = categoryName && customLevels.length > 0 ? {
    id: `custom-${Date.now()}`,
    name: categoryName.replace(/^[^\w\sąćęłńóśźż]+\s*/i, "").trim(),
    emoji: categoryName.charAt(0).match(/[\p{Emoji}]/u) ? categoryName.charAt(0) : "📝",
    description: "Twoja niestandardowa ścieżka kariery",
    levels: customLevels.map((level, idx) => ({
      level: idx + 1,
      title: level.title,
      currentSalary: level.currentSalary,
      nextSalary: level.nextSalary,
      requirements: level.requirements,
      skills: level.skills,
      estimatedTime: "Do ustalenia",
    })),
  } : null;

  const addLevel = () => {
    if (levelTitle.trim() && levelRequirements.length > 0 && levelSkills.length > 0) {
      setCustomLevels([...customLevels, {
        title: levelTitle,
        currentSalary: levelSalary.current,
        nextSalary: levelSalary.next,
        requirements: levelRequirements,
        skills: levelSkills,
      }]);
      resetLevelForm();
    }
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setLevelRequirements([...levelRequirements, newRequirement.trim()]);
      setNewRequirement("");
    }
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setLevelSkills([...levelSkills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeRequirement = (idx: number) => {
    setLevelRequirements(levelRequirements.filter((_, i) => i !== idx));
  };

  const removeSkill = (idx: number) => {
    setLevelSkills(levelSkills.filter((_, i) => i !== idx));
  };

  const resetLevelForm = () => {
    setShowLevelForm(false);
    setLevelTitle("");
    setLevelSalary({ current: 0, next: 0 });
    setLevelRequirements([]);
    setLevelSkills([]);
    setNewRequirement("");
    setNewSkill("");
  };

  const removeLevel = (idx: number) => {
    setCustomLevels(customLevels.filter((_, i) => i !== idx));
  };

  return (
    <main className="flex min-h-screen">
      {/* Navigation Menu */}
      <Menu onNavigate={setCurrentPage} />

      {/* Content Area */}
      <div className="flex-1 overflow-auto">
        {currentPage === "jobs" && <JobsPage />}

        {currentPage === "career" && (
          <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">
            <div className="max-w-5xl mx-auto">
              {/* Category Selection Section */}
              <div className="mb-12 bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-8 border-2 border-slate-600">
                <h2 className="text-3xl font-bold text-white mb-2">🎯 Zarządzaj Kategoriami Kariery</h2>
                <p className="text-slate-300 mb-8">Dodaj nową kategorię kariery, którą chcesz śledzić</p>

                {/* Predefined Categories */}
                {careerPaths.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {careerPaths.map((path) => (
                      <button
                        key={path.id}
                        onClick={() => {
                          setSelectedCareerPath(path);
                          setShowCategoryForm(false);
                          setCategoryName("");
                        }}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          selectedCareerPath?.id === path.id && !showCategoryForm
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

                {/* Add New Category Form */}
                <div className="bg-slate-800/50 border border-slate-600 rounded-lg p-4">
                  {careerPaths.length > 0 && (
                    <button
                      onClick={() => setShowCategoryForm(!showCategoryForm)}
                      className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-2 mb-4"
                    >
                      <span className="text-xl">{showCategoryForm ? "−" : "+"}</span>
                      <span>Dodaj nową kategorię</span>
                    </button>
                  )}

                  {(showCategoryForm || careerPaths.length === 0) && (
                    <div className="mt-4 space-y-4 bg-slate-700/50 p-4 rounded-lg">
                      <div>
                        <label className="block text-white font-semibold mb-2">Nazwa kategorii</label>
                        <input
                          type="text"
                          value={categoryName}
                          onChange={(e) => setCategoryName(e.target.value)}
                          placeholder="np. Kariera Fotografa, Kariera Lekarza, Kariera Sprzedawcy..."
                          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>

                      <div>
                        <label className="block text-white font-semibold mb-2">Emoji (kliknij aby dodać)</label>
                        <div className="flex flex-wrap gap-2">
                          {["📚", "🎨", "🏥", "✈️", "🍕", "📱", "🎵", "⚽", "🌍", "🎬", "🎓", "🔧", "🌱", "💼"].map((emoji) => (
                            <button
                              key={emoji}
                              onClick={() => {
                                const cleanName = categoryName.replace(/^[^\w\sąćęłńóśźż]+\s*/i, "").trim();
                                setCategoryName(cleanName ? `${emoji} ${cleanName}` : emoji);
                              }}
                              className="px-3 py-2 bg-slate-600 hover:bg-slate-500 rounded text-2xl transition-all hover:scale-110"
                              title={emoji}
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button
                          onClick={() => {
                            if (categoryName.trim()) {
                              setShowCategoryForm(false);
                              setShowLevelForm(true);
                            }
                          }}
                          disabled={!categoryName.trim()}
                          className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all"
                        >
                          ✓ Dalej
                        </button>
                        <button
                          onClick={() => {
                            setShowCategoryForm(false);
                            setCategoryName("");
                          }}
                          className="flex-1 px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg font-semibold transition-all"
                        >
                          ✕ Anuluj
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Career Progress Timeline */}
              {selectedCareerPath && (
                <CareerProgress
                  levels={selectedCareerPath.levels}
                  userProgress={progressWithCalculatedLevel}
                />
              )}

              {/* Add Career Levels */}
              {showLevelForm && categoryName && (
                <div className="mb-12 bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-8 border-2 border-slate-600">
                  <h2 className="text-3xl font-bold text-white mb-2">📊 Dodaj Poziomy Kariery</h2>
                  <p className="text-slate-300 mb-8">Zdefiniuj poziomy dla: <span className="font-bold text-blue-400">{categoryName}</span></p>

                  {/* Existing Levels Summary */}
                  {customLevels.length > 0 && (
                    <div className="mb-8 bg-slate-800/50 rounded-lg p-4">
                      <h3 className="font-semibold text-white mb-3">Dodane poziomy ({customLevels.length}):</h3>
                      <div className="space-y-2">
                        {customLevels.map((level, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-slate-700/50 p-3 rounded">
                            <div>
                              <span className="font-semibold text-white">Poziom {idx + 1}:</span>
                              <span className="text-slate-300 ml-2">{level.title}</span>
                              <span className="text-slate-500 text-sm ml-2">({level.requirements.length} wymagań, {level.skills.length} umiejętności)</span>
                            </div>
                            <button
                              onClick={() => removeLevel(idx)}
                              className="px-3 py-1 bg-red-600/30 hover:bg-red-600 text-red-300 rounded text-sm transition-all"
                            >
                              🗑️ Usuń
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add New Level Form */}
                  <div className="bg-slate-800/50 border border-slate-600 rounded-lg p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white font-semibold mb-2">Tytuł poziomu</label>
                        <input
                          type="text"
                          value={levelTitle}
                          onChange={(e) => setLevelTitle(e.target.value)}
                          placeholder="np. Junior, Mid-level, Senior..."
                          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-semibold mb-2">Wynagrodzenie (obecne/następne)</label>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            value={levelSalary.current}
                            onChange={(e) => setLevelSalary({ ...levelSalary, current: parseInt(e.target.value) || 0 })}
                            placeholder="Obecne"
                            className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                          />
                          <input
                            type="number"
                            value={levelSalary.next}
                            onChange={(e) => setLevelSalary({ ...levelSalary, next: parseInt(e.target.value) || 0 })}
                            placeholder="Następne"
                            className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Requirements */}
                    <div>
                      <label className="block text-white font-semibold mb-2">Wymagania ({levelRequirements.length})</label>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={newRequirement}
                          onChange={(e) => setNewRequirement(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && addRequirement()}
                          placeholder="Dodaj wymaganie i naciśnij Enter"
                          className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                        />
                        <button
                          onClick={addRequirement}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all"
                        >
                          + Dodaj
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {levelRequirements.map((req, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-sm border border-cyan-500/50 flex items-center gap-2"
                          >
                            {req}
                            <button onClick={() => removeRequirement(idx)} className="text-xs hover:text-red-300">✕</button>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Skills */}
                    <div>
                      <label className="block text-white font-semibold mb-2">Umiejętności ({levelSkills.length})</label>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && addSkill()}
                          placeholder="Dodaj umiejętność i naciśnij Enter"
                          className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                        />
                        <button
                          onClick={addSkill}
                          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all"
                        >
                          + Dodaj
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {levelSkills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm border border-purple-500/50 flex items-center gap-2"
                          >
                            {skill}
                            <button onClick={() => removeSkill(idx)} className="text-xs hover:text-red-300">✕</button>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={addLevel}
                        disabled={!levelTitle.trim() || levelRequirements.length === 0 || levelSkills.length === 0}
                        className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all"
                      >
                        ✓ Dodaj Poziom
                      </button>
                      <button
                        onClick={() => {
                          if (customLevels.length > 0) {
                            setSelectedCareerPath(customCareerPath);
                            setShowLevelForm(false);
                          }
                        }}
                        disabled={customLevels.length === 0}
                        className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all"
                      >
                        ✓ Pokaż Ścieżkę
                      </button>
                      <button
                        onClick={() => {
                          setShowLevelForm(false);
                          setCategoryName("");
                          setCustomLevels([]);
                          resetLevelForm();
                        }}
                        className="flex-1 px-4 py-3 bg-slate-600 hover:bg-slate-500 text-white rounded-lg font-semibold transition-all"
                      >
                        ✕ Anuluj
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
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
