/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useCallback } from "react";
import { Menu } from "@/components/menu";
import { JobsPage } from "@/components/jobs-page";
import { CareerProgress } from "@/components/career-progress";
import { careerLevels } from "./data/jobs";
import { careerPaths } from "./data/careers";
import { UserProgress, CareerPath } from "./types";
import JobFinderSalaryDashboard from "./salary-calculator/page";
import { CareerAiPath } from "@/components/career-path";
import { ContractAnalyzer } from "@/components/contract-analyzer";

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

const calculateCurrentLevel = (
  progress: UserProgress,
  levels: typeof careerLevels,
): UserProgress => {
  let calculatedLevel = levels.length - 1;
  for (let i = 0; i < levels.length; i++) {
    const level = levels[i];
    const levelNumber = level.level;
    const completedReqs = progress.completedRequirements[levelNumber] || [];
    const completedSkills = progress.acquiredSkills[levelNumber] || [];
    const allRequirementsCompleted =
      completedReqs.length === level.requirements.length;
    const allSkillsCompleted = completedSkills.length === level.skills.length;
    if (!allRequirementsCompleted || !allSkillsCompleted) {
      calculatedLevel = i;
      break;
    }
  }
  return { ...progress, currentLevel: calculatedLevel };
};

export default function Home() {
  const [currentPage, setCurrentPage] = useState<
    "home" | "jobs" | "career" | "salary-calculator"
  >("salary-calculator");
  const [isMenuExpanded, setIsMenuExpanded] = useState(true);
  const [selectedCareerPath, setSelectedCareerPath] =
    useState<CareerPath | null>(null);
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

  const handleToggleMenu = useCallback(() => {
    setIsMenuExpanded((prev) => !prev);
  }, []);

  // Calculate current level based on completion status
  const progressWithCalculatedLevel = calculateCurrentLevel(
    userProgress,
    careerLevels,
  );

  // Create custom career path from custom levels
  const customCareerPath: CareerPath | null =
    categoryName && customLevels.length > 0
      ? {
          id: `custom-path`,
          name: categoryName.replace(/^[^\w\sąćęłńóśźż]+\s*/i, "").trim(),
          emoji: categoryName.charAt(0).match(/[\p{Emoji}]/u)
            ? categoryName.charAt(0)
            : "📝",
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
        }
      : null;

  const addLevel = () => {
    if (
      levelTitle.trim() &&
      levelRequirements.length > 0 &&
      levelSkills.length > 0
    ) {
      setCustomLevels([
        ...customLevels,
        {
          title: levelTitle,
          currentSalary: levelSalary.current,
          nextSalary: levelSalary.next,
          requirements: levelRequirements,
          skills: levelSkills,
        },
      ]);
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
      <Menu
        onNavigate={setCurrentPage}
        isExpanded={isMenuExpanded}
        onToggleMenu={handleToggleMenu}
      />

      <div
        className={`flex-1 overflow-auto transition-all duration-500 ease-in-out ${
          isMenuExpanded ? "ml-90" : "ml-20"
        }`}
      >
        {currentPage === "jobs" && <JobsPage />}

        {currentPage === "career" && (
          <div className="animate-in fade-in duration-500 mt-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-black text-slate-900 mb-4">
                Twoja Ścieżka Awansu
              </h1>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Wykorzystujemy sztuczną inteligencję, aby przeanalizować Twoje
                dane i stworzyć plan, który zaprowadzi Cię do wymarzonych
                zarobków.
              </p>
            </div>
            <CareerAiPath />
          </div>
        )}

        {currentPage === "home" && (
          <div className="animate-in fade-in duration-500">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-black text-slate-900 mb-4">
                Audyt Prawny AI
              </h1>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Nie daj się oszukać. Nasz algorytm prześwietli każdą stronę
                Twojej przyszłej umowy.
              </p>
            </div>
            <ContractAnalyzer />
          </div>
        )}

        {currentPage === "salary-calculator" && <JobFinderSalaryDashboard />}
      </div>
    </main>
  );
}
