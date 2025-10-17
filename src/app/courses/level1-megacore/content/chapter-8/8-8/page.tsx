import React from 'react';

export default function Lesson88() {
  return (
    <div className="min-h-screen bg-[#F6EFD2] p-8">
      <h1 className="text-3xl font-bold text-[#E43636] mb-4">Tricep Extension</h1>
      <div className="mb-6 w-full flex justify-center">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/nNE8D180ofE"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="rounded-xl w-full max-w-xl h-64"
        ></iframe>
      </div>
      
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-[#E43636] mb-2">Tricep Extension</h2>
        <p className="text-[#000000] mb-2">Kneeling on the carriage, facing the front platform</p>
        <ul className="list-disc pl-6 text-[#000000] mb-2">
          <li><b>Standard:</b> 1 black spring</li>
          <li><b>Modification:</b> Use the long black straps; or 2 gray springs</li>
          <li><b>Intensification:</b> 1 black spring + 1 gray springs</li>
        </ul>
        
        <h3 className="font-semibold text-[#E43636] mt-4">Setup (how to get into position)</h3>
        <ul className="list-disc pl-6 text-[#000000] mb-2">
          <li>Start by kneeling on the carriage facing forward</li>
          <li>Grab the long black straps located on the sides of the carriage and hold them by the short hard handles</li>
          <li>Bring your hands behind your head and interlace your fingers together, holding the short hard handles between both hands</li>
          <li>Sit halfway down and chest halfway forward (butt above the heels, chest above the thighs)</li>
          <li>Engage your core</li>
        </ul>
        
        <h3 className="font-semibold text-[#E43636] mt-4">Execution (how to perform the exercise)</h3>
        <ul className="list-disc pl-6 text-[#000000] mb-2">
          <li><b>Exhale:</b> As you extend your arms up and away, keeping the elbows close to your ears and looking down and slightly forward at the springs to keep your neck in line with your spine</li>
          <li><b>Inhale:</b> As you bend your elbows to bring your hands down behind your head</li>
        </ul>
        
        <h3 className="font-semibold text-[#E43636] mt-4">DO NOT</h3>
        <ul className="list-disc pl-6 text-[#E43636] mb-2">
          <li>DO NOT tuck your chin into your chest</li>
          <li>DO NOT lock out your elbows at the top</li>
          <li>DO NOT let your elbows flare outwards</li>
        </ul>
        
        <h3 className="font-semibold text-[#E43636] mt-4">Modification(s) (easier)</h3>
        <ul className="list-disc pl-6 text-[#000000] mb-2">
          <li>Move back on your knees towards the back platform</li>
          <li>Use the long black straps instead of the short hard handles</li>
          <li>Sit down on your heels</li>
        </ul>
        
        <h3 className="font-semibold text-[#E43636] mt-4">Intensification(s) (harder)</h3>
        <ul className="list-disc pl-6 text-[#000000] mb-2">
          <li>Move forward on your knees towards the front platform</li>
        </ul>
        
        <h3 className="font-semibold text-[#E43636] mt-4">Challenge(s)</h3>
        <ul className="list-disc pl-6 text-[#000000] mb-2">
          <li><b>Holds and pulses:</b></li>
          <li>Bring your arms halfway up and forward</li>
          <li>pulse down 2 inches and up and forward 2 inches (easier)</li>
          <li>pulse up and forward 2 inches and down 2 inches (harder)</li>
        </ul>
      </section>

      <div className="flex justify-between mt-12">
        <a
          href="/courses/level1-megacore/content/chapter-8/8-7"
          className="px-6 py-3 bg-[#E43636] text-[#F6EFD2] rounded-full font-semibold shadow hover:bg-[#b82a2a] transition-colors text-lg"
        >
          Previous Lesson
        </a>
                        <a
                  href="/courses/level1-megacore/content/chapter-8/8-9"
                  className="px-6 py-3 bg-[#E43636] text-[#F6EFD2] rounded-full font-semibold shadow hover:bg-[#b82a2a] transition-colors text-lg"
                >
                  Next Lesson
                </a>
      </div>
    </div>
  );
}
