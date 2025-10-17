"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";
import { useUserProgress } from "@/hooks/useUserProgress";

export default function Chapter94() {
  const { progress } = useUserProgress('level1-reformers');
  const [activeTab, setActiveTab] = useState<'description' | 'resources' | 'comments'>('description');
  const [isClient, setIsClient] = useState(false);

  const resources = [
    // No PDF resources for this lesson
  ];

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
                <p className="text-[#E2DDB4]">Chapter 9: Clients and Pregnancy</p>
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
              <p className="text-[#E2DDB4]">Chapter 9: Clients and Pregnancy</p>
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
            currentLessonPath="/courses/level1-reformers/content/chapter-9/9-4"
            nextLessonPath="/courses/level1-reformers/content/chapter-10/10-1"
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
              <h1 className="text-4xl font-bold text-[#E43636] mb-2">Pregnant Friendly Routine</h1>
              <p className="text-lg text-gray-600">Chapter 9 - Lesson 4</p>
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
                  src="https://www.youtube.com/embed/BK_v1hU29Vo"
                  title="Pregnancy Friendly Lagree Workout"
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
                    <h2 className="text-2xl font-bold text-[#E43636] mb-4">Pregnant Friendly Routine</h2>

                    <section className="space-y-4 mt-8">
                      <h3 className="text-xl font-semibold text-[#E43636]">Routine Guidelines</h3>
                      <p className="text-gray-700">
                        Please note: this routine is in my opinion "pregnancy friendly" based on working with clients who were pregnant at different stages of pregnancy and working with a Physical Therapist to confirm. I always recommend two white springs for any core stabilizers or light leg exercises at the front. Also, the stabilization pole should be close by. If balance is an issue for the pregnant client, have them perform floor lunges, well lunges, or squats on the floor. Pay attention to the pregnant client(s) during class and check in with them every now and then. Pregnant woman can be winded easier during pregnancy.
                      </p>
                      <p className="text-gray-700">
                        An exercise at the front I'd advise against is the Carriage Lunge, however, there have been clients who still chose to perform it. At the end of the day, we do our best to have a conversation with pregnant clients to ensure their safety before class and it is their choice if they want to perform something we advise against.
                      </p>
                      <p className="text-gray-700">
                        When a pregnant client is unable to perform an exercise, the go-to is always upper body exercises at the back platform or on the moving carriage. Have them on a reformer in the corner away from everyone to avoid distraction.
                      </p>
                      <p className="text-gray-700">
                        I've never come across a pregnant client that was absolutely new to Xformer during pregnancy. They've always prior experience. You can always ask management their opinion on the do's and don'ts
                      </p>
                    </section>

                    <hr className="my-6" />

                    <section className="space-y-4">
                      <h3 className="text-xl font-semibold text-[#E43636]">Spring Conversions & Exercise List</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li><span className="font-semibold">Abdominal / Core</span></li>
                        <ul className="list-disc list-inside ml-6 text-gray-700 space-y-1">
                          <li>1 white spring (standard)</li>
                          <li>2 white springs (modification / pregnant)</li>
                          <li>Non-Xformer: 1 gray spring (standard); 2 gray springs (modification / pregnant)</li>
                          <li>reverse bird dog crunch (right)</li>
                          <li>reverse bird dog crunch (left)</li>
                          <li>reverse saw</li>
                          <li>reverse ab wheel</li>
                          <li>reverse forearm plank to pike (on hands is fine. I prefer switching from hands to forearms for clients)</li>
                          <li>a reverse bear can be performed in exchange</li>
                        </ul>
                        <li><span className="font-semibold">Legs</span></li>
                        <ul className="list-disc list-inside ml-6 text-gray-700 space-y-1">
                          <li>1 white spring</li>
                          <li>Non-Xformer: 1 gray spring (standard)</li>
                          <li>well lunge (a floor lunge can be performed in exchange)</li>
                          <li>kneeling inner thigh (performing this at the front is recommended for pregnant clients)</li>
                          <li>single leg squat (2 white springs is recommended for pregnant clients)</li>
                          <li>platform lunge (2 white springs is recommended for pregnant clients)</li>
                          <li>light squats (2 white springs is recommended for pregnant clients)</li>
                        </ul>
                        <li><span className="font-semibold">Oblique and Upper Body</span></li>
                        <ul className="list-disc list-inside ml-6 text-gray-700 space-y-1">
                          <li>2-3 white springs</li>
                          <li>Non-Xformer: 1 black + 2 gray springs; 1 black + 1 gray spring to modify</li>
                          <li>torso twist (don't over twist and if it feels uncomfortable for the pregnant client, stop!)</li>
                          <li>serve the platter</li>
                          <li>shoulder press</li>
                          <li>tricep extension</li>
                          <li>torso twist</li>
                        </ul>
                        <li><span className="font-semibold">Back to Legs</span></li>
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
                      lessonId="chapter-9/9-4" 
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