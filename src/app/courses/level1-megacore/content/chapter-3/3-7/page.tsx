"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";
import { useUserProgress } from '@/hooks/useUserProgress';

export default function Lesson37() {
  const [activeTab, setActiveTab] = useState<'description' | 'resources' | 'comments'>('description');
  const [isClient, setIsClient] = useState(false);
  const { progress } = useUserProgress('level1-megacore');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const lessonGoals = [
    'Master panther exercise form and technique',
    'Understand different variations and positions',
    'Learn proper breathing and execution',
    'Practice holds and pulses for progression'
  ];

  const resources = [
    { name: 'Panther Exercise Guide PDF', type: 'pdf', size: '2.0 MB' },
    { name: 'Core Strength Progression', type: 'pdf', size: '1.9 MB' },
    { name: 'Spring Load Reference', type: 'pdf', size: '0.9 MB' },
    { name: 'Form Checklist', type: 'pdf', size: '1.3 MB' }
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
            currentLessonPath="/courses/level1-megacore/content/chapter-3/3-7"
            nextLessonPath="/courses/level1-megacore/content/chapter-3/3-8"
          />

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Video Player */}
            <div className="mb-8">
              <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  width="100%"
                  height="500"
                  src="https://www.youtube.com/embed/vk7Pg7YtEuQ"
                  title="Panther Exercise Tutorial"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full"
                ></iframe>
              </div>
            </div>

            {/* Main Container with Tabs and Content */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-[#E43636]">
              {/* Tabs */}
              <div className="p-1 mb-8">
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
              <div className="px-8 pb-8">
              {activeTab === 'description' && (
                <div>
                  <h2 className="text-3xl font-bold text-[#E43636] mb-6">Panther</h2>
                  
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

                  {/* Exercise Details */}
                  <div className="space-y-8">
                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Panther</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                          <h4 className="font-semibold text-green-800 mb-2">Standard</h4>
                          <p className="text-green-700">1 gray spring</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <h4 className="font-semibold text-blue-800 mb-2">Modification</h4>
                          <p className="text-blue-700">2 gray springs</p>
                        </div>
                        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                          <h4 className="font-semibold text-red-800 mb-2">Intensification</h4>
                          <p className="text-red-700">1 white spring</p>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Setup</h3>
                      <ul className="list-disc pl-6 text-[#000000] space-y-2">
                        <li>Start on the carriage, facing the front platform</li>
                        <li>Place your hands on the front platform and maintain a slight bend in your elbows</li>
                        <li>Position your toes on the edge of the moving carriage, legs and feet together</li>
                        <li>Lightly lift your hips and engage your core</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Execution</h3>
                      <ul className="list-disc pl-6 text-[#000000] space-y-2">
                        <li><b>Exhale:</b> Bend your knees under your hips to move the carriage in</li>
                        <li><b>Inhale:</b> Lengthen your legs to move the carriage out</li>
                      </ul>
                    </section>

                    <section>
                      <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                        <h3 className="text-2xl font-bold text-red-800 mb-4">DO NOT</h3>
                        <ul className="list-disc pl-6 text-red-700 space-y-2">
                          <li>DO NOT swing in with your feet as you bend the knees</li>
                        </ul>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Modifications</h3>
                      <ul className="list-disc pl-6 text-[#000000] space-y-2">
                        <li>Separate your feet wider for added stability</li>
                        <li>2 gray springs; or 1 black spring is the max to modify</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Intensifications</h3>
                      <ul className="list-disc pl-6 text-[#000000] space-y-2">
                        <li>Go slower</li>
                        <li>1 white spring</li>
                      </ul>
                    </section>

                    <section>
                      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                        <h3 className="text-2xl font-bold text-yellow-800 mb-4">Challenges</h3>
                        <p className="text-yellow-700 font-semibold mb-2">Holds and pulses:</p>
                        <p className="text-yellow-700">Bend your knees forward halfway</p>
                        <p className="text-yellow-700">Pulse forward 2 inches and back 2 inches (easier)</p>
                        <p className="text-yellow-700">Pulse back 2 inches and forward 2 inches (harder)</p>
                      </div>
                    </section>

                    {/* Additional Variations */}
                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Additional Variations</h3>
                      
                      <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg border border-[#E43636]">
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Reverse Panther</h4>
                          <p className="text-[#000000] mb-3">At the front, facing back</p>
                          <ul className="list-disc pl-6 text-[#000000] space-y-1">
                            <li><b>Standard:</b> 1 gray spring</li>
                            <li><b>Modification:</b> 2 gray springs; or 1 black spring is the max to modify</li>
                            <li><b>Intensification:</b> 1 white spring</li>
                          </ul>
                        </div>

                        <div className="bg-white p-6 rounded-lg border border-[#E43636]">
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Back Panther</h4>
                          <p className="text-[#000000] mb-3">At the back, facing front</p>
                          <ul className="list-disc pl-6 text-[#000000] space-y-1">
                            <li><b>Standard:</b> 1 gray spring</li>
                            <li><b>Modification:</b> 1 white spring</li>
                            <li><b>Intensification:</b> 2 gray springs</li>
                          </ul>
                        </div>

                        <div className="bg-white p-6 rounded-lg border border-[#E43636]">
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Back Reverse Panther</h4>
                          <p className="text-[#000000] mb-3">At the back, facing back</p>
                          <ul className="list-disc pl-6 text-[#000000] space-y-1">
                            <li><b>Standard:</b> 1 gray spring</li>
                            <li><b>Modification:</b> 1 white spring</li>
                            <li><b>Intensification:</b> 2 gray springs</li>
                          </ul>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              )}

              {activeTab === 'resources' && (
                <div>
                  <h2 className="text-3xl font-bold text-[#E43636] mb-6">Resources</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {resources.map((resource, index) => (
                      <div key={index} className="bg-white p-4 rounded-xl border border-[#E43636] hover:bg-[#E43636] hover:text-[#F6EFD2] transition-colors cursor-pointer">
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
                    lessonId="chapter-3/3-7" 
                    courseId="level1-megacore" 
                  />
                </div>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 