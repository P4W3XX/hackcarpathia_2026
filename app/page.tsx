/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useCallback } from "react";
import { Briefcase, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react";
import { Menu } from "@/components/menu";
import { JobsPage } from "@/components/jobs-page";
import { careerLevels } from "./data/jobs";
import { careerPaths } from "./data/careers";
import { UserProgress, CareerPath } from "./types";
import JobFinderSalaryDashboard from "./salary-calculator/page";
import { CareerAiPath } from "@/components/career-path";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ContractAnalyzer } from "@/components/contract-analyzer";
import { CvCreator } from "@/components/cv-creator";
import { DoctorsAppointments } from "@/components/doctors-appointments";

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
    "contract-analyzer" | "cv-creator" | "jobs" | "career" | "salary-calculator" | "home" | "taxes" | "doctors"
  >("salary-calculator");
  const [isMenuExpanded, setIsMenuExpanded] = useState(true);
  const [selectedCareerPath, setSelectedCareerPath] =
    useState<CareerPath | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  const [customLevels, setCustomLevels] = useState<any[]>([]);

  const handleToggleMenu = useCallback(() => {
    setIsMenuExpanded((prev) => !prev);
  }, []);

  const progressWithCalculatedLevel = calculateCurrentLevel(
    userProgress,
    careerLevels,
  );

  const customCareerPath: CareerPath | null =
    categoryName && customLevels.length > 0
      ? {
          id: `custom-path`,
          name: categoryName.replace(/^[^\w\sąćęłńóśźż]+\s*/i, "").trim(),
          emoji: categoryName.charAt(0).match(/[\p{Emoji}]/u)
            ? categoryName.charAt(0)
            : "",
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

  const homeTiles = [
    {
      icon: Briefcase,
      title: "Porównaj oferty",
      description:
        "Łatwo porównuj warunki zatrudnienia, wynagrodzenie i benefity.",
      page: "jobs" as const,
    },
    {
      icon: TrendingUp,
      title: "Ścieżka rozwoju",
      description:
        "Poznaj wymagania do awansu i wyższych zarobków dzięki AI.",
      page: "career" as const,
    },
    {
      icon: CheckCircle2,
      title: "Walidacja formularza",
      description:
        "Sprawdź, czy formularz jest poprawnie wypełniony i zgodny z wymogami.",
      page: "home" as const,
    },
  ];

  return (
    <main className="flex min-h-screen bg-background">
      <Menu
        onNavigate={setCurrentPage}
        isExpanded={isMenuExpanded}
        onToggleMenu={handleToggleMenu}
      />

      <div
        className={cn(
          "flex-1 overflow-auto transition-all duration-500 ease-in-out",
          isMenuExpanded ? "ml-72" : "ml-20",
        )}
      >
        {currentPage === "jobs" && <JobsPage />}

        {currentPage === "career" && (
          <div className="animate-in fade-in duration-500">
            <div className="max-w-4xl mx-auto text-center pt-12 px-6">
              <h1 className="text-4xl font-bold text-foreground mb-3 tracking-tight text-balance">
                Twoja Ścieżka Awansu
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
                Wykorzystujemy sztuczną inteligencję, aby przeanalizować Twoje
                dane i stworzyć plan, który zaprowadzi Cię do wymarzonych
                zarobków.
              </p>
            </div>
            <CareerAiPath />
          </div>
        )}

        {currentPage === "home" && (
          <div className="min-h-screen bg-background p-8 md:p-12">
            <div className="max-w-5xl mx-auto">
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-accent px-3 py-1 text-xs font-medium text-accent-foreground mb-4">
                  <span className="size-1.5 rounded-full bg-primary" />
                  Panel analiz
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-3 text-balance">
                  Witaj w panelu analiz
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl text-pretty">
                  Wybierz funkcję z menu po lewej stronie, aby rozpocząć pracę z
                  narzędziami do analizy ofert pracy.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {homeTiles.map((tile) => {
                  const Icon = tile.icon;
                  return (
                    <Card
                      key={tile.title}
                      onClick={() => setCurrentPage(tile.page)}
                      className="group cursor-pointer transition-all hover:border-primary hover:shadow-md"
                    >
                      <CardHeader>
                        <div className="flex size-11 items-center justify-center rounded-lg bg-accent text-primary mb-2 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <Icon className="size-5" />
                        </div>
                        <CardTitle className="text-xl">{tile.title}</CardTitle>
                        <CardDescription>{tile.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-primary hover:bg-accent -ml-2.5"
                        >
                          Przejdź
                          <ArrowRight className="size-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {currentPage === "contract-analyzer" && (
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

        {currentPage === "cv-creator" && (
          <div className="animate-in fade-in duration-500">
            <CvCreator />
          </div>
        )}
      </div>

              {currentPage === "salary-calculator" && (
         <JobFinderSalaryDashboard/>
        )}

        {currentPage === "taxes" && (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-8">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="mb-12">
                <h1 className="text-4xl font-black text-slate-900 mb-4">📋 Podatki i Terminy</h1>
                <p className="text-slate-600 text-lg max-w-2xl">Kompleksowy przewodnik po odprowadzaniu podatków w Polsce z terminami i instrukcjami dla pracowników i przedsiębiorców.</p>
              </div>

              {/* PIT Section */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="text-3xl">👤</span> Podatek Dochodowy od Osób Fizycznych (PIT)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* PIT-37 */}
                  <div className="bg-white border border-slate-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all">
                    <h3 className="text-xl font-semibold text-blue-600 mb-4">PIT-37 (Pracownik)</h3>
                    <div className="space-y-3 text-slate-600">
                      <div>
                        <p className="font-semibold text-slate-900">Stawka podatku:</p>
                        <p>17% lub 32% (w zależności od dochodu)</p>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">Termin złożenia:</p>
                        <p className="text-orange-600 font-bold">Do 30 kwietnia roku następnego</p>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">Co zawiera:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>Dochody ze stanowiska pracy</li>
                          <li>Dodatkowe źródła dochodów</li>
                          <li>Ulga na dziecko</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">Gdzie złożyć:</p>
                        <p>US (Urząd Skarbowy) lub online na www.podatki.gov.pl</p>
                      </div>
                    </div>
                  </div>

                  {/* PIT-36 */}
                  <div className="bg-white border border-slate-200 rounded-xl p-6 hover:border-green-500 hover:shadow-lg transition-all">
                    <h3 className="text-xl font-semibold text-green-600 mb-4">PIT-36 (Przedsiębiorca)</h3>
                    <div className="space-y-3 text-slate-600">
                      <div>
                        <p className="font-semibold text-slate-900">Stawka podatku:</p>
                        <p>19% lub system ryczałtowy</p>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">Termin złożenia:</p>
                        <p className="text-orange-600 font-bold">Do 30 kwietnia roku następnego</p>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">Co zawiera:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>Przychody z prowadzonej działalności</li>
                          <li>Rachunki i faktury</li>
                          <li>Koszty uzyskania przychodu</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">Wymagane dokumenty:</p>
                        <p>KPiR, faktury, umowy</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CIT Section */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="text-3xl">🏢</span> Podatek Dochodowy od Osób Prawnych (CIT)
                </h2>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-slate-200 rounded-xl p-8 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <p className="font-semibold text-slate-900 text-lg mb-2">Stawka podatku:</p>
                      <p className="text-slate-600 text-lg"><span className="text-purple-600 font-bold">19%</span> dla spółek</p>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-lg mb-2">Termin złożenia:</p>
                      <p className="text-orange-600 font-bold text-lg">Do 31 marca roku następnego</p>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-lg mb-2">Płatności zaliczkowe:</p>
                      <p className="text-slate-600">Miesięczne lub kwartalne (zależy od przychodu)</p>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-lg mb-2">Gdzie złożyć:</p>
                      <p className="text-slate-600">US lub elektronicznie na podatki.gov.pl</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* VAT Section */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="text-3xl">🛒</span> Podatek od Towarów i Usług (VAT)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* VAT 23% */}
                  <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all">
                    <div className="text-3xl font-bold text-red-600 mb-3">23%</div>
                    <p className="text-slate-600 mb-4">Stawka obowiązkowa dla większości towarów i usług</p>
                    <div className="text-sm text-slate-500">np. artykuły spożywcze przetworzane, elektronika, ubrania</div>
                  </div>

                  {/* VAT 8% */}
                  <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all">
                    <div className="text-3xl font-bold text-orange-600 mb-3">8%</div>
                    <p className="text-slate-600 mb-4">Stawka obniżona dla wybranych towarów</p>
                    <div className="text-sm text-slate-500">np. artykuły spożywcze, opakowania, zawory</div>
                  </div>

                  {/* VAT 5% */}
                  <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all">
                    <div className="text-3xl font-bold text-amber-600 mb-3">5%</div>
                    <p className="text-slate-600 mb-4">Stawka preferencyjną dla produktów pierwszej potrzeby</p>
                    <div className="text-sm text-slate-500">np. piekarskie, mleczne, zioła medicyny</div>
                  </div>
                </div>
                <div className="mt-6 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                  <p className="text-slate-900 font-semibold mb-2">⏰ Terminy raportowania VAT:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-600">
                    <div>
                      <p className="font-semibold text-slate-900">Miesięczne rozliczenia:</p>
                      <p>Przed 25. dniem miesiąca następnego</p>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Kwartalne rozliczenia:</p>
                      <p>Przed 25. dniem miesiąca następnego po zakończeniu kwartału</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contributions Section */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="text-3xl">💰</span> Składki Ubezpieczeniowe
                </h2>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-slate-200 rounded-xl p-8 shadow-sm">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-semibold text-slate-900 mb-3">Pracownik płaci:</p>
                        <ul className="space-y-2 text-slate-600">
                          <li><span className="text-blue-600 font-bold">9.76%</span> - Emerytura</li>
                          <li><span className="text-blue-600 font-bold">1.5%</span> - Renta</li>
                          <li><span className="text-blue-600 font-bold">2.45%</span> - Chorobowa</li>
                          <li><span className="font-bold text-slate-900">Razem:</span> ~13.71%</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 mb-3">Pracodawca płaci:</p>
                        <ul className="space-y-2 text-slate-600">
                          <li><span className="text-green-600 font-bold">9.76%</span> - Emerytura</li>
                          <li><span className="text-green-600 font-bold">6.5%</span> - Renta wypadkowa</li>
                          <li><span className="text-green-600 font-bold">0.1%</span> - Wypadkowa</li>
                          <li><span className="font-bold text-slate-900">Razem:</span> ~16.36%</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Dates */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="text-3xl">📅</span> Najważniejsze Terminy w Roku
                </h2>
                <div className="space-y-3">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 hover:shadow-lg transition-all">
                    <p className="font-bold text-red-700">25 marca - Termin wpłaty CIT za poprzedni rok</p>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 hover:shadow-lg transition-all">
                    <p className="font-bold text-amber-700">30 kwietnia - Złożenie PIT-37/PIT-36 za poprzedni rok</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:shadow-lg transition-all">
                    <p className="font-bold text-blue-700">Całego roku - Miesięczne/kwartalne rozliczenia VAT</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 hover:shadow-lg transition-all">
                    <p className="font-bold text-green-700">10. każdego miesiąca - Wpłata składek ZUS dla przedsiębiorców</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

<div>
        {currentPage === "doctors" && <DoctorsAppointments />}
      </div>
    </main>
  );
}
