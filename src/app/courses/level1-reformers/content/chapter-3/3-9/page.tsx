"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";
import { useUserProgress } from "@/hooks/useUserProgress";

export default function Chapter320() {
  const [activeTab, setActiveTab] = useState<"description" | "resources" | "comments">("description");
  const [isClient, setIsClient] = useState(false);
  const { progress } = useUserProgress('level1-reformers');


  // Tab content data
  const resources = [
    // No PDF resources for this lesson
  ];

  // Comments are now handled by the LessonComments component

  // Prevent hydration errors
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
          <CourseNavigation 
            currentLessonPath="/courses/level1-reformers/content/chapter-3/3-9"
            nextLessonPath="/courses/level1-reformers/content/chapter-3/3-10"
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
            <h1 className="text-4xl font-bold text-[#E43636] mb-2">Core & Abdominal Block: different body positions & transitioning</h1>
            <p className="text-lg text-gray-600">Chapter 3 - Lesson 9</p>
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
                    <h2 className="text-2xl font-bold text-[#E43636] mb-4">Core & Abdominal Block</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-[#E43636] mb-3">Body Positions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                          <div>
                            <ol className="list-decimal list-inside space-y-8 text-gray-700 text-xl">
                              <li>Forearms</li>
                              <li>Hands (wrist)</li>
                              <li>Tailbone</li>
                            </ol>
                          </div>
                          <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg">
                            <Image 
                              src="/pdfs/ab wheel/1.png" 
                              alt="Body Positions - Forearms, Hands, and Tailbone positions" 
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-gray-700 leading-relaxed">
                          We want to make sure that we aren't creating a Core & Abdominal Block that places clients in the same position for too long. We need to be mindful of how long a client is in any of the above 3 positions to minimize shoulder, wrist, and lower back discomfort.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-2xl font-semibold text-[#E43636] mb-3 text-center">Different ways to transition into different exercises</h3>
                        <p className="text-xl text-gray-700 text-center mb-4">Regular &gt; Back Reverse</p>
                        <div className="text-center space-y-2">
                          <p className="text-gray-700">Starting at: the front, facing front</p>
                          <p className="text-gray-700">Move to: the back, facing the back</p>
                        </div>
                        
                        {/* Video Section */}
                        <div className="mt-6">
                          <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden shadow-lg">
                            <iframe
                              className="absolute top-0 left-0 w-full h-full"
                              src="https://www.youtube.com/embed/LxGb4Va5xwE"
                              title="Core & Abdominal Block: different body positions & transitioning"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8">
                        <p className="text-2xl text-gray-700 text-center mb-4">Regular &gt; Reverse</p>
                        <div className="text-center space-y-2">
                          <p className="text-gray-700">Starting at: the front, facing front</p>
                          <p className="text-gray-700">Move to: the front, facing the back</p>
                        </div>
                        
                        {/* Video Section */}
                        <div className="mt-6">
                          <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden shadow-lg">
                            <iframe
                              className="absolute top-0 left-0 w-full h-full"
                              src="https://www.youtube.com/embed/kTdHcwvmTgA"
                              title="Regular > Reverse transition"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8">
                        <p className="text-2xl text-gray-700 text-center mb-4">Back &gt; Regular</p>
                        <div className="text-center space-y-2">
                          <p className="text-gray-700">Starting at: the back, facing front</p>
                          <p className="text-gray-700">Move to: the front, facing the front</p>
                        </div>
                        
                        {/* Video Section */}
                        <div className="mt-6">
                          <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden shadow-lg">
                            <iframe
                              className="absolute top-0 left-0 w-full h-full"
                              src="https://www.youtube.com/embed/nO7cy30LuWM"
                              title="Back > Regular transition"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8">
                        <p className="text-2xl text-gray-700 text-center mb-4">Reverse &gt; Back Reverse</p>
                        <div className="text-center space-y-2">
                          <p className="text-gray-700">Starting at: the front, facing back</p>
                          <p className="text-gray-700">Move to: the back, facing the back</p>
                        </div>
                        
                        {/* Video Section */}
                        <div className="mt-6">
                          <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden shadow-lg">
                            <iframe
                              className="absolute top-0 left-0 w-full h-full"
                              src="https://www.youtube.com/embed/UZcFKH1MCtg"
                              title="Reverse > Back Reverse transition"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8">
                        <p className="text-2xl text-gray-700 text-center mb-4">Back &gt; Back Reverse</p>
                        <div className="text-center space-y-2">
                          <p className="text-gray-700">Starting at: the back, facing front</p>
                          <p className="text-gray-700">Move to: the back, facing the back</p>
                        </div>
                        
                        {/* Video Section */}
                        <div className="mt-6">
                          <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden shadow-lg">
                            <iframe
                              className="absolute top-0 left-0 w-full h-full"
                              src="https://www.youtube.com/embed/3ZMMls4xYxg"
                              title="Back > Back Reverse transition"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8">
                        <p className="text-2xl text-gray-700 text-center mb-4">Reverse &gt; Regular</p>
                        <div className="text-center space-y-2">
                          <p className="text-gray-700">Starting at: the front, facing back</p>
                          <p className="text-gray-700">Move to: the front, facing the front</p>
                        </div>
                        
                        {/* Video Section */}
                        <div className="mt-6">
                          <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden shadow-lg">
                            <iframe
                              className="absolute top-0 left-0 w-full h-full"
                              src="https://www.youtube.com/embed/l4foGNO1RiY"
                              title="Reverse > Regular transition"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Resources */}
                {activeTab === "resources" && (
                  <div>
                    <h3 className="text-2xl font-bold text-[#E43636] mb-4">Resources</h3>
                    <p className="text-gray-700">No PDF resources for this lesson.</p>
                  </div>
                )}

                {/* Comments */}
                {activeTab === "comments" && (
                  <LessonComments 
                    lessonId="chapter-3/3-9" 
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