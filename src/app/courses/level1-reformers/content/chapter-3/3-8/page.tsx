"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";
import { useUserProgress } from "@/hooks/useUserProgress";

export default function Chapter317() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { progress } = useUserProgress('level1-reformers');
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPanningRef] = useState({ current: false });
  const [lastPointRef] = useState({ current: { x: 0, y: 0 } });
  const naturalRef = useRef({ width: 0, height: 0 });
  const pinchRef = useRef({ distance: 0, midpoint: { x: 0, y: 0 } });
  const [activeTab, setActiveTab] = useState<"description" | "resources" | "comments">("description");
  const [isClient, setIsClient] = useState(false);

  // Tab content data
  const resources = [
    { name: "Angel Exercise Guide (PDF)", size: "2.6 MB", url: "/pdfs/ab wheel/angel.pdf" },
    { name: "Reverse Angel Exercise (PDF)", size: "2.2 MB", url: "/pdfs/ab wheel/reverse angel.pdf" },
  ];

  // Comments are now handled by the LessonComments component

  const resetZoom = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const openModal = () => {
    setIsModalOpen(true);
    resetZoom();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetZoom();
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.min(Math.max(zoom * zoomFactor, 0.5), 5);
    
    const zoomChange = newZoom / zoom;
    setOffset(prev => ({
      x: x - (x - prev.x) * zoomChange,
      y: y - (y - prev.y) * zoomChange
    }));
    setZoom(newZoom);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (zoom > 1) {
      resetZoom();
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setZoom(2);
      setOffset({ x: x - x * 2, y: y - y * 2 });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isPanningRef.current = true;
    lastPointRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanningRef.current || zoom <= 1) return;
    
    const deltaX = e.clientX - lastPointRef.current.x;
    const deltaY = e.clientY - lastPointRef.current.y;
    
    setOffset(prev => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }));
    
    lastPointRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isPanningRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isPanningRef.current = true;
      lastPointRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) + 
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      pinchRef.current = {
        distance,
        midpoint: {
          x: (touch1.clientX + touch2.clientX) / 2,
          y: (touch1.clientY + touch2.clientY) / 2
        }
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    
    if (e.touches.length === 1 && isPanningRef.current && zoom > 1) {
      const deltaX = e.touches[0].clientX - lastPointRef.current.x;
      const deltaY = e.touches[0].clientY - lastPointRef.current.y;
      
      setOffset(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      
      lastPointRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) + 
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      
      if (pinchRef.current.distance > 0) {
        const zoomChange = distance / pinchRef.current.distance;
        const newZoom = Math.min(Math.max(zoom * zoomChange, 0.5), 5);
        
        const rect = e.currentTarget.getBoundingClientRect();
        const x = pinchRef.current.midpoint.x - rect.left;
        const y = pinchRef.current.midpoint.y - rect.top;
        
        const zoomRatio = newZoom / zoom;
        setOffset(prev => ({
          x: x - (x - prev.x) * zoomRatio,
          y: y - (y - prev.y) * zoomRatio
        }));
        setZoom(newZoom);
      }
      
      pinchRef.current = {
        distance,
        midpoint: {
          x: (touch1.clientX + touch2.clientX) / 2,
          y: (touch1.clientY + touch2.clientY) / 2
        }
      };
    }
  };

  const handleTouchEnd = () => {
    isPanningRef.current = false;
    pinchRef.current.distance = 0;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === '0') {
        resetZoom();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Prevent hydration errors
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
            currentLessonPath="/courses/level1-reformers/content/chapter-3/3-8"
            nextLessonPath="/courses/level1-reformers/content/chapter-3/3-9"
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
            <h1 className="text-4xl font-bold text-[#E43636] mb-2">Angel</h1>
            <p className="text-lg text-gray-600">Chapter 3 - Lesson 8</p>
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
                src="https://www.youtube.com/embed/yuKQug3vQvI"
                title="Angel Tutorial"
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
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden shadow-lg">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/jMB1HABfdkk"
                title="Additional Angel Tutorial"
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
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden shadow-lg">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/ecsXo_MKX8c"
                title="Third Angel Tutorial"
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
                    <h2 className="text-2xl font-bold text-[#E43636] mb-4">Angel</h2>
                    <p className="text-gray-700">On the carriage, facing the front platform</p>
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
                          className={`p-4 rounded-xl border border-[#E43636] text-black shadow-sm transition-colors ${
                            r.url ? 'cursor-pointer hover:bg-[#F6EFD2] hover:text-[#E43636]' : 'bg-white'
                          }`}
                          onClick={r.url ? () => window.open(r.url, '_blank') : undefined}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold">{r.name}</p>
                              <p className="text-sm opacity-75">{r.size}</p>
                            </div>
                            {r.url && (
                              <svg className="w-5 h-5 text-[#E43636]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Comments */}
                {activeTab === "comments" && (
                  <LessonComments 
                    lessonId="chapter-3/3-8" 
                    courseId="level1-reformers" 
                  />
                )}
              </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/90 flex items-center justify-center z-50 p-4">
          <div className="relative w-full h-full max-w-6xl max-h-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="absolute top-0 left-0 right-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Angel Exercise Reference Image</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  Zoom: {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={resetZoom}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                >
                  Reset
                </button>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
      </div>

            {/* Modal Content */}
            <div 
              className="w-full h-full pt-16 overflow-hidden bg-gray-50 flex items-center justify-center select-none"
              onWheel={handleWheel}
              onDoubleClick={handleDoubleClick}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ cursor: zoom > 1 ? 'grab' : 'zoom-in' }}
            >
              <div
                style={{
                  transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                  transformOrigin: '0 0',
                  transition: isPanningRef.current ? 'none' : 'transform 0.1s ease-out'
                }}
              >
                <Image
                  src="/images/(All+Reformers)+E.S.C.P.+Full+Training+Manual+(6).png"
                  alt="Angel Exercise Reference"
                  width={800}
                  height={600}
                  className="block max-w-none"
                  onLoad={(e) => {
                    const img = e.target as HTMLImageElement;
                    naturalRef.current = {
                      width: img.naturalWidth,
                      height: img.naturalHeight
                    };
                  }}
                  draggable={false}
                />
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
} 