'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const PregnantFriendlyRoutinePage = () => {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.replace('/auth/signin');
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E43636]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-[#E43636]">
        <div className="absolute inset-0 bg-[#000000] opacity-30"></div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-[#F6EFD2] mb-6"
            >
              Pregnancy Friendly Routines
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-[#F6EFD2] opacity-90 mb-8"
            >
              Safe, low-impact routines designed for expectant mothers
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg text-[#F6EFD2] opacity-90 mb-8"
            >
              (2 white springs instead of 1 white spring for those who are pregnant)
            </motion.p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Exercise Guidelines */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8 border border-[#E43636]/20"
        >
          <h2 className="text-3xl font-bold text-[#E43636] mb-6">Exercise Guidelines for each Trimester</h2>
          
          {/* First Trimester */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#E43636] mb-3">First Trimester</h3>
            <ul className="list-disc list-inside text-[#000000] space-y-2">
              <li>Most exercises are fine to perform during this trimester, however, the mother should be mindful of taking breaks to not overexert the body</li>
              <li>Neutral spine exercises are the best option</li>
              <li>Keep range of motion small to moderate</li>
              <li>Do not hold stretches and breath</li>
              <li>Minimize stretching the hamstring and inner thighs (adductor)</li>
            </ul>
          </div>

          {/* Second Trimester */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#E43636] mb-3">Second Trimester (13 - 26 weeks)</h3>
            <ul className="list-disc list-inside text-[#000000] space-y-2">
              <li>No twisting or crunching ("torso twist should okay" and performed at the discretion of the mother) [have ready another exercise to substitute]</li>
              <li>Squatting exercises are a good exercise to prepare the pelvis for delivery</li>
              <li>No lifting of over 15 pounds</li>
              <li>Avoid laying on the back because it will decrease the supply of oxygen to the baby</li>
              <li>Do not allow the heart rate to pass 140 bpm</li>
              <li>It is recommended to utilize the stabilization pole</li>
              <li>2 white springs for 1 spring exercises is recommended (performing exercises on 1 white spring is at the discretion of the mother)</li>
              <li>5 white springs or 1 black spring is recommended rather than going too heavy (spring choice is at the discretion of the mother)</li>
              <li>Pelvic stability changes the most during week 20-27</li>
              <li>Take time when transitioning from exercise to exercise</li>
            </ul>
          </div>

          {/* Third Trimester */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#E43636] mb-3">Third Trimester (27 - 40 weeks)</h3>
            <p className="text-[#000000]">Same guidelines as Second Trimester apply.</p>
          </div>
        </motion.div>

        {/* Anatomic and Physiologic Changes */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8 border border-[#E43636]/20"
        >
          <h2 className="text-3xl font-bold text-[#E43636] mb-6">Anatomic and Physiologic Changes of Pregnancy:</h2>
          
          {/* Lungs and Respiration */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#E43636] mb-3">Lungs and Respiration</h3>
            <ul className="list-disc list-inside text-[#000000] space-y-2">
              <li>Changes in rib cage placement elevates the diaphragm</li>
              <li>The respiratory rate / oxygen intake increases to supply both mother and baby</li>
              <li>Endurance and energy can lower due to the body working harder to supply adequate</li>
            </ul>
          </div>

          {/* Joints */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#E43636] mb-3">Joints</h3>
            <ul className="list-disc list-inside text-[#000000] space-y-2">
              <li>The stability of joints and the action of muscles change</li>
              <li>The ligaments and cartilage soften and relax causing less stability in joints which can lead to an increase in injury</li>
              <li>The ligaments of the lower back and sacral area (S1 - S5) are greatly affected</li>
              <li>Incontinence (the lack of voluntary control over urination and/or elimination)</li>
              <li>The weight of the baby over time will increase pressure or stress on the bladder. Strengthening the pelvic floor can reduce this risk</li>
            </ul>
          </div>

          {/* Body Temperature */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#E43636] mb-3">Body Temperature</h3>
            <ul className="list-disc list-inside text-[#000000] space-y-2">
              <li>An increase in blood flow to the baby can increase core body temperature, which may cause feelings of dizziness and feeling light-headed</li>
            </ul>
          </div>

          {/* Balance and Postural Changes */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#E43636] mb-3">Balance and Postural Changes</h3>
            <ul className="list-disc list-inside text-[#000000] space-y-2">
              <li>The hip flexors will get short, sore, and tight from the weight of the stomach shifting the pelvis forward</li>
              <li>The center of gravity transfers upward and forward because of the weight increase of the front body</li>
              <li>The following can occur:</li>
              <li className="ml-4">• Lumbar Lordosis - An excessive arch in the lumbar portion of the back / spine</li>
              <li className="ml-4">• Thoracic Kyphosis - An increased roundness of the upper back</li>
              <li>Balance will be more difficult to maintain during exercise</li>
            </ul>
          </div>
        </motion.div>

        {/* Pregnancy Induced Conditions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8 border border-[#E43636]/20"
        >
          <h2 className="text-3xl font-bold text-[#E43636] mb-6">Pregnancy Induced Conditions</h2>
          
          {/* Diastasis Recti */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#E43636] mb-3">Diastasis Recti</h3>
            <ul className="list-disc list-inside text-[#000000] space-y-2">
              <li>This occurrence is in the later stages of pregnancy</li>
              <li>An increase in stretch and hormonal changes will cause the separation of the rectus abdominis muscles at the linea alba</li>
              <li>Avoid flexion, extension, and rotation</li>
            </ul>
          </div>

          {/* Symphysis Pubis Dysfunction */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#E43636] mb-3">Symphysis Pubis Dysfunction</h3>
            <ul className="list-disc list-inside text-[#000000] space-y-2">
              <li>Can be very painful</li>
              <li>The separation of the symphysis pubis due to hormonal changes and joint laxity (joint in the front of the pelvis)</li>
              <li>This is caused by hormonal change and joint laxity</li>
              <li>Keep range of motion medium to small and limit exercises of the abductors (outer thigh) and adductors (inner thigh)</li>
            </ul>
          </div>
        </motion.div>

        {/* Pregnancy Friendly Routine 01 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8 border border-[#E43636]/20"
        >
          <h2 className="text-3xl font-bold text-[#E43636] mb-4">Pregnancy Friendly Routine 01</h2>
          <p className="text-[#000000] mb-6">(2 white springs instead of 1 white spring for those who are pregnant)</p>
          
          {/* Important Notes */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#E43636] mb-3">Top 3 to inform the class before starting:</h3>
            <ul className="list-disc list-inside text-[#000000] space-y-2">
              <li>2 white springs at the front of the machine will be your modification</li>
              <li>There are stabilization poles if you ever need to use them</li>
              <li>Long black strap: the long black strap is lighter and the short hard handle is heavier</li>
            </ul>
          </div>

          {/* Exercises */}
          <div className="space-y-6">
            {/* Abs */}
            <div>
              <h4 className="text-lg font-semibold text-[#E43636] mb-2">Abs [10 min]</h4>
              <p className="text-[#000000] mb-2">(Challenge takers can attempt a Bird Dog in a Push-Up Position)</p>
              <ul className="list-disc list-inside text-[#000000] space-y-1">
                <li>Reverse Bird Dog (warm up)</li>
                <li>Reverse Bird Dog (warm up)</li>
                <li>Reverse Ab Wheel (up onto toes for challenge takers)</li>
                <li>Reverse Saw (up onto toes for challenge takers)</li>
                <li>Reverse Panther</li>
              </ul>
            </div>

            {/* Legs */}
            <div>
              <h4 className="text-lg font-semibold text-[#E43636] mb-2">Legs [10 min x 2 = 20 min] - Legs back to back</h4>
              <ul className="list-disc list-inside text-[#000000] space-y-1">
                <li>Well Lunge / Back floor lunge (harder)</li>
                <li>Kneeling inner thigh at the front (zero springs or go slower for stronger clients)</li>
                <li>Single leg squat</li>
                <li>Platform lunge</li>
                <li>Light Squats (watch out for knees collapsing inward)</li>
              </ul>
            </div>

            {/* Oblique + Upper Body */}
            <div>
              <h4 className="text-lg font-semibold text-[#E43636] mb-2">Oblique + Upper Body [11 min]</h4>
              <ul className="list-disc list-inside text-[#000000] space-y-1">
                <li>Torso Twist</li>
                <li>Serve the Platter</li>
                <li>Shoulder Press</li>
                <li>Tricep Extension</li>
                <li>Arm Circles (arms out in front of you like you're pushing someone away - circles up, out, down, up the center…then reverse)</li>
                <li className="ml-4">[1 min total - 30 seconds one way, 30 seconds the other way]</li>
                <li>Torso Twist</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Back to Routines Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link href="/routines">
            <button className="bg-[#E43636] hover:bg-[#000000] text-[#F6EFD2] font-bold py-3 px-6 rounded-lg transition-colors duration-200">
              Back to Routines
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default PregnantFriendlyRoutinePage; 