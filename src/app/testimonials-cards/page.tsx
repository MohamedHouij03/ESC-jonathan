'use client';

import { useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Certified Pilates Instructor",
    location: "New York, NY",
    rating: 5,
    text: "I just wanted to say that I've been following your channel for a while now, and you've been such a joy to watch. Because of you, I decided to start Pilates, and it completely changed my life. I went from being 250 pounds overweight to now being 124 pounds. When I stepped on the scale, I couldn't believe it - I cried my eyes out. You have been such an inspiration to me, and I want others to also discover and be inspired by you the way I have.",
    image: "/images/clients/ChatGPT Image Sep 6, 2025, 08_34_46 PM.png"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Fitness Studio Owner",
    location: "Los Angeles, CA",
    rating: 5,
    text: "Training with Jonathan at the method was the best experience and 1000% worth the investment. I learned so much over the training and was so impressed by Jonathan's knowledge, passion, and willingness to help even after the training was over. I am still using his materials when I teach! Can't say enough great things about the training, the studio, and the people I met 10/10!",
    image: "/images/clients/ChatGPT Image Sep 5, 2025, 06_35_29 PM.png"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Physical Therapist",
    location: "Miami, FL",
    rating: 5,
    text:"I had an amazing experience in the teacher training with Jonathan. His deep knowledge and clear teaching style truly set this program apart. Learning how to cue each movement was a game-changer for me. Thanks to his support, I earned my certification and now teach Pilates confidently. I highly recommend Jonathan to anyone looking to deepen their practice or become a certified instructor. He's an exceptional teacher and mentor.",
    image: "/images/clients/ChatGPT Image Sep 5, 2025, 05_19_59 PM.png"
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Personal Trainer",
    location: "Chicago, IL",
    rating: 5,
    text: "The Level 2 advanced techniques took my training to the next level. The comprehensive curriculum and expert instruction helped me become a more effective trainer. My clients love the results!",
    image: "/images/clients/ChatGPT Image Sep 5, 2025, 03_34_36 PM.png"
  }
];

const TestimonialsSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Prevent hydration errors and ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const slider = document.querySelector('.testimonials-slider') as HTMLElement;
    const cardElements = document.querySelectorAll('.testimonial-card') as NodeListOf<HTMLElement>;
    
    if (slider) {
      // Remove pre-in class immediately and set ready
      slider.classList.remove('pre-in');
      slider.classList.add('ready');
      
      // Ensure all cards are visible
      cardElements.forEach((card) => { 
        card.style.visibility = 'visible';
        card.style.display = 'block';
      });
      
      // Update positions with a small delay to ensure DOM is ready
      setTimeout(() => {
        updateSlider();
      }, 100);
    }
  }, [activeIndex, isClient]);

  const updateSlider = () => {
    const cards = document.querySelectorAll('.testimonial-card') as NodeListOf<HTMLElement>;
    cards.forEach((card, i) => {
      card.classList.remove('active', 'hidden');
      card.style.display = 'block';
      card.style.visibility = 'visible';
      let offset = i - activeIndex;
      card.setAttribute('data-index', offset.toString());
      
      // Force reflow to ensure animations work
      card.offsetHeight;
    });
  };

  const handleCardClick = (i: number) => {
    if (i !== activeIndex) {
      setActiveIndex(i);
      // Update slider immediately for better responsiveness
      setTimeout(() => {
        updateSlider();
      }, 50);
    }
  };

  // Auto-advance slider on mobile for better UX
  useEffect(() => {
    if (!isClient) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isClient]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  if (!isClient) {
    return (
      <section className="testimonials-section">
        <div className="testimonials-slider">
          <div className="animate-pulse">
            <div className="testimonial-card" style={{ transform: 'translateX(-50%) scale(1) rotateY(0deg)', opacity: 1 }}>
              <div className="testimonial-content">
                <div className="profile-image bg-gray-300 rounded-full mb-6"></div>
                <div className="testimonial-text">
                  <div className="stars mb-3 flex justify-center gap-1">
                    {[1,2,3,4,5].map(i => <div key={i} className="w-5 h-5 bg-gray-300 rounded"></div>)}
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-4/5"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/5"></div>
                  </div>
                  <div className="author-info">
                    <div className="h-4 bg-gray-300 rounded w-24 mb-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="testimonials-section">
      <div className="testimonials-slider">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className={`testimonial-card ${index === activeIndex ? 'active' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="testimonial-content">
              {/* Profile Image */}
              <div className="profile-image">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              
              {/* Content */}
              <div className="testimonial-text">
                <div className="stars mb-3">
                  {renderStars(testimonial.rating)}
                </div>
                
                <blockquote className="text-lg leading-relaxed mb-4">
                  "{testimonial.text}"
                </blockquote>
                
                <div className="author-info">
                  <p className="text-sm opacity-80 mb-1">{testimonial.role}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .testimonials-section {
          width: 100vw;
          margin: 0;
          padding: 0;
          text-align: center;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .testimonials-slider {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          height: 680px;
          perspective: 1000px;
          width: 100%;
          max-width: 100vw;
        }

        .testimonial-card {
          display: block;
          position: absolute;
          top: 0;
          left: 50%;
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.6s ease-in-out;
          width: 620px;
          height: 540px;
          color: #fff;
          overflow: hidden;
          cursor: pointer;
          transform-origin: center center;
          border-radius: 24px;
          transform-style: preserve-3d;
          visibility: visible;
          background: linear-gradient(135deg, #e63737 0%, #e63737 100%);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          will-change: transform, opacity;
          backface-visibility: hidden;
        }

        .testimonial-content {
          padding: 24px;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .profile-image {
          width: 90px;
          height: 90px;
          margin-bottom: 16px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          overflow: hidden;
        }

        .profile-image img {
          object-position: center 30%;
        }

        .testimonial-text {
          max-width: 440px;
          word-break: break-word;
          overflow-wrap: anywhere;
        }

        .testimonial-text blockquote {
          font-size: 16px;
          line-height: 1.5;
        }

        .stars {
          display: flex;
          justify-content: center;
          gap: 2px;
          margin-bottom: 15px;
        }

        .author-info {
          margin-top: 15px;
        }

        /* Active card (center) */
        .testimonial-card[data-index="0"] {
          display: block;
          transform: translateX(-50%) scale(1) rotateY(0deg);
          opacity: 1;
          z-index: 3;
        }

        /* Adjacent cards */
        .testimonial-card[data-index="1"] {
          display: block;
          transform: translateX(-50%) translateX(50%) scale(0.9) rotateY(-8deg);
          opacity: 0.8;
          z-index: 2;
        }

        .testimonial-card[data-index="-1"] {
          display: block;
          transform: translateX(-50%) translateX(-50%) scale(0.9) rotateY(8deg);
          opacity: 0.8;
          z-index: 2;
        }

        /* Further cards */
        .testimonial-card[data-index="2"] {
          display: block;
          transform: translateX(-50%) translateX(100%) scale(0.8) rotateY(-15deg);
          opacity: 0.6;
          z-index: 1;
        }

        .testimonial-card[data-index="-2"] {
          display: block;
          transform: translateX(-50%) translateX(-100%) scale(0.8) rotateY(15deg);
          opacity: 0.6;
          z-index: 1;
        }

        /* Inactive cards (still visible) */
        .testimonial-card[data-index="3"] {
          display: block;
          transform: translateX(-50%) translateX(150%) scale(0.7) rotateY(-20deg);
          opacity: 0.4;
          z-index: 0;
        }

        .testimonial-card[data-index="-3"] {
          display: block;
          transform: translateX(-50%) translateX(-150%) scale(0.7) rotateY(20deg);
          opacity: 0.4;
          z-index: 0;
        }

        /* Pre-initialization state */
        .testimonials-slider.pre-in .testimonial-card {
          opacity: 0;
          transform: translateX(-50%) scale(0.8) rotateY(0deg);
        }

        /* Ready state */
        .testimonials-slider.ready .testimonial-card {
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.6s ease-in-out;
        }

        /* Ensure smooth animations on mobile */
        @media (max-width: 768px) {
          .testimonial-card {
            transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease-in-out;
          }
          
          .testimonials-slider.ready .testimonial-card {
            transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease-in-out;
          }
        }

        @media (max-width: 1024px) {
          .testimonials-slider {
            height: 620px;
          }
          
          .testimonial-card {
            width: 540px;
            height: 480px;
          }
          
          .testimonial-content {
            padding: 24px;
          }
          
          .profile-image {
            width: 90px;
            height: 90px;
            margin-bottom: 16px;
          }
          
          .testimonial-text {
            max-width: 380px;
          }
        }

        @media (max-width: 768px) {
          .testimonials-section {
            padding: 0;
            width: 100%;
            overflow-x: hidden;
          }
          
          .testimonials-slider {
            height: 580px;
            perspective: 800px;
            width: 100%;
            overflow: hidden;
          }
          
          .testimonial-card {
            width: 80vw;
            max-width: 380px;
            height: 460px;
          }
          
          .testimonial-content {
            padding: 20px 16px;
          }
          
          .profile-image {
            width: 80px;
            height: 80px;
            margin-bottom: 16px;
            border-width: 2px;
          }

          .profile-image img {
            object-position: center 30%;
          }
          
          .testimonial-text {
            max-width: 100%;
          }
          
          .testimonial-text blockquote {
            font-size: 15px;
            line-height: 1.4;
            margin-bottom: 20px;
          }
          
          .author-info p {
            font-size: 14px;
          }
          
          .stars svg {
            width: 16px;
            height: 16px;
          }
          
          /* Mobile-optimized card positions - keep within viewport */
          .testimonial-card[data-index="0"] {
            transform: translateX(-50%) scale(1) rotateY(0deg);
            opacity: 1;
            z-index: 3;
          }
          
          .testimonial-card[data-index="1"] {
            transform: translateX(-50%) translateX(35%) scale(0.85) rotateY(-5deg);
            opacity: 0.6;
            z-index: 2;
          }
          
          .testimonial-card[data-index="-1"] {
            transform: translateX(-50%) translateX(-35%) scale(0.85) rotateY(5deg);
            opacity: 0.6;
            z-index: 2;
          }
          
          .testimonial-card[data-index="2"] {
            transform: translateX(-50%) translateX(70%) scale(0.7) rotateY(-10deg);
            opacity: 0.3;
            z-index: 1;
          }
          
          .testimonial-card[data-index="-2"] {
            transform: translateX(-50%) translateX(-70%) scale(0.7) rotateY(10deg);
            opacity: 0.3;
            z-index: 1;
          }
          
          .testimonial-card[data-index="3"] {
            transform: translateX(-50%) translateX(105%) scale(0.6) rotateY(-15deg);
            opacity: 0.1;
            z-index: 0;
          }
          
          .testimonial-card[data-index="-3"] {
            transform: translateX(-50%) translateX(-105%) scale(0.6) rotateY(15deg);
            opacity: 0.1;
            z-index: 0;
          }
        }

        @media (max-width: 480px) {
          .testimonials-section {
            padding: 0;
            width: 100%;
            overflow-x: hidden;
          }
          
          .testimonials-slider {
            height: 520px;
            perspective: 600px;
            width: 100%;
            overflow: hidden;
          }
          
          .testimonial-card {
            width: 85vw;
            max-width: 320px;
            height: 420px;
          }
          
          .testimonial-content {
            padding: 16px 12px;
          }
          
          .profile-image {
            width: 70px;
            height: 70px;
            margin-bottom: 12px;
            border-width: 2px;
          }

          .profile-image img {
            object-position: center 30%;
          }
          
          .testimonial-text blockquote {
            font-size: 14px;
            line-height: 1.3;
            margin-bottom: 16px;
          }
          
          .author-info p {
            font-size: 12px;
          }
          
          .stars svg {
            width: 14px;
            height: 14px;
          }
          
          /* Small mobile card positions - keep within viewport */
          .testimonial-card[data-index="0"] {
            transform: translateX(-50%) scale(1) rotateY(0deg);
            opacity: 1;
            z-index: 3;
          }
          
          .testimonial-card[data-index="1"] {
            transform: translateX(-50%) translateX(30%) scale(0.8) rotateY(-3deg);
            opacity: 0.5;
            z-index: 2;
          }
          
          .testimonial-card[data-index="-1"] {
            transform: translateX(-50%) translateX(-30%) scale(0.8) rotateY(3deg);
            opacity: 0.5;
            z-index: 2;
          }
          
          .testimonial-card[data-index="2"] {
            transform: translateX(-50%) translateX(60%) scale(0.65) rotateY(-6deg);
            opacity: 0.2;
            z-index: 1;
          }
          
          .testimonial-card[data-index="-2"] {
            transform: translateX(-50%) translateX(-60%) scale(0.65) rotateY(6deg);
            opacity: 0.2;
            z-index: 1;
          }
          
          .testimonial-card[data-index="3"] {
            transform: translateX(-50%) translateX(90%) scale(0.5) rotateY(-9deg);
            opacity: 0.1;
            z-index: 0;
          }
          
          .testimonial-card[data-index="-3"] {
            transform: translateX(-50%) translateX(-90%) scale(0.5) rotateY(9deg);
            opacity: 0.1;
            z-index: 0;
          }
        }

        @media (max-width: 360px) {
          .testimonials-section {
            width: 100%;
            overflow-x: hidden;
          }
          
          .testimonials-slider {
            height: 480px;
            width: 100%;
            overflow: hidden;
          }
          
          .testimonial-card {
            width: 90vw;
            max-width: 300px;
            height: 380px;
          }
          
          .testimonial-content {
            padding: 12px 10px;
          }
          
          .profile-image {
            width: 60px;
            height: 60px;
            margin-bottom: 10px;
          }

          .profile-image img {
            object-position: center 30%;
          }
          
          .testimonial-text blockquote {
            font-size: 13px;
            line-height: 1.2;
            margin-bottom: 12px;
          }
          
          .author-info p {
            font-size: 11px;
          }
          
          .stars svg {
            width: 12px;
            height: 12px;
          }
          
          /* Extra small mobile - minimal positioning */
          .testimonial-card[data-index="0"] {
            transform: translateX(-50%) scale(1) rotateY(0deg);
            opacity: 1;
            z-index: 3;
          }
          
          .testimonial-card[data-index="1"] {
            transform: translateX(-50%) translateX(25%) scale(0.8) rotateY(-2deg);
            opacity: 0.4;
            z-index: 2;
          }
          
          .testimonial-card[data-index="-1"] {
            transform: translateX(-50%) translateX(-25%) scale(0.8) rotateY(2deg);
            opacity: 0.4;
            z-index: 2;
          }
          
          .testimonial-card[data-index="2"] {
            transform: translateX(-50%) translateX(50%) scale(0.6) rotateY(-4deg);
            opacity: 0.1;
            z-index: 1;
          }
          
          .testimonial-card[data-index="-2"] {
            transform: translateX(-50%) translateX(-50%) scale(0.6) rotateY(4deg);
            opacity: 0.1;
            z-index: 1;
          }
          
          .testimonial-card[data-index="3"] {
            transform: translateX(-50%) translateX(75%) scale(0.4) rotateY(-6deg);
            opacity: 0.05;
            z-index: 0;
          }
          
          .testimonial-card[data-index="-3"] {
            transform: translateX(-50%) translateX(-75%) scale(0.4) rotateY(6deg);
            opacity: 0.05;
            z-index: 0;
          }
        }
      `}</style>
    </section>
  );
};

const TestimonialsCardsPage = () => {
  return (
    <div className="min-h-screen bg-white pt-8">
      <div className="w-full px-4 py-4">
        <div className="text-center mb-4 md:mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#E43636] mb-2">
            What Our Clients Say
          </h1>
          <p className="text-lg sm:text-xl text-[#000000]/70 max-w-3xl mx-auto">
            Discover how ESC has transformed lives and careers in the fitness industry
          </p>
        </div>

        <TestimonialsSlider />
      </div>
    </div>
  );
};

export default TestimonialsCardsPage;
