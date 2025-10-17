'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";
import { useUserProgress } from '@/hooks/useUserProgress';

export default function Lesson714() {
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Course Title and Progress Bar */}
      <div className="bg-[#E43636] text-[#F6EFD2] py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Level 1 Megacore</h1>
              <p className="text-[#E2DDB4]">Chapter 7: Core & Obliques</p>
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
            currentLessonPath="/courses/level1-megacore/content/chapter-7/7-14"
            nextLessonPath="/courses/level1-megacore/content/chapter-7/7-15"
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
                  src="https://www.youtube.com/embed/TtGICD-Vgvc"
                  title="Twisted Saw Exercises Tutorial"
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
                  <h2 className="text-3xl font-bold text-[#E43636] mb-6">Twisted Saw Exercises</h2>
                  
                  {/* Twisted Saw */}
                  <div className="bg-white rounded-xl p-6 mb-8 border border-[#E43636]">
                    <h3 className="text-2xl font-bold text-[#E43636] mb-4">Twisted Saw [right oblique]</h3>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-[#E43636] mb-2">Position & Springs</h4>
                      <ul className="list-disc pl-6 text-[#000000] space-y-1">
                        <li>At the front, facing front</li>
                        <li><b>Standard:</b> 1 gray spring</li>
                        <li><b>Modification:</b> 2 gray springs; or 3 gray springs is the max to modify</li>
                        <li><b>Intensification:</b> 1 white spring</li>
                      </ul>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-[#E43636] mb-2">Setup</h4>
                      <ul className="list-disc pl-6 text-[#000000] space-y-1">
                        <li>Starting on the carriage facing the front platform</li>
                        <li>Knees and legs together behind the front carriage strap</li>
                        <li>Forearms down on the front platform</li>
                        <li>Lower down and back into a modified plank and swing your feet off the right side of the carriage, stacking your knees (do not cross your ankles and feet)</li>
                        <li>Lightly lift your hips and engage your core</li>
                      </ul>
                      <p className="text-[#000000] mt-4"><b>Note:</b> For those who have tight hips, stacking the knees may be uncomfortable. "Knees side by side with both knees touching the carriage" is the modification</p>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-[#E43636] mb-2">Execution</h4>
                      <ul className="list-disc pl-6 text-[#000000] space-y-1">
                        <li>(Holding a modified plank position with your legs off the right side of the carriage)</li>
                        <li><b>Inhale:</b> As you lengthen your arms to slide the carriage back.</li>
                        <li><b>Exhale:</b> As you bend your elbows to slide the carriage forward.</li>
                        <li>You're holding a plank on your knees, and the only thing that moves is your arms lengthening and bending to slide in and out.</li>
                      </ul>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-red-600 mb-2">DO NOT</h4>
                      <ul className="list-disc pl-6 text-[#E43636] space-y-1">
                        <li>DO NOT let the shoulders pass your elbows as you move forward.</li>
                        <li>DO NOT lower the hips or arch your back as you slide back.</li>
                        <li>DO NOT cross your ankles and feet</li>
                      </ul>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-[#E43636] mb-2">Modifications</h4>
                      <ul className="list-disc pl-6 text-[#000000] space-y-1">
                        <li>2 gray springs; or 3 gray springs is the max to modify</li>
                        <li>You can perform a "Side Kneeling Crunch" to take a break</li>
                      </ul>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-[#E43636] mb-2">Intensifications</h4>
                      <ul className="list-disc pl-6 text-[#000000] space-y-1">
                        <li>1 white spring</li>
                      </ul>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-[#E43636] mb-2">Challenges</h4>
                      <ul className="list-disc pl-6 text-[#000000] space-y-1">
                        <li><b>Holds / Pulses:</b></li>
                        <li>Slide halfway back</li>
                        <li>Pulse in 2 inches and back 2 inches (easier)</li>
                        <li>Pulse back 2 inches and in 2 inches (harder)</li>
                      </ul>
                    </div>
                  </div>

                  {/* Reverse Twisted Saw */}
                  <div className="bg-white rounded-xl p-6 mb-8 border border-[#E43636]">
                    <h3 className="text-2xl font-bold text-[#E43636] mb-4">Reverse Twisted Saw [right oblique]</h3>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-[#E43636] mb-2">Position & Springs</h4>
                      <ul className="list-disc pl-6 text-[#000000] space-y-1">
                        <li>At the front, facing back</li>
                        <li><b>Standard:</b> 1 gray spring</li>
                        <li><b>Modification:</b> 2 gray springs; or 3 gray springs is the max to modify</li>
                        <li><b>Intensification:</b> 1 white spring</li>
                      </ul>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-[#E43636] mb-2">Setup</h4>
                      <ul className="list-disc pl-6 text-[#000000] space-y-1">
                        <li>Starting on the front platform facing the carriage</li>
                        <li>Knees and legs together on the front platform</li>
                        <li>Forearms down on the carriage</li>
                        <li>Lower down and forward into a modified plank and swing your feet off the right side of the front platform, stacking your knees (do not cross your ankles and feet)</li>
                        <li>Lightly lift your hips and engage your core</li>
                      </ul>
                      <p className="text-[#000000] mt-4"><b>Note:</b> For those who have tight hips, stacking the knees may be uncomfortable. "Knees side by side with both knees touching the front platform" is the modification</p>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-[#E43636] mb-2">Execution</h4>
                      <ul className="list-disc pl-6 text-[#000000] space-y-1">
                        <li>(Holding a modified plank position with your legs off the right side of the front platform)</li>
                        <li><b>Inhale:</b> As you lengthen your arms to slide the carriage out.</li>
                        <li><b>Exhale:</b> As you bend your elbows to slide the carriage in.</li>
                        <li>You're holding a plank on your knees, and the only thing that moves is your arms lengthening and bending to slide in and out.</li>
                      </ul>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-red-600 mb-2">DO NOT</h4>
                      <ul className="list-disc pl-6 text-[#E43636] space-y-1">
                        <li>DO NOT let your forearms go under and past your shoulders as you move inward.</li>
                        <li>DO NOT lower the hips or arch your back as you slide back.</li>
                        <li>DO NOT cross your ankles and feet</li>
                      </ul>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-[#E43636] mb-2">Modifications</h4>
                      <ul className="list-disc pl-6 text-[#000000] space-y-1">
                        <li>2 gray springs; or 3 gray springs is the max to modify</li>
                        <li>You can perform a "Reverse Side Kneeling Crunch" to take a break</li>
                      </ul>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-[#E43636] mb-2">Intensifications</h4>
                      <ul className="list-disc pl-6 text-[#000000] space-y-1">
                        <li>1 white spring</li>
                      </ul>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-[#E43636] mb-2">Challenges</h4>
                      <ul className="list-disc pl-6 text-[#000000] space-y-1">
                        <li><b>Holds / Pulses:</b></li>
                        <li>Slide halfway out</li>
                        <li>Pulse in 2 inches and out 2 inches (easier)</li>
                        <li>Pulse out 2 inches and in 2 inches (harder)</li>
                      </ul>
                    </div>
                  </div>

                  {/* Back Twisted Saw */}
                  <div className="bg-white rounded-xl p-6 mb-8 border border-[#E43636]">
                    <h3 className="text-2xl font-bold text-[#E43636] mb-4">Back Twisted Saw [right oblique]</h3>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-[#E43636] mb-2">Position & Springs</h4>
                      <ul className="list-disc pl-6 text-[#000000] space-y-1">
                        <li>At the Back, facing front</li>
                        <li><b>Standard:</b> 1 gray spring</li>
                        <li><b>Modification:</b> 1 white spring</li>
                        <li><b>Intensification:</b> 2 gray spring</li>
                      </ul>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-[#E43636] mb-2">Setup</h4>
                      <ul className="list-disc pl-6 text-[#000000] space-y-1">
                        <li>Starting on the back platform facing the front platform</li>
                        <li>Pull the carriage in and tuck your knees against the back platform strap, legs and feet together</li>
                        <li>Forearms over and against the back carriage strap</li>
                        <li>Lower down and forward into a modified plank and swing your feet off the right side of the back platform, stacking your knees (do not cross your ankles and feet)</li>
                        <li>Lightly lift your hips and engage your core</li>
                      </ul>
                      <p className="text-[#000000] mt-4"><b>Note:</b> For those who have tight hips, stacking the knees may be uncomfortable. "Knees side by side with both knees touching the back platform" is the modification</p>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-[#E43636] mb-2">Execution</h4>
                      <ul className="list-disc pl-6 text-[#000000] space-y-1">
                        <li>(Holding a modified plank position with your legs off the right side of the front platform)</li>
                        <li><b>Inhale:</b> As you lengthen your arms to slide the carriage out.</li>
                        <li><b>Exhale:</b> As you bend your elbows to slide the carriage in.</li>
                        <li>You're holding a plank on your knees, and the only thing that moves is your arms lengthening and bending to slide in and out.</li>
                      </ul>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-red-600 mb-2">DO NOT</h4>
                      <ul className="list-disc pl-6 text-[#E43636] space-y-1">
                        <li>DO NOT let your forearms go back and under your shoulders as you move inward.</li>
                        <li>DO NOT lower the hips or arch your back as you slide back.</li>
                        <li>DO NOT cross your ankles and feet</li>
                      </ul>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-[#E43636] mb-2">Modifications</h4>
                      <ul className="list-disc pl-6 text-[#000000] space-y-1">
                        <li>1 white spring</li>
                        <li>You can perform a "Back Side Kneeling Crunch" to take a break</li>
                      </ul>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-[#E43636] mb-2">Intensifications</h4>
                      <ul className="list-disc pl-6 text-[#000000] space-y-1">
                        <li>2 gray springs</li>
                      </ul>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-[#E43636] mb-2">Challenges</h4>
                      <ul className="list-disc pl-6 text-[#000000] space-y-1">
                        <li><b>Holds / Pulses:</b></li>
                        <li>Slide halfway out</li>
                        <li>Pulse in 2 inches and out 2 inches (easier)</li>
                        <li>Pulse out 2 inches and in 2 inches (harder)</li>
                      </ul>
                    </div>
                  </div>

                  {/* Back Reverse Twisted Saw */}
                  <div className="bg-white rounded-xl p-6 mb-8 border border-[#E43636]">
                    <h3 className="text-2xl font-bold text-[#E43636] mb-4">Back Reverse Twisted Saw [right oblique]</h3>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-[#E43636] mb-2">Position & Springs</h4>
                      <ul className="list-disc pl-6 text-[#000000] space-y-1">
                        <li>At the Back, facing front</li>
                        <li><b>Standard:</b> 1 gray spring</li>
                        <li><b>Modification:</b> 1 white spring</li>
                        <li><b>Intensification:</b> 2 gray spring</li>
                      </ul>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-[#E43636] mb-2">Setup</h4>
                      <ul className="list-disc pl-6 text-[#000000] space-y-1">
                        <li>Start on the carriage facing the back platform, and kick to the back platform, grabbing onto the back platform strap.</li>
                        <li>Tuck your knees against the back carriage strap, legs and feet together</li>
                        <li>Forearms over and against the back platform strap</li>
                        <li>Lower down and back into a modified plank and swing your feet off the right side of the carriage, stacking your knees</li>
                        <li>Lightly lift your hips and engage your core</li>
                      </ul>
                      <p className="text-[#000000] mt-4"><b>Note:</b> For those who have tight hips, stacking the knees may be uncomfortable. "Knees side by side with both knees touching the carriage" is the modification</p>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-[#E43636] mb-2">Execution</h4>
                      <ul className="list-disc pl-6 text-[#000000] space-y-1">
                        <li>(Holding a modified plank position with your legs off the right side of the front platform)</li>
                        <li><b>Inhale:</b> As you lengthen your arms to slide the carriage back.</li>
                        <li><b>Exhale:</b> As you bend your elbows to slide the carriage forward.</li>
                        <li>You're holding a plank on your knees, and the only thing that moves is your arms lengthening and bending to slide in and out.</li>
                      </ul>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-red-600 mb-2">DO NOT</h4>
                      <ul className="list-disc pl-6 text-[#E43636] space-y-1">
                        <li>DO NOT let your shoulders go forward past your elbows as you move inward</li>
                        <li>DO NOT lower the hips or arch your back as you slide back.</li>
                        <li>DO NOT cross your ankles and feet</li>
                      </ul>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-[#E43636] mb-2">Modifications</h4>
                      <ul className="list-disc pl-6 text-[#000000] space-y-1">
                        <li>1 white spring; or you can perform a "Back Reverse Side Kneeling Crunch" to take a break</li>
                      </ul>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-[#E43636] mb-2">Intensifications</h4>
                      <ul className="list-disc pl-6 text-[#000000] space-y-1">
                        <li>2 gray springs</li>
                      </ul>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-[#E43636] mb-2">Challenges</h4>
                      <ul className="list-disc pl-6 text-[#000000] space-y-1">
                        <li><b>Holds / Pulses:</b></li>
                        <li>Slide halfway back</li>
                        <li>Pulse in 2 inches and back 2 inches (easier)</li>
                        <li>Pulse back 2 inches and in 2 inches (harder)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'resources' && (
                <div>
                  <h2 className="text-3xl font-bold text-[#E43636] mb-6">Resources</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-[#E43636] hover:bg-[#E43636] hover:text-[#F6EFD2] transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-black">Twisted Saw Guide PDF</p>
                          <p className="text-sm opacity-75 text-black">2.3 MB</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-[#E43636] hover:bg-[#E43636] hover:text-[#F6EFD2] transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-black">Advanced Core Techniques</p>
                          <p className="text-sm opacity-75 text-black">1.7 MB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'comments' && (
                <div>
                  <h2 className="text-3xl font-bold text-[#E43636] mb-6">Q&A Discussion</h2>
                  {/* Add Comment */}
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
                  {/* Comments List */}
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-xl border border-[#E43636]">
                      <p className="text-[#000000]">No comments yet.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
