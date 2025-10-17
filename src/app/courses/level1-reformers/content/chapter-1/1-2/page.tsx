"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";
import { useUserProgress } from "@/hooks/useUserProgress";

export default function Chapter12() {
  const { progress } = useUserProgress('level1-reformers');
  const [activeTab, setActiveTab] = useState<'description' | 'resources' | 'comments'>('description');
  const [isClient, setIsClient] = useState(false);


  const resources = [
    // No PDF resources for this lesson
  ];

  // Comments are now handled by the LessonComments component

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-[#E43636] text-[#F6EFD2] py-6 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold">Level 1 All Reformers</h1>
                <p className="text-[#E2DDB4]">Chapter 1: Introduction</p>
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
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E43636]"></div>
        </div>
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
              <h1 className="text-2xl font-bold">Level 1 All Reformers</h1>
              <p className="text-[#E2DDB4]">Chapter 1: Introduction</p>
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

      <div className="flex">
        {/* Course Navigation */}
        <div className="pl-4 pt-4">
          <CourseNavigation
            currentLessonPath="/courses/level1-reformers/content/chapter-1/1-2"
            nextLessonPath="/courses/level1-reformers/content/chapter-2/2-1"
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 lg:pl-20 lg:pt-16">
          <div className="max-w-7xl mx-auto">
            {/* Lesson Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold text-[#E43636] mb-2">Move Slow: High Intensity and Low Impact</h1>
              <p className="text-lg text-gray-600">Chapter 1 - Lesson 2</p>
            </motion.div>

            {/* Content Card with Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#E43636] space-y-8 mt-8"
            >
              {/* Tabs */}
              <div className="bg-white rounded-2xl p-1 shadow-lg">
                <div className="flex space-x-1">
                  {[
                    { id: 'description', label: 'Description' },
                    { id: 'resources', label: 'Resources' },
                    { id: 'comments', label: 'Q&A' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                        activeTab === (tab.id as typeof activeTab)
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
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="p-0"
              >
                {activeTab === 'description' && (
                  <div>
                    <h2 className="text-2xl font-bold text-[#E43636] mb-4">Move Slow: High Intensity and Low Impact</h2>
                    
                    <div className="space-y-6">
                      <div className="bg-white rounded-xl p-6 border border-[#E43636]">
                        <p className="text-[#000000] text-lg font-semibold mb-4">
                          IN THIS LESSON YOU WILL LEARN THE BENEFITS OF MOVING THE BODY SLOW ON YOUR XFORMER AND WHY THIS CREATES A HIGH INTENSITY LOW IMPACT WORKOUT
                        </p>
                      </div>

                      <section>
                        <h3 className="text-2xl font-bold text-[#E43636] mb-4">Move Slow…</h3>
                        <div className="bg-white rounded-xl p-6 border border-[#E43636]">
                          <p className="text-[#000000] mb-4">
                            We want to move through a controlled pace over an extended period, emphasizing slow and steady movements to engage muscles effectively to build stronger muscles and increase endurance
                          </p>
                          <p className="text-[#000000] mb-4">
                            By going slow against or with the Xformer's spring tension, you will increase muscle time under tension, offering cardiovascular benefits by elevating the heart rate to simulate a high intensity workout
                          </p>
                          <p className="text-[#000000]">
                            Start with a 4-count, and as you get stronger, increase in increments of 2 (6, then 8, then 10, then 12, and so on)
                          </p>
                        </div>
                      </section>

                      <section>
                        <h3 className="text-2xl font-bold text-[#E43636] mb-4">Benefits</h3>
                        <div className="bg-white rounded-xl p-6 border border-[#E43636]">
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>reinforces good form and engages the muscles more by eliminating momentum</li>
                            <li>reduces the risk of injury because it doesn't require jumping or explosive movement</li>
                            <li>increases strength, endurance, bone density, flexibility, and toning of muscles</li>
                            <li>activates slow-twitch fibers, challenging muscles with gradual energy release to enhance endurance, allowing sustained muscle engagement without depletion (in comparison to fast-twitch fibers which utilize a lot of energy quickly leaving you tired)</li>
                          </ul>
                        </div>
                      </section>

                      <section>
                        <h3 className="text-2xl font-bold text-[#E43636] mb-4">High Intensity</h3>
                        <div className="bg-white rounded-xl p-6 border border-[#E43636]">
                          <p className="text-[#000000] mb-4">
                            High intensity exercise can elevate the heart rate between an average of 120 - 170 beats per minute
                          </p>
                          <h4 className="font-semibold text-[#E43636] mb-3">Signs that your workout is high intensity:</h4>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2 mb-4">
                            <li>deep and fast breathing</li>
                            <li>sweating after a few minutes</li>
                            <li>needing to take a breath after only saying a few words</li>
                            <li>when your heart rate is 70% - 85% of your maximum heart rate</li>
                          </ul>
                          <h4 className="font-semibold text-[#E43636] mb-3">Maximum heart rate formula:</h4>
                          <p className="text-[#000000] mb-2">220 (max heart rate) minus your age</p>
                          <p className="text-[#000000] mb-2">example: 220 - 37 years old = 183 maximum heart rate</p>
                          <p className="text-[#000000]">(70% - 85% of a maximum heart rate of 183 = 128bpm - 156bpm)</p>
                        </div>
                      </section>

                      <section>
                        <h3 className="text-2xl font-bold text-[#E43636] mb-4">Low Impact</h3>
                        <div className="bg-white rounded-xl p-6 border border-[#E43636]">
                          <p className="text-[#000000] mb-4">
                            Low impact exercises involve less pressure on the joints
                          </p>
                          <h4 className="font-semibold text-[#E43636] mb-3">Benefits of low impact exercises:</h4>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>can reduce the risk of injury</li>
                            <li>easy on the joints</li>
                            <li>muscles are more engaged and active by eliminating momentum</li>
                            <li>increases strength, endurance, bone density, flexibility, and stability</li>
                            <li>challenges the muscles in different ways</li>
                          </ul>
                        </div>
                      </section>

                      <section>
                        <h3 className="text-2xl font-bold text-[#E43636] mb-4">Overall benefits of this type of exercise on the Xformer</h3>
                        <div className="bg-white rounded-xl p-6 border border-[#E43636]">
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>strengthens the skeletal system and brain through core focused exercises</li>
                            <li>stronger and toned muscles</li>
                          </ul>
                        </div>
                      </section>

                      <section>
                        <h3 className="text-2xl font-bold text-[#E43636] mb-4">Overall Benefits</h3>
                        <div className="bg-white rounded-xl p-6 border border-[#E43636]">
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>increases strength, endurance, bone density, flexibility, and stability</li>
                            <li>challenges the muscles in different ways</li>
                            <li>strengthens the skeletal system and brain through core focused exercises</li>
                            <li>stronger and toned muscles</li>
                          </ul>
                        </div>
                      </section>
                    </div>
                  </div>
                )}
                {activeTab === 'resources' && (
                  <div>
                    <h3 className="text-2xl font-bold text-[#E43636] mb-4">Resources</h3>
                    <p className="text-gray-700">No PDF resources for this lesson.</p>
                  </div>
                )}
                {activeTab === 'comments' && (
                  <div>
                    <LessonComments 
                      lessonId="chapter-1/1-2" 
                      courseId="level1-reformers" 
                    />
                  </div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Add spacing for navigation */}
      <div className="h-24"></div>
    </div>
  );
}