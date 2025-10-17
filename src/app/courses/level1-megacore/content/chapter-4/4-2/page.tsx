'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";
import { useUserProgress } from '@/hooks/useUserProgress';

export default function Lesson42() {
  const [activeTab, setActiveTab] = useState('description');
  const { progress } = useUserProgress('level1-megacore');
  const [completedLessons, setCompletedLessons] = useState([1, 2]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const chapterLessons = [
    { id: 1, title: 'Platform Lunge', duration: '12 min', completed: true },
    { id: 2, title: 'Chapter 4 - Lesson 2', duration: '10 min', completed: true },
    { id: 3, title: 'Single Leg Squat', duration: '14 min', completed: false },
    { id: 4, title: 'Chapter 4 - Lesson 4', duration: '10 min', completed: false },
    { id: 5, title: 'Carriage Lunge', duration: '13 min', completed: false },
    { id: 6, title: 'Floor Lunge', duration: '12 min', completed: false },
    { id: 7, title: 'Side Lunge', duration: '15 min', completed: false },
    { id: 8, title: 'Chapter 4 - Lesson 8', duration: '10 min', completed: false },
    { id: 9, title: 'Light Squat', duration: '12 min', completed: false },
    { id: 10, title: 'Curtsy Lunge', duration: '13 min', completed: false },
    { id: 11, title: 'Curtsy Lunge', duration: '13 min', completed: false },
    { id: 12, title: 'Standing Inner Thighs', duration: '12 min', completed: false },
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
            currentLessonPath="/courses/level1-megacore/content/chapter-4/4-2"
            nextLessonPath="/courses/level1-megacore/content/chapter-4/4-3"
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
                  src="https://www.youtube.com/embed/4R4DPHpXUGw"
                  title="Chapter 4 - Lesson 2 Tutorial"
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
                  <h2 className="text-3xl font-bold text-[#E43636] mb-6">Chapter 4 - Lesson 2</h2>
                  <div className="bg-white rounded-xl p-6 mb-8 border border-[#E43636]">
                    <p className="text-[#000000]">Watch the video above for detailed instructions and demonstrations of the exercise techniques covered in this lesson.</p>
                  </div>
                </div>
              )}
              {activeTab === 'resources' && (
                <div>
                  <h2 className="text-3xl font-bold text-[#E43636] mb-6">Resources</h2>
                  <div className="bg-white p-4 rounded-xl border border-[#E43636]">No resources for this lesson.</div>
                </div>
              )}
              {activeTab === 'comments' && (
                <div>
                  <h2 className="text-3xl font-bold text-[#E43636] mb-6">Q&A Discussion</h2>
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
