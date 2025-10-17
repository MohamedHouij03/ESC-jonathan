'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import CertificateWithPDFTemplate from '@/components/CertificateWithPDFTemplate';

interface Certificate {
  certificateId: string;
  courseName: string;
  completionDate: string;
  issuedAt: string;
}

export default function CertificatePage() {
  const params = useParams();
  const router = useRouter();
  const certificateId = params.certificateId as string;
  
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        setLoading(true);
        
        // Get user info from localStorage
        const userData = localStorage.getItem('user');
        if (!userData) {
          router.push('/login');
          return;
        }
        
        const user = JSON.parse(userData);
        setUserName(user.name || user.email || 'User');
        
        // Fetch certificate details
        const response = await fetch(`/api/certificates/${certificateId}`);
        const data = await response.json();
        
        if (data.success) {
          setCertificate(data.certificate);
        } else {
          setError('Certificate not found');
        }
      } catch (error) {
        console.error('Error fetching certificate:', error);
        setError('Failed to load certificate');
      } finally {
        setLoading(false);
      }
    };

    if (certificateId) {
      fetchCertificate();
    }
  }, [certificateId, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E43636] mx-auto mb-4"></div>
          <p className="text-[#000000]">Loading certificate...</p>
        </div>
      </div>
    );
  }

  if (error || !certificate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-[#000000] mb-2">Certificate Not Found</h1>
          <p className="text-[#000000]/70 mb-6">{error || 'The requested certificate could not be found.'}</p>
          <button
            onClick={() => router.push('/profile')}
            className="px-6 py-3 bg-[#E43636] text-white rounded-lg font-medium hover:bg-[#b82a2a] transition-colors"
          >
            Back to Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-[#000000] mb-2">Certificate of Completion</h1>
          <p className="text-[#000000]/70">Congratulations on completing your course!</p>
        </motion.div>

        {/* Certificate Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="flex flex-col items-center">
            <CertificateWithPDFTemplate
              userName={userName}
              courseName={certificate.courseName}
              completionDate={new Date(certificate.completionDate).toLocaleDateString()}
              userId={certificate.certificateId}
              courseId="level1-reformers"
              saveToBackend={false}
            />
          </div>
        </motion.div>

        {/* Certificate Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-2xl font-bold text-[#000000] mb-6">Certificate Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-[#000000] mb-2">Course Name</h3>
              <p className="text-[#000000]/70">{certificate.courseName}</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#000000] mb-2">Student Name</h3>
              <p className="text-[#000000]/70">{userName}</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#000000] mb-2">Completion Date</h3>
              <p className="text-[#000000]/70">{new Date(certificate.completionDate).toLocaleDateString()}</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#000000] mb-2">Certificate ID</h3>
              <p className="text-[#000000]/70 font-mono text-sm">{certificate.certificateId}</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={() => router.push('/profile')}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
            >
              Back to Profile
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-[#E43636] text-white rounded-lg font-medium hover:bg-[#b82a2a] transition-colors"
            >
              Print Certificate
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
