"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from 'next/image';
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";
import { useUserProgress } from "@/hooks/useUserProgress";

export default function Chapter615() {
  const { progress } = useUserProgress('level1-reformers');
  const [activeTab, setActiveTab] = useState<"description" | "resources" | "comments">("description");
  const [isClient, setIsClient] = useState(false);
  const [selectedImage, setSelectedImage] = useState<boolean>(false);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [lastPoint, setLastPoint] = useState({ x: 0, y: 0 });

  // Comments are now handled by the LessonComments component

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleImageClick = () => {
    setSelectedImage(true);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const handleCloseModal = () => {
    setSelectedImage(false);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const handleDoubleClick = () => {
    setZoom(prev => prev === 1 ? 2 : 1);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.min(Math.max(prev * delta, 0.5), 3));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      e.preventDefault();
      setIsPanning(true);
      setLastPoint({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning || zoom <= 1) return;
    e.preventDefault();
    const deltaX = e.clientX - lastPoint.x;
    const deltaY = e.clientY - lastPoint.y;
    setOffset(prev => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
    setLastPoint({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPanning(false);
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-[#E43636] text-[#F6EFD2] py-6 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold">Level 1 All Reformers</h1>
                <p className="text-[#E2DDB4]">Chapter 6: Heavy Leg Exercises</p>
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
              <p className="text-[#E2DDB4]">Chapter 6: Heavy Leg Exercises</p>
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
            currentLessonPath="/courses/level1-reformers/content/chapter-6/6-15"
            nextLessonPath="/courses/level1-reformers/content/chapter-6/6-16"
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 lg:pl-20 lg:pt-16">

            {/* Lesson Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-[#E43636] mb-2">Leg Block — different body positions & transitioning</h1>
            <p className="text-lg text-gray-600">Chapter 6 - Lesson 15</p>
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
                src="https://www.youtube.com/embed/c6YbShlJYX8"
                title="Leg Block - different body positions & transitioning"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
          </motion.div>

          {/* Second Video Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden shadow-lg">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/XgZPAn4IN9c"
                title="Leg Block - Additional Body Positions & Transitions"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              </div>
          </motion.div>

          {/* Third Video Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden shadow-lg">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/NkdvH0X-AlQ"
                title="Leg Block - Advanced Transition Techniques"
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
                    <h2 className="text-2xl font-bold text-[#E43636] mb-4">Leg Block — different body positions & transitioning</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-[#E43636] mb-3">Body Positions</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        <div>
                          <ol className="list-decimal list-inside space-y-8 text-gray-700">
                            <li>Upright (lunge position)</li>
                            <li>Hips Extended (squat position)</li>
                          </ol>
                        </div>
                        <div 
                          className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                          onClick={handleImageClick}
                        >
                          <Image 
                            src="/images/aa.jpg" 
                            alt="Body Positions - Lunge and Squat positions" 
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        We want to make sure that we aren't creating a Leg Block that places clients in the same position for too long. We need to be mindful of how many back-to-back lunges and squats we have clients perform to minimize hip flexor, hip, and lower back discomfort.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-[#E43636] mb-3">Different ways to transition into different exercises</h3>
                      <div className="space-y-3 text-gray-700">
                        <p><strong>Lunges → Squats</strong></p>
                        <p><strong>OR</strong></p>
                        <p><strong>Squats → Lunges</strong></p>
                        <p><strong>OR</strong></p>
                        <p><strong>Lunge → Kneel</strong></p>
                        <p><strong>OR</strong></p>
                        <p><strong>Squat → Laying</strong></p>
                      </div>
                      <p className="text-gray-700 mt-4">
                        Alternate between lunges and squats (starting with either)
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-[#E43636] mb-3">Option:</h3>
                      <p className="text-gray-700">
                        Add in "Standing Inner Thighs" or "Standing Outer Thighs" in between
                      </p>
                      <p className="text-gray-600 text-sm mt-2 italic">
                        (note: i recommend not performing "Standing Inner Thighs until the 3rd leg move).
                      </p>
                    </div>
                  </div>
                  </div>
                )}

              {/* Resources */}
                {activeTab === "resources" && (
                  <div>
                    <h3 className="text-2xl font-bold text-[#E43636] mb-4">Resources</h3>
                  <div className="text-gray-600">
                    <p>No PDF resources available for this lesson.</p>
                  </div>
                  </div>
                )}

              {/* Comments */}
                {activeTab === "comments" && (
                  <LessonComments 
                    lessonId="chapter-6/6-15" 
                    courseId="level1-reformers" 
                  />
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <div 
            className="relative max-w-6xl max-h-full"
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
                className="relative overflow-hidden rounded-lg select-none"
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onDoubleClick={handleDoubleClick}
                style={{ userSelect: 'none' }}
              >
                <Image
                  src="/images/aa.jpg"
                  alt="Body Positions - Lunge and Squat positions (Expanded)"
                  width={800}
                  height={600}
                  className="cursor-grab active:cursor-grabbing"
                  style={{
                    transform: `scale(${zoom}) translate(${offset.x / zoom}px, ${offset.y / zoom}px)`,
                    transition: isPanning ? 'none' : 'transform 0.1s ease-out'
                  }}
                />
              </div>
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm">
                Zoom: {Math.round(zoom * 100)}% | Double-click to zoom | Scroll to zoom | Drag to pan
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}