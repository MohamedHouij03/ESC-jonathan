"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";
import { useUserProgress } from "@/hooks/useUserProgress";

export default function Chapter35() {
  const [activeTab, setActiveTab] = useState<"description" | "resources" | "comments">("description");
  const [isClient, setIsClient] = useState(false);
  const { progress } = useUserProgress('level1-reformers');

  // Tab content data
  const resources = [
    { name: "Panther Exercise Guide (PDF)", size: "201 KB", url: "/pdfs/ab wheel/panther/panther.pdf" },
    { name: "Reverse Panther Exercise Guide (PDF)", size: "200 KB", url: "/pdfs/ab wheel/panther/reverse panther.pdf" },
    { name: "Back Panther Exercise Guide (PDF)", size: "191 KB", url: "/pdfs/ab wheel/panther/back panther.pdf" },
    { name: "Back Reverse Panther Exercise Guide (PDF)", size: "189 KB", url: "/pdfs/ab wheel/panther/back reverse panther.pdf" },
    { name: "Hi Panther Exercise Guide (PDF)", size: "204 KB", url: "/pdfs/ab wheel/panther/hi panther.pdf" },
  ];

  // Comments are now handled by the LessonComments component

  // Prevent hydration errors
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Course Title and Progress Bar */}
      <div className="bg-[#E43636] text-[#F6EFD2] py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Level 1 All Reformers</h1>
              <p className="text-[#E2DDB4]">Chapter 3: Core Exercises</p>
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
          {isClient && (
          <CourseNavigation 
            currentLessonPath="/courses/level1-reformers/content/chapter-3/3-5"
            nextLessonPath="/courses/level1-reformers/content/chapter-3/3-6"
          />
          )}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 lg:pl-20 lg:pt-16">
          {/* Lesson Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-[#E43636] mb-2">Panther</h1>
            <p className="text-lg text-gray-600">Chapter 3 - Lesson 5</p>
          </motion.div>

          {/* Video Players */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="500"
                src="https://www.youtube.com/embed/vk7Pg7YtEuQ"
                title="Panther Exercise - Video 1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full"
              ></iframe>
            </div>
          </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
            >
            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                width="100%"
                height="500"
                src="https://www.youtube.com/embed/w5VAHMlXwWU"
                title="Panther Exercise - Video 2"
                  frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                className="w-full"
                ></iframe>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="500"
                src="https://www.youtube.com/embed/hAucMvPHzFQ"
                title="Panther Exercise - Video 3"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full"
              ></iframe>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="500"
                src="https://www.youtube.com/embed/ucuXug4K9cY"
                title="Panther Exercise - Video 4"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full"
              ></iframe>
                    </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="500"
                src="https://www.youtube.com/embed/4jLS6cBIovw"
                title="Panther Exercise - Video 5"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full"
              ></iframe>
                  </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="500"
                src="https://www.youtube.com/embed/LktmD-6hYHE"
                title="Panther Exercise - Video 6"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full"
              ></iframe>
              </div>
            </motion.div>

            {/* Content Card with Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#E43636] space-y-8"
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
                    <h2 className="text-2xl font-bold text-[#E43636] mb-4">Panther</h2>
                    <p className="text-gray-700">At the front, facing the front</p>
                  </div>
                )}

                {/* Resources */}
                {activeTab === "resources" && (
                  <div>
                    <h3 className="text-2xl font-bold text-[#E43636] mb-4">Resources</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {resources.map((resource, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-xl border border-[#E43636] text-black shadow-sm transition-colors ${
                            resource.url ? 'cursor-pointer hover:bg-[#F6EFD2] hover:text-[#E43636]' : 'bg-white'
                          }`}
                          onClick={resource.url ? () => window.open(resource.url, '_blank') : undefined}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold">{resource.name}</p>
                              <p className="text-sm opacity-75">{resource.size}</p>
                            </div>
                            {resource.url && (
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
                    lessonId="chapter-3/3-5" 
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