"use client";

import React from "react";
import { useParams } from "next/navigation";

export default function ExercisePage() {
  const params = useParams();
  const exerciseId = params.id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6EFD2] to-[#E8D5B7] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#E43636] mb-8">
          Exercise: {exerciseId}
        </h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <p className="text-gray-700 text-lg">
            This exercise page is under development. Exercise ID: {exerciseId}
          </p>
        </div>
      </div>
    </div>
  );
}