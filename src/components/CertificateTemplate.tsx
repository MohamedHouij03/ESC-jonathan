'use client';

import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface CertificateTemplateProps {
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

const CertificateTemplate: React.FC<CertificateTemplateProps> = ({ 
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
          border: "20px solid #1a365d",
          borderRadius: 25,
          padding: 50,
          boxShadow: "0 25px 80px rgba(0,0,0,0.3)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Times New Roman', 'Georgia', serif"
        }}
      >
        {/* Decorative Border Pattern */}
        <div style={{
          position: "absolute",
          top: 30,
          left: 30,
          right: 30,
          bottom: 30,
          border: "3px solid #2d3748",
          borderRadius: 15,
          opacity: 0.4
        }} />
        
        {/* Corner Decorations */}
        <div style={{
          position: "absolute",
          top: 40,
          left: 40,
          width: 60,
          height: 60,
          border: "4px solid #1a365d",
          borderRight: "none",
          borderBottom: "none",
          borderRadius: "12px 0 0 0"
        }} />
        <div style={{
          position: "absolute",
          top: 40,
          right: 40,
          width: 60,
          height: 60,
          border: "4px solid #1a365d",
          borderLeft: "none",
          borderBottom: "none",
          borderRadius: "0 12px 0 0"
        }} />
        <div style={{
          position: "absolute",
          bottom: 40,
          left: 40,
          width: 60,
          height: 60,
          border: "4px solid #1a365d",
          borderRight: "none",
          borderTop: "none",
          borderRadius: "0 0 0 12px"
        }} />
        <div style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          width: 60,
          height: 60,
          border: "4px solid #1a365d",
          borderLeft: "none",
          borderTop: "none",
          borderRadius: "0 0 12px 0"
        }} />

        {/* Background Pattern */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 15% 15%, rgba(26, 54, 93, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 85% 85%, rgba(26, 54, 93, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(26, 54, 93, 0.05) 0%, transparent 50%)
          `,
          zIndex: 0
        }} />

        {/* Certificate content */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Header with decorative line */}
          <div style={{ marginBottom: 40 }}>
            <div style={{
              width: 300,
              height: 4,
              background: "linear-gradient(90deg, #1a365d, #2d3748, #1a365d)",
              margin: "0 auto 20px",
              borderRadius: 2
            }} />
            <h1 style={{ 
              fontSize: 48, 
              fontWeight: 700, 
              color: "#1a365d", 
              marginBottom: 10,
              textShadow: "0 2px 4px rgba(0,0,0,0.1)",
              letterSpacing: "2px"
            }}>
              CERTIFICATE
            </h1>
            <h2 style={{
              fontSize: 32,
              fontWeight: 600,
              color: "#2d3748",
              marginBottom: 20,
              letterSpacing: "1px"
            }}>
              OF COMPLETION
            </h2>
            <div style={{
              width: 300,
              height: 4,
              background: "linear-gradient(90deg, #1a365d, #2d3748, #1a365d)",
              margin: "0 auto",
              borderRadius: 2
            }} />
          </div>
          
          {/* Main content */}
          <div style={{ marginBottom: 50 }}>
            <p style={{ 
              fontSize: 24, 
              margin: "50px 0 30px", 
              color: "#2d3748",
              fontStyle: "italic",
              fontWeight: 500
            }}>
              This is to certify that
            </p>
            
            <div style={{ 
              fontSize: 42, 
              fontWeight: 700, 
              color: "#1a365d", 
              marginBottom: 30,
              padding: "20px 40px",
              borderBottom: "6px solid #1a365d",
              borderTop: "6px solid #1a365d",
              display: "inline-block",
              letterSpacing: "1px",
              textShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}>
              {userName}
            </div>
            
            <p style={{ 
              fontSize: 24, 
              marginBottom: 30, 
              color: "#2d3748",
              fontStyle: "italic",
              fontWeight: 500
            }}>
              has successfully completed the course
            </p>
            
            <div style={{ 
              fontSize: 36, 
              fontWeight: 600, 
              color: "#1a365d", 
              marginBottom: 50,
              padding: "20px 50px",
              background: "linear-gradient(135deg, rgba(26, 54, 93, 0.1) 0%, rgba(45, 55, 72, 0.1) 100%)",
              borderRadius: 15,
              border: "3px solid rgba(26, 54, 93, 0.3)",
              letterSpacing: "1px"
            }}>
              {courseName}
            </div>
            
            <p style={{ 
              fontSize: 22, 
              color: "#2d3748", 
              marginBottom: 40,
              fontWeight: 500
            }}>
              Date of Completion: <span style={{ color: "#1a365d", fontWeight: 700 }}>{completionDate}</span>
            </p>
          </div>
          
          {/* Achievement message */}
          <div style={{ 
            marginTop: 50, 
            fontSize: 20, 
            color: "#4a5568",
            fontStyle: "italic",
            fontWeight: 500
          }}>
            Congratulations on your dedication and achievement!
          </div>
          
          {/* Signature section */}
          <div style={{ 
            marginTop: 100, 
            display: "flex", 
            justifyContent: "space-between",
            alignItems: "flex-end",
            padding: "0 80px"
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ 
                width: 200, 
                height: 3, 
                background: "#1a365d", 
                marginBottom: 15 
              }} />
              <span style={{ fontSize: 18, color: "#2d3748", fontWeight: 600 }}>Course Instructor</span>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ 
                width: 200, 
                height: 3, 
                background: "#1a365d", 
                marginBottom: 15 
              }} />
              <span style={{ fontSize: 18, color: "#2d3748", fontWeight: 600 }}>Program Director</span>
            </div>
          </div>
        </div>
      </div>
      
      <button
        onClick={handleDownload}
        className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-800 to-blue-900 text-white rounded-lg font-semibold text-lg shadow-lg hover:from-blue-900 hover:to-blue-950 transition-all duration-200 transform hover:scale-105"
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

export default CertificateTemplate;






