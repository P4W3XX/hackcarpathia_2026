"use client";

import React, { useMemo, useState, useRef, useEffect } from "react";
import { JobCard } from "@/components/job-card";
import { Filters } from "@/components/filters";
import { jobOffers } from "@/app/data/jobs";
import { Search, ChevronDown } from "lucide-react";
import {
  useFilterSearchTerm,
  useSalaryRange,
  useWorkSchedule,
  useEmploymentType,
  useWorkStyle,
  useUpdateSearchTerm,
} from "@/store/filters";

export const JobsPage: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const filtersRef = useRef<HTMLDivElement>(null);
  
  const searchTerm = useFilterSearchTerm();
  const salaryRange = useSalaryRange();
  const workSchedule = useWorkSchedule();
  const employmentType = useEmploymentType();
  const workStyle = useWorkStyle();
  const updateSearchTerm = useUpdateSearchTerm();

  // Close filters when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filtersRef.current && !filtersRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    };

    if (showFilters) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilters]);

  const filteredJobs = useMemo(() => {
    let result = jobOffers;

    // Search term filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(term) ||
          job.company.toLowerCase().includes(term) ||
          job.location.toLowerCase().includes(term)
      );
    }

    // Work schedule filter
    if (workSchedule.length > 0) {
      result = result.filter((job) =>
        workSchedule.includes(job.workSchedule)
      );
    }

    // Salary range filter
    result = result.filter(
      (job) =>
        job.salary.min >= salaryRange[0] &&
        job.salary.min <= salaryRange[1]
    );

    // Employment type filter
    if (employmentType.length > 0) {
      result = result.filter((job) =>
        employmentType.includes(job.employmentType)
      );
    }

    // Work style filter
    if (workStyle.length > 0) {
      result = result.filter((job) =>
        workStyle.includes(job.workStyle)
      );
    }

    return result;
  }, [searchTerm, salaryRange, workSchedule, employmentType, workStyle]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Find your dream job
              </h1>
              <p className="text-gray-600 mt-1">
                Discover opportunities that match your skills and aspirations
              </p>
            </div>
          </div>

          {/* Search Bar & Filter Toggle */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-end relative" ref={filtersRef}>
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by job title, company, or location..."
                  value={searchTerm}
                  onChange={(e) => updateSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
              
              {/* Filter Toggle Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <span className="font-medium">Filtry</span>
                <ChevronDown
                  size={20}
                  className={`transition-transform ${showFilters ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Filters Panel - Floating Dropdown */}
              {showFilters && (
                <div className="absolute top-full right-0  mt-2  w-96  border border-gray-200 rounded-xl shadow-xl z-50  max-h-[calc(100vh-200px)]">
                  <Filters />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8">
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Available Positions
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>

        {filteredJobs.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-4 w-full">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No positions found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters to find more opportunities
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
