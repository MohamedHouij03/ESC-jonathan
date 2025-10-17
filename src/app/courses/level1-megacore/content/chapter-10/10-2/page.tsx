"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";
import { useUserProgress } from "@/hooks/useUserProgress";

export default function Lesson102() {
  const [isClient, setIsClient] = useState(false);
  const { progress } = useUserProgress('level1-megacore');
  const [activeTab, setActiveTab] = useState<"description" | "resources" | "comments">("description");

  // Tab content data
  const resources = [
    { name: "How to Cue Guide (PDF)", size: "2.4 MB" },
    { name: "Instructor Cueing Techniques (PDF)", size: "1.9 MB" },
    { name: "Exercise Setup & Execution Manual (PDF)", size: "2.2 MB" },
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
                <p className="text-gray-600">Chapter 10 - Lesson 2</p>
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
              <p className="text-gray-600">Chapter 10 - Lesson 2</p>
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
            currentLessonPath="/courses/level1-megacore/content/chapter-10/10-2"
            nextLessonPath="/courses/level1-megacore/content/chapter-10/10-3"
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 lg:pl-20 lg:pt-16">
          <div className="max-w-7xl mx-auto">
            {/* Lesson Title */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-[#E43636] mb-4">How to Cue</h1>
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
                  src="https://www.youtube.com/embed/KQtyWI65S_4"
                  title="How to Cue Tutorial"
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
                    <h2 className="text-2xl font-bold text-[#E43636] mb-4">"The Setup"</h2>
                    <p className="text-[#000000] mb-6">Tell your practitioners how to get into the starting position of the exercise</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <h3 className="font-semibold text-[#E43636] text-lg mb-3">Body Parts</h3>
                        <ul className="list-disc pl-6 text-[#000000] space-y-1">
                          <li>Hands</li>
                          <li>Forearms</li>
                          <li>Knees</li>
                          <li>Toes</li>
                          <li>Feet</li>
                          <li>Hips / Butt</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#E43636] text-lg mb-3">Positions</h3>
                        <ul className="list-disc pl-6 text-[#000000] space-y-1">
                          <li>Front platform</li>
                          <li>Back platform</li>
                          <li>Side of the carriage</li>
                          <li>Carriage</li>
                          <li>1st white line / #1</li>
                          <li>Under the platform strap</li>
                          <li>Under the carriage strap</li>
                          <li>Handlebars</li>
                          <li>Long black strap</li>
                          <li>Short hard handles</li>
                          <li>Short hard handles under the back platform</li>
                        </ul>
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold text-[#E43636] mb-4">"The Execution"</h2>
                    <p className="text-[#000000] mb-6">Tell your practitioners how to perform the exercise:</p>
                    
                    <div className="space-y-6 mb-8">
                      <div>
                        <h3 className="font-semibold text-[#E43636] text-lg mb-3">Abdominal/Core:</h3>
                        <ul className="list-disc pl-6 text-[#000000] space-y-1">
                          <li>Push the carriage out</li>
                          <li>Bring the carriage in</li>
                          <li>Lift your hips up</li>
                          <li>Lower your hips</li>
                          <li>Bend your knees forward</li>
                          <li>Lengthen your leg back</li>
                          <li>Lift and round</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-[#E43636] text-lg mb-3">Legs:</h3>
                        <ul className="list-disc pl-6 text-[#000000] space-y-1">
                          <li>Lunge or squat down</li>
                          <li>Lunge or squat up</li>
                          <li>Bend your knee forward</li>
                          <li>Lengthen your leg back</li>
                          <li>Push the carriage out</li>
                          <li>Bring the carriage in</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-[#E43636] text-lg mb-3">Obliques:</h3>
                        <ul className="list-disc pl-6 text-[#000000] space-y-1">
                          <li>Sweep your leg back</li>
                          <li>Lower your leg down</li>
                          <li>Twist from your waist</li>
                          <li>Lift and fold</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-[#E43636] text-lg mb-3">Upper Body:</h3>
                        <ul className="list-disc pl-6 text-[#000000] space-y-1">
                          <li>Pull the cable back</li>
                          <li>Bend your elbows and lower your forearm</li>
                          <li>Pull forward</li>
                          <li>Extend your arms</li>
                          <li>Hands go forward and up</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-[#E43636] text-lg mb-3">How I cue muscles:</h3>
                        <ul className="list-disc pl-6 text-[#000000] space-y-1">
                          <li>Heels (the back of your foot)</li>
                          <li>Gluteus medius (your outer glute)</li>
                          <li>Hamstring (the back of your leg)</li>
                          <li>Hip flexor (your groin)</li>
                          <li>Tricep (the back of your arm)</li>
                          <li>Lats (your bra line muscles)</li>
                          <li>Scapula (your shoulder blades)</li>
                          <li>Traps (the neck muscle)</li>
                        </ul>
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold text-[#E43636] mb-4">"The Challenge"</h2>
                    <ol className="list-decimal pl-6 text-[#000000] mb-6 space-y-1">
                      <li>Tell your practitioners what the challenge will be at the 50 second mark</li>
                      <li>Followed with where to go to perform the challenge.</li>
                      <li>Immediately repeat the above: "Meet me ____ and hold"</li>
                      <li>Followed by how to perform the challenge</li>
                      <li>Tell your practitioners they'll be going back to full range at the 1:20 mark</li>
                    </ol>
                    
                    <div className="mb-8">
                      <h3 className="font-semibold text-[#E43636] text-lg mb-3">Challenge Examples:</h3>
                      <ul className="list-disc pl-6 text-[#000000] space-y-2">
                        <li><b>Ab Wheel, Saw:</b> In 2 inches, out 2 inches</li>
                        <li><b>Plank to Pike, Lunges, Squats, Shoulder Press, etc:</b> Up 2 inches, down 2 inches</li>
                        <li><b>Donkey Kick, Chest Expansion, Tricep Kickback, Etc:</b> Back 2 inches, forward 2 inches</li>
                        <li><b>Panther, Skater, Sprinter's Lunge:</b> Bend your knees to slide the carriage in, Lengthen your leg to slide the carriage out</li>
                        <li><b>Back Kick:</b> Bend your back knee forward to slide the carriage in (back kick), Lengthen your leg to slide the carriage back</li>
                      </ul>
                    </div>

                    <h2 className="text-2xl font-bold text-[#E43636] mb-4">"The Transition"</h2>
                    <ol className="list-decimal pl-6 text-[#000000] space-y-1">
                      <li>Tell your practitioners what the next exercise will be at the 1:50 second mark</li>
                      <li>Followed with how to get into position for that exercise</li>
                      <li>Immediately after: "Meet me there in 3…2…1"</li>
                      <li>Start the whole process over again starting at "The Setup"</li>
                    </ol>
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
                    lessonId="chapter-10/10-2" 
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
