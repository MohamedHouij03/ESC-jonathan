"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";

export default function Lesson103() {
  const [isClient, setIsClient] = useState(false);
  const { progress } = useUserProgress('level1-megacore');
  const [activeTab, setActiveTab] = useState<"description" | "resources" | "comments">("description");

  // Tab content data
  const resources = [
    { name: "Cues and Communication Guide (PDF)", size: "2.0 MB" },
    { name: "Voice Modulation Techniques (PDF)", size: "1.7 MB" },
    { name: "Instructor Communication Manual (PDF)", size: "2.1 MB" },
  ];

  // Comments are now handled by the LessonComments component

  // Prevent hydration errors
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="bg-white shadow-lg border-b-2 border-[#E43636]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-[#E43636]">Level 1 Megacore</h1>
                <p className="text-gray-600">Chapter 10 - Lesson 3</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 mb-1">Progress</div>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-[#E43636] h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">{progress}% Complete</div>
              </div>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b-2 border-[#E43636]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#E43636]">Level 1 Megacore</h1>
              <p className="text-gray-600">Chapter 10 - Lesson 3</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">Progress</div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div className="bg-[#E43636] h-2 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">{progress}% Complete</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Course Navigation */}
        <div className="pl-4 pt-4">
          <CourseNavigation 
            currentLessonPath="/courses/level1-megacore/content/chapter-10/10-3"
            nextLessonPath="/courses/level1-megacore/content/chapter-10/10-4"
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 lg:pl-20 lg:pt-16">
          <div className="max-w-7xl mx-auto">
            {/* Lesson Title */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-[#E43636] mb-4">Cues and Communication</h1>
              <p className="text-lg text-gray-700 font-medium">
                Instructor Training: Communication Techniques
              </p>
            </div>

            {/* Video Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#E43636] mb-8"
            >
              <h2 className="text-2xl font-bold text-[#E43636] mb-6">Video Tutorial</h2>
              <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden shadow-lg">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/H-XhIEjCoEk"
                  title="Cues and Communication Tutorial"
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
              className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#E43636] space-y-8"
            >
              {/* Tabs */}
              <div className="bg-white rounded-2xl p-1 shadow-lg">
                <div className="flex space-x-1">
                  {[
                    { id: "description", label: "Description" },
                    { id: "resources", label: "Resources" },
                    { id: "comments", label: "Q&A" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                        activeTab === (tab.id as any)
                          ? "bg-[#E43636] text-[#F6EFD2] shadow-lg"
                          : "text-[#E43636] hover:bg-[#F6EFD2]"
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
                {/* Description */}
                {activeTab === "description" && (
                  <div>
                    <h2 className="text-2xl font-bold text-[#E43636] mb-4">Cue specifically and simply to make it easier for people to understand</h2>
                    
                    <div className="space-y-6 mb-8">
                      <div>
                        <h3 className="font-semibold text-[#E43636] text-lg mb-3">Command the Room:</h3>
                        <ul className="list-disc pl-6 text-[#000000] space-y-1">
                          <li>"Listen carefully"</li>
                          <li>"I want"</li>
                          <li>"Remember"</li>
                          <li>"Let's go down a little lower"</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-[#E43636] text-lg mb-3">Cues for Challenges</h3>
                        <ul className="list-disc pl-6 text-[#000000] space-y-1">
                          <li>"In 10 seconds we're going to" [hold, pulse, etc]</li>
                          <li>"You're going to meet me [low, out halfway, out 95%, etc] to hold"</li>
                          <li>Cue to pulse, push, etc</li>
                          <li>Count them down towards the end and cue them back to full range</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-[#E43636] text-lg mb-3">Cues Transitioning into the Next Exercise</h3>
                        <ol className="list-decimal pl-6 text-[#000000] space-y-1">
                          <li>In 10 seconds the next exercise is a [name of exercise]</li>
                          <li>Explain spring changes if any OR the springs to modify</li>
                          <li>Cue where hands, elbows, knees, toes, etc should be</li>
                          <li>Count them down to end of the current exercise</li>
                          <li>Repeat #3 again, set their form, count them down to start as a team (start the timer when they start moving)</li>
                        </ol>
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold text-[#E43636] mb-4">When to Speak with Emphasis and a little louder</h2>
                    
                    <div className="mb-8">
                      <h3 className="font-semibold text-[#E43636] text-lg mb-3">Words of encouragement</h3>
                      <ul className="list-disc pl-6 text-[#000000] space-y-1">
                        <li>"You can do this!"</li>
                        <li>"You don't know until you try"</li>
                        <li>"Even if it's 1 time"</li>
                        <li>"Let's go down a little lower even if it's 1 cm"</li>
                        <li>"Everything you do gets you 1 step closer to getting stronger"</li>
                        <li>"You got this!"</li>
                        <li>"Tell yourselFF…. I can do ONE MORE before i take that break"</li>
                        <li>"Tell yourselFF…. I can do challenging things"</li>
                        <li>"Tell yourselFF…. I WILL make it through this pulse"</li>
                      </ul>
                    </div>

                    <h2 className="text-2xl font-bold text-[#E43636] mb-4">When to be Soft in your Voice</h2>
                    <ul className="list-disc pl-6 text-[#000000] mb-8 space-y-1">
                      <li>When cueing spring changes</li>
                      <li>Cueing to position hands, forearms, knees, toes, butt, back, etc</li>
                      <li>Definitely when helping clients or form correction</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-[#E43636] mb-4">When to Start Soft and End Loud</h2>
                    <p className="text-[#000000]">
                      Towards the end of a variation such as a hold or pulse: "fiveee, fourrR, thrEE, tWO!!" Then, "up 1, 2, 3, 4"
                    </p>
                  </div>
                )}

                {/* Resources */}
                {activeTab === "resources" && (
                  <div>
                    <h3 className="text-2xl font-bold text-[#E43636] mb-4">Resources</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {resources.map((r, i) => (
                        <div
                          key={i}
                          className="bg-white p-4 rounded-xl border border-[#E43636] text-black shadow-sm"
                        >
                          <p className="font-semibold">{r.name}</p>
                          <p className="text-sm opacity-75">{r.size}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Comments */}
                {activeTab === "comments" && (
                  <LessonComments 
                    lessonId="chapter-10/10-3" 
                    courseId="level1-megacore" 
                  />
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
