"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";
import { useUserProgress } from "@/hooks/useUserProgress";

export default function Chapter62() {
  const { progress } = useUserProgress('level1-reformers');
  const [activeTab, setActiveTab] = useState<"description" | "resources" | "comments">("description");
  const [isClient, setIsClient] = useState(false);

  const resources = [
    { name: "Heavy Squat Exercise Guide (PDF)", size: "1.3 MB", url: "/pdfs/ab wheel/heavy squat.pdf" },
  ];

  // Comments are now handled by the LessonComments component

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-[#E43636] text-[#F6EFD2] py-6 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold">Level 1 All Reformers</h1>
                <p className="text-[#E2DDB4]">Chapter 6: Heavy Leg Exercises</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-[#E2DDB4]">Progress</p>
                <p className="text-lg font-bold">{progress}% Complete</p>
              </div>
            </div>
            <div className="w-full bg-[#F6EFD2]/20 rounded-full h-3">
              <div className="bg-[#F6EFD2] h-3 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E43636]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Course Title and Progress Bar */}
      <div className="bg-[#E43636] text-[#F6EFD2] py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Level 1 All Reformers</h1>
              <p className="text-[#E2DDB4]">Chapter 6: Heavy Leg Exercises</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-[#E2DDB4]">Progress</p>
              <p className="text-lg font-bold">{progress}% Complete</p>
            </div>
          </div>
          <div className="w-full bg-[#F6EFD2]/20 rounded-full h-3">
            <div className="bg-[#F6EFD2] h-3 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Course Navigation */}
        <div className="pl-4 pt-4">
          <CourseNavigation 
            currentLessonPath="/courses/level1-reformers/content/chapter-6/6-2"
            nextLessonPath="/courses/level1-reformers/content/chapter-6/6-3"
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 lg:pl-20 lg:pt-16">

          {/* Lesson Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-[#E43636] mb-2">Heavy Squat</h1>
            <p className="text-lg text-gray-600">Chapter 6 - Lesson 2</p>
          </motion.div>

          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden shadow-lg">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/k4WypUmbqhI"
                title="Heavy Squat Tutorial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>

          {/* Content Card with Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#E43636] space-y-8 mt-8"
          >
            {/* Tabs */}
            <div className="bg-white rounded-2xl p-1 shadow-lg">
              <div className="flex space-x-1">
                {[
                  { id: "description", label: "Description" },
                  { id: "resources", label: "Resources" },
                  { id: "comments", label: "Q&A" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                      activeTab === (tab.id as any)
                        ? "bg-[#E43636] text-[#F6EFD2] shadow-lg"
                        : "text-[#E43636] hover:bg-[#F6EFD2]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="p-0"
            >
              {/* Description */}
              {activeTab === "description" && (
                <div>
                  <h2 className="text-2xl font-bold text-[#E43636] mb-4">Heavy Squat</h2>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      [left leg]<br />
                      In the front, facing sideways
                    </p>
                  </div>
                </div>
              )}

              {/* Resources */}
              {activeTab === "resources" && (
                <div>
                  <h3 className="text-2xl font-bold text-[#E43636] mb-4">Resources</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {resources.map((r, i) => (
                      <div
                        key={i}
                        className={`p-4 rounded-xl border border-[#E43636] text-black shadow-sm transition-colors ${
                          r.url ? 'cursor-pointer hover:bg-[#F6EFD2] hover:text-[#E43636]' : 'bg-white'
                        }`}
                        onClick={r.url ? () => window.open(r.url, '_blank') : undefined}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold">{r.name}</p>
                            <p className="text-sm opacity-75">{r.size}</p>
                          </div>
                          {r.url && (
                            <svg className="w-5 h-5 text-[#E43636]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Comments */}
              {activeTab === "comments" && (
                  <LessonComments 
                    lessonId="chapter-6/6-2" 
                    courseId="level1-reformers" 
                  />
                )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}