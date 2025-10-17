'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";
import { useUserProgress } from '@/hooks/useUserProgress';

export default function Lesson64() {
  const [activeTab, setActiveTab] = useState('description');
  const { progress } = useUserProgress('level1-megacore');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#E43636]"></div>
      </div>
    );
  }


  const lessonGoals = [
    'Master Staggered Skater (left leg) form and technique',
    'Understand proper hip and knee alignment',
    'Learn safe and effective staggered skater execution',
    'Practice holds and pulses for progression'
  ];

  const resources = [
    { name: 'Staggered Skater Guide PDF', type: 'pdf', size: '2.1 MB' },
    { name: 'Lower Body Progression', type: 'pdf', size: '1.8 MB' },
    { name: 'Spring Load Reference', type: 'pdf', size: '0.9 MB' },
    { name: 'Form Checklist', type: 'pdf', size: '1.2 MB' }
  ];

  // Comments are now handled by the LessonComments component

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Course Title and Progress Bar */}
      <div className="bg-[#E43636] text-[#F6EFD2] py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Level 1 Megacore</h1>
              <p className="text-[#E2DDB4]">Chapter 6: Heavy Leg Exercises</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-[#E2DDB4]">Progress</p>
              <p className="text-lg font-bold">{progress}% Complete</p>
            </div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div className="bg-white h-3 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <CourseNavigation 
            currentLessonPath="/courses/level1-megacore/content/chapter-6/6-4"
          />
          {/* Main Content Area */}
          <div className="flex-1">
            {/* Video Player - Main Focus */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  width="100%"
                  height="500"
                  src="https://www.youtube.com/embed/4mq7j415tuc"
                  title="Staggered Skater (Left Leg) Tutorial"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full"
                ></iframe>
              </div>
            </motion.div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#E43636]">
              {/* Tab Navigation */}
              <div className="bg-white rounded-2xl p-1 mb-8 shadow-lg">
                <div className="flex space-x-1">
                  {[
                    { id: 'description', label: 'Description' },
                    { id: 'resources', label: 'Resources' },
                    { id: 'comments', label: 'Q&A' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-[#E43636] text-[#F6EFD2] shadow-lg'
                          : 'text-[#E43636] hover:bg-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
              {activeTab === 'description' && (
                <div>
                  <h2 className="text-3xl font-bold text-[#E43636] mb-6">Staggered Skater (Left Leg)</h2>
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
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Staggered Skater (Left Leg)</h3>
                      <p className="text-[#000000] mb-4">On the front platform, facing sideways</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-xl border border-[#E43636]">
                          <p className="text-sm text-[#E43636] font-semibold">XFormer Standard</p>
                          <p className="text-lg font-bold text-[#000000]">4 white springs</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-[#E43636]">
                          <p className="text-sm text-[#E43636] font-semibold">XFormer Modification</p>
                          <p className="text-lg font-bold text-[#000000]">3 white springs</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-[#E43636]">
                          <p className="text-sm text-[#E43636] font-semibold">Megacore Standard</p>
                          <p className="text-lg font-bold text-[#000000]">2 black springs</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-[#E43636]">
                          <p className="text-sm text-[#E43636] font-semibold">Megacore Modification</p>
                          <p className="text-lg font-bold text-[#000000]">1 black spring + 1 gray spring</p>
                        </div>
                      </div>
                    </section>
                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Setup</h3>
                      <ul className="list-disc pl-6 text-[#000000] space-y-2">
                        <li>Starting on the front platform facing forward</li>
                        <li>Turn to the right and place your left foot under the front platform strap all the way forward to the edge of the platform</li>
                        <li>Place your right toes diagonally back and against the edge of the moving carriage</li>
                        <li>Send your hip back before bending the knees to come down (fingers on the black handlebars in front of you if needed)</li>
                        <li>Push the carriage out as far as you can and hold</li>
                      </ul>
                    </section>
                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Execution</h3>
                      <ul className="list-disc pl-6 text-[#000000] space-y-2">
                        <li><b>Inhale:</b> Your right knee bends to slowly bring the carriage back in (stopping right before you lose tension)</li>
                        <li><b>Exhale:</b> Push the carriage out as far as you can keeping the left side of your body from moving</li>
                      </ul>
                    </section>
                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">DO NOT</h3>
                      <ul className="list-disc pl-6 text-[#E43636] space-y-2">
                        <li>DO NOT Push the carriage out and in quickly</li>
                        <li>DO NOT Move the left side of your body as you perform the exercise</li>
                      </ul>
                    </section>
                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Modifications</h3>
                      <ul className="list-disc pl-6 text-[#000000] space-y-2">
                        <li>Less springs</li>
                      </ul>
                    </section>
                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Challenge</h3>
                      <ul className="list-disc pl-6 text-[#000000] space-y-2">
                        <li>Add more springs</li>
                      </ul>
                    </section>
                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Variations</h3>
                      <ul className="list-disc pl-6 text-[#000000] space-y-2">
                        <li>Holds and pulses (mid range, full range)</li>
                      </ul>
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
                            <p className="font-semibold text-black">{resource.name}</p>
                            <p className="text-sm opacity-75 text-black">{resource.size}</p>
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
                    lessonId="chapter-6/6-4" 
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
