"use client";

import React, { useState, useMemo } from "react";
import { Filters } from "@/app/components/filters";
import { JobCard } from "@/app/components/job-card";
import { FilterState } from "@/app/types";
import { jobOffers } from "@/app/data/jobs";
import { Search } from "lucide-react";

export const JobsPage: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    workSchedule: [],
    salaryRange: [2500, 15000],
    employmentType: [],
    workStyle: [],
    searchTerm: "",
  });

  const filteredJobs = useMemo(() => {
    let result = jobOffers;

    // Search term filter
    if (filters.searchTerm.trim()) {
      const term = filters.searchTerm.toLowerCase();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(term) ||
          job.company.toLowerCase().includes(term) ||
          job.location.toLowerCase().includes(term)
      );
    }

    // Work schedule filter
    if (filters.workSchedule.length > 0) {
      result = result.filter((job) =>
        filters.workSchedule.includes(job.workSchedule)
      );
    }

    // Salary range filter
    result = result.filter(
      (job) =>
        job.salary.min >= filters.salaryRange[0] &&
        job.salary.min <= filters.salaryRange[1]
    );

    // Employment type filter
    if (filters.employmentType.length > 0) {
      result = result.filter((job) =>
        filters.employmentType.includes(job.employmentType)
      );
    }

    // Work style filter
    if (filters.workStyle.length > 0) {
      result = result.filter((job) =>
        filters.workStyle.includes(job.workStyle)
      );
    }

    return result;
  }, [filters]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
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

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by job title, company, or location..."
              value={filters.searchTerm}
              onChange={(e) =>
                setFilters({ ...filters, searchTerm: e.target.value })
              }
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar 
           <div className="flex-shrink-0">
            <Filters filters={filters} onFilterChangeAction={setFilters} />
          </div>
          */}
         

          {/* Jobs Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Available Positions
              </h2>
              <span className=" text-gray-400 px-4 py-2 text-md font-normal">
                {filteredJobs.length} results
              </span>
            </div>

            {filteredJobs.length > 0 ? (
              <div className="flex flex-wrap gap-x-3 gap-y-6 items-center jujstify-center w-full">
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
      </div>
    </div>
  );
};
