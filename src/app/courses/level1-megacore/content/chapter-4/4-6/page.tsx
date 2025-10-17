'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";
import { useUserProgress } from '@/hooks/useUserProgress';

export default function Lesson46() {
  const [activeTab, setActiveTab] = useState<'description' | 'resources' | 'comments'>('description');
  const [isClient, setIsClient] = useState(false);
  const { progress } = useUserProgress('level1-megacore');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const resources = [
    { name: 'Floor Lunge Guide PDF', type: 'pdf', size: '1.9 MB' },
  ];

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
              <p className="text-[#E2DDB4]">Chapter 4: Lower Body Strength</p>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <CourseNavigation 
            currentLessonPath="/courses/level1-megacore/content/chapter-4/4-6"
            nextLessonPath="/courses/level1-megacore/content/chapter-4/4-7"
          />
          {/* Main Content Area */}
          <div className="flex-1">
            {/* Video Player - Main Focus (placeholder) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  width="100%"
                  height="500"
                  src="https://www.youtube.com/embed/"
                  title="Floor Lunge (Right Leg) Tutorial"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full"
                ></iframe>
              </div>
            </motion.div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#E43636]">
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
              {activeTab === 'description' && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-[#E43636]">Floor Lunge <span className="text-black">(Right leg)</span></h2>

                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="text-xl font-bold text-blue-800 mb-4">Position & Springs</h3>
                    <ul className="list-disc pl-6 text-blue-800 space-y-2">
                      <li>In the front, facing front</li>
                      <li>(Standard: 1 gray spring)</li>
                      <li>(Modification: 2 gray springs; or go down to your knees, shins, and shoelaces to the carriage)</li>
                      <li>(Intensification: 1 white spring)</li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-[#E43636]">
                    <h3 className="text-xl font-bold text-[#E43636] mb-4">Setup (how to get into position)</h3>
                    <ul className="list-disc pl-6 text-[#000000] space-y-2">
                      <li>Start on the right side of the carriage facing the front platform with your right toes close to the black handlebar</li>
                      <li>The right foot stays on the floor and the left foot is anchored in front of the back carriage strap, toes down, heels up</li>
                      <li>Hands on your hips, behind your back, or in prayer position</li>
                      <li>Left leg should be straight with a slight bend in your knee</li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-[#E43636]">
                    <h3 className="text-xl font-bold text-[#E43636] mb-4">Execution (how to perform the exercise)</h3>
                    <ul className="list-disc pl-6 text-[#000000] space-y-2">
                      <li>Inhale as you lower down hinging from the hips forward</li>
                      <li>Exhale as you press through your right foot into the floor to come up lifting the chest as you come up</li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-red-300">
                    <h3 className="text-xl font-bold text-red-600 mb-4">DO NOT</h3>
                    <ul className="list-disc pl-6 text-[#000000] space-y-2">
                      <li>DO NOT let the knee move forward as you come up and or move back as you go down</li>
                      <li>DO NOT let the knee collapse inward towards the belly button</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                    <h3 className="text-xl font-bold text-green-800 mb-4">Modification(s) (easier)</h3>
                    <ul className="list-disc pl-6 text-green-900 space-y-2">
                      <li>Turn the black handle bar in front of you outwards for support</li>
                      <li>Set down your left knee, shin, and shoelaces onto the carriage</li>
                      <li>2 gray springs</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                    <h3 className="text-xl font-bold text-yellow-800 mb-4">Intensification(s) (harder)</h3>
                    <ul className="list-disc pl-6 text-yellow-900 space-y-2">
                      <li>Go slower</li>
                      <li>1 white spring or 0 springs</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                    <h3 className="text-xl font-bold text-purple-800 mb-4">Challenge(s)</h3>
                    <ul className="list-disc pl-6 text-purple-900 space-y-2">
                      <li>Holds / pulses</li>
                      <li>Meet halfway down</li>
                      <li>pulse 2 inches up and 2 inches down (easier)</li>
                      <li>pulse 2 inches down and 2 inches up (harder)</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'resources' && (
                <div>
                  <h2 className="text-2xl font-bold text-[#E43636] mb-4">Resources</h2>
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
                  <h2 className="text-2xl font-bold text-[#E43636] mb-4">Q&A</h2>
                  <div className="bg-white p-6 rounded-xl border border-[#E43636] mb-6">
                    <textarea
                      placeholder="Ask a question or share your experience..."
                      className="w-full p-4 rounded-lg border border-[#E43636] bg-white text-[#000000] resize-none"
                      rows={3}
                    ></textarea>
                    <button className="mt-3 px-6 py-2 bg-[#E43636] text-[#F6EFD2] rounded-lg font-semibold hover:bg-[#b82a2a] transition-colors">
                      Post Comment
                    </button>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-[#E43636]">No comments yet.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



