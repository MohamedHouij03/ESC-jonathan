"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";
import { useUserProgress } from '@/hooks/useUserProgress';

export default function Lesson21() {
  const [activeTab, setActiveTab] = useState<'description' | 'resources' | 'comments'>('description');
  const [isClient, setIsClient] = useState(false);
  const { progress } = useUserProgress('level1-megacore');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const lessonGoals = [
    'Master proper kneeling crunch form',
    'Understand spring load variations',
    'Learn modifications and intensifications',
    'Practice holds and pulses techniques'
  ];

  const resources = [
    { name: 'Kneeling Crunch Guide PDF', type: 'pdf', size: '2.3 MB' },
    { name: 'Core Strength Diet Plan', type: 'pdf', size: '1.8 MB' },
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
            currentLessonPath="/courses/level1-megacore/content/chapter-2/2-1"
            nextLessonPath="/courses/level1-megacore/content/chapter-2/2-2"
          />

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Video Player */}
            <div className="mb-8">
              <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  width="100%"
                  height="500"
                  src="https://www.youtube.com/embed/5w7jIbh1brM"
                  title="Kneeling Crunch - Video Tutorial"
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
                  <h2 className="text-3xl font-bold text-[#E43636] mb-6">Kneeling Crunch (Rainbow Crunch)</h2>
                  
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

                  {/* Kneeling Crunch - Front Facing */}
                  <div className="bg-white rounded-xl p-6 mb-8 border border-[#E43636]">
                    <h3 className="text-2xl font-bold text-[#E43636] mb-4">Kneeling Crunch</h3>
                    <p className="text-lg text-[#000000] mb-4">At the front, facing front</p>
                    
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

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xl font-bold text-[#E43636] mb-3">Setup (how to get into position)</h4>
                        <ul className="list-disc pl-6 text-[#000000] space-y-2">
                          <li>Starting on the carriage facing the front platform</li>
                          <li>Forearms down on the front platform</li>
                          <li>Move your knees all the way forward to the edge of the carriage, legs and feet together</li>
                          <li>Lower down and back into a modified plank position</li>
                          <li>Lightly lift your hips and engage your core</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xl font-bold text-[#E43636] mb-3">Execution (how to perform the exercise)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-green-50 p-4 rounded-lg">
                            <h5 className="font-semibold text-green-800 mb-2">Exhale as you:</h5>
                            <ul className="list-disc pl-4 text-green-700 space-y-1">
                              <li>Lift your stomach, round your spine</li>
                              <li>Tuck your chin, eyes to thighs</li>
                            </ul>
                          </div>
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h5 className="font-semibold text-blue-800 mb-2">Inhale as you:</h5>
                            <ul className="list-disc pl-4 text-blue-700 space-y-1">
                              <li>Lower down and back into your modified plank</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xl font-bold text-[#E43636] mb-3">DO NOT</h4>
                        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>DO NOT bring the carriage in with your knees (Using the knees is less effective and will activate more of the hip flexors)</li>
                            <li>DO NOT allow your knees to go too far forward past your hips or you'll lose tension (The more the knee passes the hips and get closer to the back platform, the less effective)</li>
                            <li>DO NOT allow your shoulders to go forward past your elbows as you crunch (This can lead to shoulder strain or discomfort)</li>
                          </ul>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-lg font-bold text-[#E43636] mb-2">Modification(s) (easier)</h4>
                          <p className="text-[#000000]">2 gray springs</p>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-[#E43636] mb-2">Intensification(s) (harder)</h4>
                          <p className="text-[#000000]">1 white spring</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-[#E43636] mb-2">Challenge(s)</h4>
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                          <h5 className="font-semibold text-yellow-800 mb-2">Holds and Pulses</h5>
                          <p className="text-yellow-700 mb-2">Crunch halfway up</p>
                          <ul className="list-disc pl-4 text-yellow-700 space-y-1">
                            <li>pulse down 2 inches and up 2 inches (easier)</li>
                            <li>pulse up 2 inches, down 2 inches (harder)</li>
                          </ul>
                          <p className="text-sm text-yellow-600 mt-2 italic">Note: Pulses are "up and down" (not "in and out" because people may use their knees, which is less effective)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Reverse Kneeling Crunch */}
                  <div className="bg-white rounded-xl p-6 mb-8 border border-[#E43636]">
                    <h3 className="text-2xl font-bold text-[#E43636] mb-4">Reverse Kneeling Crunch</h3>
                    <p className="text-lg text-[#000000] mb-4">At the front, facing back</p>
                    
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
                        <p className="text-red-700">0 springs</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xl font-bold text-[#E43636] mb-3">Setup (how to get into position)</h4>
                        <ul className="list-disc pl-6 text-[#000000] space-y-2">
                          <li>Starting on the front platform facing the carriage</li>
                          <li>Forearms down on the carriage</li>
                          <li>Knees down on the front platform</li>
                          <li>Lower down and forward into a modified plank position</li>
                          <li>Lightly lift your hips and engage your core</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xl font-bold text-[#E43636] mb-3">Execution (how to perform the exercise)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-green-50 p-4 rounded-lg">
                            <h5 className="font-semibold text-green-800 mb-2">Exhale as you:</h5>
                            <ul className="list-disc pl-4 text-green-700 space-y-1">
                              <li>Lift your stomach, round your spine</li>
                              <li>Tuck your chin, eyes to thighs</li>
                            </ul>
                          </div>
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h5 className="font-semibold text-blue-800 mb-2">Inhale as you:</h5>
                            <ul className="list-disc pl-4 text-blue-700 space-y-1">
                              <li>Lower down and back into your modified plank</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xl font-bold text-[#E43636] mb-3">DO NOT</h4>
                        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>DO NOT bring the carriage in with your forearms and elbows (Using the forearms and knees is less effective)</li>
                            <li>DO NOT allow your elbows to come in and past your shoulders (This can cause shoulder discomfort)</li>
                          </ul>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-lg font-bold text-[#E43636] mb-2">Modification(s) (easier)</h4>
                          <p className="text-[#000000]">2 gray springs</p>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-[#E43636] mb-2">Intensification(s) (harder)</h4>
                          <p className="text-[#000000]">1 white spring</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-[#E43636] mb-2">Challenge(s)</h4>
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                          <h5 className="font-semibold text-yellow-800 mb-2">Holds and Pulses</h5>
                          <p className="text-yellow-700 mb-2">Crunch halfway up</p>
                          <ul className="list-disc pl-4 text-yellow-700 space-y-1">
                            <li>pulse down 2 inches and up 2 inches (easier)</li>
                            <li>pulse up 2 inches, down 2 inches (harder)</li>
                          </ul>
                          <p className="text-sm text-yellow-600 mt-2 italic">Note: Pulses are "up and down" (not "in and out" because people may use their knees, which is less effective)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Back Kneeling Crunch */}
                  <div className="bg-white rounded-xl p-6 mb-8 border border-[#E43636]">
                    <h3 className="text-2xl font-bold text-[#E43636] mb-4">Back Kneeling Crunch</h3>
                    <p className="text-lg text-[#000000] mb-4">At the back, facing front</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-800 mb-2">Standard</h4>
                        <p className="text-green-700">1 gray spring</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-800 mb-2">Modification</h4>
                        <p className="text-blue-700">1 white spring</p>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <h4 className="font-semibold text-red-800 mb-2">Intensification</h4>
                        <p className="text-red-700">Move your forearm forward, away from the back carriage strap</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xl font-bold text-[#E43636] mb-3">Setup (how to get into position)</h4>
                        <ul className="list-disc pl-6 text-[#000000] space-y-2">
                          <li>Starting on the back platform facing the carriage</li>
                          <li>Pull the carriage in and tuck your knees against the back platform strap</li>
                          <li>Forearms over and against the back carriage strap</li>
                          <li>Lower down and forward into a modified plank position</li>
                          <li>Lightly lift your hips and engage your core</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xl font-bold text-[#E43636] mb-3">Execution (how to perform the exercise)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-green-50 p-4 rounded-lg">
                            <h5 className="font-semibold text-green-800 mb-2">Exhale as you:</h5>
                            <ul className="list-disc pl-4 text-green-700 space-y-1">
                              <li>Lift your stomach, round your spine</li>
                              <li>Tuck your chin, eyes to thighs</li>
                            </ul>
                          </div>
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h5 className="font-semibold text-blue-800 mb-2">Inhale as you:</h5>
                            <ul className="list-disc pl-4 text-blue-700 space-y-1">
                              <li>Lower down and back into your modified plank</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xl font-bold text-[#E43636] mb-3">DO NOT</h4>
                        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>DO NOT bring the carriage in with your forearms and elbows</li>
                            <li>DO NOT allow your elbows to come in and past your shoulders</li>
                          </ul>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-lg font-bold text-[#E43636] mb-2">Modification(s) (easier)</h4>
                          <p className="text-[#000000]">1 white spring</p>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-[#E43636] mb-2">Intensification(s) (harder)</h4>
                          <p className="text-[#000000]">2 gray springs</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-[#E43636] mb-2">Challenge(s)</h4>
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                          <h5 className="font-semibold text-yellow-800 mb-2">Holds and Pulses</h5>
                          <p className="text-yellow-700 mb-2">Crunch halfway up</p>
                          <ul className="list-disc pl-4 text-yellow-700 space-y-1">
                            <li>pulse down 2 inches and up 2 inches (easier)</li>
                            <li>pulse up 2 inches, down 2 inches (harder)</li>
                          </ul>
                          <p className="text-sm text-yellow-600 mt-2 italic">Note: Pulses are "up and down" (not "in and out" because people may use their knees, which is less effective)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Back Reverse Kneeling Crunch */}
                  <div className="bg-white rounded-xl p-6 mb-8 border border-[#E43636]">
                    <h3 className="text-2xl font-bold text-[#E43636] mb-4">Back Reverse Kneeling Crunch</h3>
                    <p className="text-lg text-[#000000] mb-4">At the back, facing back</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-800 mb-2">Standard</h4>
                        <p className="text-green-700">1 gray spring</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-800 mb-2">Modification</h4>
                        <p className="text-blue-700">1 white spring</p>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <h4 className="font-semibold text-red-800 mb-2">Intensification</h4>
                        <p className="text-red-700">move your knee back and further away from the back carriage strap</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xl font-bold text-[#E43636] mb-3">Setup (how to get into position)</h4>
                        <ul className="list-disc pl-6 text-[#000000] space-y-2">
                          <li>Starting on the carriage facing the back platform, kick to the back platform and grab the back platform strap</li>
                          <li>Tuck your knees against the back carriage strap, legs and feet together</li>
                          <li>Tuck your elbows over and against the back platform strap</li>
                          <li>Lower down and back into a modified plank position</li>
                          <li>Lightly lift your hips and engage your core</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xl font-bold text-[#E43636] mb-3">Execution (how to perform the exercise)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-green-50 p-4 rounded-lg">
                            <h5 className="font-semibold text-green-800 mb-2">Exhale as you:</h5>
                            <ul className="list-disc pl-4 text-green-700 space-y-1">
                              <li>Lift your stomach, round your spine</li>
                              <li>Tuck your chin, eyes to thighs</li>
                            </ul>
                          </div>
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h5 className="font-semibold text-blue-800 mb-2">Inhale as you:</h5>
                            <ul className="list-disc pl-4 text-blue-700 space-y-1">
                              <li>Lower down and back into your modified plank</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xl font-bold text-[#E43636] mb-3">DO NOT</h4>
                        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>DO NOT: Bring the carriage in with your knees (Using the knees is less effective and will activate more of the hip flexors)</li>
                            <li>DO NOT: Allow your knees to go too far forward past your hips or you'll lose tension (The more the knee passes the hips and get closer to the back platform, the less effective)</li>
                            <li>DO NOT: Allow your shoulders to go forward past your elbows as you crunch (This can lead to shoulder strain or discomfort)</li>
                          </ul>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-lg font-bold text-[#E43636] mb-2">Modification(s) (easier)</h4>
                          <p className="text-[#000000]">1 white spring</p>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-[#E43636] mb-2">Intensification(s) (harder)</h4>
                          <p className="text-[#000000]">Move your knees back and further away from the back carriage strap</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-[#E43636] mb-2">Challenge(s)</h4>
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                          <h5 className="font-semibold text-yellow-800 mb-2">Holds and Pulses</h5>
                          <p className="text-yellow-700 mb-2">Crunch halfway up</p>
                          <ul className="list-disc pl-4 text-yellow-700 space-y-1">
                            <li>pulse down 2 inches and up 2 inches (easier)</li>
                            <li>pulse up 2 inches, down 2 inches (harder)</li>
                          </ul>
                          <p className="text-sm text-yellow-600 mt-2 italic">Note: Pulses are "up and down" (not "in and out" because people may use their knees, which is less effective)</p>
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
                    lessonId="chapter-2/2-1" 
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