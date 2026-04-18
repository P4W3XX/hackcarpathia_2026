"use client";

import React, { useMemo, useState } from "react";
import { Zap, ChevronDown, Briefcase, Clock, Globe, RotateCcw } from "lucide-react";
import { jobOffers } from "@/app/data/jobs";
import {
  useSalaryRange,
  useWorkSchedule,
  useEmploymentType,
  useWorkStyle,
  useUpdateSalaryRange,
  useToggleWorkSchedule,
  useToggleEmploymentType,
  useToggleWorkStyle,
  useResetFilters,
} from "@/store/filters";

export const Filters: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    schedule: true,
    salary: true,
    employment: false,
    style: false,
  });

  const salaryRange = useSalaryRange();
  const workSchedule = useWorkSchedule();
  const employmentType = useEmploymentType();
  const workStyle = useWorkStyle();
  
  const updateSalaryRange = useUpdateSalaryRange();
  const toggleWorkSchedule = useToggleWorkSchedule();
  const toggleEmploymentType = useToggleEmploymentType();
  const toggleWorkStyle = useToggleWorkStyle();
  const resetFilters = useResetFilters();

  const workScheduleOptions = [
    "Full-time",
    "Part-time",
    "Internship",
    "Project work",
    "Volunteering",
  ];
  const employmentTypeOptions = [
    "Full day",
    "Flexible schedule",
    "Shift work",
    "Distant work",
  ];
  const workStyleOptions = ["Office", "Hybrid", "Remote"];

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Calculate salary distribution for chart
  const salaryDistribution = useMemo(() => {
    const bucketSize = 1000;
    const buckets: Record<number, number> = {};

    jobOffers.forEach((job) => {
      const bucket = Math.floor(job.salary.min / bucketSize) * bucketSize;
      buckets[bucket] = (buckets[bucket] || 0) + 1;
    });

    return Object.entries(buckets)
      .sort(([a], [b]) => parseInt(a) - parseInt(b))
      .map(([salary, count]) => ({
        salary: parseInt(salary),
        count,
      }));
  }, []);

  const maxCount = useMemo(() => {
    return Math.max(...salaryDistribution.map((d) => d.count), 1);
  }, [salaryDistribution]);

  const handleSalaryMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseInt(e.target.value);
    if (newMin <= salaryRange[1]) {
      updateSalaryRange([newMin, salaryRange[1]]);
    }
  };

  const handleSalaryMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseInt(e.target.value);
    if (newMax >= salaryRange[0]) {
      updateSalaryRange([salaryRange[0], newMax]);
    }
  };

  const getActiveFiltersCount = () => {
    return (
      workSchedule.length +
      employmentType.length +
      workStyle.length +
      (salaryRange[0] !== 2500 || salaryRange[1] !== 15000 ? 1 : 0)
    );
  };

  return (
    <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200 p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <h2 className="text-lg font-bold text-gray-900">Filters</h2>
            {getActiveFiltersCount() > 0 && (
              <span className="ml-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-semibold">
                {getActiveFiltersCount()}
              </span>
            )}
          </div>
          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-gray-700 hover:bg-gray-100 transition text-sm font-medium border border-gray-300"
          >
            <RotateCcw size={14} />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {/* Work Schedule Section */}
        <div className="border-b border-gray-100">
          <button
            onClick={() => toggleSection("schedule")}
            className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition group"
          >
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-900">Work schedule</span>
            </div>
            <ChevronDown
              size={20}
              className={`text-gray-500 transition-transform ${
                expandedSections.schedule ? "rotate-180" : ""
              }`}
            />
          </button>

          {expandedSections.schedule && (
            <div className="px-5 pb-4 space-y-3 bg-gray-50">
              {workScheduleOptions.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={workSchedule.includes(option)}
                    onChange={() => toggleWorkSchedule(option)}
                    className="w-5 h-5 rounded border-2 border-gray-300 text-blue-600 cursor-pointer transition hover:border-blue-400 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 font-medium group-hover:text-blue-600 transition">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Salary Range Section */}
        <div className="border-b border-gray-100">
          <button
            onClick={() => toggleSection("salary")}
            className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition group"
          >
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-green-600" />
              <div className="text-left">
                <span className="font-semibold text-gray-900 block">Salary range</span>
                <span className="text-xs text-gray-600">
                  ${salaryRange[0].toLocaleString()} - $
                  {salaryRange[1].toLocaleString()}
                </span>
              </div>
            </div>
            <ChevronDown
              size={20}
              className={`text-gray-500 transition-transform ${
                expandedSections.salary ? "rotate-180" : ""
              }`}
            />
          </button>

          {expandedSections.salary && (
            <div className="px-5 pb-5 space-y-4 bg-gray-50">
              {/* Salary Chart Header */}
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-gray-900">Distribution</span>
                <span className="text-green-600 font-bold">
                  {jobOffers.filter((job) => job.salary.min >= salaryRange[0] && job.salary.min <= salaryRange[1]).length} jobs
                </span>
              </div>

              {/* Salary Chart */}
              <div className="p-4 bg-white border border-green-200 rounded-xl shadow-sm">
                <div className="flex items-end justify-between h-40 gap-1.5">
                  {salaryDistribution.map((item, index) => {
                    const isInRange =
                      item.salary >= salaryRange[0] &&
                      item.salary <= salaryRange[1];
                    const heightPercent = (item.count / maxCount) * 100;

                    return (
                      <div
                        key={index}
                        className="flex-1 flex flex-col items-center group relative"
                      >
                        <div
                          className={`w-full rounded-t-lg transition-all duration-200 shadow-sm ${
                            isInRange
                              ? "bg-gradient-to-t from-emerald-500 via-emerald-400 to-emerald-300 hover:from-emerald-600 hover:via-emerald-500 hover:to-emerald-400 shadow-md"
                              : "bg-gradient-to-t from-gray-300 to-gray-200 hover:from-gray-400 hover:to-gray-300"
                          }`}
                          style={{ height: `${heightPercent}%` }}
                        />
                        {/* Tooltip */}
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20 shadow-lg">
                          <div className="font-semibold">${item.salary.toLocaleString()}</div>
                          <div className="text-gray-300">{item.count} job{item.count !== 1 ? 's' : ''}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-3 px-1">
                  <span className="font-medium">$2K</span>
                  <span className="font-medium">$8K</span>
                  <span className="font-medium">$14K</span>
                </div>
              </div>

              {/* Range Sliders */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-gray-700">
                      Minimum
                    </label>
                    <span className="text-sm font-bold text-green-600">
                      ${salaryRange[0].toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2500"
                    max="15000"
                    step="500"
                    value={salaryRange[0]}
                    onChange={handleSalaryMinChange}
                    className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-gray-700">
                      Maximum
                    </label>
                    <span className="text-sm font-bold text-green-600">
                      ${salaryRange[1].toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2500"
                    max="15000"
                    step="500"
                    value={salaryRange[1]}
                    onChange={handleSalaryMaxChange}
                    className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Employment Type Section */}
        <div className="border-b border-gray-100">
          <button
            onClick={() => toggleSection("employment")}
            className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition group"
          >
            <div className="flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-gray-900">Employment type</span>
            </div>
            <ChevronDown
              size={20}
              className={`text-gray-500 transition-transform ${
                expandedSections.employment ? "rotate-180" : ""
              }`}
            />
          </button>

          {expandedSections.employment && (
            <div className="px-5 pb-4 space-y-3 bg-gray-50">
              {employmentTypeOptions.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={employmentType.includes(option)}
                    onChange={() => toggleEmploymentType(option)}
                    className="w-5 h-5 rounded border-2 border-gray-300 text-purple-600 cursor-pointer transition hover:border-purple-400 focus:ring-2 focus:ring-purple-500"
                  />
                  <span className="text-gray-700 font-medium group-hover:text-purple-600 transition">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Work Style Section */}
        <div>
          <button
            onClick={() => toggleSection("style")}
            className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition group"
          >
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-orange-600" />
              <span className="font-semibold text-gray-900">Work style</span>
            </div>
            <ChevronDown
              size={20}
              className={`text-gray-500 transition-transform ${
                expandedSections.style ? "rotate-180" : ""
              }`}
            />
          </button>

          {expandedSections.style && (
            <div className="px-5 pb-4 space-y-3 bg-gray-50">
              {workStyleOptions.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={workStyle.includes(option)}
                    onChange={() => toggleWorkStyle(option)}
                    className="w-5 h-5 rounded border-2 border-gray-300 text-orange-600 cursor-pointer transition hover:border-orange-400 focus:ring-2 focus:ring-orange-500"
                  />
                  <span className="text-gray-700 font-medium group-hover:text-orange-600 transition">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
