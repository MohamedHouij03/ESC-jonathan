"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";

export default function Lesson104() {
  const [isClient, setIsClient] = useState(false);
  const { progress } = useUserProgress('level1-megacore');
  const [activeTab, setActiveTab] = useState<"description" | "resources" | "comments">("description");

  // Tab content data
  const resources = [
    { name: "Full Routine Formulation Guide (PDF)", size: "2.5 MB" },
    { name: "45 & 50 Minute Class Templates (PDF)", size: "1.8 MB" },
    { name: "Exercise Block Planning Manual (PDF)", size: "2.2 MB" },
  ];

  // Comments are now handled by the LessonComments component

  // Prevent hydration errors
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="bg-white shadow-lg border-b-2 border-[#E43636]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-[#E43636]">Level 1 Megacore</h1>
                <p className="text-gray-600">Chapter 10 - Lesson 4</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 mb-1">Progress</div>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-[#E43636] h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">{progress}% Complete</div>
              </div>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b-2 border-[#E43636]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#E43636]">Level 1 Megacore</h1>
              <p className="text-gray-600">Chapter 10 - Lesson 4</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">Progress</div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div className="bg-[#E43636] h-2 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">{progress}% Complete</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Course Navigation */}
        <div className="pl-4 pt-4">
          <CourseNavigation 
            currentLessonPath="/courses/level1-megacore/content/chapter-10/10-4"
            nextLessonPath="/courses/level1-megacore/content/chapter-10/10-5"
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 lg:pl-20 lg:pt-16">
          <div className="max-w-7xl mx-auto">
            {/* Lesson Title */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-[#E43636] mb-4">How to Formulate a Full Routine (45 min & 50 Min)</h1>
              <p className="text-lg text-gray-700 font-medium">
                Instructor Training: Class Planning & Structure
              </p>
            </div>

            {/* Video Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#E43636] mb-8"
            >
              <h2 className="text-2xl font-bold text-[#E43636] mb-6">Video Tutorial</h2>
              <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden shadow-lg">
        <iframe
                  className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/KgnqKOdg3kM"
                  title="Full Routine Formulation Tutorial"
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
                    <h2 className="text-2xl font-bold text-[#E43636] mb-4">Full Routine Formats: 45 minute classes</h2>
        <p className="text-[#000000] mb-4">
                      Note: Each exercise is two minutes long (1 minute full range, 30 seconds any variation, and then back to full range). Also, please remember that which exercises you choose and how long you keep a client in the same body position can be discomforting. Work out to your own routines to ensure the safety and well-being of clients.
        </p>
        <p className="text-[#000000] mb-4">
          (20 exercises x 2 min each = 40 min [for a 45 min class])
        </p>
        <p className="text-[#000000] mb-4">
          Below are 6 ways you can format a 45 minute routine:
        </p>
                    <p className="text-[#000000] mb-6">
                      Note: You can change the order of each block. Make sure transitioning from different blocks needs to be made. Move clients around the reformer with intention. DO NOT ping-pong clients back and forth.
        </p>
        
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
                        <h3 className="font-semibold text-[#E43636] text-lg mb-3">Full Body Focused:</h3>
                        <ul className="list-disc pl-6 text-[#000000] space-y-1">
              <li>core/abs: 4</li>
              <li>legs: 3</li>
              <li>legs: 3</li>
              <li>obliques: 3</li>
              <li>obliques: 3</li>
              <li>upper body: 4</li>
            </ul>
          </div>
          
          <div>
                        <h3 className="font-semibold text-[#E43636] text-lg mb-3">Full Body Focused:</h3>
                        <ul className="list-disc pl-6 text-[#000000] space-y-1">
              <li>core/abs: 4</li>
              <li>legs: 4</li>
              <li>legs: 4</li>
              <li>obliques: 2</li>
              <li>obliques: 2</li>
              <li>upper body: 4</li>
            </ul>
            <p className="text-sm text-[#E43636] mt-2"><b>Time Left:</b> Plank (freestyle), Push-ups, More of ending exercise</p>
          </div>
          
          <div>
                        <h3 className="font-semibold text-[#E43636] text-lg mb-3">Abdominal, Core, and Leg Focused:</h3>
                        <ul className="list-disc pl-6 text-[#000000] space-y-1">
              <li>core/abs: 5</li>
              <li>legs: 4</li>
              <li>legs: 4</li>
              <li>obliques: 2</li>
              <li>obliques: 2</li>
              <li>upper body: 3</li>
            </ul>
          </div>
          
          <div>
                        <h3 className="font-semibold text-[#E43636] text-lg mb-3">Abdominal, Core, and Upper Body Focused:</h3>
                        <ul className="list-disc pl-6 text-[#000000] space-y-1">
              <li>core/abs: 4</li>
              <li>legs: 3</li>
              <li>legs: 3</li>
              <li>obliques: 2</li>
              <li>obliques: 2</li>
              <li>upper body: 5</li>
            </ul>
          </div>
          
          <div>
                        <h3 className="font-semibold text-[#E43636] text-lg mb-3">Full Body Focused:</h3>
                        <ul className="list-disc pl-6 text-[#000000] space-y-1">
              <li>core/abs: 4</li>
              <li>legs: 4</li>
              <li>legs: 4</li>
              <li>obliques: 2</li>
              <li>obliques: 2</li>
              <li>upper body: 4</li>
            </ul>
          </div>
          
          <div>
                        <h3 className="font-semibold text-[#E43636] text-lg mb-3">Abdominal, Core, and Upper Body Focused:</h3>
                        <ul className="list-disc pl-6 text-[#000000] space-y-1">
              <li>core/abs: 4</li>
              <li>legs: 3</li>
              <li>legs: 3</li>
              <li>obliques: 3</li>
              <li>obliques: 3</li>
              <li>upper body: 4</li>
            </ul>
          </div>
        </div>

                    <h2 className="text-2xl font-bold text-[#E43636] mb-4">Full Routine Formats: 50 minute classes</h2>
        <p className="text-[#000000] mb-4">
                      Note: Each exercise is two minutes long (1 minute full range, 30 seconds any variation, and then back to full range). Also, please remember that which exercises you choose and how long you keep a client in the same body position can be discomforting. Work out to your own routines to ensure the safety and well-being of clients.
        </p>
        <p className="text-[#000000] mb-4">
          (22 exercises x 2 min each = 44 min [for a 50 min class])
        </p>
        <p className="text-[#000000] mb-4">
          Below are 6 ways you can format a 50 minute routine:
        </p>
                    <p className="text-[#000000] mb-6">
                      Note: You can change the order of each block. Make sure transitioning from different blocks needs to be made. Move clients around the reformer with intention. DO NOT ping-pong clients back and forth.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
                        <h3 className="font-semibold text-[#E43636] text-lg mb-3">Full Body Focused:</h3>
                        <ul className="list-disc pl-6 text-[#000000] space-y-1">
              <li>core/abs: 4</li>
              <li>legs: 4</li>
              <li>legs: 4</li>
              <li>obliques: 3</li>
              <li>obliques: 3</li>
              <li>upper body: 4</li>
            </ul>
          </div>
          
          <div>
                        <h3 className="font-semibold text-[#E43636] text-lg mb-3">Upper Body and Oblique Focused:</h3>
                        <ul className="list-disc pl-6 text-[#000000] space-y-1">
              <li>core/abs: 4</li>
              <li>legs: 3</li>
              <li>legs: 3</li>
              <li>obliques: 3</li>
              <li>obliques: 3</li>
              <li>upper body: 5</li>
            </ul>
          </div>
          
          <div>
                        <h3 className="font-semibold text-[#E43636] text-lg mb-3">Leg Focused:</h3>
                        <ul className="list-disc pl-6 text-[#000000] space-y-1">
              <li>core/abs: 4</li>
              <li>legs: 5</li>
              <li>legs: 5</li>
              <li>obliques: 2</li>
              <li>obliques: 2</li>
              <li>upper body: 4</li>
            </ul>
          </div>
          
          <div>
                        <h3 className="font-semibold text-[#E43636] text-lg mb-3">Full Body Focused:</h3>
                        <ul className="list-disc pl-6 text-[#000000] space-y-1">
              <li>core/abs: 4</li>
              <li>legs: 4</li>
              <li>legs: 4</li>
              <li>obliques: 3</li>
              <li>obliques: 3</li>
              <li>upper body: 4</li>
            </ul>
          </div>
          
          <div>
                        <h3 className="font-semibold text-[#E43636] text-lg mb-3">Full Body Focused:</h3>
                        <ul className="list-disc pl-6 text-[#000000] space-y-1">
              <li>core/abs: 5</li>
              <li>legs: 4</li>
              <li>legs: 4</li>
              <li>obliques: 2</li>
              <li>obliques: 2</li>
              <li>upper body: 4</li>
            </ul>
          </div>
          
          <div>
                        <h3 className="font-semibold text-[#E43636] text-lg mb-3">Leg Focused:</h3>
                        <ul className="list-disc pl-6 text-[#000000] space-y-1">
              <li>core/abs: 4</li>
              <li>legs: 5</li>
              <li>legs: 5</li>
              <li>obliques: 3</li>
              <li>obliques: 3</li>
              <li>upper body: 4</li>
            </ul>
            <p className="text-sm text-[#E43636] mt-2"><b>Time Left:</b> Plank (freestyle), Push-ups, More of ending exercise</p>
          </div>
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
                          className="bg-white p-4 rounded-xl border border-[#E43636] text-black shadow-sm"
                        >
                          <p className="font-semibold">{r.name}</p>
                          <p className="text-sm opacity-75">{r.size}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Comments */}
                {activeTab === "comments" && (
                  <LessonComments 
                    lessonId="chapter-10/10-4" 
                    courseId="level1-megacore" 
                  />
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Add spacing for navigation */}
      <div className="h-24"></div>
    </div>
  );
}
