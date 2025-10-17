'use client';

import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface CertificateWithTemplateProps {
  userName: string;
  courseName: string;
  completionDate: string;
  userId?: string;
  courseId?: string;
  saveToBackend?: boolean;
  forwardedRef?: React.Ref<HTMLDivElement>;
}

function getRefCurrent(ref: React.Ref<HTMLDivElement>) {
  if (typeof ref === 'function' || !ref) return null;
  return (ref as React.RefObject<HTMLDivElement>).current;
}

const CertificateWithTemplate: React.FC<CertificateWithTemplateProps> = ({ 
  userName, 
  courseName, 
  completionDate, 
  userId, 
  courseId, 
  saveToBackend = false, 
  forwardedRef
}) => {
  const certRef = useRef<HTMLDivElement>(null);
  const refToUse = forwardedRef || certRef;

  const handleDownload = async () => {
    const node = getRefCurrent(refToUse);
    if (!node) return;
    
    try {
      const canvas = await html2canvas(node, { 
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
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
      <div
        ref={refToUse}
        style={{
          width: 800,
          height: 565,
          position: "relative",
          backgroundImage: "url('/certificate-template.png')", // Your template image
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          border: "2px solid #ccc",
          borderRadius: 10,
        }}
      >
        {/* Overlay text on your template */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
        }}>
          {/* Student Name - Position this where your template expects it */}
          <div style={{
            position: "absolute",
            top: "45%", // Adjust these positions to match your template
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "32px",
            fontWeight: "bold",
            color: "#000000", // Adjust color to match your template
            textAlign: "center",
            fontFamily: "Arial, sans-serif"
          }}>
            {userName}
          </div>

          {/* Course Name - Position this where your template expects it */}
          <div style={{
            position: "absolute",
            top: "55%", // Adjust these positions to match your template
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "24px",
            fontWeight: "600",
            color: "#000000", // Adjust color to match your template
            textAlign: "center",
            fontFamily: "Arial, sans-serif"
          }}>
            {courseName}
          </div>

          {/* Completion Date - Position this where your template expects it */}
          <div style={{
            position: "absolute",
            top: "65%", // Adjust these positions to match your template
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "18px",
            fontWeight: "500",
            color: "#000000", // Adjust color to match your template
            textAlign: "center",
            fontFamily: "Arial, sans-serif"
          }}>
            {completionDate}
          </div>
        </div>
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

export default CertificateWithTemplate;






