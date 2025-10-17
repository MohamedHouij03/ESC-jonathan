'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";
import { useUserProgress } from '@/hooks/useUserProgress';

export default function Lesson712() {
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
            currentLessonPath="/courses/level1-megacore/content/chapter-7/7-12"
            nextLessonPath="/courses/level1-megacore/content/chapter-7/7-13"
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
                  src="https://www.youtube.com/embed/n2cGZlLb_A0"
                  title="Twisted Plank to Pike Exercises Tutorial"
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
                  <h2 className="text-3xl font-bold text-[#E43636] mb-6">Twisted Plank to Pike Exercises</h2>
                  
                  {/* Twisted Plank to Pike */}
                  <div className="bg-white rounded-xl p-6 mb-8 border border-[#E43636]">
                    <h3 className="text-2xl font-bold text-[#E43636] mb-4">Twisted Plank to Pike [right oblique]</h3>
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
                        <li>Hands down on the front platform and toes on the front edge of the carriage</li>
                        <li>Push the carriage back and get into a plank or push-up position</li>
                        <li>Lift up your right foot and hook it over your left foot</li>
                        <li>Turn your toes to the left and lift both your heels</li>
                        <li>Lift the right shoulder to square it with the left shoulder</li>
                        <li>Slight bend in your elbows and engage your core</li>
                      </ul>
                      <p className="text-[#000000] mt-4"><b>Note 1:</b> Whichever oblique faces the floor is the target oblique. If it's the right oblique that's the target, that means the right leg crosses over and the right shoulder needs to be lifted.</p>
                      <p className="text-[#000000]"><b>Note 2:</b> For those who have tight hips, crossing the legs may be uncomfortable. "legs and feet side by side with toes turned to the left" is the modification</p>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-[#E43636] mb-2">Execution</h4>
                      <ul className="list-disc pl-6 text-[#000000] space-y-1">
                        <li><b>Exhale:</b> As you lift the right oblique up, looking at your toes as you rise.</li>
                        <li><b>Inhale:</b> As you slowly lower down to the starting position.</li>
                      </ul>
                      <p className="text-[#000000] mt-4"><b>Note:</b> You want to look at your toes as you go up and look down at your platform as you go down to keep your neck in line with your spine.</p>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-red-600 mb-2">DO NOT</h4>
                      <ul className="list-disc pl-6 text-[#E43636] space-y-1">
                        <li>DO NOT swing in with your toes as you pike.</li>
                        <li>DO NOT let your shoulders go forward past the wrists.</li>
                        <li>DO NOT lock out your elbows.</li>
                      </ul>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-[#E43636] mb-2">Modifications</h4>
                      <ul className="list-disc pl-6 text-[#000000] space-y-1">
                        <li>2 gray springs; or 3 gray springs is the max to modify</li>
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
                        <li><b>Holds and pulses:</b></li>
                        <li>Lift halfway up</li>
                        <li>Pulse down 2 inches and up 2 inches (easier)</li>
                        <li>Pulse up 2 inches and down 2 inches (harder)</li>
                      </ul>
                    </div>
                  </div>

                  {/* Reverse Twisted Plank to Pike */}
                  <div className="bg-white rounded-xl p-6 mb-8 border border-[#E43636]">
                    <h3 className="text-2xl font-bold text-[#E43636] mb-4">Reverse Twisted Plank to Pike [right oblique]</h3>
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
                        <li>Hands down on the carriage and toes on the front platform</li>
                        <li>Push the carriage forward getting into a plank or push-up position</li>
                        <li>Lift up your right foot and hook it over your left foot</li>
                        <li>Turn your toes to the left and lift both your heels</li>
                        <li>Lift the right shoulder to square it with the left shoulder</li>
                        <li>Slight bend in your elbows and engage your core</li>
                      </ul>
                      <p className="text-[#000000] mt-4"><b>Note 1:</b> Whichever oblique faces the floor is the target oblique. If it's the right oblique that's the target, that means the right leg crosses over and the right shoulder needs to be lifted.</p>
                      <p className="text-[#000000]"><b>Note 2:</b> For those who have tight hips, crossing the legs may be uncomfortable. "legs and feet side by side with toes turned to the left" is the modification</p>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-[#E43636] mb-2">Execution</h4>
                      <ul className="list-disc pl-6 text-[#000000] space-y-1">
                        <li><b>Exhale:</b> As you lift the right oblique up, looking at your toes as you rise.</li>
                        <li><b>Inhale:</b> As you slowly lower down to the starting position.</li>
                      </ul>
                      <p className="text-[#000000] mt-4"><b>Note:</b> You want to look at your toes as you go up and look down at your platform as you go down to keep your neck in line with your spine.</p>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-red-600 mb-2">DO NOT</h4>
                      <ul className="list-disc pl-6 text-[#E43636] space-y-1">
                        <li>DO NOT swing in with your hands as you pike.</li>
                        <li>DO NOT let your wrists go in and under past the shoulders</li>
                        <li>DO NOT lock out your elbows.</li>
                      </ul>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-[#E43636] mb-2">Modifications</h4>
                      <ul className="list-disc pl-6 text-[#000000] space-y-1">
                        <li>2 gray springs; or 3 gray springs is the max to modify</li>
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
                        <li><b>Holds and pulses:</b></li>
                        <li>Lift halfway up</li>
                        <li>Pulse down 2 inches and up 2 inches (easier)</li>
                        <li>Pulse up 2 inches and down 2 inches (harder)</li>
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
                          <p className="font-semibold text-black">Twisted Plank to Pike Guide PDF</p>
                          <p className="text-sm opacity-75 text-black">2.4 MB</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-[#E43636] hover:bg-[#E43636] hover:text-[#F6EFD2] transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-black">Advanced Core Techniques</p>
                          <p className="text-sm opacity-75 text-black">1.9 MB</p>
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
