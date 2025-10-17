"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";
import { useUserProgress } from "@/hooks/useUserProgress";

export default function Chapter103() {
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
                <p className="text-[#E2DDB4]">Chapter 10: IT'S PRACTICE TIME!!</p>
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
              <p className="text-[#E2DDB4]">Chapter 10: IT'S PRACTICE TIME!!</p>
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
            currentLessonPath="/courses/level1-reformers/content/chapter-10/10-3"
            nextLessonPath="/courses/level1-reformers/content/chapter-10/10-4"
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
              <h1 className="text-4xl font-bold text-[#E43636] mb-2">Coaching & Cueing: Commanding the Room</h1>
              <p className="text-lg text-gray-600">Chapter 10 - Lesson 3</p>
            </motion.div>

            {/* Video Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden shadow-lg">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/H-XhIEjCoEk"
                  title="Coaching and Cueing Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
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
                    <h2 className="text-2xl font-bold text-[#E43636] mb-4">Coaching & Cueing: Commanding the Room</h2>

                    <section className="space-y-4">
                      <h3 className="text-xl font-semibold text-[#1e40af]">Cue Specifically and Simply</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Make it easier for people to understand by being specific and simple.</li>
                      </ul>
                    </section>

                    <section className="space-y-4 mt-6">
                      <h3 className="text-xl font-semibold text-[#1e40af]">Command the Room</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>"Listen carefully"</li>
                        <li>"I want"</li>
                        <li>"Remember"</li>
                        <li>"Let's go down a little lower"</li>
                      </ul>
                    </section>

                    <section className="space-y-4 mt-6">
                      <h3 className="text-xl font-semibold text-[#1e40af]">Cues for Challenges</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>"In 10 seconds we're going to" [hold, pulse, etc]</li>
                        <li>"You're going to meet me [low, out halfway, out 95%, etc] to hold"</li>
                        <li>Cue to pulse, push, etc</li>
                        <li>Count them down towards the end and cue them back to full range</li>
                      </ul>
                    </section>

                    <section className="space-y-4 mt-6">
                      <h3 className="text-xl font-semibold text-[#1e40af]">Cues Transitioning into the Next Exercise</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>In 10 seconds the next exercise is a [name of exercise]</li>
                        <li>Explain spring changes if any OR the springs to modify</li>
                        <li>Cue where hands, elbows, knees, toes, etc should be</li>
                        <li>Count them down to end of the current exercise</li>
                        <li>Repeat #3 again, set their form, count them down to start as a team (start the timer when they start moving)</li>
                      </ul>
                    </section>

                    <section className="space-y-4 mt-6">
                      <h3 className="text-xl font-semibold text-[#1e40af]">When to Speak with Emphasis and a Little Louder</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Words of encouragement</li>
                        <li>"You can do this!"</li>
                        <li>"You don't know until you try"</li>
                        <li>"Even if it's 1 time"</li>
                        <li>"Let's go down a little lower even if it's 1 cm"</li>
                        <li>"Everything you do gets you 1 step closer to getting stronger"</li>
                        <li>"You got this!"</li>
                        <li>"Tell yourselFF…. I can do ONE MORE before I take that break"</li>
                        <li>"Tell yourselFF…. I can do challenging things"</li>
                        <li>"Tell yourselFF…. I WILL make it through this pulse"</li>
                      </ul>
                    </section>

                    <section className="space-y-4 mt-6">
                      <h3 className="text-xl font-semibold text-[#1e40af]">When to be Soft in Your Voice</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>When cueing spring changes</li>
                        <li>Cueing to position hands, forearms, knees, toes, butt, back, etc</li>
                        <li>Definitely when helping clients or form correction</li>
                      </ul>
                    </section>

                    <section className="space-y-4 mt-6">
                      <h3 className="text-xl font-semibold text-[#1e40af]">When to Start Soft and End Loud</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Towards the end of a variation such as a hold or pulse: "fiveee, fourrR, thrEE, tWO!!" Then, "up 1, 2, 3, 4"</li>
                      </ul>
                    </section>
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
                      lessonId="chapter-10/10-3" 
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