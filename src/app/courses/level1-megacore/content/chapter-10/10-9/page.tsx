"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";

export default function Lesson109() {
  const [isClient, setIsClient] = useState(false);
  const { progress } = useUserProgress('level1-megacore');
  const [activeTab, setActiveTab] = useState<"description" | "resources" | "comments">("description");

  // Tab content data
  const resources = [
    { name: "Instructor Tips & Guidelines (PDF)", size: "2.1 MB" },
    { name: "Spotify Playlist Collection (PDF)", size: "1.5 MB" },
    { name: "Social Media & Contact Guide (PDF)", size: "1.2 MB" },
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
                <p className="text-gray-600">Chapter 10 - Lesson 9</p>
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
              <p className="text-gray-600">Chapter 10 - Lesson 9</p>
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
            currentLessonPath="/courses/level1-megacore/content/chapter-10/10-9"
            nextLessonPath="/courses/level1-megacore/content/chapter-11/11-1"
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 lg:pl-20 lg:pt-16">
          <div className="max-w-7xl mx-auto">
            {/* Lesson Title */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-[#E43636] mb-4">Overall Tips and What to Expect</h1>
              <p className="text-lg text-gray-700 font-medium">
                Final Instructor Guidance: Professional Tips & Resources
              </p>
            </div>

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
                    <h2 className="text-2xl font-bold text-[#E43636] mb-4">Core Principles</h2>
                    <ul className="list-disc pl-6 text-[#000000] mb-6 space-y-2">
                      <li>Be authentically yourself. People will come to see you because of YOU.</li>
                      <li>Provide modifications and intensifications to make it an all-levels class</li>
                      <li>Some clients will constantly stare at you or peek at you during exercises</li>
                      <li>Look and scan the room before you start walking around the room to see who needs your help first</li>
                      <li>Form correction: One time is not enough. Three times is too much. Two is just right.</li>
                      <li>We GET the opportunity to make positive changes through teaching and instructing. You will become a better communicator and become more confident</li>
                      <li>Help clients when you can: help turn the black handlebars, change springs for faster transitions, or provide demonstration of difficult exercises before class</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-[#E43636] mb-4">Top 3 Topics 3 Minutes Before Class</h2>
                    <ol className="list-decimal pl-6 text-[#000000] mb-6 space-y-2">
                      <li>Explaining how to modify by changing springs, moving the position of our body on the reformer, or changing the position of our hands with the long black straps</li>
                      <li>Showing and explaining an exercise that most people have difficulty understanding</li>
                      <li>Stating that if client's do not want hands on form correction to leave their cell phone on the floor in front of the front platform</li>
                    </ol>

                    <h2 className="text-2xl font-bold text-[#E43636] mb-4">Myths About Being an Instructor</h2>
                    
                    <h3 className="font-semibold text-[#E43636] text-lg mb-2">Reviews suck</h3>
                    <p className="text-[#000000] mb-4">
                      Reviews are a learning experience. Don't take reviews to heart. You cannot please everyone. Use reviews for self-improvement. Feedback is a tool, not a judgment
                    </p>
                    
                    <h3 className="font-semibold text-[#E43636] text-lg mb-2">You'll work out less</h3>
                    <p className="text-[#000000] mb-6">
                      Work out to your own blocks and routines to test out the exercises for a group class
                    </p>

                    <h2 className="text-2xl font-bold text-[#E43636] mb-4">Important Guidelines</h2>
                    <ul className="list-disc pl-6 text-[#000000] mb-6 space-y-2">
                      <li>Make your clients feel safe</li>
                      <li>If new clients get to class early, get them on the reformer before to explain the difference between 1 white spring and 2 white springs to modify</li>
                      <li>You can learn so much from your clients</li>
                      <li>Ask clients you know to test out exercises to understand how to teach different types of people</li>
                      <li>Ask clients their opinion on new cues you've come up with or how they would better understand how to execute an exercise</li>
                      <li>Talk to clients after class to ask for their opinion, feedback, and advice.</li>
                      <li>Leave everything at the door</li>
                      <li>You are there to teach clients how to perform exercises and keep them safe</li>
                      <li>It's important to set the mood for clients that walk into the studio to take your class</li>
                      <li>The music you have playing before class is important</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-[#E43636] mb-4">Spotify Playlist</h2>
                    <p className="text-[#000000] mb-4 break-all">
                      <a href="https://open.spotify.com/user/31xv52pkfh3scaib55rqwewj767m?si=HuFrRJ8wTU" target="_blank" rel="noopener noreferrer" className="text-[#E43636] hover:underline break-all">
                        https://open.spotify.com/user/31xv52pkfh3scaib55rqwewj767m?si=HuFrRJ8wTU
                      </a>
                    </p>
                    <p className="text-[#000000] mb-4">
                      Playlists ending in an asterisk * are completed and the ending songs I use for stretch. I also have R&B playlists where I choose stretch songs from
                    </p>
                    <p className="text-[#000000] mb-4">
                      If you'd like to start practicing to count to the beat of the music, songs between 220-230 BMP are great for a 4-count. Use the following website to find out a song's BPM to create a playlist
                    </p>
                    <p className="text-[#000000] mb-6">
                      <a href="https://songbpm.com" target="_blank" rel="noopener noreferrer" className="text-[#E43636] hover:underline">
                        https://songbpm.com
                      </a>
                    </p>

                    <h2 className="text-2xl font-bold text-[#E43636] mb-4">How to be a Better Instructor</h2>
                    <ul className="list-disc pl-6 text-[#000000] mb-6 space-y-2">
                      <li>Each week, pick 1 thing that you want to get better at it and practice it everyday whether you're teaching a class or not</li>
                      <li>Record yourself performing a muscle group block while cueing yourself through the exercises to analyze yourself. Then:</li>
                      <ul className="list-disc pl-12 text-[#000000] mb-2 space-y-1">
                        <li>Watch yourself without audio</li>
                        <li>Do not watch yourself only listening to the audio</li>
                        <li>Watch and listen to yourself</li>
                      </ul>
                    </ul>

                    <h2 className="text-2xl font-bold text-[#E43636] mb-4">Social Media and Contact Information</h2>
                    <ul className="list-disc pl-6 text-[#000000] space-y-2">
                      <li><b>YouTube:</b> <a href="https://youtube.com/channel/UCjniVtEC4MY771I37zMoSOQ" target="_blank" rel="noopener noreferrer" className="text-[#E43636] hover:underline">https://youtube.com/channel/UCjniVtEC4MY771I37zMoSOQ</a></li>
                      <li><b>Instagram:</b> TikTok</li>
                      <li><b>Phone Number:</b> 714-706-2451</li>
                    </ul>
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
                    lessonId="chapter-10/10-9" 
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
