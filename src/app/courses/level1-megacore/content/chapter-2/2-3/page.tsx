"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";
import { useUserProgress } from '@/hooks/useUserProgress';

export default function Lesson23() {
  const [activeTab, setActiveTab] = useState<'description' | 'resources' | 'comments'>('description');
  const [isClient, setIsClient] = useState(false);
  const { progress } = useUserProgress('level1-megacore');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const lessonGoals = [
    'Master proper knee strap crunch form',
    'Understand spring load variations',
    'Learn modifications and intensifications',
    'Practice proper breathing techniques'
  ];

  const resources = [
    { name: 'Knee Strap Crunch Guide PDF', type: 'pdf', size: '2.2 MB' },
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
              <p className="text-[#E2DDB4]">Chapter 2</p>
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
            currentLessonPath="/courses/level1-megacore/content/chapter-2/2-3"
            nextLessonPath="/courses/level1-megacore/content/chapter-2/2-4"
          />

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Video Player */}
            <div className="mb-8">
              <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  width="100%"
                  height="500"
                  src="https://www.youtube.com/embed/qzLOwFwuqtg"
                  title="Knee Strap Crunch - Video Tutorial"
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
                  <h2 className="text-3xl font-bold text-[#E43636] mb-6">Knee Strap Crunch</h2>
                  
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

                  {/* Knee Strap Crunch */}
                  <div className="bg-white rounded-xl p-6 mb-8 border border-[#E43636]">
                    <h3 className="text-2xl font-bold text-[#E43636] mb-4">Knee Strap Crunch</h3>
                    <p className="text-lg text-[#000000] mb-4">On the carriage, facing the back platform</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-800 mb-2">Standard</h4>
                        <p className="text-green-700">2 black springs</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-800 mb-2">Modification</h4>
                        <p className="text-blue-700">1 black + 1 gray</p>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <h4 className="font-semibold text-red-800 mb-2">Intensification</h4>
                        <p className="text-red-700">Move back on the carriage towards the front platform to increase tension</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xl font-bold text-[#E43636] mb-3">Setup (how to get into position)</h4>
                        <ul className="list-disc pl-6 text-[#000000] space-y-2">
                          <li>Sit at the back of the carriage, facing the back platform, with your feet in the well</li>
                          <li>Take long black straps (located on the sides of your carriage) and place each strap through each leg up past your knees.</li>
                          <li>Carefully lie down on your back and scoot your body towards the middle of the carriage</li>
                          <li>Place your hands behind your head OR at the sides of your ears.</li>
                          <li>Lengthen your legs up to tabletop and extend outwards keeping tension in the cables</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xl font-bold text-[#E43636] mb-3">Execution (how to perform the exercise)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-green-50 p-4 rounded-lg">
                            <h5 className="font-semibold text-green-800 mb-2">Exhale as you:</h5>
                            <ul className="list-disc pl-4 text-green-700 space-y-1">
                              <li>Lift your chin, then your shoulders, eyes to your thighs</li>
                              <li>Bend your knees inward towards your chest</li>
                            </ul>
                          </div>
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h5 className="font-semibold text-blue-800 mb-2">Inhale as you:</h5>
                            <ul className="list-disc pl-4 text-blue-700 space-y-1">
                              <li>Lower back and down</li>
                              <li>Extend your legs forward to the starting position</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xl font-bold text-[#E43636] mb-3">DO NOT</h4>
                        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>DO NOT crunch forward with your neck or tuck your chin. (using your neck to crunch may strain your neck) (tucking your chin constricts the ability to breath. Keep space between the chin and chest)</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-[#E43636] mb-2">Modification(s) (easier)</h4>
                        <ul className="list-disc pl-6 text-[#000000] space-y-2">
                          <li>Scoot forward towards the back end of the carriage to make the straps lighter</li>
                          <li>Decrease the spring load to 1 black + 1 gray</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-[#E43636] mb-2">Intensification(s) (harder)</h4>
                        <ul className="list-disc pl-6 text-[#000000] space-y-2">
                          <li>Move back on the carriage towards the front platform to increase tension</li>
                          <li>Add another gray spring</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-[#E43636] mb-2">Challenge(s)</h4>
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                          <h5 className="font-semibold text-yellow-800 mb-2">Reaches:</h5>
                          <ul className="list-disc pl-4 text-yellow-700 space-y-1">
                            <li>Crunch up to hold, extending your legs up and diagonal, and arms out reaching for your toes</li>
                            <li>pulse down and up 2 inches (easier)</li>
                            <li>pulse up and down 2 inches (harder)</li>
                          </ul>
                          <p className="text-sm text-yellow-600 mt-2 italic">Note: Cue to use their lower abdominal muscles to pull their knees in</p>
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
                    lessonId="chapter-2/2-3" 
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