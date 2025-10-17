"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";
import { useUserProgress } from '@/hooks/useUserProgress';

export default function Lesson12() {
  const [activeTab, setActiveTab] = useState<'description' | 'resources' | 'comments'>('description');
  const [isClient, setIsClient] = useState(false);
  const { progress } = useUserProgress('level1-megacore');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const lessonGoals = [
    'Learn the benefits of moving the body slow on your Xformer',
    'Understand how slow movements create high intensity low impact workouts',
    'Master the 4-count progression system for controlled movements',
    'Recognize signs of high intensity exercise and heart rate monitoring'
  ];

  const resources = [
    { name: 'Machine Setup Guide PDF', type: 'pdf', size: '2.1 MB' },
    { name: 'Safety Protocol Manual', type: 'pdf', size: '1.6 MB' },
    { name: 'Positioning Guidelines', type: 'pdf', size: '1.3 MB' },
    { name: 'Setup Checklist', type: 'pdf', size: '0.8 MB' }
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
              <p className="text-[#E2DDB4]">Chapter 1</p>
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
            currentLessonPath="/courses/level1-megacore/content/chapter-1/1-2"
            nextLessonPath="/courses/level1-megacore/content/chapter-2/2-1"
          />

          {/* Main Content Area */}
          <div className="flex-1">
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
                <div>
                  <h2 className="text-3xl font-bold text-[#E43636] mb-6">Move Slow: High intensity and Low Impact</h2>
                  
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

                  {/* Content */}
                  <div className="space-y-8">
                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Move Slow...</h3>
                      <p className="text-[#000000] mb-4">
                        We want to move through a controlled pace over an extended period, emphasizing slow and steady movements to engage muscles effectively to build stronger muscles and increase endurance.
                      </p>
                      <p className="text-[#000000] mb-4">
                        By going slow against or with the Xformer's spring tension, you will increase muscle time under tension, offering cardiovascular benefits by elevating the heart rate to simulate a high intensity workout.
                      </p>
                      <p className="text-[#000000] mb-4">
                        Start with a 4-count, and as you get stronger, increase in increments of 2 (6, then 8, then 10, then 12, and so on).
                      </p>
                    </section>

                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Benefits</h3>
                      <ul className="list-disc pl-6 text-[#000000] space-y-2">
                        <li>Reinforces good form and engages the muscles more by eliminating momentum</li>
                        <li>Reduces the risk of injury because it doesn't require jumping or explosive movement</li>
                        <li>Increases strength, endurance, bone density, flexibility, and toning of muscles</li>
                        <li>Activates slow-twitch fibers, challenging muscles with gradual energy release to enhance endurance, allowing sustained muscle engagement without depletion (in comparison to fast-twitch fibers which utilize a lot of energy quickly leaving you tired)</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">High Intensity</h3>
                      <p className="text-[#000000] mb-4">
                        High intensity exercise can elevate the heart rate between an average of 120 - 170 beats per minute.
                      </p>
                      
                      <div className="bg-white rounded-xl p-6 mb-6 border border-[#E43636]">
                        <h4 className="text-lg font-bold text-[#E43636] mb-4">Signs that your workout is high intensity:</h4>
                        <ul className="list-disc pl-6 text-[#000000] space-y-2">
                          <li>Deep and fast breathing</li>
                          <li>Sweating after a few minutes</li>
                          <li>Needing to take a breath after only saying a few words</li>
                          <li>When your heart rate is 70% - 85% of your maximum heart rate</li>
                        </ul>
                      </div>

                      <div className="bg-white rounded-xl p-6 mb-6 border border-[#E43636]">
                        <h4 className="text-lg font-bold text-[#E43636] mb-4">Maximum heart rate formula:</h4>
                        <p className="text-[#000000] mb-2">220 (max heart rate) minus your age</p>
                        <p className="text-[#000000] mb-2"><strong>Example:</strong> 220 - 37 years old = 183 maximum heart rate</p>
                        <p className="text-[#000000]">(70% - 85% of a maximum heart rate of 183 = 128bpm - 156bpm)</p>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Low Impact</h3>
                      <p className="text-[#000000] mb-4">
                        Low impact exercises involve less pressure on the joints.
                      </p>
                      
                      <div className="bg-white rounded-xl p-6 mb-6 border border-[#E43636]">
                        <h4 className="text-lg font-bold text-[#E43636] mb-4">Benefits of low impact exercises:</h4>
                        <ul className="list-disc pl-6 text-[#000000] space-y-2">
                          <li>Can reduce the risk of injury</li>
                          <li>Easy on the joints</li>
                          <li>Muscles are more engaged and active by eliminating momentum</li>
                          <li>Increases strength, endurance, bone density, flexibility, and stability</li>
                          <li>Challenges the muscles in different ways</li>
                        </ul>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Overall Benefits of this type of exercise on the Xformer</h3>
                      <ul className="list-disc pl-6 text-[#000000] space-y-2">
                        <li>Strengthens the skeletal system and brain through core focused exercises</li>
                        <li>Stronger and toned muscles</li>
                        <li>Increases strength, endurance, bone density, flexibility, and stability</li>
                        <li>Challenges the muscles in different ways</li>
                      </ul>
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
                    lessonId="chapter-1/1-2" 
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