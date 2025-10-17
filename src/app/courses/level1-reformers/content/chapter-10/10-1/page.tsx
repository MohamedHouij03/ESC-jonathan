"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";
import { useUserProgress } from "@/hooks/useUserProgress";

export default function Chapter101() {
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
            currentLessonPath="/courses/level1-reformers/content/chapter-10/10-1"
            nextLessonPath="/courses/level1-reformers/content/chapter-10/10-2"
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
              <h1 className="text-4xl font-bold text-[#E43636] mb-2">How to Cue Variations (aka Challenges) & Variations for Exercises</h1>
              <p className="text-lg text-gray-600">Chapter 10 - Lesson 1</p>
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
                  src="https://www.youtube.com/embed/XJMNEqazOnI"
                  title="How to Cue Variations (aka Challenges) & Variations for Exercises"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
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
                    <h2 className="text-2xl font-bold text-[#E43636] mb-4">How to Cue Variations (aka Challenges) & Variations for Exercises</h2>

                    <div className="space-y-6">
                      <p className="text-gray-700 text-base">
                        The video above will go over how to cue variations / challenges AND go over the different variations for exercises within different muscle group blocks.
                      </p>
                      <p className="text-gray-700 text-base font-semibold">Note:</p>
                      <ul className="list-disc list-inside text-gray-700 mb-4">
                        <li>When you cue that the variation of challenge is coming up next, you need to cue where to meet before actually pulsing. If you do not do this, everyone will start pulsing at different positions.</li>
                      </ul>

                      <hr className="my-4" />

                      <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">If the exercise is a back and forwards motion</h3>
                      <p className="text-gray-700 mb-2">[example: <span className="font-semibold">Chest Expansion</span>] &lt;&lt;&lt; <a href="#" className="text-blue-600 underline">Click to watch video as reference</a></p>
                      <ul className="list-disc list-inside text-gray-700 mb-4">
                        <li>You'd have to say: <span className="font-semibold">"Meet me halfway back to hold"</span> &rarr; You can pulse two different ways
                          <ol className="list-decimal list-inside ml-6">
                            <li>Forward and back two inches (easier because they are moving their arms towards the origination of the cables)</li>
                            <li>Back and forward two inches (harder because they are moving their arms further away from the origination of the cables)</li>
                          </ol>
                        </li>
                        <li>OR <span className="font-semibold">"Meet me all the way back to hold"</span> and then tell them how to pulse from that distance you put them in.
                          <ol className="list-decimal list-inside ml-6">
                            <li>The only way to pulse is forward and back two inches</li>
                          </ol>
                        </li>
                      </ul>

                      <hr className="my-4" />

                      <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">If the exercise is an up and down motion</h3>
                      <p className="text-gray-700 mb-2">[example: <span className="font-semibold">Floor Lunge</span>] &lt;&lt;&lt; <a href="#" className="text-blue-600 underline">Click to watch video as reference</a></p>
                      <ul className="list-disc list-inside text-gray-700 mb-4">
                        <li>You'd have to say: <span className="font-semibold">"Meet me halfway down to hold"</span> &rarr; You can pulse two different ways
                          <ol className="list-decimal list-inside ml-6">
                            <li>Up and down two inches (easier because they are moving up towards the standing position)</li>
                            <li>Down and up two inches (harder because they're moving lower from the standing position)</li>
                          </ol>
                        </li>
                        <li>OR <span className="font-semibold">"Meet me all the way down to hold"</span>
                          <ol className="list-decimal list-inside ml-6">
                            <li>The only way to pulse is up and down two inches.</li>
                          </ol>
                        </li>
                      </ul>

                      <hr className="my-4" />

                      <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">If the exercise is turning side to side for motion</h3>
                      <p className="text-gray-700 mb-2">[example: <span className="font-semibold">Torso Twist working the left oblique. Kneeling on the carriage turned to face sideways with your left oblique towards the front platform</span>] {<a href="#" className="text-blue-600 underline">Click the name of the exercise above to watch video as reference</a>}</p>
                      <ul className="list-disc list-inside text-gray-700 mb-4">
                        <li>You'd have to say: <span className="font-semibold">"Meet me halfway to the left and hold"</span> &rarr; You can pulse two different ways
                          <ol className="list-decimal list-inside ml-6">
                            <li>Right and left two inches (easier because the arms and hands move towards the origination of the straps located near the back platform)</li>
                            <li>Left and right two inches (harder because the arms and hands move away from the origination of the straps located near the back platform)</li>
                          </ol>
                        </li>
                        <li>OR <span className="font-semibold">"Meet me all the way to the left and hold"</span>
                          <ol className="list-decimal list-inside ml-6">
                            <li>The only way to pulse is right and left two inches.</li>
                          </ol>
                        </li>
                      </ul>

                      <hr className="my-4" />

                      <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">Variations (aka Challenges)</h3>
                      <ul className="list-disc list-inside text-gray-700 mb-4">
                        <li><span className="font-semibold">Lunges:</span> holds, pulses, back kick, ski jump, 90/90 pulses, platform saw</li>
                        <li><span className="font-semibold">Squats:</span> holds, pulses, carriage skater, platform skater, double skater</li>
                        <li><span className="font-semibold">Oblique Sweep:</span> leg circles</li>
                        <li><span className="font-semibold">Serve the Platter:</span> arm circles</li>
                        <li><span className="font-semibold">Ab Wheel:</span> push-ups</li>
                        <li><span className="font-semibold">Freestyle Plank:</span> hip dips, heel raises, toe taps, more panther/plank to pike/push-ups/shoulder taps/knee taps/mountain climbers</li>
                      </ul>
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
                      lessonId="chapter-10/10-1" 
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