"use client";

import React, { useMemo } from "react";
import { FilterState } from "@/app/types";
import { Zap } from "lucide-react";
import { jobOffers } from "@/app/data/jobs";

interface FiltersProps {
  filters: FilterState;
  onFilterChangeAction?: (filters: FilterState) => void;
}

export const Filters: React.FC<FiltersProps> = ({ filters, onFilterChangeAction }) => {
  const handleFilterChange = (newFilters: FilterState) => {
    onFilterChangeAction?.(newFilters);
  };
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

  const toggleWorkSchedule = (option: string) => {
    handleFilterChange({
      ...filters,
      workSchedule: filters.workSchedule.includes(option)
        ? filters.workSchedule.filter((item) => item !== option)
        : [...filters.workSchedule, option],
    });
  };

  const toggleEmploymentType = (option: string) => {
    handleFilterChange({
      ...filters,
      employmentType: filters.employmentType.includes(option)
        ? filters.employmentType.filter((item) => item !== option)
        : [...filters.employmentType, option],
    });
  };

  const toggleWorkStyle = (option: string) => {
    handleFilterChange({
      ...filters,
      workStyle: filters.workStyle.includes(option)
        ? filters.workStyle.filter((item) => item !== option)
        : [...filters.workStyle, option],
    });
  };

  const handleSalaryMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseInt(e.target.value);
    if (newMin <= filters.salaryRange[1]) {
      handleFilterChange({
        ...filters,
        salaryRange: [newMin, filters.salaryRange[1]],
      });
    }
  };

  const handleSalaryMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseInt(e.target.value);
    if (newMax >= filters.salaryRange[0]) {
      handleFilterChange({
        ...filters,
        salaryRange: [filters.salaryRange[0], newMax],
      });
    }
  };

  const handleResetFilters = () => {
    handleFilterChange({
      workSchedule: [],
      salaryRange: [2500, 15000],
      employmentType: [],
      workStyle: [],
      searchTerm: "",
    });
  };

  return (
    <div className="w-80 bg-white rounded-2xl shadow-lg p-6 overflow-y-auto max-h-[calc(100vh-2rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
        <button
          onClick={handleResetFilters}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Reset all
        </button>
      </div>

      {/* Work Schedule */}
      <div className="mb-8">
        <h3 className="font-semibold text-gray-900 mb-4">Work schedule</h3>
        <div className="space-y-3">
          {workScheduleOptions.map((option) => (
            <label key={option} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.workSchedule.includes(option)}
                onChange={() => toggleWorkSchedule(option)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-3 text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Salary Range */}
      <div className="mb-8">
        <div className="flex items-baseline justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Salary range</h3>
          <span className="text-sm text-gray-600">
            ${filters.salaryRange[0].toLocaleString()} - $
            {filters.salaryRange[1].toLocaleString()}
          </span>
        </div>

        {/* Salary Chart */}
        <div className="mb-6 p-4 bg-gradient-to-b from-blue-50 to-white border border-blue-200 rounded-lg">
          <div className="flex items-end justify-between h-40 gap-0.5">
            {salaryDistribution.map((item, index) => {
              const isInRange =
                item.salary >= filters.salaryRange[0] &&
                item.salary <= filters.salaryRange[1];
              const heightPercent = (item.count / maxCount) * 100;

              return (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center group relative"
                >
                  <div
                    className={`w-full rounded-t-sm transition-all duration-200 ${
                      isInRange
                        ? "bg-gradient-to-t from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                  <div className="absolute bottom-full mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ${item.salary.toLocaleString()} ({item.count})
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-2">
            <span>$2K</span>
            <span>$8K</span>
            <span>$14K</span>
          </div>
        </div>

        {/* Range Sliders */}
        <div className="space-y-4">
          {/* Min Salary Slider */}
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-2">
              Minimum: ${filters.salaryRange[0].toLocaleString()}/month
            </label>
            <input
              type="range"
              min="2500"
              max="15000"
              step="500"
              value={filters.salaryRange[0]}
              onChange={handleSalaryMinChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Max Salary Slider */}
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-2">
              Maximum: ${filters.salaryRange[1].toLocaleString()}/month
            </label>
            <input
              type="range"
              min="2500"
              max="15000"
              step="500"
              value={filters.salaryRange[1]}
              onChange={handleSalaryMaxChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>

        {/* Salary Stats */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-gray-600 text-xs">Minimum</p>
              <p className="font-bold text-blue-600">
                ${filters.salaryRange[0].toLocaleString()}
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-gray-600 text-xs">Maximum</p>
              <p className="font-bold text-blue-600">
                ${filters.salaryRange[1].toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Employment Type */}
      <div className="mb-8">
        <h3 className="font-semibold text-gray-900 mb-4">Employment type</h3>
        <div className="space-y-3">
          {employmentTypeOptions.map((option) => (
            <label key={option} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.employmentType.includes(option)}
                onChange={() => toggleEmploymentType(option)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-3 text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Work Style */}
      <div className="mb-8">
        <h3 className="font-semibold text-gray-900 mb-4">Work style</h3>
        <div className="space-y-3">
          {workStyleOptions.map((option) => (
            <label key={option} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.workStyle.includes(option)}
                onChange={() => toggleWorkStyle(option)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-3 text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Premium Ad */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-4 text-white text-center">
        <Zap className="w-6 h-6 mx-auto mb-2" />
        <h4 className="font-semibold mb-2">Get PRO features</h4>
        <p className="text-sm mb-3 opacity-90">
          Unlock advanced filters and notifications
        </p>
        <button className="w-full bg-white text-purple-600 font-semibold py-2 rounded-lg hover:bg-gray-100 transition">
          Upgrade
        </button>
      </div>
    </div>
  );
};
