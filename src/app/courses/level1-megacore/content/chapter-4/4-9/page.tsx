'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";
import { useUserProgress } from '@/hooks/useUserProgress';

export default function Lesson49() {
  const [activeTab, setActiveTab] = useState('description');
  const { progress } = useUserProgress('level1-megacore');
  const [completedLessons, setCompletedLessons] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const lessonGoals = [
    'Master Light Squat (left leg) form and technique',
    'Understand proper knee and hip alignment',
    'Learn safe and effective squat execution',
    'Practice holds and pulses for progression'
  ];

  const resources = [
    { name: 'Light Squat Guide PDF', type: 'pdf', size: '2.0 MB' },
    { name: 'Lower Body Progression', type: 'pdf', size: '1.8 MB' },
    { name: 'Spring Load Reference', type: 'pdf', size: '0.9 MB' },
    { name: 'Form Checklist', type: 'pdf', size: '1.2 MB' }
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
            currentLessonPath="/courses/level1-megacore/content/chapter-4/4-9"
            nextLessonPath="/courses/level1-megacore/content/chapter-4/4-10"
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
                  src="https://www.youtube.com/embed/rMzUYppjmcc"
                  title="Light Squat (Left Leg) Tutorial"
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
                          : 'text-[#E43636] hover:bg-[#F6EFD2]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
              {activeTab === 'description' && (
                <div>
                  <h2 className="text-3xl font-bold text-[#E43636] mb-6">Light Squat (Left Leg)</h2>
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
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Light Squat (Left Leg)</h3>
                      <p className="text-[#000000] mb-4">In the front, facing sideways</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-xl border border-[#E43636]">
                          <p className="text-sm text-[#E43636] font-semibold">Standard</p>
                          <p className="text-lg font-bold text-[#000000]">1 gray spring</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-[#E43636]">
                          <p className="text-sm text-[#E43636] font-semibold">Modification</p>
                          <p className="text-lg font-bold text-[#000000]">2 gray springs; or 3 gray springs as the max to modify</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-[#E43636]">
                          <p className="text-sm text-[#E43636] font-semibold">Intensification</p>
                          <p className="text-lg font-bold text-[#000000]">1 white spring</p>
                        </div>
                      </div>
                    </section>
                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Setup</h3>
                      <ul className="list-disc pl-6 text-[#000000] space-y-2">
                        <li>Start on the front platform facing forward, then turn to your right</li>
                        <li>Your feet are side by side with both feet under and in between the front platform strap and the carriage strap</li>
                        <li>Bring your feet hip width apart</li>
                        <li>Sit down and back, bending the knees to come down into a squat position and hold</li>
                      </ul>
                    </section>
                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Execution</h3>
                      <ul className="list-disc pl-6 text-[#000000] space-y-2">
                        <li><b>Exhale:</b> Press through both feet to come up</li>
                        <li><b>Inhale:</b> Send your hips back feeling your hamstring stretch before bending the knees to lower down</li>
                      </ul>
                    </section>
                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">DO NOT</h3>
                      <ul className="list-disc pl-6 text-[#E43636] space-y-2">
                        <li>DO NOT let your knees collapse inwards towards your midline or belly button squat up and down</li>
                        <li>DO NOT move the carriage as you squat up and down</li>
                      </ul>
                    </section>
                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Modifications</h3>
                      <ul className="list-disc pl-6 text-[#000000] space-y-2">
                        <li>Use the stabilization pole</li>
                        <li>2 gray springs; or 3 gray springs is the max to modify</li>
                      </ul>
                    </section>
                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Intensifications</h3>
                      <ul className="list-disc pl-6 text-[#000000] space-y-2">
                        <li>1 white spring</li>
                        <li>Move the foot on the carriage closer to the center</li>
                      </ul>
                    </section>
                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Challenges</h3>
                      <div className="bg-white p-6 rounded-xl border border-[#E43636]">
                        <p className="text-[#000000] font-semibold mb-2">Holds and pulses:</p>
                        <p className="text-[#000000]">Meet me halfway down</p>
                        <p className="text-[#000000]">Pulse up 2 inches and down 2 inches (easier)</p>
                        <p className="text-[#000000]">Pulse down 2 inches and up 2 inches (harder)</p>
                      </div>
                    </section>
                  </div>
                </div>
              )}
              {activeTab === 'resources' && (
                <div>
                  <h2 className="text-3xl font-bold text-[#E43636] mb-6">Exercise Resources</h2>
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
                    lessonId="chapter-4/4-9" 
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
