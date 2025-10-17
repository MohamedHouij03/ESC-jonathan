"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";
import { useUserProgress } from "@/hooks/useUserProgress";

export default function Chapter102() {
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
            currentLessonPath="/courses/level1-reformers/content/chapter-10/10-2"
            nextLessonPath="/courses/level1-reformers/content/chapter-10/10-3"
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
              <h1 className="text-4xl font-bold text-[#E43636] mb-2">How to Cue(A Detailed Explanation of The 2-Minute Method)</h1>
              <p className="text-lg text-gray-600">Chapter 10 - Lesson 2</p>
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
                  src="https://www.youtube.com/embed/KQtyWI65S_4"
                  title="A Detailed Explanation of The 2-Minute Method"
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
                    <h2 className="text-2xl font-bold text-[#E43636] mb-4">How to Cue(A Detailed Explanation of The 2-Minute Method)</h2>

                    <section className="space-y-4">
                      <h3 className="text-xl font-semibold text-[#E43636]">How The 2-Minute Method Works</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Each exercise is performed for two minutes as follows: <b>[ 1 : 30 : 30 ]</b></li>
                        <ul className="list-disc list-inside ml-6 text-gray-700 space-y-1">
                          <li>1 minute - full range of motion</li>
                          <li>30 seconds - the challenge</li>
                          <li>30 seconds - back to full range of motion</li>
                        </ul>
                      </ul>
                      <h4 className="text-lg font-semibold text-gray-900 mt-4">Terminology</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li><b>Full range</b> - a complete rep of moving in an exercise down & up, in & out, left & right, etc</li>
                        <li><b>Challenge</b> - a different movement in an exercise whether that be a shorter range of motion or a completely different movement that can be performed within an exercise.</li>
                        <ul className="list-disc list-inside ml-6 text-gray-700 space-y-1">
                          <li>Examples: holds, pulses, back kick (for lunges), skater (for squats), etc</li>
                          <li>The challenge can be executed in multiple ways using the timer. For example:</li>
                          <ul className="list-disc list-inside ml-6 text-gray-700 space-y-1">
                            <li>10 second hold + 20 second pulse</li>
                            <li>20 second pulse + 10 second hold</li>
                            <li>15 second hold + 15 second pulse</li>
                            <li>15 second pulse + 15 second hold</li>
                          </ul>
                        </ul>
                      </ul>
                    </section>

                    <section className="space-y-4 mt-8">
                      <h3 className="text-xl font-semibold text-[#7e22ce]">Important Notes</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Read the room. If you notice people are having a difficult time in any exercise, cut it short by ending the exercise after the challenge (the 1:30 mark)</li>
                        <li>If you have time left over at the end of your full routine because you cut some exercises short, you can have people perform more abdominal/core exercises</li>
                        <li>Not all exercises have to be 2 minutes, and at least 1 minute and 30 seconds</li>
                        <li>Please let me know if you catch any errors so that I can correct them as soon as possible. Thank You!</li>
                      </ul>
                    </section>

                    <section className="space-y-4 mt-8">
                      <h3 className="text-xl font-semibold text-[#E43636]">How to Use The Timer for Each Exercise</h3>
                      <p className="text-gray-700">
                        <b>Foreshadow</b> means a warning or indication of a future event (specifically the upcoming challenge)
                      </p>
                      <ol className="list-decimal list-inside text-gray-700 space-y-1">
                        <li><b>The Setup</b> - Before you start the exercise and start the timer
                          <ul className="list-disc list-inside ml-6 text-gray-700 space-y-1">
                            <li>Tell your practitioners how to get into the starting position of the exercise (hands, forearms, knees, toes, feet, hips/butt, and on the… front platform, back platform, side of the carriage, carriage, 1st white line/#1, under the platform strap, under the carriage strap, handlebars, long black strap, short hard handles, short hard handles under the back platform)</li>
                            <li>Once everyone is "Setup," you're going to say: "We're going to start in 3, 2, 1."</li>
                          </ul>
                        </li>
                        <li><b>0:00 - 0:50 ("The Execution" - Full Range of Motion)</b>
                          <ul className="list-disc list-inside ml-6 text-gray-700 space-y-1">
                            <li>You're going to cue everyone on how to move through a Full Range of motion. (Examples for different muscle groups provided in the lesson.)</li>
                          </ul>
                        </li>
                        <li><b>0:50 (The Foreshadow for the Challenge)</b>
                          <ul className="list-disc list-inside ml-6 text-gray-700 space-y-1">
                            <li>This is when you say, "in 10 seconds, your [challenge] is coming up" and cue what the challenge will be and where to position the body for that challenge.</li>
                          </ul>
                        </li>
                        <li><b>1:00 ("The Challenge")</b>
                          <ul className="list-disc list-inside ml-6 text-gray-700 space-y-1">
                            <li>Repeat what you just stated during the foreshadow for those who didn't catch it, and explain how to move in the challenge.</li>
                          </ul>
                        </li>
                        <li><b>1:20 (The Foreshadow for going back to Full Range)</b>
                          <ul className="list-disc list-inside ml-6 text-gray-700 space-y-1">
                            <li>Say, "in 10 seconds, you're going back to full range of motion" and cue everyone that the challenge will be ending.</li>
                          </ul>
                        </li>
                        <li><b>1:30</b>
                          <ul className="list-disc list-inside ml-6 text-gray-700 space-y-1">
                            <li>Repeat what you just stated during the foreshadow for going back to full range for those who didn't catch it.</li>
                          </ul>
                        </li>
                        <li><b>1:50 ("The Transition" - The Foreshadow going into the Next Exercise)</b>
                          <ul className="list-disc list-inside ml-6 text-gray-700 space-y-1">
                            <li>Say, "in 10 seconds, your next exercise will be a ______" and cue everyone on where their hands, forearms, knees, or toes will need to move for the next exercise.</li>
                          </ul>
                        </li>
                        <li><b>2:00</b>
                          <ul className="list-disc list-inside ml-6 text-gray-700 space-y-1">
                            <li>Tell everyone, "DONE!" so they know the exercise is over. Then repeat the foreshadow for the next exercise.</li>
                          </ul>
                        </li>
                      </ol>
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
                      lessonId="chapter-10/10-2" 
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