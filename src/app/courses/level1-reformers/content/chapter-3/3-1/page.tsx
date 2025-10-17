'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";
import { useUserProgress } from '@/hooks/useUserProgress';

interface Offset { x: number; y: number; }

const images = [
  {
    src: "/images/Transverse+Abdominis.png",
    alt: "Transverse Abdominis Reference",
  },
];

const ZOOM_MIN = 1;
const ZOOM_MAX = 10;
const ZOOM_STEP = 0.2;

// Start a bit bigger than "fit" when the modal opens
const OPEN_FIT_PLUS = 1.35; // 35% beyond fit

export default function Lesson31() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { progress } = useUserProgress('level1-reformers');
  const [activeTab, setActiveTab] = useState<"description" | "resources" | "comments">("description");

  // baseScale = fit-to-container; zoom = user multiplier (1 = Fit)
  const [zoom, setZoom] = useState(1);
  const [baseScale, setBaseScale] = useState(1);

  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
  const [currentImage, setCurrentImage] = useState(0);

  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const isPanningRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  const naturalRef = useRef<{ w: number; h: number } | null>(null);

  // Tab content data
  const resources = [
    // No PDF resources for this lesson
  ];

  // Comments are now handled by the LessonComments component
  const pinchRef = useRef<{ lastDist: number | null; lastCenter: { x: number; y: number } | null }>({
    lastDist: null, lastCenter: null
  });

  const openModal = (imgIdx = 0) => {
    setIsModalOpen(true);
    setCurrentImage(imgIdx);
    setZoom(OPEN_FIT_PLUS);      // open slightly zoomed-in
    setOffset({ x: 0, y: 0 });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  // ===== Scroll lock while modal open =====
  useEffect(() => {
    if (!isModalOpen) return;
    const { body, documentElement } = document;
    const prevBodyOverflow = body.style.overflow;
    const prevDocOverflow = documentElement.style.overflow;
    body.style.overflow = "hidden";
    documentElement.style.overflow = "hidden";
    return () => {
      body.style.overflow = prevBodyOverflow;
      documentElement.style.overflow = prevDocOverflow;
    };
  }, [isModalOpen]);

  // ===== Fit-to-container base scale =====
  const recomputeBaseScale = () => {
    const rect = imageContainerRef.current?.getBoundingClientRect();
    const nat = naturalRef.current;
    if (!rect || !nat) return;
    const fit = Math.min(rect.width / nat.w, rect.height / nat.h);
    setBaseScale(fit > 0 ? fit : 1);
    setOffset({ x: 0, y: 0 });
  };

  // On image change or modal toggle, keep that slightly-zoomed default when open
  useEffect(() => {
    if (isModalOpen) {
      setZoom(OPEN_FIT_PLUS);
    } else {
      setZoom(1);
    }
    setOffset({ x: 0, y: 0 });
  }, [currentImage, isModalOpen]);

  useEffect(() => {
    if (!isModalOpen) return;
    recomputeBaseScale();
    const onResize = () => recomputeBaseScale();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isModalOpen, currentImage]);

  // ===== Helpers =====
  const clampZoom = (z: number) => Math.max(ZOOM_MIN, Math.min(z, ZOOM_MAX));

  const getLocalCoords = (clientX: number, clientY: number) => {
    const rect = imageContainerRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0, rect: null as DOMRect | null };
    const x = clientX - rect.left - rect.width / 2 - offset.x;
    const y = clientY - rect.top - rect.height / 2 - offset.y;
    return { x, y, rect };
  };

  // ===== Zoom & Pan Handlers =====
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { x: mouseX, y: mouseY, rect } = getLocalCoords(e.clientX, e.clientY);
    if (!rect) return;

    const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
    const newZoom = clampZoom(zoom + delta);
    if (newZoom === zoom) return;

    const ratio = newZoom / zoom;
    const newOffset = {
      x: offset.x - mouseX * (ratio - 1),
      y: offset.y - mouseY * (ratio - 1),
    };

    setZoom(newZoom);
    setOffset(newZoom === 1 ? { x: 0, y: 0 } : newOffset);
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { x: clickX, y: clickY } = getLocalCoords(e.clientX, e.clientY);
    if (zoom === 1) {
      const newZoom = 2;
      const ratio = newZoom / zoom;
      setZoom(newZoom);
      setOffset({
        x: offset.x - clickX * (ratio - 1),
        y: offset.y - clickY * (ratio - 1),
      });
    } else {
      setZoom(1);
      setOffset({ x: 0, y: 0 });
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoom === 1) return;
    isPanningRef.current = true;
    lastPointRef.current = { x: e.clientX, y: e.clientY };
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPanningRef.current || zoom === 1 || !lastPointRef.current) return;
    const dx = e.clientX - lastPointRef.current.x;
    const dy = e.clientY - lastPointRef.current.y;
    lastPointRef.current = { x: e.clientX, y: e.clientY };
    setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
  };
  const handleMouseUp = () => {
    isPanningRef.current = false;
    lastPointRef.current = null;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      lastPointRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      isPanningRef.current = zoom > 1;
    } else if (e.touches.length === 2) {
      const [t1, t2] = [e.touches[0], e.touches[1]];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const center = { x: (t1.clientX + t2.clientX) / 2, y: (t1.clientY + t2.clientY) / 2 };
      pinchRef.current = { lastDist: dist, lastCenter: center };
    }
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1 && isPanningRef.current && lastPointRef.current) {
      const t = e.touches[0];
      const dx = t.clientX - lastPointRef.current.x;
      const dy = t.clientY - lastPointRef.current.y;
      lastPointRef.current = { x: t.clientX, y: t.clientY };
      setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    } else if (e.touches.length === 2) {
      e.preventDefault();
      const [t1, t2] = [e.touches[0], e.touches[1]];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const center = { x: (t1.clientX + t2.clientX) / 2, y: (t1.clientY + t2.clientY) / 2 };

      const prevDist = pinchRef.current.lastDist;
      if (!prevDist) {
        pinchRef.current = { lastDist: dist, lastCenter: center };
        return;
      }

      const scaleDelta = dist / prevDist;
      const targetZoom = clampZoom(zoom * scaleDelta);
      const actualScale = targetZoom / zoom;

      const { x: localX, y: localY } = getLocalCoords(center.x, center.y);
      const newOffset = {
        x: offset.x - localX * (actualScale - 1),
        y: offset.y - localY * (actualScale - 1),
      };

      setZoom(targetZoom);
      setOffset(targetZoom === 1 ? { x: 0, y: 0 } : newOffset);

      pinchRef.current = { lastDist: dist, lastCenter: center };
    }
  };
  const handleTouchEnd = () => {
    isPanningRef.current = false;
    lastPointRef.current = null;
    pinchRef.current = { lastDist: null, lastCenter: null };
  };

  // Keyboard
  useEffect(() => {
    if (!isModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "+" || e.key === "=") zoomTo(zoom + ZOOM_STEP);
      if (e.key === "-") zoomTo(zoom - ZOOM_STEP);
      if (e.key === "0") resetZoom();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen, zoom, currentImage, offset]);

  // Zoom helpers
  const zoomTo = (target: number) => {
    const newZoom = clampZoom(target);
    if (newZoom === zoom) return;

    const rect = imageContainerRef.current?.getBoundingClientRect();
    if (!rect) { setZoom(newZoom); return; }
    const centerClientX = rect.left + rect.width / 2;
    const centerClientY = rect.top + rect.height / 2;
    const { x: localX, y: localY } = getLocalCoords(centerClientX, centerClientY);

    const ratio = newZoom / zoom;
    const newOffset = {
      x: offset.x - localX * (ratio - 1),
      y: offset.y - localY * (ratio - 1),
    };

    setZoom(newZoom);
    setOffset(newZoom === 1 ? { x: 0, y: 0 } : newOffset);
  };

  const resetZoom = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  // Navigation
  const goPrev = () => currentImage > 0 && setCurrentImage((i) => i - 1);
  const goNext = () => currentImage < images.length - 1 && setCurrentImage((i) => i + 1);

  const zoomText = `${(zoom * 100).toFixed(0)}%`;



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
        {/* Course Navigation Sidebar */}
        <div className="pl-4 pt-4">
          <CourseNavigation 
            currentLessonPath="/courses/level1-reformers/content/chapter-3/3-1"
            nextLessonPath="/courses/level1-reformers/content/chapter-3/3-2"
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 lg:pl-20 lg:pt-16">
          {/* Lesson Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-[#E43636] mb-2">Anatomy of Transverse Abdominis</h1>
            <p className="text-lg text-gray-600">Chapter 3 - Lesson 1</p>
          </motion.div>

          {/* Image Display */}
          <div className="py-8">
            <div className="flex justify-center">
              <div 
                className="relative w-full max-w-5xl h-[600px] rounded-lg overflow-hidden shadow-lg bg-gray-100 cursor-pointer hover:shadow-xl transition-shadow duration-300"
                onClick={() => openModal(0)}
              >
                <Image
                  src={images[0].src}
                  alt={images[0].alt}
                  width={1200}
                  height={800}
                  className="max-w-full max-h-full object-contain"
                  priority
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                  <div className="bg-white/90 rounded-lg px-4 py-2 shadow-lg">
                    <p className="text-sm font-medium text-gray-800 flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                      <span>Click to enlarge</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Spacing for navigation fit */}
            <div className="h-4"></div>
          </div>

          {/* Content Card with Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
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
                <h2 className="text-2xl font-bold text-[#E43636] mb-4">Anatomy of Transverse Abdominis</h2>
                {/* Description content removed */}
              </div>
            )}

            {/* Resources */}
            {activeTab === "resources" && (
              <div>
                <h3 className="text-2xl font-bold text-[#E43636] mb-4">Resources</h3>
                <p className="text-gray-700">No PDF resources for this lesson.</p>
              </div>
            )}

            {/* Comments */}
            {activeTab === "comments" && (
                  <LessonComments 
                    lessonId="chapter-3/3-1" 
                    courseId="level1-reformers" 
                  />
                )}
          </motion.div>
        </motion.div>
        </div>
      </div>

      {/* Modal */}
        {isModalOpen && (
          <div
          className="fixed inset-0 bg-gray-900/90 flex items-center justify-center z-50 p-4 overscroll-none"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden relative">
            {/* Header with +/- controls */}
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                Exercise Reference
              </h3>
              <div className="flex items-center gap-2">
                <button
                  className="hidden sm:inline px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm"
                  onClick={() => zoomTo(zoom - ZOOM_STEP)}
                  aria-label="Zoom out"
                >
                  −
                </button>
                <span className="hidden sm:inline text-sm w-16 text-center tabular-nums">{zoomText}</span>
              <button
                  className="hidden sm:inline px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm"
                  onClick={() => zoomTo(zoom + ZOOM_STEP)}
                  aria-label="Zoom in"
                >
                  +
                </button>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  aria-label="Close"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

            {/* Nav Arrows */}
            <button
              onClick={goPrev}
              disabled={currentImage === 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-2 shadow-lg z-10 disabled:opacity-50"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goNext}
              disabled={currentImage === images.length - 1}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-2 shadow-lg z-10 disabled:opacity-50"
              aria-label="Next image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image Area */}
            <div
              ref={imageContainerRef}
              className="flex items-center justify-center w-full h-[70vh] sm:h-[76vh] bg-gray-100 select-none overflow-hidden"
              style={{
                cursor: zoom > 1 ? (isPanningRef.current ? "grabbing" : "grab") : "default",
              }}
              onWheel={handleWheel}
              onDoubleClick={handleDoubleClick}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <Image
                src={images[currentImage].src}
                alt={images[currentImage].alt}
                width={1600}
                height={1200}
                draggable={false}
                priority
                onLoadingComplete={(el) => {
                  naturalRef.current = { w: el.naturalWidth, h: el.naturalHeight };
                  setTimeout(() => recomputeBaseScale(), 0);
                }}
                className={
                  zoom === 1
                    ? "block max-w-full max-h-full object-contain"
                    : "block max-w-none max-h-none object-contain"
                }
                style={{
                  transform:
                    zoom === 1
                      ? `translate3d(0,0,0) scale(${baseScale})`
                      : `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${baseScale * zoom})`,
                  transition: isPanningRef.current ? "none" : "transform 0.15s ease-out",
                  transformOrigin: "center",
                }}
              />
      </div>

            {/* Mobile controls */}
            <div className="sm:hidden flex items-center justify-center gap-2 p-3 border-t border-gray-200">
              <button
                className="px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-800"
                onClick={() => zoomTo(zoom - ZOOM_STEP)}
                aria-label="Zoom out"
              >
                −
              </button>
              <span className="text-sm w-16 text-center tabular-nums">{zoomText}</span>
              <button
                className="px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-800"
                onClick={() => zoomTo(zoom + ZOOM_STEP)}
                aria-label="Zoom in"
              >
                +
              </button>
            </div>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((img, idx) => (
                <span
                  key={img.src}
                  className={`w-3 h-3 rounded-full ${idx === currentImage ? "bg-blue-600" : "bg-gray-300"} border border-white`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      </div>
  );
} 