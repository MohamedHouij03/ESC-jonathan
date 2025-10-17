"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";
import { useUserProgress } from '@/hooks/useUserProgress';

export default function Lesson34() {
  const [activeTab, setActiveTab] = useState<'description' | 'resources' | 'comments'>('description');
  const [isClient, setIsClient] = useState(false);
  const { progress } = useUserProgress('level1-megacore');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const lessonGoals = [
    'Master core endurance techniques',
    'Understand sustained core engagement',
    'Learn endurance modifications',
    'Practice proper breathing for endurance'
  ];

  const resources = [
    { name: 'Core Endurance Guide PDF', type: 'pdf', size: '2.2 MB' },
    { name: 'Core Strength Training', type: 'pdf', size: '1.8 MB' },
    { name: 'Spring Load Reference', type: 'pdf', size: '0.9 MB' },
    { name: 'Form Checklist', type: 'pdf', size: '1.1 MB' }
  ];

  // Comments are now handled by the LessonComments component

  if (!isClient) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#E43636]"></div>
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
              <h1 className="text-2xl font-bold">Level 1 Megacore</h1>
              <p className="text-[#E2DDB4]">Chapter 3</p>
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

      <div className="max-w-7xl mx-auto lg:pl-0 px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Course Navigation Sidebar */}
          <CourseNavigation 
            currentLessonPath="/courses/level1-megacore/content/chapter-3/3-4"
            nextLessonPath="/courses/level1-megacore/content/chapter-3/3-5"
          />

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Video Player */}
            <div className="mb-8">
              <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  width="100%"
                  height="500"
                  src="https://www.youtube.com/embed/Y4YeBPZuYYg"
                  title="Core Endurance - Video Tutorial"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full"
                ></iframe>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl p-1 mb-8 shadow-lg">
              <div className="flex space-x-1">
                {[
                  { id: 'description', label: 'Description' },
                  { id: 'resources', label: 'Resources' },
                  { id: 'comments', label: 'Q&A' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                      activeTab === (tab.id as any)
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
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#E43636]">
              {activeTab === 'description' && (
                <div>
                  <h2 className="text-3xl font-bold text-[#E43636] mb-6">Saw</h2>
                  
                  {/* Lesson Goals */}
                  <div className="bg-white rounded-xl p-6 mb-8 border border-[#E43636]">
                    <h3 className="text-xl font-bold text-[#E43636] mb-4">Lesson Goals</h3>
                    <ul className="space-y-2">
                      {lessonGoals.map((goal, index) => (
                        <li key={index} className="flex items-center text-[#000000]">
                          <span className="w-2 h-2 bg-[#E43636] rounded-full mr-3"></span>
                          {goal}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Saw - Front Facing */}
                  <div className="bg-white rounded-xl p-6 mb-8 border border-[#E43636]">
                    <h3 className="text-2xl font-bold text-[#E43636] mb-4">Saw</h3>
                    <p className="text-lg text-[#000000] mb-4">At the front, facing front</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-800 mb-2">Standard</h4>
                        <p className="text-green-700">1 gray spring</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-800 mb-2">Modification</h4>
                        <p className="text-blue-700">2 gray springs; or 3 gray springs is the max to modify</p>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <h4 className="font-semibold text-red-800 mb-2">Intensification</h4>
                        <p className="text-red-700">1 white spring</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xl font-bold text-[#E43636] mb-3">Setup (how to get into position)</h4>
                        <ul className="list-disc pl-6 text-[#000000] space-y-2">
                          <li>Start on the carriage, facing the front platform</li>
                          <li>Forearms down on the front platform, palms facing up (harder) or down (easier)</li>
                          <li>Knees all the way forward on the carriage with legs and feet together (shins & shoelaces down)</li>
                          <li>Lower your hips and drop your knees back into a modified plank position</li>
                          <li>Lightly lift your hips and engage your core</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xl font-bold text-[#E43636] mb-3">Execution (how to perform the exercise)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-green-50 p-4 rounded-lg">
                            <h5 className="font-semibold text-green-800 mb-2">Inhale as you:</h5>
                            <ul className="list-disc pl-4 text-green-700 space-y-1">
                              <li>Lengthen your arms and slide your shoulders back behind your elbows to open the carriage</li>
                            </ul>
                          </div>
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h5 className="font-semibold text-blue-800 mb-2">Exhale as you:</h5>
                            <ul className="list-disc pl-4 text-blue-700 space-y-1">
                              <li>Bend your elbows to close the carriage, bringing your shoulders above your elbows</li>
                            </ul>
                          </div>
                        </div>
                        <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                          <p className="text-[#000000] font-semibold">Note:</p>
                          <p className="text-[#000000]">You're holding a modified plank on your knees, and the only movement should come from your shoulders moving back and forward</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xl font-bold text-[#E43636] mb-3">DO NOT</h4>
                        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>DO NOT let your shoulders pass your elbows as you come forward and do not arch your back</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-[#E43636] mb-2">Modification(s) (easier)</h4>
                        <ul className="list-disc pl-6 text-[#000000] space-y-2">
                          <li>2 gray springs; or 1 black spring is the max to modify</li>
                          <li>Perform a "Kneeling Crunch" when a break is needed in comparison to stopping</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-[#E43636] mb-2">Intensification(s) (harder)</h4>
                        <ul className="list-disc pl-6 text-[#000000] space-y-2">
                          <li>1 white spring or perform the exercise on your toes to "fly"</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-[#E43636] mb-2">Challenge(s)</h4>
                        <p className="text-[#000000] mb-2">Holds and pulses</p>
                        <ul className="list-disc pl-6 text-[#000000] space-y-2">
                          <li>Open the carriage halfway back</li>
                          <li>pulse in 2 inches and back 2 inches (easier)</li>
                          <li>pulse out 2 inches and in 2 inches (harder)</li>
                        </ul>
                        <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                          <p className="text-[#000000] font-semibold">Note:</p>
                          <p className="text-[#000000]">If in proper form and you start to experience lower back or hip discomfort, perform a crunch to "actively" rest your core</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Reverse Saw - Front Facing Back */}
                  <div className="bg-white rounded-xl p-6 mb-8 border border-[#E43636]">
                    <h3 className="text-2xl font-bold text-[#E43636] mb-4">Reverse Saw</h3>
                    <p className="text-lg text-[#000000] mb-4">At the front, facing back</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-800 mb-2">Standard</h4>
                        <p className="text-green-700">1 gray spring</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-800 mb-2">Modification</h4>
                        <p className="text-blue-700">2 gray springs; or 3 gray springs is the max to modify</p>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <h4 className="font-semibold text-red-800 mb-2">Intensification</h4>
                        <p className="text-red-700">1 white spring</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xl font-bold text-[#E43636] mb-3">Setup (how to get into position)</h4>
                        <ul className="list-disc pl-6 text-[#000000] space-y-2">
                          <li>Start on the front platform, facing the carriage</li>
                          <li>Forearms down on the carriage, palms facing up (harder) or down (easier)</li>
                          <li>Lower your hips down and forward into a modified plank position (shins and shoelaces down)</li>
                          <li>Lightly lift your hips and engage your core</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xl font-bold text-[#E43636] mb-3">Execution (how to perform the exercise)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-green-50 p-4 rounded-lg">
                            <h5 className="font-semibold text-green-800 mb-2">Inhale as you:</h5>
                            <ul className="list-disc pl-4 text-green-700 space-y-1">
                              <li>Lengthen your arms and slide the carriage out</li>
                            </ul>
                          </div>
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h5 className="font-semibold text-blue-800 mb-2">Exhale as you:</h5>
                            <ul className="list-disc pl-4 text-blue-700 space-y-1">
                              <li>Bend your elbows to slide the carriage in</li>
                            </ul>
                          </div>
                        </div>
                        <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                          <p className="text-[#000000] font-semibold">Note:</p>
                          <p className="text-[#000000]">You're holding a modified plank on your knees, and the only movement should come from your forearms and hands moving out and in</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xl font-bold text-[#E43636] mb-3">DO NOT</h4>
                        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>DO NOT let your elbows pass in and under your shoulders as you close the carriage</li>
                            <li>DO NOT arch your back</li>
                            <li>DO NOT cross your legs/feet</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-[#E43636] mb-2">Modification(s) (easier)</h4>
                        <ul className="list-disc pl-6 text-[#000000] space-y-2">
                          <li>2 gray springs; or 1 black spring is the max to modify</li>
                          <li>Perform a "Reverse Kneeling Crunch" when a break is needed in comparison to stopping</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-[#E43636] mb-2">Intensification(s) (harder)</h4>
                        <ul className="list-disc pl-6 text-[#000000] space-y-2">
                          <li>1 white spring or perform the exercise on your toes to "fly"</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-[#E43636] mb-2">Challenge(s)</h4>
                        <p className="text-[#000000] mb-2">Holds and pulses</p>
                        <ul className="list-disc pl-6 text-[#000000] space-y-2">
                          <li>Open the carriage halfway out</li>
                          <li>pulse in 2 inches and back 2 inches (easier)</li>
                          <li>pulse out 2 inches and in 2 inches (harder)</li>
                        </ul>
                        <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                          <p className="text-[#000000] font-semibold">Note:</p>
                          <p className="text-[#000000]">If in proper form and you start to experience lower back or hip discomfort, perform a crunch to "actively" rest your core</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'resources' && (
                <div>
                  <h2 className="text-3xl font-bold text-[#E43636] mb-6">Resources</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {resources.map((resource, index) => (
                      <div key={index} className="bg-white p-4 rounded-xl border border-[#E43636] hover:bg-[#E43636] text-[#000000] transition-colors cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold">{resource.name}</p>
                            <p className="text-sm opacity-75">{resource.size}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'comments' && (
                <div>
                  <h2 className="text-3xl font-bold text-[#E43636] mb-6">Q&A Discussion</h2>
                  <LessonComments 
                    lessonId="chapter-3/3-4" 
                    courseId="level1-megacore" 
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}