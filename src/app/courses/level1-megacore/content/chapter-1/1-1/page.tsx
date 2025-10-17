"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";
import { useUserProgress } from '@/hooks/useUserProgress';

export default function Lesson11() {
  const [activeTab, setActiveTab] = useState<'description' | 'resources' | 'comments'>('description');
  const [isClient, setIsClient] = useState(false);
  const { progress } = useUserProgress('level1-megacore');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const lessonGoals = [
    'Understand all Xformer machine components',
    'Learn proper positioning and safety guidelines',
    'Master spring tension system knowledge',
    'Practice proper foot and hand placement'
  ];

  const resources = [
    { name: 'Xformer Anatomy Guide PDF', type: 'pdf', size: '3.2 MB' },
    { name: 'Safety Guidelines', type: 'pdf', size: '1.5 MB' },
    { name: 'Spring System Reference', type: 'pdf', size: '1.8 MB' },
    { name: 'Component Checklist', type: 'pdf', size: '0.9 MB' }
  ];

  // Comments are now handled by the LessonComments component

  if (!isClient) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#E43636]"></div>
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
              <h1 className="text-2xl font-bold">Level 1 Megacore</h1>
              <p className="text-[#E2DDB4]">Chapter 1</p>
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
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Course Navigation Sidebar */}
          <CourseNavigation 
            currentLessonPath="/courses/level1-megacore/content/chapter-1/1-1"
            nextLessonPath="/courses/level1-megacore/content/chapter-1/1-2"
          />

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Video Player */}
            <div className="mb-8">
              <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  width="100%"
                  height="500"
                  src="https://www.youtube.com/embed/4ni8P0yNlrE"
                  title="The Anatomy of the Xformer - Video Tutorial"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full"
                ></iframe>
              </div>
            </div>

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
                  <h2 className="text-3xl font-bold text-[#E43636] mb-6">The Anatomy of the Xformer</h2>
                  
                  {/* Lesson Goals */}
                  <div className="bg-white rounded-xl p-6 mb-8 border border-[#E43636]">
                    <h3 className="text-xl font-bold text-[#E43636] mb-4">Lesson Goals</h3>
                    <ul className="space-y-2">
                      {lessonGoals.map((goal, index) => (
                        <li key={index} className="flex items-center text-[#000000]">
                          <span className="w-2 h-2 bg-[#E43636] rounded-full mr-3"></span>
                          {goal}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Xformer Components */}
                  <div className="space-y-8">
                    {/* The Moving Carriage */}
                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">The Moving Carriage</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                        <div>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>The long middle part of the Xformer that carries the different types of spring tension underneath.</li>
                            <li><span className="font-semibold">On top of the carriage (front to back):</span></li>
                            <ul className="list-disc ml-8 text-[#000000] space-y-1">
                              <li>"front platform strap"</li>
                              <li>1st white line (white stitching)</li>
                              <li>2nd white line (white stitching)</li>
                              <li>"dimples" or "shoulder block holes"</li>
                              <li>"back platform strap"</li>
                              <li>"eyelets" or "pockets"</li>
                            </ul>
                          </ul>
                          <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                            <span className="font-semibold text-yellow-800">Safety Note:</span> This part of the Xformer moves, so be cautious on top (stepping on the platform first is recommended).
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <Image src="/images/xformer/xformer1.png" alt="Xformer Carriage" width={400} height={300} className="rounded-lg shadow-lg" />
                        </div>
                      </div>
                    </section>

                    {/* Carriage Straps */}
                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Front & Back Carriage Straps</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                        <div>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li><span className="font-semibold">Front carriage strap (at the front of the carriage):</span>
                              <ul className="list-disc ml-8 text-[#000000] space-y-1">
                                <li>Place your feet underneath</li>
                                <li>Anchor the toes and balls of your feet against</li>
                                <li>Hold onto for exercises laying on the carriage</li>
                              </ul>
                            </li>
                            <li><span className="font-semibold">Back carriage strap (at the back of the carriage):</span>
                              <ul className="list-disc ml-8 text-[#000000] space-y-1">
                                <li>Place your feet underneath</li>
                                <li>Tuck your toes, elbow, knee, or heel against</li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                        <div className="flex justify-center">
                          <Image src="/images/xformer/xformer2.png" alt="Xformer Carriage Straps" width={400} height={300} className="rounded-lg shadow-lg" />
                        </div>
                      </div>
                    </section>

                    {/* White Lines */}
                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">First & Second White Lines</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                        <div>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>The first white line is located behind the front carriage strap—where we typically place our toes, knees, or hands for most exercises.</li>
                            <li>The second white line is located at the middle of the moving carriage—another area for toes, knees, or sit bones for exercises.</li>
                          </ul>
                        </div>
                        <div className="flex justify-center">
                          <Image src="/images/xformer/xformer5.png" alt="Xformer White Lines" width={400} height={300} className="rounded-lg shadow-lg" />
                        </div>
                      </div>
                    </section>

                    {/* Platforms */}
                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Front & Back Platforms</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                        <div>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>The front platform is at the front of the machine where the handlebars are slanted upwards (stationary, doesn't move).</li>
                            <li>The back platform is at the back of the machine where the handlebars are not slanted (stationary, doesn't move).</li>
                          </ul>
                        </div>
                        <div className="flex justify-center">
                          <Image src="/images/xformer/xformer3.png" alt="Xformer Platforms" width={400} height={300} className="rounded-lg shadow-lg" />
                        </div>
                      </div>
                    </section>

                    {/* Platform Straps */}
                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Front & Back Platform Straps</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                        <div>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>Front platform strap: on top of the front platform, used to place your feet underneath.</li>
                            <li>Back platform strap: on top of the back platform, used to place your feet underneath or tuck your elbows up against.</li>
                          </ul>
                        </div>
                        <div className="flex justify-center">
                          <Image src="/images/xformer/xformer4.png" alt="Xformer Platform Straps" width={400} height={300} className="rounded-lg shadow-lg" />
                        </div>
                      </div>
                    </section>

                    {/* Handlebars */}
                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Front & Back Handlebars</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                        <div>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>Front handlebars: at the front, slant upwards, can be lifted and turned in any direction. Used for hand/foot placement and support.</li>
                            <li>Back handlebars: at the back, parallel to the floor, not slanted, can be lifted and turned. Used for hand placement and support.</li>
                          </ul>
                        </div>
                        <div className="flex justify-center">
                          <Image src="/images/xformer/xformer6.png" alt="Xformer Handlebars" width={400} height={300} className="rounded-lg shadow-lg" />
                        </div>
                      </div>
                    </section>

                    {/* Bungee & Cables */}
                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Bungee Cord & Back Short Cables</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                        <div>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>Bungee cord: attached to the front towel rack in front of the front platform. Place your foot in the bungee for certain exercises, or use for upper body (with caution).</li>
                            <li>Back short cables (blue, silver, or red): hung under the back handlebars, used for certain exercises. Pulling the cable moves the carriage.</li>
                          </ul>
                        </div>
                        <div className="flex justify-center">
                          <Image src="/images/xformer/xfomrer7.png" alt="Xformer Bungee and Cables" width={400} height={300} className="rounded-lg shadow-lg" />
                        </div>
                      </div>
                    </section>

                    {/* Long Carriage Strap */}
                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Long Carriage Strap</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                        <div>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>Located at the back sides of the moving carriage, hung up on hooks. Used for different exercises and stretches.</li>
                            <li>Parts from lightest to heaviest: long strap, short hard handle, ring, buckle, rope.</li>
                          </ul>
                        </div>
                        <div className="flex justify-center">
                          <Image src="/images/xformer/xformer8.png" alt="Xformer Long Carriage Strap" width={400} height={300} className="rounded-lg shadow-lg" />
                        </div>
                      </div>
                    </section>

                    {/* Well & Floor Strap */}
                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">The Well & Floor Strap</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                        <div>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>The well is the area behind the carriage under the frame; sometimes used for positioning during exercises.</li>
                            <li>The floor strap is inside at the bottom of the well; place your feet underneath for certain exercises.</li>
                          </ul>
                        </div>
                        <div className="flex justify-center">
                          <Image src="/images/xformer/xformer9.png" alt="Xformer Well and Floor Strap" width={400} height={300} className="rounded-lg shadow-lg" />
                        </div>
                      </div>
                    </section>

                    {/* Springs */}
                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">White, Grey, & Black Springs</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                        <div>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>White spring: light tension. Most light tension exercises use 1 white spring.</li>
                            <li>Grey spring: medium tension. Used as a modification for black spring exercises if too heavy. White springs can be added to increase tension.</li>
                            <li>Black spring: heavy tension. Most heavy tension exercises require at least a black spring. White springs can be added to increase tension.</li>
                            <li>Five white springs is the modification when a grey or black spring is too heavy or too much tension.</li>
                          </ul>
                        </div>
                        <div className="flex justify-center">
                          <Image src="/images/xformer/xformer10.png" alt="Xformer Springs" width={400} height={300} className="rounded-lg shadow-lg" />
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              )}

              {activeTab === 'resources' && (
                <div>
                  <h2 className="text-3xl font-bold text-[#E43636] mb-6">Resources</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {resources.map((resource, index) => (
                      <div key={index} className="bg-white p-4 rounded-xl border border-[#E43636] hover:bg-[#E43636] hover:text-[#F6EFD2] transition-colors cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-black">{resource.name}</p>
                            <p className="text-sm opacity-75 text-black">{resource.size}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'comments' && (
                <div>
                  <h2 className="text-3xl font-bold text-[#E43636] mb-6">Q&A Discussion</h2>
                  <LessonComments 
                    lessonId="chapter-1/1-1" 
                    courseId="level1-megacore" 
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