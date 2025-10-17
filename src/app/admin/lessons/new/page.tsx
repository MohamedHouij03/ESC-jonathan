'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface LessonFormData {
  title: string;
  chapterTitle: string;
  progress: number;
  videoUrl: string;
  images: Array<{ src: string; alt: string; file?: File }>;
  currentLessonPath: string;
  nextLessonPath: string;
  lessonGoals: string[];
  resources: Array<{ name: string; type: string; size: string; }>;
  exerciseInstructions: string[];
  keyPoints: string[];
  physicalBenefits: string[];
  functionalBenefits: string[];
  lessonType: 'video' | 'image' | 'mixed';
}

export default function NewLesson() {
  const [formData, setFormData] = useState<LessonFormData>({
    title: '',
    chapterTitle: '',
    progress: 0,
    videoUrl: '',
    images: [],
    currentLessonPath: '',
    nextLessonPath: '',
    lessonGoals: [''],
    resources: [{ name: '', type: 'pdf', size: '' }],
    exerciseInstructions: [''],
    keyPoints: [''],
    physicalBenefits: [''],
    functionalBenefits: [''],
    lessonType: 'image'
  });

  const [previewMode, setPreviewMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof LessonFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field: 'lessonGoals' | 'resources' | 'exerciseInstructions' | 'keyPoints' | 'physicalBenefits' | 'functionalBenefits', index: number, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'lessonGoals' | 'exerciseInstructions' | 'keyPoints' | 'physicalBenefits' | 'functionalBenefits') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const addResource = () => {
    setFormData(prev => ({
      ...prev,
      resources: [...prev.resources, { name: '', type: 'pdf', size: '' }]
    }));
  };

  const removeArrayItem = (field: 'lessonGoals' | 'resources' | 'exerciseInstructions' | 'keyPoints' | 'physicalBenefits' | 'functionalBenefits', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, {
            src: e.target?.result as string,
            alt: `Exercise image ${prev.images.length + 1}`,
            file
          }]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const generateLessonData = () => {
    return {
      id: Date.now().toString(),
      title: formData.title,
      chapterTitle: formData.chapterTitle,
      progress: formData.progress,
      videoUrl: formData.videoUrl,
      images: formData.images,
      currentLessonPath: formData.currentLessonPath,
      nextLessonPath: formData.nextLessonPath,
      lessonGoals: formData.lessonGoals.filter(goal => goal.trim() !== ''),
      resources: formData.resources.filter(resource => resource.name.trim() !== ''),
      comments: [
        { user: 'Sample User', time: '1 hour ago', text: 'Great lesson! Very helpful.' }
      ],
      benefits: {
        physical: formData.physicalBenefits.filter(benefit => benefit.trim() !== ''),
        functional: formData.functionalBenefits.filter(benefit => benefit.trim() !== '')
      }
    };
  };

  const handleSave = async () => {
    const lessonData = generateLessonData();
    
    // Here you would save to your database/API
    console.log('Saving lesson:', lessonData);
    
    // For now, just show success message
    alert('Lesson saved successfully!');
  };

  const handleGenerateCode = () => {
    const lessonData = generateLessonData();
    
    const code = `'use client';

import LessonTemplate from '@/components/LessonTemplate';

const lessonData = ${JSON.stringify(lessonData, null, 2)};

export default function ${formData.title.replace(/[^a-zA-Z0-9]/g, '')}() {
  return (
    <LessonTemplate 
      lessonData={lessonData}
      showVideo={${formData.lessonType === 'video' || formData.lessonType === 'mixed'}}
      showTabs={${formData.lessonType === 'mixed'}}
      imageOnly={${formData.lessonType === 'image'}}
    />
  );
}`;

    // Copy to clipboard
    navigator.clipboard.writeText(code);
    alert('Generated code copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create New Lesson</h1>
              <p className="text-gray-600">Build a lesson using the template system</p>
            </div>
            <div className="flex space-x-4">
              <Link 
                href="/admin/dashboard"
                className="bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                ← Back to Dashboard
              </Link>
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                {previewMode ? 'Edit Mode' : 'Preview Mode'}
              </button>
              <button
                onClick={handleGenerateCode}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Generate Code
              </button>
              <button
                onClick={handleSave}
                className="bg-[#E43636] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#b82a2a] transition-colors"
              >
                Save Lesson
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {previewMode ? (
          /* Preview Mode - Show how the lesson will look */
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Lesson Preview</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <p className="text-gray-600 text-center">
                Preview would show the actual lesson template here with your data
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded">
                <h3 className="font-bold">Title: {formData.title || 'Untitled Lesson'}</h3>
                <p>Type: {formData.lessonType}</p>
                <p>Images: {formData.images.length}</p>
                <p>Goals: {formData.lessonGoals.filter(g => g.trim()).length}</p>
              </div>
            </div>
          </div>
        ) : (
          /* Edit Mode - Show the form */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Basic Info */}
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Basic Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Lesson Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E43636] focus:border-transparent text-gray-900"
                      placeholder="e.g., Transverse Abdominis"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Chapter Title</label>
                    <input
                      type="text"
                      value={formData.chapterTitle}
                      onChange={(e) => handleInputChange('chapterTitle', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E43636] focus:border-transparent text-gray-900"
                      placeholder="e.g., Chapter 3: Core Fundamentals"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Progress (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.progress}
                      onChange={(e) => handleInputChange('progress', parseInt(e.target.value) || 0)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E43636] focus:border-transparent text-gray-900"
                      placeholder="80"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Lesson Type</label>
                    <select
                      value={formData.lessonType}
                      onChange={(e) => handleInputChange('lessonType', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E43636] focus:border-transparent text-gray-900"
                    >
                      <option value="image">Image Only</option>
                      <option value="video">Video Only</option>
                      <option value="mixed">Video + Tabs</option>
                    </select>
                  </div>

                  {(formData.lessonType === 'video' || formData.lessonType === 'mixed') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Video URL (YouTube Embed)</label>
                      <input
                        type="url"
                        value={formData.videoUrl}
                        onChange={(e) => handleInputChange('videoUrl', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E43636] focus:border-transparent text-gray-900"
                        placeholder="https://www.youtube.com/embed/..."
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation Paths */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Navigation</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Lesson Path</label>
                    <input
                      type="text"
                      value={formData.currentLessonPath}
                      onChange={(e) => handleInputChange('currentLessonPath', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E43636] focus:border-transparent text-gray-900"
                      placeholder="/courses/level1-reformers/content/chapter-3/3-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Next Lesson Path</label>
                    <input
                      type="text"
                      value={formData.nextLessonPath}
                      onChange={(e) => handleInputChange('nextLessonPath', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E43636] focus:border-transparent text-gray-900"
                      placeholder="/courses/level1-reformers/content/chapter-3/3-2"
                    />
                  </div>
                </div>
              </div>

              {/* Images */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Exercise Images</h2>
                
                <div className="space-y-4">
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files)}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#E43636] transition-colors"
                    >
                      <div className="text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="mt-2 text-sm text-gray-600">Click to upload images</p>
                      </div>
                    </button>
                  </div>

                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            width={200}
                            height={150}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="space-y-6">
              {/* Lesson Goals */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Lesson Goals</h2>
                
                <div className="space-y-2">
                  {formData.lessonGoals.map((goal, index) => (
                    <div key={index} className="flex space-x-2">
                      <input
                        type="text"
                        value={goal}
                        onChange={(e) => handleArrayChange('lessonGoals', index, e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#E43636] focus:border-transparent text-gray-900"
                        placeholder="Enter lesson goal"
                      />
                      <button
                        onClick={() => removeArrayItem('lessonGoals', index)}
                        className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addArrayItem('lessonGoals')}
                    className="w-full p-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
                  >
                    + Add Goal
                  </button>
                </div>
              </div>

              {/* Resources */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Resources</h2>
                
                <div className="space-y-3">
                  {formData.resources.map((resource, index) => (
                    <div key={index} className="flex space-x-2">
                      <input
                        type="text"
                        value={resource.name}
                        onChange={(e) => handleArrayChange('resources', index, { ...resource, name: e.target.value })}
                        className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#E43636] focus:border-transparent text-gray-900"
                        placeholder="Resource name"
                      />
                      <select
                        value={resource.type}
                        onChange={(e) => handleArrayChange('resources', index, { ...resource, type: e.target.value })}
                        className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#E43636] focus:border-transparent text-gray-900"
                      >
                        <option value="pdf">PDF</option>
                        <option value="video">Video</option>
                        <option value="audio">Audio</option>
                      </select>
                      <input
                        type="text"
                        value={resource.size}
                        onChange={(e) => handleArrayChange('resources', index, { ...resource, size: e.target.value })}
                        className="w-20 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#E43636] focus:border-transparent text-gray-900"
                        placeholder="Size"
                      />
                      <button
                        onClick={() => removeArrayItem('resources', index)}
                        className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addResource}
                    className="w-full p-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
                  >
                    + Add Resource
                  </button>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Benefits</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-2">Physical Benefits</h3>
                    {formData.physicalBenefits.map((benefit, index) => (
                      <div key={index} className="flex space-x-2 mb-2">
                        <input
                          type="text"
                          value={benefit}
                          onChange={(e) => handleArrayChange('physicalBenefits', index, e.target.value)}
                          className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#E43636] focus:border-transparent text-gray-900"
                          placeholder="Physical benefit"
                        />
                        <button
                          onClick={() => removeArrayItem('physicalBenefits', index)}
                          className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addArrayItem('physicalBenefits')}
                      className="w-full p-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 text-sm"
                    >
                      + Add Physical Benefit
                    </button>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Functional Benefits</h3>
                    {formData.functionalBenefits.map((benefit, index) => (
                      <div key={index} className="flex space-x-2 mb-2">
                        <input
                          type="text"
                          value={benefit}
                          onChange={(e) => handleArrayChange('functionalBenefits', index, e.target.value)}
                          className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#E43636] focus:border-transparent text-gray-900"
                          placeholder="Functional benefit"
                        />
                        <button
                          onClick={() => removeArrayItem('functionalBenefits', index)}
                          className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addArrayItem('functionalBenefits')}
                      className="w-full p-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 text-sm"
                    >
                      + Add Functional Benefit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
