'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";
import { useUserProgress } from '@/hooks/useUserProgress';

export default function Lesson71() {
  const [activeTab, setActiveTab] = useState('description');
  const { progress } = useUserProgress('level1-megacore');
  const [isClient, setIsClient] = useState(false);

  const lessonGoals = [
    'Master Torso Twist 1.0 and 2.0 form and technique',
    'Understand proper kneeling position and strap placement',
    'Learn safe and effective oblique activation',
    'Practice maintaining hip stability during twisting movements'
  ];

  const resources = [
    { name: 'Torso Twist Exercises Guide PDF', type: 'pdf', size: '2.3 MB' },
    { name: 'Oblique Training Reference', type: 'pdf', size: '1.8 MB' },
    { name: 'Spring Configuration Guide', type: 'pdf', size: '1.4 MB' },
    { name: 'Form Checklist', type: 'pdf', size: '1.2 MB' }
  ];

  // Comments are now handled by the LessonComments component

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

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Course Title and Progress Bar */}
      <div className="bg-[#E43636] text-[#F6EFD2] py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Level 1 Megacore</h1>
              <p className="text-[#E2DDB4]">Chapter 7: Torso Twist Exercises</p>
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
            currentLessonPath="/courses/level1-megacore/content/chapter-7/7-1"
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
                  src="https://www.youtube.com/embed/VBhjqW6k0hk"
                  title="Torso Twist Exercises Tutorial"
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
                  <h2 className="text-3xl font-bold text-[#E43636] mb-6">Torso Twist Exercises</h2>
                  
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

                  {/* Exercise 1: Torso Twist 1.0 */}
                  <div className="space-y-8">
                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Torso Twist 1.0 (Left Oblique)</h3>
                      <p className="text-[#000000] mb-4">On the carriage, facing sideways</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-xl border border-[#E43636]">
                          <p className="text-sm text-[#E43636] font-semibold">Standard</p>
                          <p className="text-lg font-bold text-[#000000]">1 black spring</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-[#E43636]">
                          <p className="text-sm text-[#E43636] font-semibold">Modification</p>
                          <p className="text-lg font-bold text-[#000000]">2 gray springs</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-[#E43636]">
                          <p className="text-sm text-[#E43636] font-semibold">Intensification</p>
                          <p className="text-lg font-bold text-[#000000]">1 black + 1 gray spring</p>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Setup</h4>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>Kneel on the carriage facing the back platform</li>
                            <li>With your left hand, pick up the short hard handle of the long black strap and turn to your left</li>
                            <li>Your right hand will cup the left hand</li>
                            <li>Bring your arms straight out in front of your chest with a slight bend in both elbows</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Execution</h4>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li><b>Exhale:</b> As you twist the upper half of your body (torso) to the left</li>
                            <li><b>Inhale:</b> As you slowly untwist to the right, stopping when your hands are directly in front of you</li>
                            <li>(follow your hands with your eyes and your head)</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">DO NOT</h4>
                          <ul className="list-disc pl-6 text-[#E43636] space-y-2">
                            <li>DO NOT push your right hand into your left to turn, otherwise you're using your upper body</li>
                            <li>DO NOT use your shoulders and arms to twist and turn</li>
                            <li>DO NOT allow the hip closer to the back platform turn towards the front platform when twisting</li>
                            <li>Your hips are like headlights to a car, they stay shining forward</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Modifications</h4>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>Sit down on your heels; or Move on your knees towards the back platform</li>
                            <li>Lowering your hands to your belly button will take it out of your shoulders & provide more oblique activation</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Intensifications</h4>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>Go slower or add 1 gray spring to your 1 black spring</li>
                            <li>Move on your knees towards the front platform</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Challenges</h4>
                          <div className="bg-white p-6 rounded-xl border border-[#E43636]">
                            <p className="text-[#000000] font-semibold mb-2">Holds / Pulses:</p>
                            <p className="text-[#000000]">Twist 2 inches towards the front platform</p>
                            <p className="text-[#000000]">Pulse right 2 inches and left 2 inches (easier)</p>
                            <p className="text-[#000000]">Pulse left 2 inches and right 2 inches (harder)</p>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Exercise 2: Torso Twist 2.0 */}
                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Torso Twist 2.0 (Left Oblique)</h3>
                      <p className="text-[#000000] mb-4">On the carriage, facing sideways</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-xl border border-[#E43636]">
                          <p className="text-sm text-[#E43636] font-semibold">Standard</p>
                          <p className="text-lg font-bold text-[#000000]">1 black spring</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-[#E43636]">
                          <p className="text-sm text-[#E43636] font-semibold">Modification</p>
                          <p className="text-lg font-bold text-[#000000]">2 gray springs</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-[#E43636]">
                          <p className="text-sm text-[#E43636] font-semibold">Intensification</p>
                          <p className="text-lg font-bold text-[#000000]">1 black + 1 gray spring</p>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Setup</h4>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>Kneel on the carriage facing the back platform</li>
                            <li>With your left hand, pick up the short hard handle of the long black strap and turn to your left</li>
                            <li>Hold the long black strap with an overhand grip towards the end of the strap</li>
                            <li>Bring your arms straight out in front of your chest with a slight bend in both elbows</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Execution</h4>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>(holding the hands and cables in front of you)</li>
                            <li><b>Exhale:</b> As you twist the upper half of your body (torso) to the left</li>
                            <li><b>Inhale:</b> As you slowly untwist to the right, stopping when your hands are directly in front of you</li>
                            <li>(follow your hands with your eyes and your head)</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">DO NOT</h4>
                          <ul className="list-disc pl-6 text-[#E43636] space-y-2">
                            <li>DO NOT use your shoulders to twist and turn</li>
                            <li>DO NOT allow the hip closer to the back platform turn towards the front platform when twisting</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Modifications</h4>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>Sit down on your heels</li>
                            <li>Move on your knees towards the back platform</li>
                            <li>Lowering your hands to your belly button will take it out of your shoulders & provide more oblique activation</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Intensifications</h4>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>Go slower or add 1 gray spring to your 1 black spring</li>
                            <li>Move on your knees towards the front platform</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Challenges</h4>
                          <div className="bg-white p-6 rounded-xl border border-[#E43636]">
                            <p className="text-[#000000] font-semibold mb-2">Holds / Pulses:</p>
                            <p className="text-[#000000]">Twist 2 inches towards the front platform</p>
                            <p className="text-[#000000]">Pulse right 2 inches and left 2 inches (easier)</p>
                            <p className="text-[#000000]">Pulse left 2 inches and right 2 inches (harder)</p>
                          </div>
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
                    lessonId="chapter-7/7-1" 
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
