'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";
import { useUserProgress } from '@/hooks/useUserProgress';

export default function Lesson719() {
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
            currentLessonPath="/courses/level1-megacore/content/chapter-7/7-19"
            nextLessonPath="/courses/level1-megacore/content/chapter-7/7-20"
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
                  src="https://www.youtube.com/embed/4YL5KwmJZu4"
                  title="Bird Dog and Reverse Bird Dog Tutorial"
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
                  <h2 className="text-3xl font-bold text-[#E43636] mb-6">Bird Dog and Reverse Bird Dog</h2>
                  
                  {/* Bird Dog Exercise */}
                  <div className="bg-white rounded-xl p-6 mb-8 border border-[#E43636]">
                    <h3 className="text-2xl font-bold text-[#E43636] mb-4">Bird Dog Exercise</h3>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-[#E43636] mb-2">Spring Configuration</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-xl border border-[#E43636]">
                          <p className="text-sm text-[#E43636] font-semibold">Standard</p>
                          <p className="text-lg font-bold text-[#000000]">1 white spring</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-[#E43636]">
                          <p className="text-sm text-[#E43636] font-semibold">Modification</p>
                          <p className="text-lg font-bold text-[#000000]">1 gray spring</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-[#E43636]">
                          <p className="text-sm text-[#E43636] font-semibold">Intensification</p>
                          <p className="text-lg font-bold text-[#000000]">2 white springs</p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-[#E43636] mb-2">Setup</h4>
                      <ul className="list-disc pl-6 text-[#000000] space-y-1">
                        <li>Start by standing on the left side of the Xformer facing the front platform</li>
                        <li>Set your forearms down to the first white line of the moving carriage and move your feet on the floor far back to hold a forearm plank</li>
                        <li>Lift up your right leg and place it over your left leg</li>
                      </ul>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-[#E43636] mb-2">Execution</h4>
                      <ul className="list-disc pl-6 text-[#000000] space-y-1">
                        <li><b>Exhale:</b> As you lift from the left oblique and send your hips back and up to move the carriage</li>
                        <li><b>Inhale:</b> As you lower down and forward to the starting position</li>
                      </ul>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-red-600 mb-2">DO NOT</h4>
                      <ul className="list-disc pl-6 text-[#E43636] space-y-1">
                        <li>DO NOT Swing up and back with your forearms</li>
                        <li>DO NOT let your hips sag or lift too high</li>
                        <li>DO NOT rush the movement - maintain control</li>
                      </ul>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-[#E43636] mb-2">Modifications</h4>
                      <ul className="list-disc pl-6 text-[#000000] space-y-1">
                        <li>Lessen the range of motion</li>
                        <li>Use 1 gray spring instead of white</li>
                        <li>Move closer to the front platform</li>
                      </ul>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-[#E43636] mb-2">Challenges</h4>
                      <ul className="list-disc pl-6 text-[#000000] space-y-1">
                        <li>Go slower and more controlled</li>
                        <li>Move your foot position on the floor further back towards the back platform</li>
                        <li>Add holds and pulses at the peak of the movement</li>
                      </ul>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-[#E43636] mb-2">Variations</h4>
                      <ul className="list-disc pl-6 text-[#000000] space-y-1">
                        <li>Holds / Pulses at the peak position</li>
                        <li>Reverse Bird Dog variation</li>
                        <li>Single arm variations</li>
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
                          <p className="font-semibold text-black">Bird Dog Exercise Guide PDF</p>
                          <p className="text-sm opacity-75 text-black">2.1 MB</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-[#E43636] hover:bg-[#E43636] hover:text-[#F6EFD2] transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-black">Core Stability Training</p>
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
