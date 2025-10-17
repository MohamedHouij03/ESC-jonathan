'use client';

import React, { useRef, useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface CertificatePDFTemplateProps {
  userName: string;
  courseName: string;
  completionDate: string;
  userId?: string;
  courseId?: string;
  saveToBackend?: boolean;
}

const CertificatePDFTemplate: React.FC<CertificatePDFTemplateProps> = ({ 
  userName, 
  courseName, 
  completionDate, 
  userId, 
  courseId, 
  saveToBackend = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdfLoaded, setPdfLoaded] = useState(false);

  useEffect(() => {
    // Load your PDF template and render it to canvas
    const loadPDFTemplate = async () => {
      try {
        // You would need to install pdfjs-dist for this
        // npm install pdfjs-dist
        const pdfjsLib = await import('pdfjs-dist');
        
        // Load your PDF template
        const pdf = await pdfjsLib.getDocument('/Certification Template.pdf').promise;
        const page = await pdf.getPage(1);
        
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const context = canvas.getContext('2d');
        if (!context) return;
        
        const viewport = page.getViewport({ scale: 1.5 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        await page.render({
          canvasContext: context,
          viewport: viewport
        }).promise;
        
        setPdfLoaded(true);
      } catch (error) {
        console.error('Error loading PDF template:', error);
      }
    };

    loadPDFTemplate();
  }, []);

  const handleDownload = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    try {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`${userName}-${courseName}-certificate.pdf`);

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

  return (
    <div className="flex flex-col items-center p-8">
      <div style={{ position: "relative", display: "inline-block" }}>
        {/* Canvas with your PDF template */}
        <canvas
          ref={canvasRef}
          style={{
            border: "2px solid #ccc",
            borderRadius: 10,
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
            {/* Student Name */}
            <div style={{
              position: "absolute",
              top: "45%", // Adjust to match your template
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "32px",
              fontWeight: "bold",
              color: "#000000",
              textAlign: "center",
              fontFamily: "Arial, sans-serif"
            }}>
              {userName}
            </div>

            {/* Course Name */}
            <div style={{
              position: "absolute",
              top: "55%", // Adjust to match your template
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "24px",
              fontWeight: "600",
              color: "#000000",
              textAlign: "center",
              fontFamily: "Arial, sans-serif"
            }}>
              {courseName}
            </div>

            {/* Completion Date */}
            <div style={{
              position: "absolute",
              top: "65%", // Adjust to match your template
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "18px",
              fontWeight: "500",
              color: "#000000",
              textAlign: "center",
              fontFamily: "Arial, sans-serif"
            }}>
              {completionDate}
            </div>
          </div>
        )}
      </div>
      
      <button
        onClick={handleDownload}
        className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold text-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105"
      >
        Download Certificate
      </button>
    </div>
  );
};

export default CertificatePDFTemplate;






