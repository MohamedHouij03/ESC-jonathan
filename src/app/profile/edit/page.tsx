"use client";

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ImageCropModal from '@/components/ImageCropModal';

export default function EditProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState('');
  const [studioName, setStudioName] = useState('');
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [selectedImageSrc, setSelectedImageSrc] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth/signin');
      return;
    }
    const parsed = JSON.parse(userData);
    setUser(parsed);
    setName(parsed.name || '');
    setStudioName(parsed.studioName || '');
    setProfilePhoto(parsed.profilePhoto || null);
    setPhotoPreview(parsed.profilePhoto || null);
    console.log('Profile photo loaded:', parsed.profilePhoto);
    setIsLoading(false);
  }, [router]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageSrc = reader.result as string;
        setSelectedImageSrc(imageSrc);
        setIsCropModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImageUrl: string) => {
    console.log('Crop completed, setting photo preview:', croppedImageUrl);
    setPhotoPreview(croppedImageUrl);
    setIsCropModalOpen(false);
    setSelectedImageSrc('');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSaving(true);
    setSaveError('');

    try {
      const response = await fetch('/api/user/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,
          name,
          studioName,
          profilePhoto: photoPreview
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Update localStorage with the server response
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Dispatch custom event to notify other components
        window.dispatchEvent(new CustomEvent('authChange'));
        
        router.push('/profile');
      } else {
        setSaveError(data.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setSaveError('Network error. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#E43636] border-t-transparent"></div>
          <p className="text-[#000000] font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold tracking-tight text-[#E43636] sm:text-5xl mb-4">
            Edit Profile
          </h1>
          <p className="text-lg text-[#000000]">
            Update your personal information and profile photo
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl border border-[#E2DDB4] p-8 md:p-12"
        >
          <form onSubmit={handleSave} className="max-w-2xl mx-auto">
            {/* Profile Photo Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative group mb-4">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl ring-4 ring-gray-200 transition-all duration-300 bg-white">
                  {photoPreview ? (
                    <img 
                      src={photoPreview} 
                      alt={`${name}'s Profile Photo`} 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        console.error('Image failed to load:', photoPreview);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-[#000000] text-4xl md:text-6xl font-bold">
                      {name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center cursor-pointer">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[#F6EFD2] text-sm font-medium px-4 py-2 bg-[#000000] rounded-full shadow hover:bg-[#E43636] transition-colors"
                  >
                    Edit Photo
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </div>
              <p className="text-sm text-[#000000]/60 text-center">
                Click on the photo to edit your profile picture
              </p>
            </div>

            {/* Error Message */}
            {saveError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{saveError}</p>
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-[#000000] font-semibold mb-2 text-lg">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full border-2 border-[#E2DDB4] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#E43636] focus:border-[#E43636] text-[#000000] bg-white transition-all duration-200"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-[#000000] font-semibold mb-2 text-lg">
                  Studio Name
                </label>
                <input
                  type="text"
                  value={studioName}
                  onChange={e => setStudioName(e.target.value)}
                  className="w-full border-2 border-[#E2DDB4] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#E43636] focus:border-[#E43636] text-[#000000] bg-white transition-all duration-200"
                  placeholder="Enter your studio name"
                />
              </div>

              <div>
                <label className="block text-[#000000] font-semibold mb-2 text-lg">
                  Email Address
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full border-2 border-[#E2DDB4] rounded-lg px-4 py-3 bg-gray-100 text-[#000000]/60 cursor-not-allowed"
                  placeholder="Email address"
                />
                <p className="text-sm text-[#000000]/60 mt-1">
                  Email address cannot be changed
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-[#E2DDB4]">
              <Link href="/profile" className="flex-1">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 bg-[#E2DDB4] text-[#000000] rounded-lg font-semibold shadow-lg border border-[#E2DDB4] hover:bg-[#E43636] hover:text-[#F6EFD2] transition-all duration-200"
                >
                  Cancel
                </motion.button>
              </Link>
              <motion.button
                type="submit"
                whileHover={{ scale: isSaving ? 1 : 1.02 }}
                whileTap={{ scale: isSaving ? 1 : 0.98 }}
                disabled={isSaving}
                className="flex-1 px-6 py-3 bg-[#E43636] text-[#F6EFD2] rounded-lg font-semibold shadow-lg border border-[#E43636] hover:bg-[#000000] hover:text-[#E43636] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#F6EFD2] border-t-transparent"></div>
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Back to Profile Link */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8"
        >
          <Link href="/profile">
            <span className="text-[#000000] hover:text-[#E43636] transition-colors duration-200 font-medium">
              ← Back to Profile
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Image Crop Modal */}
      <ImageCropModal
        isOpen={isCropModalOpen}
        onClose={() => setIsCropModalOpen(false)}
        imageSrc={selectedImageSrc}
        onCropComplete={handleCropComplete}
      />
    </div>
  );
} 