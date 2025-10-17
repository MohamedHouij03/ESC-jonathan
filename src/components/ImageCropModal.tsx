"use client";

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageCropModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  onCropComplete: (croppedImageUrl: string) => void;
}

export default function ImageCropModal({ isOpen, onClose, imageSrc, onCropComplete }: ImageCropModalProps) {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        1,
        width,
        height
      ),
      width,
      height
    );
    setCrop(crop);
  }, []);

  const getCroppedImg = (
    image: HTMLImageElement,
    crop: PixelCrop,
    fileName: string
  ): Promise<Blob> => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No 2d context');
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            throw new Error('Canvas is empty');
          }
          resolve(blob);
        },
        'image/jpeg',
        0.95
      );
    });
  };

  const handleCropComplete = async () => {
    if (!completedCrop || !imgRef.current) return;

    setIsProcessing(true);
    try {
      const croppedImageBlob = await getCroppedImg(
        imgRef.current,
        completedCrop,
        'cropped-image.jpg'
      );
      
      const croppedImageUrl = URL.createObjectURL(croppedImageBlob);
      onCropComplete(croppedImageUrl);
      onClose();
    } catch (error) {
      console.error('Error cropping image:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto pt-16">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`relative bg-white rounded-2xl shadow-2xl w-full mb-8 overflow-hidden transition-all duration-300 ${
              isMinimized ? 'max-w-xs' : 'max-w-lg'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className={`font-bold text-[#000000] transition-all duration-300 ${
                isMinimized ? 'text-lg' : 'text-2xl'
              }`}>
                Crop Profile Picture
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  title={isMinimized ? 'Maximize' : 'Minimize'}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMinimized ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    )}
                  </svg>
                </button>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className={`transition-all duration-300 ${isMinimized ? 'p-3' : 'p-4'}`}>
              {!isMinimized && (
                <div className="mb-4">
                  <p className="text-gray-600 text-sm mb-4">
                    Drag to move the crop area and resize the corners to adjust the selection.
                  </p>
                  
                  {/* Image Crop Area */}
                  <div className="flex justify-center">
                    <ReactCrop
                      crop={crop}
                      onChange={(_, percentCrop) => setCrop(percentCrop)}
                      onComplete={(c) => setCompletedCrop(c)}
                      aspect={1}
                      circularCrop
                    >
                      <img
                        ref={imgRef}
                        alt="Crop me"
                        src={imageSrc}
                        onLoad={onImageLoad}
                        className="max-h-64 max-w-full"
                      />
                    </ReactCrop>
                  </div>
                </div>
              )}
              
              {isMinimized && (
                <div className="flex justify-center mb-3">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300">
                    <img
                      src={imageSrc}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className={`flex gap-3 justify-end ${isMinimized ? 'flex-col' : ''}`}>
                <button
                  onClick={onClose}
                  className={`text-gray-600 hover:text-gray-800 transition-colors ${
                    isMinimized ? 'px-3 py-1 text-sm' : 'px-4 py-2'
                  }`}
                  disabled={isProcessing}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCropComplete}
                  disabled={!completedCrop || isProcessing}
                  className={`bg-[#E43636] text-white rounded-lg hover:bg-[#b82a2a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${
                    isMinimized ? 'px-3 py-1 text-sm' : 'px-6 py-2'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      {isMinimized ? 'Processing...' : 'Processing...'}
                    </>
                  ) : (
                    isMinimized ? 'Apply' : 'Apply Crop'
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
