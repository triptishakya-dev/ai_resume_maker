"use client";
import React, { useState } from "react";
import {
  ChevronDown,
  TrendingUp,
  Users,
  Award,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  BarChart3,
  Filter,
} from "lucide-react";
import { resumeData } from "@/constants";

// Resume data constants

// ScoreCircle component
const ScoreCircle = ({ score, size = 80 }) => {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreColor = (score) => {
    if (score >= 85) return "#10b981"; // green
    if (score >= 70) return "#f59e0b"; // yellow
    if (score >= 55) return "#f97316"; // orange
    return "#ef4444"; // red
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="4"
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getScoreColor(score)}
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold text-gray-800">{score}</span>
      </div>
    </div>
  );
};

// ResumeCard component
const ResumeCard = ({ resume, onClick }) => {
  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "under review":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "bg-green-50 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-50 text-red-700 border-red-200";
      case "under review":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  // Calculate tips count
  const totalTips =
    Object.values(resume.feedback).reduce((acc, section) => {
      if (section.tips) {
        return acc + section.tips.length;
      }
      return acc;
    }, 0) - resume.feedback.overallScore; // Subtract overallScore as it's not an object with tips

  return (
    <div
      onClick={() => onClick(resume)}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden group hover:scale-[1.02]"
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-2xl font-bold text-gray-900 mb-1 truncate">
              {resume.companyName}
            </h3>
            <p className="text-gray-600 font-medium">{resume.jobTitle}</p>
          </div>
          <div className="flex-shrink-0 ml-4">
            <ScoreCircle score={resume.feedback.overallScore} size={70} />
          </div>
        </div>

        {/* Score Breakdown Preview */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="text-center p-2 bg-gray-50 rounded">
            <div className="text-lg font-bold text-blue-600">
              {resume.feedback.ATS?.score || 0}
            </div>
            <div className="text-xs text-gray-600">ATS Score</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded">
            <div className="text-lg font-bold text-purple-600">
              {resume.feedback.skills?.score || 0}
            </div>
            <div className="text-xs text-gray-600">Skills</div>
          </div>
        </div>

        {/* Tips indicator */}
        {totalTips > 0 && (
          <div className="flex items-center gap-2 text-sm text-orange-600 bg-orange-50 px-3 py-2 rounded-lg mb-4">
            <AlertCircle className="w-4 h-4" />
            {totalTips} improvement {totalTips === 1 ? "tip" : "tips"} available
          </div>
        )}
      </div>

      {/* Resume Preview */}
      <div className="px-6 pb-6">
        <div className="bg-gray-50 rounded-xl p-4 border-2 border-dashed border-gray-200 group-hover:border-gray-300 transition-colors">
          <img
            src={resume.imagePath}
            alt={`Resume for ${resume.companyName}`}
            className="w-full h-40 object-cover rounded-lg shadow-sm"
            onError={(e) => {
              e.target.src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' fill='%23f3f4f6'%3E%3Crect width='400' height='300' fill='%23f9fafb'/%3E%3Ctext x='200' y='150' text-anchor='middle' fill='%239ca3af' font-family='Arial' font-size='16'%3EResume Preview%3C/text%3E%3C/svg%3E";
            }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500 flex items-center gap-1">
            <BarChart3 className="w-3 h-3" />
            AI Analysis Complete
          </div>
          <div className="text-blue-600 font-medium text-sm group-hover:text-blue-700 transition-colors flex items-center gap-1">
            View Details
            <ChevronDown className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Stats Card component
const StatsCard = ({ icon: Icon, title, value, subtitle, color, trend }) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
    <div className="flex items-center justify-between mb-4">
      <div
        className={`p-3 rounded-full ${color} group-hover:scale-110 transition-transform`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
      {trend && (
        <div
          className={`text-sm font-medium ${
            trend > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {trend > 0 ? "+" : ""}
          {trend}%
        </div>
      )}
    </div>
    <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
    <div className="text-sm font-medium text-gray-600 mb-1">{title}</div>
    {subtitle && <div className="text-xs text-gray-500">{subtitle}</div>}
  </div>
);

// Enhanced Modal component for resume details
const ResumeModal = ({ resume, isOpen, onClose }) => {
  if (!isOpen || !resume) return null;

  const feedbackSections = [
    { key: "ATS", name: "ATS Compatibility", icon: BarChart3 },
    { key: "toneAndStyle", name: "Tone & Style", icon: FileText },
    { key: "content", name: "Content Quality", icon: Award },
    { key: "structure", name: "Structure", icon: Users },
    { key: "skills", name: "Skills Section", icon: TrendingUp },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {resume.companyName} - {resume.jobTitle}
            </h2>
            <p className="text-gray-600">
              Submitted on {new Date(resume.submittedDate).toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          {/* Overall Score */}
          <div className="text-center mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
            <div className="text-5xl font-bold text-blue-600 mb-2">
              {resume.feedback.overallScore}
            </div>
            <div className="text-lg text-gray-700">Overall AI Score</div>
          </div>

          {/* Detailed Score Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {feedbackSections.map(({ key, name, icon: Icon }) => {
              const section = resume.feedback[key];
              if (!section) return null;

              return (
                <div
                  key={key}
                  className="bg-white border rounded-xl p-6 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-6 h-6 text-blue-500" />
                    <h3 className="text-lg font-semibold text-gray-800">
                      {name}
                    </h3>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {section.score || 0}
                  </div>
                  {section.tips && section.tips.length > 0 && (
                    <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                      {section.tips.map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>

          {/* Resume Preview */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Resume Preview
            </h3>
            <img
              src={resume.imagePath}
              alt={`${resume.companyName} Resume`}
              className="w-full max-h-96 object-contain rounded-lg shadow"
              onError={(e) => {
                e.target.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' fill='%23f3f4f6'%3E%3Crect width='400' height='300' fill='%23f9fafb'/%3E%3Ctext x='200' y='150' text-anchor='middle' fill='%239ca3af' font-family='Arial' font-size='16'%3ENo Preview%3C/text%3E%3C/svg%3E";
              }}
            />
            <a
              href={resume.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white text-sm rounded-lg shadow hover:bg-blue-700 transition"
            >
              Download Full Resume
            </a>
          </div>

          {/* Status */}
          <div className="text-center">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
              Status: {resume.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
const ResumeDashboard = () => {
  const [selectedResume, setSelectedResume] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (resume) => {
    setSelectedResume(resume);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="container flex flex-col w-full mx-auto ">
        <div className="w-full mx-auto py-16 text-center">
          <h1 className="max-sm:text-[3rem] text-6xl  text-gradient leading-tight xl:tracking-[-2px] font-semibold">
            Track Your Application & Resume Ratings
          </h1>
          <h2 className="max-sm:text-xl text-3xl text-black">
            Review your submissions and check AI-powered feedback.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-5">
          {resumeData.map((resume) => (
            <ResumeCard
              key={resume.id}
              resume={resume}
              onClick={handleCardClick}
            />
          ))}
        </div>
        {/* Modal */}
        <ResumeModal
          resume={selectedResume}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default ResumeDashboard;
