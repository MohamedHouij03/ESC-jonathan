"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";
import { useUserProgress } from "@/hooks/useUserProgress";

export default function Lesson101() {
  const [isClient, setIsClient] = useState(false);
  const { progress } = useUserProgress('level1-megacore');
  const [activeTab, setActiveTab] = useState<"description" | "resources" | "comments">("description");

  // Tab content data
  const resources = [
    { name: "Cueing Variations Guide (PDF)", size: "2.1 MB" },
    { name: "Exercise Challenge Techniques (PDF)", size: "1.8 MB" },
    { name: "Instructor Cueing Manual (PDF)", size: "2.3 MB" },
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
                <p className="text-gray-600">Chapter 10 - Lesson 1</p>
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
              <p className="text-gray-600">Chapter 10 - Lesson 1</p>
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
            currentLessonPath="/courses/level1-megacore/content/chapter-10/10-1"
            nextLessonPath="/courses/level1-megacore/content/chapter-10/10-2"
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 lg:pl-20 lg:pt-16">
          <div className="max-w-7xl mx-auto">
            {/* Lesson Title */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-[#E43636] mb-4">How to Cue Variations (aka Challenges) & Variations for Exercises</h1>
              <p className="text-lg text-gray-700 font-medium">
                Instructor Training: Cueing Techniques
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
                  src="https://www.youtube.com/embed/XJMNEqazOnI"
                  title="How to Cue Variations Tutorial"
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
                    <h2 className="text-2xl font-bold text-[#E43636] mb-4">How to Cue Variations / Challenges</h2>
                    <p className="text-[#000000] mb-6">
                      The video above will go over how to cue variations / challenges AND go over the different variations for exercises within different muscle group blocks
                    </p>
                    <p className="text-[#000000] mb-8">
                      <b>Note:</b> When you cue that the variation of challenge is coming up next, you need to cue where to meet before actually pulsing. If you do not do this, everyone will start pulsing at different positions.
                    </p>

                    <h2 className="text-2xl font-bold text-[#E43636] mb-6">Cueing Guidelines by Motion Type</h2>
                    
                    <div className="space-y-6 mb-8">
                      <div>
                        <h3 className="font-semibold text-[#E43636] text-lg mb-2">If the exercise is a back and forwards motion</h3>
                        <p className="text-[#000000] mb-2">[example: Chest Expansion]</p>
                        <p className="text-[#000000] mb-4">You'd have to say:</p>
                        <p className="text-[#000000] mb-2">"Meet me halfway back to hold" &gt;&gt;&gt; You can pulse two different ways</p>
                        <ol className="list-decimal pl-6 text-[#000000] mb-4">
                          <li>Forward and back two inches (easier because they are moving their arms towards the origination of the cables)</li>
                          <li>Back and forward two inches (harder because they are moving their arms further away from the origination of the cables)</li>
                        </ol>
                        <p className="text-[#000000] mb-2">OR</p>
                        <p className="text-[#000000] mb-2">"Meet me all the way back to hold" and then tell them how to pulse from that distance you put them in.</p>
                        <ol className="list-decimal pl-6 text-[#000000] mb-4">
                          <li>The only way to pulse is forward and back two inches</li>
                        </ol>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-[#E43636] text-lg mb-2">If the exercise is an up and down motion</h3>
                        <p className="text-[#000000] mb-2">[example: Floor Lunge]</p>
                        <p className="text-[#000000] mb-4">You'd have to say:</p>
                        <p className="text-[#000000] mb-2">"Meet me halfway down to hold" &gt;&gt;&gt; You can pulse two different ways</p>
                        <ol className="list-decimal pl-6 text-[#000000] mb-4">
                          <li>Up and down two inches (easier because they are moving up towards the standing position)</li>
                          <li>Down and up two inches (harder because they're moving lower from the standing position)</li>
                        </ol>
                        <p className="text-[#000000] mb-2">OR</p>
                        <p className="text-[#000000] mb-2">"Meet me all the way down to hold"</p>
                        <ol className="list-decimal pl-6 text-[#000000] mb-4">
                          <li>The only way to pulse is up and down two inches.</li>
                        </ol>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-[#E43636] text-lg mb-2">If the exercise is turning side to side for motion</h3>
                        <p className="text-[#000000] mb-2">[example: Torso Twist working the left oblique. Kneeling on the carriage turned to face sideways with your left oblique towards the front platform]</p>
                        <p className="text-[#000000] mb-4">You'd have to say:</p>
                        <p className="text-[#000000] mb-2">"Meet me halfway to the left and hold" &gt;&gt;&gt; You can pulse two different ways</p>
                        <ol className="list-decimal pl-6 text-[#000000] mb-4">
                          <li>Right and left two inches (easier because the arms and hands move towards the origination of the straps located near the back platform)</li>
                          <li>Left and right two inches (harder because the arms and hands move away from the origination of the straps located near the back platform)</li>
                        </ol>
                        <p className="text-[#000000] mb-2">OR</p>
                        <p className="text-[#000000] mb-2">"Meet me all the way to the left and hold"</p>
                        <ol className="list-decimal pl-6 text-[#000000] mb-4">
                          <li>The only way to pulse is right and left two inches.</li>
                        </ol>
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold text-[#E43636] mb-6">Variations (aka Challenges)</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-[#E43636] text-lg mb-2">Lunges:</h3>
                        <p className="text-[#000000] mb-4">holds, pulses, back kick, ski jump, 90/90 pulses, platform saw</p>
                        
                        <h3 className="font-semibold text-[#E43636] text-lg mb-2">Squats:</h3>
                        <p className="text-[#000000] mb-4">holds, pulses, carriage skater, platform skater, double skater</p>
                        
                        <h3 className="font-semibold text-[#E43636] text-lg mb-2">Oblique Sweep:</h3>
                        <p className="text-[#000000] mb-4">leg circles</p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-[#E43636] text-lg mb-2">Serve the Platter:</h3>
                        <p className="text-[#000000] mb-4">arm circles</p>
                        
                        <h3 className="font-semibold text-[#E43636] text-lg mb-2">Ab Wheel:</h3>
                        <p className="text-[#000000] mb-4">push-ups</p>
                        
                        <h3 className="font-semibold text-[#E43636] text-lg mb-2">Freestyle Plank:</h3>
                        <p className="text-[#000000] mb-4">hip dips, heel raises, toe taps, more panther/plank to pike/push-ups/shoulder taps/knee taps/mountain climbers</p>
                      </div>
                    </div>
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
                    lessonId="chapter-10/10-1" 
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
