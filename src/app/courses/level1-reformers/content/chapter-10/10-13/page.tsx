"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";
import { useUserProgress } from "@/hooks/useUserProgress";

export default function Chapter10_13() {
  const { progress } = useUserProgress('level1-reformers');
  const [activeTab, setActiveTab] = useState<'description' | 'resources' | 'comments'>('description');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const resources = [
    // No PDF resources for this lesson
  ];

  // Comments are now handled by the LessonComments component

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
        <div className="max-w-7xl mx-auto lg:pl-0 px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-600">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header (red/cream) */}
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

      {/* Body with sidebar + main */}
      <div className="max-w-7xl mx-auto lg:pl-0 px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <CourseNavigation 
            currentLessonPath="/courses/level1-reformers/content/chapter-10/10-13"
            nextLessonPath="/courses/level1-reformers/content/chapter-11/11-1"
          />

          {/* Main column */}
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
                  <h1 className="text-3xl font-bold text-[#E43636] mb-6 text-center">Overall Tips and What to Expect</h1>

                  {/* Core Principles Section */}
                  <section className="space-y-6">
                    <div className="p-6 rounded-lg border border-gray-200">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Core Principles</h2>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li><strong>Be authentically yourself.</strong> People will come to see you because of YOU.</li>
                        <li><strong>Provide modifications and intensifications</strong> to make it an all-levels class</li>
                        <li><strong>Some clients will constantly stare at you</strong> or peek at you during exercises</li>
                        <li><strong>Look and scan the room</strong> before you start walking around the room to see who needs your help first</li>
                        <li><strong>Form correction:</strong> One time is not enough. Three times is too much. Two is just right.</li>
                        <li><strong>We GET the opportunity</strong> to make positive changes through teaching and instructing. You will become a better communicator and become more confident</li>
                        <li><strong>Help clients when you can:</strong> help turn the black handlebars, change springs for faster transitions, or provide demonstration of difficult exercises before class</li>
                      </ul>
                    </div>

                    {/* Top 3 Topics Section */}
                    <div className="p-6 rounded-lg border border-gray-200">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Top 3 Topics 3 Minutes Before Class</h2>
                      <ol className="list-decimal list-inside text-gray-700 space-y-2">
                        <li><strong>Explaining how to modify</strong> by changing springs, moving the position of our body on the reformer, or changing the position of our hands with the long black straps</li>
                        <li><strong>Showing and explaining an exercise</strong> that most people have difficulty understanding</li>
                        <li><strong>Stating that if client's do not want hands on form correction</strong> to leave their cell phone on the floor in front of the front platform</li>
                      </ol>
                    </div>

                    {/* Myths Section */}
                    <div className="p-6 rounded-lg border border-gray-200">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Myths About Being an Instructor</h2>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">Reviews suck</h3>
                          <p className="text-gray-700"><strong>Reality:</strong> Reviews are a learning experience. Don't take reviews to heart. You cannot please everyone. Use reviews for self-improvement. Feedback is a tool, not a judgment.</p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">You'll work out less</h3>
                          <p className="text-gray-700"><strong>Reality:</strong> Work out to your own blocks and routines to test out the exercises for a group class</p>
                        </div>
                      </div>
                    </div>

                    {/* Important Guidelines */}
                    <div className="p-6 rounded-lg border border-gray-200">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Important Guidelines</h2>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li><strong>Make your clients feel safe</strong></li>
                        <li><strong>If new clients get to class early,</strong> get them on the reformer before to explain the difference between 1 white spring and 2 white springs to modify</li>
                        <li><strong>You can learn so much from your clients</strong></li>
                        <li><strong>Ask clients you know to test out exercises</strong> to understand how to teach different types of people</li>
                        <li><strong>Ask clients their opinion</strong> on new cues you've come up with or how they would better understand how to execute an exercise</li>
                        <li><strong>Talk to clients after class</strong> to ask for their opinion, feedback, and advice</li>
                        <li><strong>Leave everything at the door</strong></li>
                        <li><strong>You are there to teach clients</strong> how to perform exercises and keep them safe</li>
                        <li><strong>It's important to set the mood</strong> for clients that walk into the studio to take your class</li>
                        <li><strong>The music you have playing before class is important</strong></li>
                      </ul>
                    </div>

                    {/* Spotify Playlist Section */}
                    <div className="p-6 rounded-lg border border-gray-200">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Spotify Playlist</h2>
                      <p className="text-gray-700 mb-4 break-all">
                        <a href="https://open.spotify.com/user/31xv52pkfh3scaib55rqwewj767m?si=HuFrRJ8wTU" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline break-all">https://open.spotify.com/user/31xv52pkfh3scaib55rqwewj767m?si=HuFrRJ8wTU</a>
                      </p>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Playlists ending in an asterisk * are completed and the ending</li>
                        <li>Songs I use for stretch. I also have R&B playlists where I choose stretch songs from</li>
                        <li>If you'd like to start practicing to count to the beat of the music, songs between 220-230 BMP are great for a 4-count</li>
                        <li>Use the following website to find out a song's BPM to create a playlist: <a href="https://songbpm.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">https://songbpm.com</a></li>
                      </ul>
                    </div>

                    {/* How to be a Better Instructor */}
                    <div className="p-6 rounded-lg border border-gray-200">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">How to be a Better Instructor</h2>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li><strong>Each week, pick 1 thing</strong> that you want to get better at it and practice it everyday whether you're teaching a class or not</li>
                        <li><strong>Record yourself performing a muscle group block</strong> while cueing yourself through the exercises to analyze yourself. Then:</li>
                        <ul className="list-disc list-inside text-gray-600 ml-6 space-y-1 mt-2">
                          <li>Watch yourself without audio</li>
                          <li>Do not watch yourself only listening to the audio</li>
                          <li>Watch and listen to yourself</li>
                        </ul>
                      </ul>
                    </div>

                    {/* Social Media and Contact Information */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl border-2 border-gray-200 shadow-lg">
                      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Connect With Jonathan</h2>
                      
                      {/* Social Media Icons */}
                      <div className="flex justify-center items-center space-x-8 mb-8">
                        <a href="https://youtube.com/channel/UCjniVtEC4MY771I37zMoSOQ" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center hover:scale-110 transition-all duration-300">
                          <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-3 shadow-lg group-hover:shadow-xl group-hover:bg-red-700 transition-all duration-300">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                          </div>
                          <span className="text-sm font-semibold text-gray-700 group-hover:text-red-600 transition-colors">YouTube</span>
                        </a>
                        
                        <a href="https://www.instagram.com/esc_jonathan/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center hover:scale-110 transition-all duration-300">
                          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-2xl flex items-center justify-center mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                          </div>
                          <span className="text-sm font-semibold text-gray-700 group-hover:text-pink-600 transition-colors">Instagram</span>
                        </a>
                        
                        <a href="https://www.tiktok.com/@esc_jonathan" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center hover:scale-110 transition-all duration-300">
                          <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-3 shadow-lg group-hover:shadow-xl group-hover:bg-gray-800 transition-all duration-300">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                            </svg>
                          </div>
                          <span className="text-sm font-semibold text-gray-700 group-hover:text-black transition-colors">TikTok</span>
                        </a>
                      </div>
                      
                      {/* Contact Information */}
                      <div className="text-center">
                        <div className="inline-flex items-center space-x-4 bg-white px-8 py-4 rounded-2xl border-2 border-gray-300 hover:border-[#E43636] hover:shadow-lg transition-all duration-300 group">
                          <div className="w-12 h-12 bg-[#E43636] rounded-xl flex items-center justify-center group-hover:bg-red-700 transition-colors">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                            </svg>
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-medium text-gray-600">Call or Text</p>
                            <a href="tel:714-706-2451" className="text-xl font-bold text-gray-800 hover:text-[#E43636] transition-colors">714-706-2451</a>
                          </div>
                        </div>
                      </div>
                    </div>
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
                  <h2 className="text-3xl font-bold text-[#E43636] mb-6">Q&A Discussion</h2>
                  <LessonComments 
                    lessonId="chapter-10/10-13" 
                    courseId="level1-reformers" 
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