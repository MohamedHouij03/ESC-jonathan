"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";
import { useUserProgress } from "@/hooks/useUserProgress";

export default function Chapter719() {
  const { progress } = useUserProgress('level1-reformers');
  const [activeTab, setActiveTab] = useState<'description' | 'resources' | 'comments'>('description');
  const [isClient, setIsClient] = useState(false);

  const resources = [
    // No PDF resources for this lesson
  ];

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
                <p className="text-[#E2DDB4]">Chapter 7: Oblique Exercises</p>
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
              <p className="text-[#E2DDB4]">Chapter 7: Oblique Exercises</p>
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
            currentLessonPath="/courses/level1-reformers/content/chapter-7/7-19"
            nextLessonPath="/courses/level1-reformers/content/chapter-8/8-1"
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
              <h1 className="text-4xl font-bold text-[#E43636] mb-2">Oblique Block: Practicing Cues</h1>
              <p className="text-lg text-gray-600">Chapter 7 - Lesson 19</p>
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
                    <h2 className="text-2xl font-bold text-[#E43636] mb-6">Oblique Block: Practicing Cues</h2>
                    
                    <div className="space-y-6">
                      <p className="text-gray-700 leading-relaxed">
                        The words we use and when we use them are important when cueing because:
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg border border-[#E43636]">
                          <p className="text-gray-700">
                            <span className="font-semibold text-[#E43636]">•</span> It keeps all clients safe from bad form and injury
                          </p>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg border border-[#E43636]">
                          <p className="text-gray-700">
                            <span className="font-semibold text-[#E43636]">•</span> It directs and prepares the client for what's coming up next
                          </p>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg border border-[#E43636]">
                          <p className="text-gray-700">
                            <span className="font-semibold text-[#E43636]">•</span> It encourages and empowers clients to push through the workout
                          </p>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg border border-[#E43636]">
                          <p className="text-gray-700">
                            <span className="font-semibold text-[#E43636]">•</span> It will require less or no physical demonstration on your part
                          </p>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg border border-[#E43636]">
                          <p className="text-gray-700">
                            <span className="font-semibold text-[#E43636]">•</span> It challenges us to be better communicators by thinking of different ways to explain instruction easier and simpler
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-8">
                        <p className="text-gray-700 leading-relaxed mb-4">
                          Below are photos and corresponding cues to practice setting up clients in an exercise before execution
                        </p>
                        
                        <div className="space-y-6">
                          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                            <h3 className="font-semibold text-[#E43636] mb-2">Practice #1:</h3>
                            <p className="text-gray-700">read aloud and act out the cues 3 times</p>
                          </div>
                          
                          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                            <h3 className="font-semibold text-[#E43636] mb-2">Practice #2:</h3>
                            <p className="text-gray-700">repeat the above but add "in 10 seconds" before each cue 3 more times</p>
                          </div>
                          
                          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                            <p className="text-gray-700 font-semibold">(practice the above two everyday)</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Photo and Cues Section */}
                      <div className="mt-12">
                        <h3 className="text-xl font-bold text-[#E43636] mb-6">Photos and Corresponding Cues</h3>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                          {/* Image */}
                          <div className="order-2 lg:order-1">
                            <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
                              <Image
                                src="/pdfs/ab wheel/x.jpg"
                                alt="Side Plank Exercise Setup"
                                fill
                                className="object-contain"
                                priority
                              />
                            </div>
                          </div>

                          {/* Cues */}
                          <div className="order-1 lg:order-2">
                            <div className="space-y-6">
                              <div className="bg-white p-4 rounded-lg border border-[#E43636]">
                                <h4 className="font-semibold text-[#E43636] mb-2">Right Forearm</h4>
                                <p className="text-gray-700">on the <span className="font-semibold">{"{Front Platform}"}</span> or <span className="font-semibold">{"{Carriage}"}</span> or <span className="font-semibold">{"{Back Platform}"}</span></p>
                              </div>
                              
                              <div className="bg-white p-4 rounded-lg border border-[#E43636]">
                                <h4 className="font-semibold text-[#E43636] mb-2">Knees</h4>
                                <p className="text-gray-700">stacked on the <span className="font-semibold">{"{Front Platform}"}</span> or <span className="font-semibold">{"{Carriage}"}</span> or <span className="font-semibold">{"{Back Platform}"}</span></p>
                              </div>
                              
                              <div className="bg-white p-4 rounded-lg border border-[#E43636]">
                                <h4 className="font-semibold text-[#E43636] mb-2">Left Arm</h4>
                                <p className="text-gray-700">extended up into the sky</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Second Photo and Cues Section */}
                      <div className="mt-20">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                          {/* Image */}
                          <div className="order-2 lg:order-1">
                            <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
                              <Image
                                src="/pdfs/ab wheel/xx.jpg"
                                alt="Forearm Plank Exercise Setup"
                                fill
                                className="object-contain"
                                priority
                              />
                            </div>
                          </div>

                          {/* Cues */}
                          <div className="order-1 lg:order-2">
                            <div className="space-y-6">
                              <div className="bg-white p-4 rounded-lg border border-[#E43636]">
                                <h4 className="font-semibold text-[#E43636] mb-2">Forearms</h4>
                                <p className="text-gray-700">on the <span className="font-semibold">{"{Front Platform}"}</span> or <span className="font-semibold">{"{Carriage}"}</span> or <span className="font-semibold">{"{Back Platform}"}</span></p>
                              </div>
                              
                              <div className="bg-white p-4 rounded-lg border border-[#E43636]">
                                <h4 className="font-semibold text-[#E43636] mb-2">Knees</h4>
                                <p className="text-gray-700">stacked on the <span className="font-semibold">{"{Front Platform}"}</span> or <span className="font-semibold">{"{Carriage}"}</span> or <span className="font-semibold">{"{Back Platform}"}</span></p>
                              </div>
                              
                              <div className="bg-white p-4 rounded-lg border border-[#E43636]">
                                <h4 className="font-semibold text-[#E43636] mb-2">Hips</h4>
                                <p className="text-gray-700">slightly lifted and belly button to spine</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Third Photo and Cues Section */}
                      <div className="mt-20">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                          {/* Image */}
                          <div className="order-2 lg:order-1">
                            <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
                              <Image
                                src="/pdfs/ab wheel/as.jpg"
                                alt="Hands and Knees Exercise Setup"
                                fill
                                className="object-contain"
                                priority
                              />
                            </div>
                          </div>

                          {/* Cues */}
                          <div className="order-1 lg:order-2">
                            <div className="space-y-6">
                              <div className="bg-white p-4 rounded-lg border border-[#E43636]">
                                <h4 className="font-semibold text-[#E43636] mb-2">Hands</h4>
                                <p className="text-gray-700">on the <span className="font-semibold">{"{Front Platform}"}</span> or <span className="font-semibold">{"{Carriage}"}</span> or <span className="font-semibold">{"{Back Platform}"}</span></p>
                              </div>
                              
                              <div className="bg-white p-4 rounded-lg border border-[#E43636]">
                                <h4 className="font-semibold text-[#E43636] mb-2">Feet</h4>
                                <p className="text-gray-700">on the <span className="font-semibold">{"{Front Platform}"}</span> or <span className="font-semibold">{"{Carriage}"}</span> or <span className="font-semibold">{"{Back Platform}"}</span></p>
                              </div>
                              
                              <div className="bg-white p-4 rounded-lg border border-[#E43636]">
                                <h4 className="font-semibold text-[#E43636] mb-2">Legs and Feet</h4>
                                <p className="text-gray-700">together with your knees facing outwards to the right</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
                      lessonId="chapter-7/7-19" 
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
