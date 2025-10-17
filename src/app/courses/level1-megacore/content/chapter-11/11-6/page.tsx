"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";
import { useUserProgress } from '@/hooks/useUserProgress';

export default function Lesson116() {
  const [isClient, setIsClient] = useState(false);
  const { progress } = useUserProgress('level1-megacore');
  const [activeTab, setActiveTab] = useState<'description' | 'resources' | 'comments'>('description');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const lessonGoals = [
    "Understand proper spring configuration for different equipment types",
    "Learn the differences between Xformer and Non-Xformer setups",
    "Master equipment setup procedures for safe and effective workouts",
    "Develop confidence in spring selection and verification"
  ];

  const resources = [
    {
      title: "Spring Configuration Guide",
      description: "Complete guide to spring setup for different equipment types",
      type: "PDF"
    },
    {
      title: "Equipment Setup Checklist",
      description: "Step-by-step checklist for proper equipment configuration",
      type: "Checklist"
    }
  ];

  // Comments are now handled by the LessonComments component

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#E43636] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#F6EFD2] mb-2">
              Level 1 Megacore - Chapter 11
            </h1>
            <p className="text-xl text-[#F6EFD2] font-semibold">
              Lesson 11-6: Spring Configuration
            </p>
            <div className="mt-4 w-full bg-[#F6EFD2] rounded-full h-2">
              <div className="bg-white h-2 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Course Navigation */}
        <div className="pl-4 pt-4">
          <CourseNavigation 
            currentLessonPath="/courses/level1-megacore/content/chapter-11/11-6"
            nextLessonPath="/courses/level1-megacore/content/chapter-11/11-7"
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Video Section - Outside Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-[#E43636] mb-6">Spring Configuration</h2>
            <div className="w-full flex justify-center">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/3nxVAB24mSE"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-xl w-full max-w-4xl h-80 bg-black"
              ></iframe>
            </div>
          </motion.div>

          {/* Tabbed Content Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
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
              {activeTab === "description" && (
                <div>
                  <h3 className="text-2xl font-bold text-[#E43636] mb-6">Spring Configuration</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl font-semibold text-[#E43636] mb-3">Equipment Setup</h4>
                      <ul className="list-disc pl-6 text-[#000000] space-y-2">
                        <li><strong>Xformer:</strong> 1 white spring</li>
                        <li><strong>Non-Xformer:</strong> 1 gray spring</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h4 className="text-lg font-semibold text-[#E43636] mb-3">Key Points</h4>
                      <ul className="list-disc pl-6 text-[#000000] space-y-2">
                        <li>Proper spring configuration is essential for safe and effective workouts</li>
                        <li>Different equipment types require different spring setups</li>
                        <li>Always verify spring configuration before beginning exercises</li>
                        <li>Follow manufacturer guidelines for optimal performance</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "resources" && (
                <div>
                  <h3 className="text-2xl font-bold text-[#E43636] mb-6">Additional Resources</h3>
                  <div className="space-y-4">
                    {resources.map((resource, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-xl border border-[#E43636]">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-[#E43636]">{resource.title}</h4>
                            <p className="text-[#000000] text-sm mt-1">{resource.description}</p>
                          </div>
                          <span className="bg-[#E43636] text-[#F6EFD2] px-3 py-1 rounded-full text-xs font-semibold">
                            {resource.type}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "comments" && (
                  <LessonComments 
                    lessonId="chapter-11/11-6" 
                    courseId="level1-megacore" 
                  />
                )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
