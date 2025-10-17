'use client';

import { useState } from 'react';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(null);
    setError(null);
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'Failed to send message');
      }
      setSuccess('Thanks! Your message has been sent.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      setError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-[#E43636] sm:text-5xl">
            Contact Me
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#000000]">
            Have questions? I'd love to hear from you. Send me a message and I'll respond as soon as possible.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-semibold text-[#E43636]">Get in Touch</h2>
            <div className="mt-6 space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-[#E43636]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-[#000000]">Email</p>
                  <a href="mailto:ExerciseStrengthCore@gmail.com" className="mt-1 text-sm text-[#E43636] hover:underline transition-colors">
                    ExerciseStrengthCore@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-[#E43636]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-[#000000]">Phone</p>
                  <a href="tel:+17147062451" className="mt-1 text-sm text-[#E43636] hover:underline transition-colors">
                    +1 (714) 706-2451
                  </a>
                </div>
              </div>
              <div className="pt-6">
                <h3 className="text-lg font-semibold text-[#E43636] mb-4">Follow Me</h3>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://www.instagram.com/esc_jonathan/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#000000] hover:text-[#E43636] transition-colors"
                  >
                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.tiktok.com/@esc_jonathan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#000000] hover:text-[#E43636] transition-colors"
                  >
                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/@esc_jonathan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#000000] hover:text-[#E43636] transition-colors"
                  >
                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                  <a
                    href="https://open.spotify.com/user/31xv52pkfh3scaib55rqwewj767m"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#000000] hover:text-[#1DB954] transition-colors"
                  >
                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {(success || error) && (
                <div className={
                  success
                    ? 'rounded-lg border-2 border-[#E2DDB4] bg-[#F6EFD2] text-[#000000] px-4 py-3'
                    : 'rounded-lg border-2 border-red-200 bg-red-50 text-red-700 px-4 py-3'
                }>
                  {success || error}
                </div>
              )}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-[#000000] mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="mt-1 block w-full rounded-lg border-2 border-[#E2DDB4] bg-white text-[#000000] placeholder-[#8B7355] shadow-sm focus:border-[#E43636] focus:ring-[#E43636] focus:outline-none px-4 py-3 text-base transition-colors"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#000000] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="mt-1 block w-full rounded-lg border-2 border-[#E2DDB4] bg-white text-[#000000] placeholder-[#8B7355] shadow-sm focus:border-[#E43636] focus:ring-[#E43636] focus:outline-none px-4 py-3 text-base transition-colors"
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-[#000000] mb-2">
                  Subject *
                </label>
                <select
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-2 border-[#E2DDB4] bg-white text-[#000000] shadow-sm focus:border-[#E43636] focus:ring-[#E43636] focus:outline-none px-4 py-3 text-base transition-colors"
                  required
                >
                  <option value="" className="text-[#8B7355]">Select a subject</option>
                  <option value="general" className="text-[#000000]">General Inquiry</option>
                  <option value="booking-teaching-training" className="text-[#000000]">Booking Teaching Training</option>
                  <option value="private-class" className="text-[#000000]">Private Class</option>
                  <option value="mentorship" className="text-[#000000]">Mentorship</option>
                  <option value="booking-workshop" className="text-[#000000]">Booking for 1-day Workshop</option>
                  <option value="collaborations" className="text-[#000000]">Collaborations</option>
                  <option value="membership-courses" className="text-[#000000]">Membership to Courses</option>
                  <option value="support" className="text-[#000000]">Technical Support</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-[#000000] mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me how I can help you..."
                  className="mt-1 block w-full rounded-lg border-2 border-[#E2DDB4] bg-white text-[#000000] placeholder-[#8B7355] shadow-sm focus:border-[#E43636] focus:ring-[#E43636] focus:outline-none px-4 py-3 text-base transition-colors resize-none"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={submitting}
                  className={`inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-[#E43636] focus:ring-offset-2 focus:ring-offset-[#F6EFD2] sm:text-sm transition-colors ${
                    submitting
                      ? 'bg-[#b82a2a] text-[#F6EFD2] cursor-not-allowed'
                      : 'bg-[#E43636] text-[#F6EFD2] hover:bg-[#000000] hover:text-[#E43636]'
                  }`}
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 