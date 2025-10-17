'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";
import { useUserProgress } from '@/hooks/useUserProgress';

export default function Lesson1210() {
  const [activeTab, setActiveTab] = useState('description');
  const { progress } = useUserProgress('level1-megacore');
  const [completedLessons, setCompletedLessons] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const lessonGoals = [
    'Complete mastery of all advanced techniques',
    'Achieve professional-level expertise in equipment handling',
    'Master comprehensive spring configuration mastery',
    'Develop complete understanding of advanced methodologies'
  ];

  const resources = [
    { name: 'Complete Advanced Techniques Mastery Guide', type: 'pdf', size: '4.5 MB' },
    { name: 'Professional Equipment Handling Certification', type: 'pdf', size: '3.2 MB' },
    { name: 'Comprehensive Spring Configuration Mastery', type: 'pdf', size: '2.8 MB' },
    { name: 'Advanced Methodologies Complete Guide', type: 'pdf', size: '3.7 MB' }
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
              <p className="text-[#E2DDB4]">Chapter 12: Advanced Techniques</p>
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
            currentLessonPath="/courses/level1-megacore/content/chapter-12/12-10"
            nextLessonPath="/courses/level1-megacore"
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
                  src="https://www.youtube.com/embed/H8JYCi9EOo4"
                  title="Complete Advanced Techniques Mastery Tutorial"
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
                  <h2 className="text-3xl font-bold text-[#E43636] mb-6">Complete Advanced Techniques Mastery</h2>
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
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Complete Advanced Techniques Mastery</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-xl border border-[#E43636]">
                          <p className="text-sm text-[#E43636] font-semibold">All Advanced Techniques</p>
                          <p className="text-lg font-bold text-[#000000]">Complete Mastery</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-[#E43636]">
                          <p className="text-sm text-[#E43636] font-semibold">Equipment Handling</p>
                          <p className="text-lg font-bold text-[#000000]">Professional Level</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-[#E43636]">
                          <p className="text-sm text-[#E43636] font-semibold">Spring Configuration</p>
                          <p className="text-lg font-bold text-[#000000]">Complete Mastery</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-[#E43636]">
                          <p className="text-sm text-[#E43636] font-semibold">Methodologies</p>
                          <p className="text-lg font-bold text-[#000000]">Advanced Complete</p>
                        </div>
                      </div>
                    </section>
                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Professional Mastery Techniques</h3>
                      <ul className="list-disc pl-6 text-[#000000] space-y-2">
                        <li>Master all advanced techniques with complete proficiency</li>
                        <li>Achieve professional-level expertise in equipment handling</li>
                        <li>Develop comprehensive spring configuration mastery</li>
                        <li>Implement advanced methodologies with complete understanding</li>
                      </ul>
                    </section>
                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Complete Equipment Mastery</h3>
                      <ul className="list-disc pl-6 text-[#000000] space-y-2">
                        <li>Master all equipment types and their advanced applications</li>
                        <li>Understand complete equipment dynamics and professional handling</li>
                        <li>Apply advanced equipment techniques with precision</li>
                        <li>Implement professional safety protocols for all equipment</li>
                      </ul>
                    </section>
                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Mastery Guidelines</h3>
                      <ul className="list-disc pl-6 text-[#E43636] space-y-2">
                        <li>Always verify complete advanced technique mastery before application</li>
                        <li>Master all equipment types and their professional applications</li>
                        <li>Apply advanced methodologies with complete understanding</li>
                        <li>Ensure professional-level equipment handling for all variations</li>
                      </ul>
                    </section>
                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Chapter 12 Complete Mastery Achievement</h3>
                      <div className="bg-[#E43636] p-6 rounded-xl text-center">
                        <h4 className="text-lg font-semibold text-[#F6EFD2] mb-2">🏆 Chapter 12 Mastery Complete!</h4>
                        <p className="text-[#F6EFD2]">
                          Congratulations! You have achieved complete mastery of all advanced techniques in Chapter 12!
                        </p>
                      </div>
                    </section>
                  </div>
                </div>
              )}
              {activeTab === 'resources' && (
                <div>
                  <h2 className="text-3xl font-bold text-[#E43636] mb-6">Mastery Resources</h2>
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
                    lessonId="chapter-12/12-10" 
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
