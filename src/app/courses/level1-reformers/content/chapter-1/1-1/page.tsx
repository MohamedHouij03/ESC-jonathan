"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";
import { useUserProgress } from "@/hooks/useUserProgress";

export default function Chapter11() {
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
                <p className="text-[#E2DDB4]">Chapter 1: Introduction</p>
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
              <p className="text-[#E2DDB4]">Chapter 1: Introduction</p>
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
            currentLessonPath="/courses/level1-reformers/content/chapter-1/1-1"
            nextLessonPath="/courses/level1-reformers/content/chapter-1/1-2"
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
              <h1 className="text-4xl font-bold text-[#E43636] mb-2">The Anatomy of the Xformer</h1>
              <p className="text-lg text-gray-600">Chapter 1 - Lesson 1</p>
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
                  src="https://www.youtube.com/embed/4ni8P0yNlrE"
                  title="The Anatomy of the Xformer - Video Tutorial"
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
                    <h2 className="text-2xl font-bold text-[#E43636] mb-4">The Anatomy of the Xformer</h2>
                    
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
                              <span className="font-semibold text-black">Safety Note:</span> <span className="text-black">This part of the Xformer moves, so be cautious on top (stepping on the platform first is recommended).</span>
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
                    <h3 className="text-2xl font-bold text-[#E43636] mb-4">Resources</h3>
                    <p className="text-gray-700">No PDF resources for this lesson.</p>
                  </div>
                )}
                {activeTab === 'comments' && (
                  <div>
                    <LessonComments 
                      lessonId="chapter-1/1-1" 
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