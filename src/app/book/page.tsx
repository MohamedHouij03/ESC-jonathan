"use client";

import { useState } from "react";

const inquiryOptions = [
  "Level 1 Studio Training",
  "1 on 1 Student Training (IN PERSON)",
  "1 on 1 Student Training (VIRTUAL)",
  "Post Certification Training (additional practice)",
  "Support opening a studio",
  "Other",
];

export default function BookPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    social: "",
    inquiry: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState("");
  const [section, setSection] = useState(1);
  const [studioFields, setStudioFields] = useState({
    studioName: '',
    cityState: '',
    hostDate: '',
    purchasedMachine: '',
    additionalQuestions: '',
  });
  const [trainerFields, setTrainerFields] = useState<{
    skills: string[];
    schedule: string;
    additionalQuestions: string;
  }>({
    skills: [],
    schedule: '',
    additionalQuestions: '',
  });

  const skillOptions = [
    'Cueing (level 1: simple how to cue)',
    'Cueing (level 2: more muscle activation)',
    'Using the timer',
    'Routine formulation',
    'Learning new exercises',
    'Other...'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRadio = (value: string) => {
    setForm({ ...form, inquiry: value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleStudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudioFields({ ...studioFields, [e.target.name]: e.target.value });
  };

  const handleStudioRadio = (value: string) => {
    setStudioFields({ ...studioFields, purchasedMachine: value });
  };

  const handleTrainerCheckbox = (option: string) => {
    setTrainerFields((prev) => {
      if (prev.skills.includes(option)) {
        return { ...prev, skills: prev.skills.filter((s) => s !== option) };
      } else {
        return { ...prev, skills: [...prev.skills, option] };
      }
    });
  };

  const handleTrainerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrainerFields({ ...trainerFields, [e.target.name]: e.target.value });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    // Section 1 validation
    if (section === 1) {
      if (!form.name || !form.email || !form.phone || !form.inquiry) {
        setTouched({ name: true, email: true, phone: true, inquiry: true });
        setError('Please fill in all required fields.');
        return;
      }
      setError('');
      // If Level 1 Studio Training, go to section 2
      if (form.inquiry === 'Level 1 Studio Training') {
        setSection(2);
      } else {
        // If not, skip to section 3 (to be implemented)
        setSection(3);
      }
    } else if (section === 2) {
      // Section 2 validation
      if (!studioFields.studioName || !studioFields.cityState || !studioFields.hostDate || !studioFields.purchasedMachine) {
        setError('Please fill in all required fields.');
        return;
      }
      setError('');
      setSection(3); // To be implemented
    } else if (section === 3) {
      // Section 3 validation
      if (
        (form.inquiry !== 'Level 1 Studio Training' && trainerFields.skills.length === 0) ||
        (form.inquiry !== 'Level 1 Studio Training' && !trainerFields.schedule)
      ) {
        setError('Please fill in all required fields.');
        return;
      }
      setError('');
      setSubmitted(true);
    }
  };

  const isInvalid = (field: keyof typeof form) => touched[field] && !form[field];

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4 text-[#E43636]">Thank you!</h2>
          <p className="text-[#000000]">Your inquiry has been received. I will review your information and get back to you soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-[calc(100vh-160px)] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Video Section */}
        <div className="mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4 text-[#E43636] text-center">Watch Our Training in Action</h2>
            <p className="text-[#000000] text-center mb-6">
              Get a glimpse of our E.S.C.P training methodology and see what you can expect from our sessions.
            </p>
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/owAUSpR1_5g"
                title="E.S.C.P Training Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="max-w-md mx-auto">
          <form onSubmit={section === 1 ? handleNext : handleNext} className="w-full">
            <h1 className="text-3xl font-bold mb-2 text-[#E43636] text-center">E.S.C.P Training Inquiry</h1>
            <p className="text-[#000000] text-center mb-6">
              Thank you for your interest in training with me! Please fill out the form below to let me know the type of training you're looking for, your preferred training schedule, and whether you are a studio or an individual.<br/>
              Once submitted, I'll review your information and get back to you with more information about training and the next steps. I look forward to connecting with you!
            </p>
            {section === 1 && (
              <>
                <div className="mb-4">
                  <label className="block text-[#000000] font-semibold mb-1">
                    Name <span className="text-[#E43636]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E43636] transition-all ${isInvalid('name') ? 'border-[#E43636]' : 'border-[#E2DDB4]'}`}
                    required
                    placeholder="Your answer"
                  />
                  {isInvalid('name') && <p className="text-[#E43636] text-sm mt-1">Name is required.</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-[#000000] font-semibold mb-1">
                    Email <span className="text-[#E43636]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E43636] transition-all ${isInvalid('email') ? 'border-[#E43636]' : 'border-[#E2DDB4]'}`}
                    required
                    placeholder="Your answer"
                  />
                  {isInvalid('email') && <p className="text-[#E43636] text-sm mt-1">Email is required.</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-[#000000] font-semibold mb-1">
                    Phone Number <span className="text-[#E43636]">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E43636] transition-all ${isInvalid('phone') ? 'border-[#E43636]' : 'border-[#E2DDB4]'}`}
                    required
                    placeholder="Your phone number"
                  />
                  {isInvalid('phone') && <p className="text-[#E43636] text-sm mt-1">Phone number is required.</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-[#000000] font-semibold mb-1">Social Media Handle</label>
                  <input
                    type="text"
                    name="social"
                    value={form.social}
                    onChange={handleChange}
                    className="w-full border border-[#E2DDB4] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E43636] text-[#000000]"
                    placeholder="@yourhandle"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[#000000] font-semibold mb-2">
                    What are you inquiring about? <span className="text-[#E43636]">*</span>
                  </label>
                  <div className="space-y-2 pl-1">
                    {inquiryOptions.map((option) => (
                      <label key={option} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="inquiry"
                          value={option}
                          checked={form.inquiry === option}
                          onChange={() => handleRadio(option)}
                          onBlur={() => setTouched((t) => ({ ...t, inquiry: true }))}
                          className="accent-[#E43636] h-4 w-4"
                          required
                        />
                        <span className="text-[#000000]">{option}</span>
                      </label>
                    ))}
                  </div>
                  {isInvalid('inquiry') && <p className="text-[#E43636] text-sm mt-1">Please select an option.</p>}
                </div>
                {error && <p className="text-[#E43636] mb-4 text-sm text-center">{error}</p>}
                <button
                  type="submit"
                  className="w-full bg-[#E43636] text-[#F6EFD2] font-bold py-3 rounded-lg hover:bg-[#000000] hover:text-[#E43636] transition-colors mt-2 text-lg shadow"
                >
                  Next
                </button>
              </>
            )}
            {section === 2 && (
              <>
                <h2 className="text-xl font-bold mb-4 text-[#E43636]">Studio Training</h2>
                <div className="mb-4">
                  <label className="block text-[#000000] font-semibold mb-1">
                    Studio Name (type "N/A" if there is no name yet) <span className="text-[#E43636]">*</span>
                  </label>
                  <input
                    type="text"
                    name="studioName"
                    value={studioFields.studioName}
                    onChange={handleStudioChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E43636] transition-all ${!studioFields.studioName && error ? 'border-[#E43636]' : 'border-[#E2DDB4]'} text-[#000000]`}
                    required
                    placeholder="Short answer text"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[#000000] font-semibold mb-1">
                    City & State <span className="text-[#E43636]">*</span>
                  </label>
                  <input
                    type="text"
                    name="cityState"
                    value={studioFields.cityState}
                    onChange={handleStudioChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E43636] transition-all ${!studioFields.cityState && error ? 'border-[#E43636]' : 'border-[#E2DDB4]'} text-[#000000]`}
                    required
                    placeholder="Short answer text"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[#000000] font-semibold mb-1">
                    When are you looking to host Level 1 Training? <span className="text-[#E43636]">*</span>
                  </label>
                  <input
                    type="text"
                    name="hostDate"
                    value={studioFields.hostDate}
                    onChange={handleStudioChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E43636] transition-all ${!studioFields.hostDate && error ? 'border-[#E43636]' : 'border-[#E2DDB4]'} text-[#000000]`}
                    required
                    placeholder="Short answer text"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[#000000] font-semibold mb-2">
                    Have you purchased a machine yet? <span className="text-[#E43636]">*</span>
                  </label>
                  <div className="space-y-2 pl-1">
                    {['Yes!', 'No'].map((option) => (
                      <label key={option} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="purchasedMachine"
                          value={option}
                          checked={studioFields.purchasedMachine === option}
                          onChange={() => handleStudioRadio(option)}
                          className="accent-[#E43636] h-4 w-4 bg-[#F6EFD2] border border-[#E2DDB4]"
                          required
                        />
                        <span className="text-[#000000]">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-[#000000] font-semibold mb-1">
                    Any additional questions?
                  </label>
                  <input
                    type="text"
                    name="additionalQuestions"
                    value={studioFields.additionalQuestions}
                    onChange={handleStudioChange}
                    className="w-full border border-[#E2DDB4] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E43636] text-[#000000]"
                    placeholder="Short answer text"
                  />
                </div>
                {error && <p className="text-[#E43636] mb-4 text-sm text-center">{error}</p>}
                <button
                  type="submit"
                  className="w-full bg-[#E43636] text-[#F6EFD2] font-bold py-3 rounded-lg hover:bg-[#000000] hover:text-[#E43636] transition-colors mt-2 text-lg shadow"
                >
                  Next
                </button>
              </>
            )}
            {section === 3 && (
              <>
                <h2 className="text-xl font-bold mb-4 text-[#E43636]">Individual Trainers</h2>
                <div className="mb-4">
                  <label className="block text-[#000000] font-semibold mb-2">
                    What are the skills you want to enhance? <span className="text-[#E43636]">*</span>
                  </label>
                  <div className="space-y-2 pl-1">
                    {skillOptions.map((option) => (
                      <label key={option} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="skills"
                          value={option}
                          checked={trainerFields.skills.includes(option)}
                          onChange={() => handleTrainerCheckbox(option)}
                          className="accent-[#E43636] h-4 w-4 bg-[#F6EFD2] border border-[#E2DDB4]"
                          required={trainerFields.skills.length === 0}
                        />
                        <span className="text-[#000000]">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-[#000000] font-semibold mb-1">
                    When would you like to schedule your training session? <span className="text-[#E43636]">*</span>
                  </label>
                  <input
                    type="text"
                    name="schedule"
                    value={trainerFields.schedule}
                    onChange={handleTrainerChange}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E43636] transition-all text-[#000000] border-[#E2DDB4]"
                    required
                    placeholder="Short answer text"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[#000000] font-semibold mb-1">
                    Additional questions?
                  </label>
                  <input
                    type="text"
                    name="additionalQuestions"
                    value={trainerFields.additionalQuestions}
                    onChange={handleTrainerChange}
                    className="w-full border border-[#E2DDB4] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E43636] text-[#000000]"
                    placeholder="Short answer text"
                  />
                </div>
                {error && <p className="text-[#E43636] mb-4 text-sm text-center">{error}</p>}
                <button
                  type="submit"
                  className="w-full bg-[#E43636] text-[#F6EFD2] font-bold py-3 rounded-lg hover:bg-[#000000] hover:text-[#E43636] transition-colors mt-2 text-lg shadow"
                >
                  Submit
                </button>
              </>
            )}
            <p className="text-xs text-[#E43636] text-center mt-6">Never submit passwords through this form.</p>
          </form>
        </div>
      </div>
    </div>
  );
} 