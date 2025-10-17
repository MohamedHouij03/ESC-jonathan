'use client';

import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface CertificateProps {
  userName: string;
  courseName: string;
  completionDate: string;
  userId?: string;
  courseId?: string;
  saveToBackend?: boolean;
  forwardedRef?: React.Ref<HTMLDivElement>;
}

// Move getRefCurrent outside so it is accessible everywhere in this file
function getRefCurrent(ref: React.Ref<HTMLDivElement>) {
  if (typeof ref === 'function' || !ref) return null;
  return (ref as React.RefObject<HTMLDivElement>).current;
}

const Certificate: React.FC<CertificateProps> = ({ 
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

      // Optionally save certificate record to backend
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
          // Don't throw error - certificate download was successful
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
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          border: "12px solid #dc2626",
          borderRadius: 20,
          padding: 40,
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Times New Roman', serif"
        }}
      >
        {/* Ornate border decoration */}
        <div style={{
          position: "absolute",
          top: 20,
          left: 20,
          right: 20,
          bottom: 20,
          border: "2px solid #dc2626",
          borderRadius: 12,
          opacity: 0.3
        }} />
        
        {/* Corner decorations */}
        <div style={{
          position: "absolute",
          top: 30,
          left: 30,
          width: 40,
          height: 40,
          border: "3px solid #dc2626",
          borderRight: "none",
          borderBottom: "none",
          borderRadius: "8px 0 0 0"
        }} />
        <div style={{
          position: "absolute",
          top: 30,
          right: 30,
          width: 40,
          height: 40,
          border: "3px solid #dc2626",
          borderLeft: "none",
          borderBottom: "none",
          borderRadius: "0 8px 0 0"
        }} />
        <div style={{
          position: "absolute",
          bottom: 30,
          left: 30,
          width: 40,
          height: 40,
          border: "3px solid #dc2626",
          borderRight: "none",
          borderTop: "none",
          borderRadius: "0 0 0 8px"
        }} />
        <div style={{
          position: "absolute",
          bottom: 30,
          right: 30,
          width: 40,
          height: 40,
          border: "3px solid #dc2626",
          borderLeft: "none",
          borderTop: "none",
          borderRadius: "0 0 8px 0"
        }} />

        {/* Background pattern */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 20%, rgba(220, 38, 38, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(220, 38, 38, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(220, 38, 38, 0.03) 0%, transparent 50%)
          `,
          zIndex: 0
        }} />

        {/* Certificate content */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Header */}
          <div style={{ marginBottom: 30 }}>
            <h1 style={{ 
              fontSize: 42, 
              fontWeight: 700, 
              color: "#dc2626", 
              marginBottom: 8,
              textShadow: "0 2px 4px rgba(0,0,0,0.1)",
              letterSpacing: "1px"
            }}>
              CERTIFICATE OF COMPLETION
            </h1>
            <div style={{
              width: 200,
              height: 3,
              background: "linear-gradient(90deg, #dc2626, #ef4444, #dc2626)",
              margin: "0 auto",
              borderRadius: 2
            }} />
          </div>
          
          {/* Main content */}
          <div style={{ marginBottom: 40 }}>
            <p style={{ 
              fontSize: 22, 
              margin: "40px 0 20px", 
              color: "#374151",
              fontStyle: "italic"
            }}>
              This is to certify that
            </p>
            
            <div style={{ 
              fontSize: 36, 
              fontWeight: 600, 
              color: "#1f2937", 
              marginBottom: 20,
              padding: "12px 24px",
              borderBottom: "4px solid #dc2626",
              borderTop: "4px solid #dc2626",
              display: "inline-block",
              letterSpacing: "0.5px"
            }}>
              {userName}
            </div>
            
            <p style={{ 
              fontSize: 22, 
              marginBottom: 20, 
              color: "#374151",
              fontStyle: "italic"
            }}>
              has successfully completed the course
            </p>
            
            <div style={{ 
              fontSize: 32, 
              fontWeight: 500, 
              color: "#dc2626", 
              marginBottom: 40,
              padding: "16px 32px",
              background: "linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(239, 68, 68, 0.1) 100%)",
              borderRadius: 12,
              border: "2px solid rgba(220, 38, 38, 0.2)",
              letterSpacing: "0.5px"
            }}>
              {courseName}
            </div>
            
            <p style={{ 
              fontSize: 20, 
              color: "#374151", 
              marginBottom: 30,
              fontWeight: 500
            }}>
              Date of Completion: <span style={{ color: "#dc2626", fontWeight: 600 }}>{completionDate}</span>
            </p>
          </div>
          
          {/* Achievement message */}
          <div style={{ 
            marginTop: 40, 
            fontSize: 18, 
            color: "#6b7280",
            fontStyle: "italic",
            fontWeight: 500
          }}>
            Congratulations on your dedication and achievement!
          </div>
          
          {/* Signature section */}
          <div style={{ 
            marginTop: 80, 
            display: "flex", 
            justifyContent: "space-between",
            alignItems: "flex-end",
            padding: "0 60px"
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ 
                width: 150, 
                height: 2, 
                background: "#dc2626", 
                marginBottom: 12 
              }} />
              <span style={{ fontSize: 16, color: "#374151", fontWeight: 500 }}>Course Instructor</span>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ 
                width: 150, 
                height: 2, 
                background: "#dc2626", 
                marginBottom: 12 
              }} />
              <span style={{ fontSize: 16, color: "#374151", fontWeight: 500 }}>Program Director</span>
            </div>
          </div>
        </div>
      </div>
      
      <button
        onClick={handleDownload}
        className="mt-8 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold text-lg shadow-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 transform hover:scale-105"
      >
        Download Certificate
      </button>
    </div>
  );
};

export async function openCertificatePdfInNewTab(certRef: React.Ref<HTMLDivElement>, userName: string, courseName: string) {
  const node = getRefCurrent(certRef);
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
    const pdfBlob = pdf.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');
  } catch (error) {
    console.error('Error generating certificate PDF:', error);
  }
}

export default Certificate; 