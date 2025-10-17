'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";
import { useUserProgress } from '@/hooks/useUserProgress';

export default function Lesson76() {
  const [activeTab, setActiveTab] = useState('description');
  const { progress } = useUserProgress('level1-megacore');
  const [isClient, setIsClient] = useState(false);

  const lessonGoals = [
    'Master all four Side Kneeling Crunch variations',
    'Understand proper positioning for each exercise variation',
    'Learn safe and effective oblique activation techniques',
    'Practice maintaining core stability during crunch movements'
  ];

  const resources = [
    { name: 'Side Kneeling Crunch Guide PDF', type: 'pdf', size: '2.5 MB' },
    { name: 'Oblique Activation Techniques', type: 'pdf', size: '1.8 MB' },
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
            currentLessonPath="/courses/level1-megacore/content/chapter-7/7-6"
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
                  src="https://www.youtube.com/embed/Ph-s4e_sHdI"
                  title="Side Kneeling Crunch Exercises Tutorial"
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
                  <h2 className="text-3xl font-bold text-[#E43636] mb-6">Side Kneeling Crunch Exercises</h2>
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
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">1. Back Reverse Side Kneeling Crunch (Right Oblique)</h3>
                      <p className="text-[#000000] mb-4">At the back, facing back</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-xl border border-[#E43636]">
                          <p className="text-sm text-[#E43636] font-semibold">Standard</p>
                          <p className="text-lg font-bold text-[#000000]">1 gray spring</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-[#E43636]">
                          <p className="text-sm text-[#E43636] font-semibold">Modification</p>
                          <p className="text-lg font-bold text-[#000000]">1 white spring</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-[#E43636]">
                          <p className="text-sm text-[#E43636] font-semibold">Intensification</p>
                          <p className="text-lg font-bold text-[#000000]">2 gray springs</p>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Setup</h4>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>Start on the carriage facing the back platform, and kick to the back, grabbing onto the back platform strap</li>
                            <li>Tuck your knees against the back carriage strap (legs and feet together)</li>
                            <li>Tuck your elbows over and against the back platform strap</li>
                            <li>Swing your legs and feet off the right side of the moving carriage, stacking your knees (don't cross your feet and ankles)</li>
                            <li>Lower down and back into a modified plank position</li>
                            <li>Lightly lift your hips and engage your core</li>
                          </ul>
                          <div className="bg-white p-4 rounded-xl border border-[#E43636] mt-4">
                            <p className="text-[#E43636]"><b>Note:</b> For those who have tight hips, stacking the knees may be uncomfortable. Knees side by side with both knees touching the carriage is the modification</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Execution</h4>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li><b>Exhale</b> as you:</li>
                            <li>Lift the right oblique first</li>
                            <li>Round the right side of your back second</li>
                            <li>Tuck your chin into your chest third</li>
                            <li>Continue rounding the spine as you move through your range of motion</li>
                            <li><b>Inhale</b> as you release down and back untucking the chin (back into the starting position)</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">DO NOT</h4>
                          <ul className="list-disc pl-6 text-[#E43636] space-y-2">
                            <li>DO NOT move the carriage by bending your knees forward or you'll activate more of your hip flexor</li>
                            <li>DO NOT bring your knees in past your hips or you'll lose tension</li>
                            <li>DO NOT let your shoulders move forward past your elbows as you crunch</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Modifications</h4>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>1 white spring</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Intensifications</h4>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>Go slower or 2 gray springs</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Challenges</h4>
                          <div className="bg-white p-6 rounded-xl border border-[#E43636]">
                            <p className="text-[#000000] font-semibold mb-2">Holds / Pulses:</p>
                            <p className="text-[#000000]">Lift and round halfway up</p>
                            <p className="text-[#000000]">Pulse by lowering down and back 2 inches and lifting up and forward 2 inches (easier)</p>
                            <p className="text-[#000000]">Pulse by lifting up and forward 2 inches and lowering down and back 2 inches (harder)</p>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">2. Side Kneeling Crunch (Right Oblique)</h3>
                      <p className="text-[#000000] mb-4">At the front, facing front</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-xl border border-[#E43636]">
                          <p className="text-sm text-[#E43636] font-semibold">Standard</p>
                          <p className="text-lg font-bold text-[#000000]">1 gray spring</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-[#E43636]">
                          <p className="text-sm text-[#E43636] font-semibold">Modification</p>
                          <p className="text-lg font-bold text-[#000000]">2 gray springs (max 3 springs)</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-[#E43636]">
                          <p className="text-sm text-[#E43636] font-semibold">Intensification</p>
                          <p className="text-lg font-bold text-[#000000]">1 white spring</p>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Setup</h4>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>Start on the carriage facing the front platform</li>
                            <li>Move your knees all the way forward to the edge of the carriage (legs and feet together)</li>
                            <li>Tuck your elbows over and against the front platform strap</li>
                            <li>Swing your legs and feet off the right side of the carriage, stacking your knees (don't cross your feet and ankles)</li>
                            <li>Lower down and back into a modified plank position</li>
                            <li>Lightly lift your hips and engage your core</li>
                          </ul>
                          <div className="bg-white p-4 rounded-xl border border-[#E43636] mt-4">
                            <p className="text-[#E43636]"><b>Note:</b> For those who have tight hips, stacking the knees may be uncomfortable. Knees side by side with both knees touching the carriage is the modification</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Execution</h4>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li><b>Exhale</b> as you:</li>
                            <li>Lift the right oblique first</li>
                            <li>Round the right side of your back second</li>
                            <li>Tuck your chin into your chest third</li>
                            <li>Continue rounding the spine as you move through your range of motion</li>
                            <li><b>Inhale</b> as you release down and back untucking the chin (back into the starting position)</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">DO NOT</h4>
                          <ul className="list-disc pl-6 text-[#E43636] space-y-2">
                            <li>DO NOT move the carriage by bending your knees forward because you won't activate the obliques effectively</li>
                            <li>DO NOT allow your shoulders to move forward past your elbows as your crunch forward</li>
                            <li>This can cause shoulder irritation</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Modifications</h4>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>2 gray springs</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Intensifications</h4>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>Go slower or 1 white spring</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Challenges</h4>
                          <div className="bg-white p-6 rounded-xl border border-[#E43636]">
                            <p className="text-[#000000] font-semibold mb-2">Holds / Pulses:</p>
                            <p className="text-[#000000]">Lift and round halfway up</p>
                            <p className="text-[#000000]">Pulse by lowering down and back 2 inches and lifting up and forward 2 inches (easier)</p>
                            <p className="text-[#000000]">Pulse by lifting up and forward 2 inches and lowering down and back 2 inches (harder)</p>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">3. Reverse Side Kneeling Crunch (Right Oblique)</h3>
                      <p className="text-[#000000] mb-4">At the front, facing back</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-xl border border-[#E43636]">
                          <p className="text-sm text-[#E43636] font-semibold">Standard</p>
                          <p className="text-lg font-bold text-[#000000]">1 gray spring</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-[#E43636]">
                          <p className="text-sm text-[#E43636] font-semibold">Modification</p>
                          <p className="text-lg font-bold text-[#000000]">2 gray springs (max 3 springs)</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-[#E43636]">
                          <p className="text-sm text-[#E43636] font-semibold">Intensification</p>
                          <p className="text-lg font-bold text-[#000000]">1 white spring</p>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Setup</h4>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>Start on the front platform facing the carriage</li>
                            <li>Tuck your knees against the front platform strap (legs and feet together)</li>
                            <li>Tuck your elbows over and against the front carriage strap</li>
                            <li>Swing your legs and feet off the right side of the front platform, stacking your knees (don't cross your feet and ankles)</li>
                            <li>Lower down and forward into a modified plank position</li>
                            <li>Lightly lift your hips and engage your core</li>
                          </ul>
                          <div className="bg-white p-4 rounded-xl border border-[#E43636] mt-4">
                            <p className="text-[#E43636]"><b>Note:</b> For those who have tight hips, stacking the knees may be uncomfortable. Knees side by side with both knees touching the front platform is the modification</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Execution</h4>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li><b>Exhale</b> as you:</li>
                            <li>Lift the right oblique first</li>
                            <li>Round the right side of your back second</li>
                            <li>Tuck your chin into your chest third</li>
                            <li>Continue rounding the spine as you move through your range of motion</li>
                            <li><b>Inhale</b> as you release down and forward untucking the chin (back into the starting position)</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">DO NOT</h4>
                          <ul className="list-disc pl-6 text-[#E43636] space-y-2">
                            <li>DO NOT move the carriage by bending your elbows against the carriage strap because you'll use your arms more than your obliques</li>
                            <li>DO NOT bring your elbows in and under past your shoulders</li>
                            <li>This can cause shoulder irritation</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Modifications</h4>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>2 gray springs</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Intensifications</h4>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>Go slower or 1 white spring</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Challenges</h4>
                          <div className="bg-white p-6 rounded-xl border border-[#E43636]">
                            <p className="text-[#000000] font-semibold mb-2">Holds / Pulses:</p>
                            <p className="text-[#000000]">Lift and round halfway up</p>
                            <p className="text-[#000000]">Pulse by lowering down and forward 2 inches and lifting up and in 2 inches (easier)</p>
                            <p className="text-[#000000]">Pulse by lifting up and in 2 inches and lowering down and forward 2 inches (harder)</p>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">4. Back Side Kneeling Crunch (Right Oblique)</h3>
                      <p className="text-[#000000] mb-4">At the back, facing front</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-xl border border-[#E43636]">
                          <p className="text-sm text-[#E43636] font-semibold">Standard</p>
                          <p className="text-lg font-bold text-[#000000]">1 gray spring</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-[#E43636]">
                          <p className="text-sm text-[#E43636] font-semibold">Modification</p>
                          <p className="text-lg font-bold text-[#000000]">1 white spring</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-[#E43636]">
                          <p className="text-sm text-[#E43636] font-semibold">Intensification</p>
                          <p className="text-lg font-bold text-[#000000]">2 gray springs</p>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Setup</h4>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>Start on the back platform facing the carriage</li>
                            <li>Pull the carriage in and tuck your knees against the back platform strap (legs and feet together)</li>
                            <li>Tuck your elbows over and against the back carriage strap</li>
                            <li>Swing your legs and feet off the right side of the back platform, stacking your knees (don't cross your feet and ankles)</li>
                            <li>Lower down and forward into a modified plank position</li>
                            <li>Lightly lift your hips and engage your core</li>
                          </ul>
                          <div className="bg-white p-4 rounded-xl border border-[#E43636] mt-4">
                            <p className="text-[#E43636]"><b>Note:</b> For those who have tight hips, stacking the knees may be uncomfortable. Knees side by side with both knees touching the front platform is the modification</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Execution</h4>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li><b>Exhale</b> as you:</li>
                            <li>Lift the right oblique first</li>
                            <li>Round the right side of your back second</li>
                            <li>Tuck your chin into your chest third</li>
                            <li>Continue rounding the spine as you move through your range of motion</li>
                            <li><b>Inhale</b> as you release down and forward untucking the chin (back into the starting position)</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">DO NOT</h4>
                          <ul className="list-disc pl-6 text-[#E43636] space-y-2">
                            <li>DO NOT move the carriage by bending your elbows against the carriage strap because you'll use your arms more than your obliques</li>
                            <li>DO NOT bring your elbows in and under past your shoulders</li>
                            <li>This can cause shoulder irritation</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Modifications</h4>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>1 white spring</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Intensifications</h4>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>Go slower or 2 gray springs</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Challenges</h4>
                          <div className="bg-white p-6 rounded-xl border border-[#E43636]">
                            <p className="text-[#000000] font-semibold mb-2">Holds / Pulses:</p>
                            <p className="text-[#000000]">Lift and round halfway up</p>
                            <p className="text-[#000000]">Pulse by lowering down and forward 2 inches and lifting up and in 2 inches (easier)</p>
                            <p className="text-[#000000]">Pulse by lifting up and in 2 inches and lowering down and forward 2 inches (harder)</p>
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
                    lessonId="chapter-7/7-6" 
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
