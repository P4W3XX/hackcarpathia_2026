"use client";

import React, { useState } from "react";
import { JobOffer } from "@/app/types";
import { Heart, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import { JobModal } from "./job-modal";

interface JobCardProps {
  job: JobOffer;
}

const colorClasses: Record<string, string> = {
  purple: "bg-purple-100",
  blue: "bg-blue-100",
  lime: "bg-lime-100",
  pink: "bg-pink-100",
  gray: "bg-gray-100",
  indigo: "bg-indigo-100",
};

const colorBorders: Record<string, string> = {
  purple: "border-purple-300",
  blue: "border-blue-300",
  lime: "border-lime-300",
  pink: "border-pink-300",
  gray: "border-gray-300",
  indigo: "border-indigo-300",
};

const textColorClasses: Record<string, string> = {
  purple: "text-purple-700",
  blue: "text-blue-700",
  lime: "text-lime-700",
  pink: "text-pink-700",
  gray: "text-gray-700",
  indigo: "text-indigo-700",
};

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const colorClass = colorClasses[job.color] || colorClasses.blue;
  const colorBorder = colorBorders[job.color] || colorBorders.blue;
  const textColor = textColorClasses[job.color] || textColorClasses.blue;

  const handleLikeClick = () => {
    setIsFavorite(!isFavorite);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <>
      <style jsx>{`
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

        .heart-animate {
          animation: heartBeat 0.6s ease-in-out;
        }

        .pulse-animate {
          animation: pulse-ring 0.6s ease-out;
        }
      `}</style>

      <div
        className={`bg-gradient-to-br ${colorClass} border-2 ${colorBorder} rounded-3xl p-6 hover:shadow-xl transition-all duration-300 slide-in w-[20rem] cursor-pointer`}
        onClick={() => setIsModalOpen(true)}
      >


      {/* Salary */}
      <div className={`text-md font-medium text-zinc-600 mb-2`}>
        {job.salary.min.toLocaleString()}zł /month
      </div>

      {/* Title and Company */}
      <div className="flex flex-row items-center justify-between gap-4 mb-4">
      <div className="flex flex-col">
         <h3 className={`text-xl font-semibold`}>{job.title}</h3>
      <p className={`font-semibold  mb-1 opacity-75`}>
        {job.company}
      </p>
      </div>
       <Image src={job.logo || "/default-logo.png"} alt={`${job.company} logo`} width={40} height={40} className="w-10 h-10 rounded-lg object-cover" />
        </div>

      {/* Location */}
      <div className="flex items-center gap-2 mb-2 text-gray-700">
        <MapPin className="w-4 h-4" />
        <span className="text-sm">{job.location}</span>
      </div>

      {/* Date and Applicants */}
      <div className="flex items-center justify-between text-sm text-gray-600 mb-4 pb-4 border-b border-current border-opacity-20">
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {job.date}
        </span>
        <span>{job.applicants} applicants</span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {job.tags.map((tag) => (
          <span
            key={tag}
            className={`px-3 py-1 rounded-full text-xs font-semibold  border-gray-300 border-1`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex flex-row gap-3 items-center">
        <button
          onClick={(e) => e.stopPropagation()}
          className={`flex-1 text-sm text-normal py-2 rounded-xl hover:opacity-80 transition-opacity duration-300 border-black border-2 bg-slate-900 text-white`}
        >
          Apply now
        </button>
              {/* Header with Logo and Favorite */}
   
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleLikeClick();
          }}
          className={`p-2 rounded-full transition-all duration-300 ${
            isFavorite
              ? "bg-red-500 text-white"
              : `${colorClass} ${textColor} hover:${colorClass}`
          } ${isAnimating ? "heart-animate" : ""} ${isFavorite && isAnimating ? "pulse-animate" : ""}`}
        >
          <Heart
            className="w-5 h-5"
            fill={isFavorite ? "currentColor" : "none"}
          />
        </button>
      </div>
      </div>

      {/* Job Modal */}
      <JobModal
        job={job}
        isOpen={isModalOpen}
        onCloseAction={() => setIsModalOpen(false)}
        isFavorite={isFavorite}
        onFavoriteClickAction={handleLikeClick}
      />
    </>
  );
};
