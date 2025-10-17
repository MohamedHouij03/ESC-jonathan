"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";
import { useUserProgress } from "@/hooks/useUserProgress";

export default function Chapter104() {
  const { progress } = useUserProgress('level1-reformers');
  const [activeTab, setActiveTab] = useState<'description' | 'resources' | 'comments'>('description');
  const [isClient, setIsClient] = useState(false);

  const resources = [
    // No PDF resources for this lesson
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
                <p className="text-[#E2DDB4]">Chapter 10: IT'S PRACTICE TIME!!</p>
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
              <p className="text-[#E2DDB4]">Chapter 10: IT'S PRACTICE TIME!!</p>
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
            currentLessonPath="/courses/level1-reformers/content/chapter-10/10-4"
            nextLessonPath="/courses/level1-reformers/content/chapter-10/10-5"
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 lg:pl-20 lg:pt-16">
          <div className="max-w-7xl mx-auto">
            {/* Lesson Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold text-[#E43636] mb-2">How to Formulate a Full Routine (45 min & 50 Min)</h1>
              <p className="text-lg text-gray-600">Chapter 10 - Lesson 4</p>
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
                  src="https://www.youtube.com/embed/KgnqKOdg3kM"
                  title="Full Routine Formats Tutorial"
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
                    { id: 'description', label: 'Description' },
                    { id: 'resources', label: 'Resources' },
                    { id: 'comments', label: 'Q&A' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                        activeTab === (tab.id as typeof activeTab)
                          ? 'bg-[#E43636] text-[#F6EFD2] shadow-lg'
                          : 'text-[#E43636] hover:bg-[#F6EFD2]'
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
                {activeTab === 'description' && (
                  <div>
                    <h2 className="text-2xl font-bold text-[#E43636] mb-4">How to Formulate a Full Routine (45 min & 50 Min)</h2>

                    {/* 45 Minute Classes Section */}
                    <section className="space-y-6">
                      <h3 className="text-2xl font-semibold text-green-800 mb-4">Full Routine Formats: 45 minute classes</h3>
                      
                      <div>
                        <p className="text-gray-700 mb-2">
                          <strong>Note:</strong> Each exercises is two minutes long (1 minute full range, 30 seconds any variation, and then back to full range). Also, please remember that which exercises you choose and how long you keep a client in the same body position can be discomforting. Work out to your own routines to ensure the safety and well-being of clients.
                        </p>
                        <p className="text-gray-700">
                          <strong>(20 exercises x 2 min each = 40 min [for a 45 min class])</strong>
                        </p>
                      </div>

                      <h4 className="text-lg font-semibold text-blue-800">Below are 6 ways you can format a 45 minute routine:</h4>
                      
                      <div>
                        <p className="text-gray-700 mb-2">
                          <strong>Note:</strong> You can change the order of each block. Make sure transitioning from different blocks needs to be make. Move clients around the reformer with intention. DO NOT ping-pong clients back and forth.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <h5 className="font-semibold text-gray-900 mb-2">Full Body Focused:</h5>
                          <ul className="list-disc list-inside text-gray-700 space-y-1">
                            <li>core/abs: 4</li>
                            <li>legs: 3</li>
                            <li>legs: 3</li>
                            <li>obliques: 3</li>
                            <li>obliques: 3</li>
                            <li>upper body: 4</li>
                          </ul>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <h5 className="font-semibold text-gray-900 mb-2">Full Body Focused:</h5>
                          <ul className="list-disc list-inside text-gray-700 space-y-1">
                            <li>core/abs: 4</li>
                            <li>legs: 4</li>
                            <li>legs: 4</li>
                            <li>obliques: 2</li>
                            <li>obliques: 2</li>
                            <li>upper body: 4</li>
                          </ul>
                          <p className="text-sm text-gray-600 mt-2">
                            <strong>Time Left:</strong> Plank (freestyle), Push-ups, More of ending exercise
                          </p>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <h5 className="font-semibold text-gray-900 mb-2">Abdominal, Core, and Leg Focused:</h5>
                          <ul className="list-disc list-inside text-gray-700 space-y-1">
                            <li>core/abs: 5</li>
                            <li>legs: 4</li>
                            <li>legs: 4</li>
                            <li>obliques: 2</li>
                            <li>obliques: 2</li>
                            <li>upper body: 3</li>
                          </ul>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <h5 className="font-semibold text-gray-900 mb-2">Abdominal, Core, and Upper Body Focused:</h5>
                          <ul className="list-disc list-inside text-gray-700 space-y-1">
                            <li>core/abs: 4</li>
                            <li>legs: 3</li>
                            <li>legs: 3</li>
                            <li>obliques: 2</li>
                            <li>obliques: 2</li>
                            <li>upper body: 5</li>
                          </ul>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <h5 className="font-semibold text-gray-900 mb-2">Full Body Focused:</h5>
                          <ul className="list-disc list-inside text-gray-700 space-y-1">
                            <li>core/abs: 4</li>
                            <li>legs: 4</li>
                            <li>legs: 4</li>
                            <li>obliques: 2</li>
                            <li>obliques: 2</li>
                            <li>upper body: 4</li>
                          </ul>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <h5 className="font-semibold text-gray-900 mb-2">Abdominal, Core, and Upper Body Focused:</h5>
                          <ul className="list-disc list-inside text-gray-700 space-y-1">
                            <li>core/abs: 4</li>
                            <li>legs: 3</li>
                            <li>legs: 3</li>
                            <li>obliques: 3</li>
                            <li>obliques: 3</li>
                            <li>upper body: 4</li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    <hr className="my-8" />

                    {/* 50 Minute Classes Section */}
                    <section className="space-y-6">
                      <h3 className="text-2xl font-semibold text-green-800 mb-4">Full Routine Formats: 50 minute classes</h3>
                      
                      <div>
                        <p className="text-gray-700 mb-2">
                          <strong>Note:</strong> Each exercises is two minutes long (1 minute full range, 30 seconds any variation, and then back to full range). Also, please remember that which exercises you choose and how long you keep a client in the same body position can be discomforting. Work out to your own routines to ensure the safety and well-being of clients.
                        </p>
                        <p className="text-gray-700">
                          <strong>(22 exercises x 2 min each = 44 min [for a 50 min class])</strong>
                        </p>
                      </div>

                      <h4 className="text-lg font-semibold text-blue-800">Below are 6 ways you can format a 50 minute routine:</h4>
                      
                      <div>
                        <p className="text-gray-700 mb-2">
                          <strong>Note:</strong> You can change the order of each block. Make sure transitioning from different blocks needs to be make. Move clients around the reformer with intention. DO NOT ping-pong clients back and forth.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <h5 className="font-semibold text-gray-900 mb-2">Full Body Focused:</h5>
                          <ul className="list-disc list-inside text-gray-700 space-y-1">
                            <li>core/abs: 4</li>
                            <li>legs: 4</li>
                            <li>legs: 4</li>
                            <li>obliques: 3</li>
                            <li>obliques: 3</li>
                            <li>upper body: 4</li>
                          </ul>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <h5 className="font-semibold text-gray-900 mb-2">Upper Body and Oblique Focused:</h5>
                          <ul className="list-disc list-inside text-gray-700 space-y-1">
                            <li>core/abs: 4</li>
                            <li>legs: 3</li>
                            <li>legs: 3</li>
                            <li>obliques: 3</li>
                            <li>obliques: 3</li>
                            <li>upper body: 5</li>
                          </ul>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <h5 className="font-semibold text-gray-900 mb-2">Leg Focused:</h5>
                          <ul className="list-disc list-inside text-gray-700 space-y-1">
                            <li>core/abs: 4</li>
                            <li>legs: 5</li>
                            <li>legs: 5</li>
                            <li>obliques: 2</li>
                            <li>obliques: 2</li>
                            <li>upper body: 4</li>
                          </ul>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <h5 className="font-semibold text-gray-900 mb-2">Full Body Focused:</h5>
                          <ul className="list-disc list-inside text-gray-700 space-y-1">
                            <li>core/abs: 4</li>
                            <li>legs: 4</li>
                            <li>legs: 4</li>
                            <li>obliques: 3</li>
                            <li>obliques: 3</li>
                            <li>upper body: 4</li>
                          </ul>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <h5 className="font-semibold text-gray-900 mb-2">Full Body Focused:</h5>
                          <ul className="list-disc list-inside text-gray-700 space-y-1">
                            <li>core/abs: 5</li>
                            <li>legs: 4</li>
                            <li>legs: 4</li>
                            <li>obliques: 2</li>
                            <li>obliques: 2</li>
                            <li>upper body: 4</li>
                          </ul>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <h5 className="font-semibold text-gray-900 mb-2">Leg Focused:</h5>
                          <ul className="list-disc list-inside text-gray-700 space-y-1">
                            <li>core/abs: 4</li>
                            <li>legs: 5</li>
                            <li>legs: 5</li>
                            <li>obliques: 3</li>
                            <li>obliques: 3</li>
                            <li>upper body: 4</li>
                          </ul>
                          <p className="text-sm text-gray-600 mt-2">
                            <strong>Time Left:</strong> Plank (freestyle), Push-ups, More of ending exercise
                          </p>
                        </div>
                      </div>
                    </section>
                  </div>
                )}
                {activeTab === 'resources' && (
                  <div>
                    <h3 className="text-2xl font-bold text-[#E43636] mb-4">Resources</h3>
                    <p className="text-gray-700">No PDF resources for this lesson.</p>
                  </div>
                )}
                {activeTab === 'comments' && (
                  <div>
                    <LessonComments 
                      lessonId="chapter-10/10-4" 
                      courseId="level1-reformers" 
                    />
                  </div>
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