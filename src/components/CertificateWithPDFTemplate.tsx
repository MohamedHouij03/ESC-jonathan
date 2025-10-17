'use client';

import React, { useRef, useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface CertificateWithPDFTemplateProps {
  userName: string;
  courseName: string;
  completionDate: string;
  userId?: string;
  courseId?: string;
  saveToBackend?: boolean;
  onDownloadComplete?: () => void;
}

const CertificateWithPDFTemplate: React.FC<CertificateWithPDFTemplateProps> = ({ 
  userName, 
  courseName, 
  completionDate, 
  userId, 
  courseId, 
  saveToBackend = false,
  onDownloadComplete
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pdfLoaded, setPdfLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    const container = containerRef.current;
    if (!container) return;
    
    try {
      const canvas = await html2canvas(container, { 
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`${userName}-${courseName}-certificate.pdf`);
      
      // Call the completion callback
      if (onDownloadComplete) {
        onDownloadComplete();
      }

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
    }
  };

  useEffect(() => {
    const loadPDFTemplate = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Dynamically import pdfjs-dist
        const pdfjsLib = await import('pdfjs-dist');
        
        // Set worker source using CDN - simpler approach
        if (typeof window !== 'undefined') {
          pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
        }
        
        // Load your PDF template - simplified approach
        const pdf = await pdfjsLib.getDocument('/certification-template.pdf').promise;
        
        const page = await pdf.getPage(1);
        
        const canvas = canvasRef.current;
        if (!canvas) {
          throw new Error('Canvas not found');
        }
        
        const context = canvas.getContext('2d');
        if (!context) {
          throw new Error('Canvas context not found');
        }
        
        // Set canvas size based on PDF page
        const viewport = page.getViewport({ scale: 1.5 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        // Render PDF to canvas
        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        
        await page.render(renderContext).promise;
        
        setPdfLoaded(true);
        setLoading(false);
      } catch (error) {
        console.error('Error loading PDF template:', error);
        setError('Failed to load PDF template: ' + (error as Error).message);
        setLoading(false);
      }
    };

    loadPDFTemplate();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading PDF template...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center p-8">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-red-600 mb-4">{error}</p>
          <p className="text-gray-600 text-sm">Make sure the PDF template is in the public folder as 'certification-template.pdf'</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-8">
      <div 
        ref={containerRef}
        style={{ 
          position: "relative", 
          display: "inline-block",
          border: "2px solid #ccc",
          borderRadius: 10,
        }}
      >
        {/* Canvas with your PDF template */}
        <canvas
          ref={canvasRef}
          style={{
            display: "block",
          }}
        />
        
        {/* Overlay text on the PDF */}
        {pdfLoaded && (
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: "none", // Allow clicks to pass through
          }}>
            {/* Student Name - You'll need to adjust these positions to match your template */}
            <div style={{
              position: "absolute",
              top: "40%", // Adjust to match your template
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "28px",
              fontWeight: "bold",
              color: "#000000",
              textAlign: "center",
              fontFamily: "Arial, sans-serif",
              textShadow: "1px 1px 2px rgba(255,255,255,0.8)"
            }}>
              {userName}
            </div>

            {/* Course Name - You'll need to adjust these positions to match your template */}
            <div style={{
              position: "absolute",
              top: "50%", // Adjust to match your template
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "20px",
              fontWeight: "600",
              color: "#000000",
              textAlign: "center",
              fontFamily: "Arial, sans-serif",
              textShadow: "1px 1px 2px rgba(255,255,255,0.8)"
            }}>
              {courseName}
            </div>

            {/* Completion Date - You'll need to adjust these positions to match your template */}
            <div style={{
              position: "absolute",
              top: "60%", // Adjust to match your template
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "16px",
              fontWeight: "500",
              color: "#000000",
              textAlign: "center",
              fontFamily: "Arial, sans-serif",
              textShadow: "1px 1px 2px rgba(255,255,255,0.8)"
            }}>
              {completionDate}
            </div>
          </div>
        )}
      </div>
      
      <button
        onClick={handleDownload}
        disabled={!pdfLoaded}
        className={`mt-8 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition-all duration-200 transform hover:scale-105 ${
          !pdfLoaded
            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
        }`}
      >
        {!pdfLoaded ? 'Loading...' : 'Download Certificate'}
      </button>
      
      {pdfLoaded && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            ✅ PDF template loaded successfully! 
          </p>
          <p className="text-xs text-gray-500 mt-1">
            You may need to adjust the text positions to match your template layout.
          </p>
        </div>
      )}
    </div>
  );
};

export default CertificateWithPDFTemplate;
