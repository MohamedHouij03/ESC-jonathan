"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from 'next/image';
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";
import { useUserProgress } from "@/hooks/useUserProgress";

export default function Chapter310() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const { progress } = useUserProgress('level1-reformers');
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [lastPoint, setLastPoint] = useState({ x: 0, y: 0 });

  const images = [
    { src: "/pdfs/ab wheel/01.jpg", alt: "Practicing Cues reference 1" },
    { src: "/pdfs/ab wheel/02.jpg", alt: "Practicing Cues reference 2" },
    { src: "/pdfs/ab wheel/03.jpg", alt: "Practicing Cues reference 3" },
    { src: "/pdfs/ab wheel/04.jpg", alt: "Practicing Cues reference 4" },
  ];

  const [activeTab, setActiveTab] = useState<"description" | "resources" | "comments">("description");
  const [isClient, setIsClient] = useState(false);

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.min(Math.max(prev * delta, 0.5), 3));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsPanning(true);
    setLastPoint({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    const deltaX = e.clientX - lastPoint.x;
    const deltaY = e.clientY - lastPoint.y;
    setOffset(prev => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
    setLastPoint({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

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
                <p className="text-[#E2DDB4]">Chapter 3: Core Exercises</p>
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
              <p className="text-[#E2DDB4]">Chapter 3: Core Exercises</p>
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
            currentLessonPath="/courses/level1-reformers/content/chapter-3/3-10"
            nextLessonPath="/courses/level1-reformers/content/chapter-4/4-1"
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
              <h1 className="text-4xl font-bold text-[#E43636] mb-2">Core and Abdominal Block: Practicing Cues</h1>
              <p className="text-lg text-gray-600">Chapter 3 - Lesson 10</p>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#E43636] space-y-10"
            >
              {/* Intro copy before images */}
              <div className="space-y-4 text-[#000000]">
                <h2 className="text-2xl font-bold text-[#E43636]">The words we use and when we use them are important when cueing because:</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>It keeps all clients safe from bad form and injury</li>
                  <li>It directs and prepares the client for what’s coming up next</li>
                  <li>It encourages and empowers clients to push through the workout</li>
                  <li>It will require less or no physical demonstration on your part</li>
                  <li>It challenges us to be better communicators by thinking of different ways to explain instruction easier and simpler</li>
                </ul>
                <p>Below are photos and corresponding cues to practice setting up clients in an exercise before execution</p>
                <div className="space-y-1">
                  <p className="font-semibold">Practice #1:</p>
                  <p>Read aloud and act out the cues 3 times</p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold">Practice #2:</p>
                  <p>Repeat the above but add “in 10 seconds” before each cue 3 more times</p>
                </div>
                <p className="italic">(practice the above two everyday)</p>
              </div>

              {/* Images with side-by-side cue placeholders */}
              <div className="space-y-6">
                {images.map((img, idx) => (
                  <div key={img.src} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div className="relative w-full h-72 md:h-80 rounded-lg overflow-hidden shadow-lg bg-gray-100 cursor-pointer hover:shadow-xl transition-shadow" onClick={() => handleImageClick(idx)}>
                      <Image src={img.src} alt={img.alt} fill className="object-contain" />
                    </div>
                    <div className="border-2 border-[#E43636] rounded-xl p-4 min-h-40 bg-white text-[#000000]">
                      {idx === 0 && (
                        <div className="space-y-3">
                          <div>
                            <p className="font-semibold">Hands</p>
                            <p>on the {'{'}Front Platform{'}'} or {'{'}Carriage{'}'} or {'{'}Back Platform{'}'}</p>
                          </div>
                          <div>
                            <p className="font-semibold">Knees</p>
                            <p>on the {'{'}Front Platform{'}'} or {'{'}Carriage{'}'} or {'{'}Back Platform{'}'}</p>
                          </div>
                          <div>
                            <p className="font-semibold">Feet</p>
                            <p>and legs together, shins down</p>
                          </div>
                        </div>
                      )}
                      {idx === 1 && (
                        <div className="space-y-3">
                          <div>
                            <p className="font-semibold">Forearms</p>
                            <p>on the {'{'}Front Platform{'}'} or {'{'}Carriage{'}'} or {'{'}Back Platform{'}'}</p>
                          </div>
                          <div>
                            <p className="font-semibold">Knees</p>
                            <p>on the {'{'}Front Platform{'}'} or {'{'}Carriage{'}'} or {'{'}Back Platform{'}'}</p>
                          </div>
                          <div>
                            <p className="font-semibold">Feet</p>
                            <p>and legs together, shins down</p>
                          </div>
                        </div>
                      )}
                      {idx === 2 && (
                        <div className="space-y-3">
                          <div>
                            <p className="font-semibold">Sit</p>
                            <p>on the {'{'}Front Platform{'}'} or {'{'}Carriage{'}'} or {'{'}Back Platform{'}'}</p>
                          </div>
                          <div>
                            <p className="font-semibold">Grab</p>
                            <p>the two {'{'}Long Carriage Straps{'}'} and hold them by the {'{'}Short Hard Handles{'}'} or {'{'}Long Black Strap{'}'} </p>
                          </div>
                          <div>
                            <p className="font-semibold">Feet</p>
                            <p>and legs together in a table top position</p>
                          </div>
                        </div>
                      )}
                      {idx === 3 && (
                        <div className="space-y-3">
                          <div>
                            <p className="font-semibold">Hands</p>
                            <p>on the {'{'}Black Handle Bars{'}'}</p>
                          </div>
                          <div>
                            <p className="font-semibold">Feet</p>
                            <p>on the front edge of the moving {'{'}carriage {'}'}</p>
                          </div>
                          <div>
                            <p className="font-semibold">Elbows</p>
                            <p>softly bent</p>
                          </div>
                        </div>
                      )}
                      {idx > 4 && (
                        <p className="opacity-60">Placeholder: add the corresponding cues for this image here.</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tabs Card */}
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
                {activeTab === "description" && (
                  <div>
                    <h2 className="text-2xl font-bold text-[#E43636] mb-4">Core and Abdominal Block: Practicing Cues</h2>
                  </div>
                )}
                {activeTab === "resources" && (
                  <div>
                    <h3 className="text-2xl font-bold text-[#E43636] mb-4">Resources</h3>
                    <div className="text-gray-600">
                      <p>No PDF resources available for this lesson.</p>
                    </div>
                  </div>
                )}
                {activeTab === "comments" && (
                  <LessonComments 
                    lessonId="chapter-3/3-10" 
                    courseId="level1-reformers" 
                  />
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Add spacing for navigation */}
      <div className="h-24"></div>

      {/* Image Modal */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={handleCloseModal}
          tabIndex={0}
        >
          <div 
            className="relative max-w-5xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-white text-2xl font-bold bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75 transition-all z-10"
            >
              ×
            </button>
            <div className="relative">
              <div
                className="relative overflow-hidden rounded-lg"
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <Image
                  src={images[selectedImage].src}
                  alt={images[selectedImage].alt}
                  width={1400}
                  height={933}
                  className="cursor-grab active:cursor-grabbing"
                  style={{
                    transform: `scale(${zoom}) translate(${offset.x / zoom}px, ${offset.y / zoom}px)`,
                    transition: isPanning ? 'none' : 'transform 0.1s ease-out'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}




