'use client';

import React, { useRef, useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface CertificateWithExactTemplateProps {
  userName: string;
  courseName: string;
  completionDate: string;
  userId?: string;
  courseId?: string;
  saveToBackend?: boolean;
}

const CertificateWithExactTemplate: React.FC<CertificateWithExactTemplateProps> = ({ 
  userName, 
  courseName, 
  completionDate, 
  userId, 
  courseId, 
  saveToBackend = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    // Preload the background image
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => {
      console.error('Failed to load certificate template image');
      setImageLoaded(true); // Still show the certificate even if image fails
    };
    img.src = '/certification-template.png';
  }, []);

  const handleDownload = async () => {
    const container = containerRef.current;
    if (!container || !imageLoaded) return;
    
    setIsDownloading(true);
    
    try {
      // Wait to ensure everything is rendered
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create canvas manually with background image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');
      
      // Set canvas size with scale
      const scale = 4;
      canvas.width = 800 * scale;
      canvas.height = 565 * scale;
      ctx.scale(scale, scale);
      
      // Load and draw background image
      const bgImg = new Image();
      bgImg.crossOrigin = 'anonymous';
      
      await new Promise((resolve, reject) => {
        bgImg.onload = () => {
          // Draw background
          ctx.drawImage(bgImg, 0, 0, 800, 565);
          resolve(true);
        };
        bgImg.onerror = () => {
          // Fallback: draw white background
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, 800, 565);
          resolve(true);
        };
        bgImg.src = '/certification-template.png';
      });
      
      // Set text properties
      ctx.font = 'italic 36px "Playfair Display", "Times New Roman", serif';
      ctx.fillStyle = '#000000';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Draw student name
      ctx.save();
      ctx.translate(400, 243); // Center horizontally, 243px from top
      ctx.fillText(userName.toUpperCase(), 0, 0);
      ctx.restore();
      
      // Draw completion date
      ctx.font = 'italic 18px "Playfair Display", "Times New Roman", serif';
      ctx.textAlign = 'center';
      ctx.fillText(completionDate.toUpperCase(), 504, 412); // 504px from left, 412px from top
      
      // Create download link
      const link = document.createElement('a');
      link.download = `${userName}-certificate.png`;
      link.href = canvas.toDataURL("image/png", 1.0);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (saveToBackend && userId && courseId) {
        try {
          await fetch('/api/certificates', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId,
              courseId,
              courseName,
              completionDate,
            }),
          });
        } catch (error) {
          console.error('Error saving certificate record:', error);
        }
      }
    } catch (error) {
      console.error('Error generating certificate:', error);
      alert('Error generating certificate. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-8">
      <div 
        ref={containerRef}
        data-certificate-container
        style={{
          width: 800,
          height: 565,
          position: "relative",
          backgroundImage: "url('/certification-template.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          border: "2px solid #ccc",
          borderRadius: 10,
          fontFamily: "'Playfair Display', 'Times New Roman', serif",
          textRendering: "optimizeLegibility",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          imageRendering: "high-quality",
          imageRendering: "-webkit-optimize-contrast",
        }}
      >
        {/* Overlay text on your exact template */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}>
          {/* Student Name - positioned where "presented to :" is on your template */}
          <div style={{
            position: "absolute",
            top: "243px", // Fixed pixel position (43% of 565px)
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "36px", // Increased from 28px to 36px for bigger name
            fontWeight: "normal", // Changed from bold to normal
            fontStyle: "italic", // Added italic
            color: "#000000",
            textAlign: "center",
            fontFamily: "'Playfair Display', 'Times New Roman', serif", // More elegant serif font
            textShadow: "1px 1px 2px rgba(255,255,255,0.8)",
            letterSpacing: "1px", // Added letter spacing for elegance
            textTransform: "uppercase", // Make name capital letters
            whiteSpace: "nowrap", // Prevent text wrapping
            lineHeight: "1.2", // Consistent line height
            textRendering: "optimizeLegibility",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
            backfaceVisibility: "hidden",
            transform: "translateX(-50%) translateZ(0)" // Hardware acceleration
          }}>
            {userName}
          </div>

          {/* Completion Date - positioned where "COMPLETED AT" is */}
          <div style={{
            position: "absolute",
            top: "412px", // Fixed pixel position (73% of 565px)
            left: "504px", // Fixed pixel position (63% of 800px)
            fontSize: "18px", // Increased from 14px to 18px for bigger date
            fontWeight: "normal", // Changed from bold to normal
            fontStyle: "italic", // Added italic
            color: "#000000",
            textAlign: "center",
            fontFamily: "'Playfair Display', 'Times New Roman', serif", // More elegant serif font
            textShadow: "1px 1px 2px rgba(255,255,255,0.8)",
            letterSpacing: "0.5px", // Added letter spacing for elegance
            textTransform: "uppercase", // Make date capital letters
            whiteSpace: "nowrap", // Prevent text wrapping
            lineHeight: "1.2", // Consistent line height
            textRendering: "optimizeLegibility",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
            backfaceVisibility: "hidden",
            transform: "translateZ(0)" // Hardware acceleration
          }}>
            {completionDate}
          </div>
        </div>
      </div>
      
      <button
        onClick={handleDownload}
        disabled={!imageLoaded || isDownloading}
        className={`mt-8 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition-all duration-200 transform ${
          !imageLoaded || isDownloading
            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
            : 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 hover:scale-105'
        }`}
      >
        {isDownloading ? 'Generating...' : !imageLoaded ? 'Loading...' : 'Download Certificate (PNG)'}
      </button>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          ✅ Using your exact certificate template!
        </p>
        <p className="text-xs text-gray-500 mt-1">
          High-quality PNG download with perfect text positioning. You can adjust positions if needed.
        </p>
      </div>
    </div>
  );
};

export default CertificateWithExactTemplate;
