import React from 'react';

export default function Lesson721() {
  return (
    <div className="min-h-screen bg-[#F6EFD2] p-8">
      <h1 className="text-3xl font-bold text-[#E43636] mb-4">Lesson 7-21</h1>
      <div className="mb-6 w-full flex justify-center">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/yv_vKk8C-qA"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="rounded-xl w-full max-w-xl h-64"
        ></iframe>
      </div>

      <div className="flex justify-between mt-12">
        <a
          href="/courses/level1-megacore/content/chapter-7/7-20"
          className="px-6 py-3 bg-[#E43636] text-[#F6EFD2] rounded-full font-semibold shadow hover:bg-[#b82a2a] transition-colors text-lg"
        >
          Previous Lesson
        </a>
        <a
          href="/courses/level1-megacore"
          className="px-6 py-3 bg-[#E43636] text-[#F6EFD2] rounded-full font-semibold shadow hover:bg-[#b82a2a] transition-colors text-lg"
        >
          Back to Course
        </a>
      </div>
    </div>
  );
}
