"use client";

import React, { useState } from "react";
import { JobOffer } from "@/app/types";
import { X, Heart, MapPin } from "lucide-react";

interface JobModalProps {
  job: JobOffer;
  isOpen: boolean;
  onCloseAction: () => void;
  isFavorite?: boolean;
  onFavoriteClickAction?: () => void;
}

export const JobModal: React.FC<JobModalProps> = ({
  job,
  isOpen,
  onCloseAction,
  isFavorite = false,
  onFavoriteClickAction,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFavoriteWithAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
    onFavoriteClickAction?.();
  };

  if (!isOpen) return null;

  return (
    <>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes heartBeat {
          0% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.3);
          }
          50% {
            transform: scale(1.1);
          }
          75% {
            transform: scale(1.25);
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes pulse-ring {
          0% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
          }
          70% {
            box-shadow: 0 0 0 15px rgba(239, 68, 68, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
          }
        }
        .modal-backdrop {
          animation: fadeIn 0.3s ease-out;
        }
        .heart-animate {
          animation: heartBeat 0.6s ease-in-out;
        }
        .pulse-animate {
          animation: pulse-ring 0.6s ease-out;
        }
      `}</style>
      
      {/* Backdrop - Light gray with blur effect */}
      <div
        className="modal-backdrop fixed inset-0 bg-gray-500/15 backdrop-blur-sm z-40 transition-opacity"
      />

      {/* Modal Container */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
        onClick={onCloseAction}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Close Button */}
          <div className="flex justify-between items-start p-6 border-b border-gray-200">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
              <p className="text-gray-600 mt-1">{job.company}</p>
            </div>
            <button
              onClick={onCloseAction}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={28} />
            </button>
          </div>

          <div className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            {/* Salary and Job Type Badges */}
            <div className="flex gap-3 flex-wrap items-center">
              <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
                {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}zł/mo
              </div>
              <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-semibold text-sm">
                {job.workSchedule}
              </div>
              <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-sm">
                {job.employmentType}
              </div>
              <div className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-semibold text-sm">
                {job.workStyle}
              </div>
            </div>

            {/* Key Info */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Experience</p>
                <p className="font-semibold text-gray-900">{job.experience}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Posted</p>
                <p className="font-semibold text-gray-900">{job.date}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Applicants</p>
                <p className="font-semibold text-gray-900">{job.applicants}</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-900">{job.location}</span>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Job Description</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>

            {/* Tags */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 border-2 border-zinc-400 text-black rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer with Action Buttons */}
          <div className="flex gap-3 p-6 border-t border-gray-200">
            <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
              Apply Now
            </button>
            <button
              onClick={handleFavoriteWithAnimation}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                isFavorite
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              } ${isAnimating ? "heart-animate" : ""} ${isFavorite && isAnimating ? "pulse-animate" : ""}`}
            >
              <Heart
                size={20}
                fill={isFavorite ? "currentColor" : "none"}
                className="inline mr-2"
              />
              {isFavorite ? "Liked" : "Like"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
