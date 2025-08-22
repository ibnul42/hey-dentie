import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const allTestimonials = [
  {
    name: "Amina R.",
    feedback:
      "Hey Dentie makes dental care so easy! I love the daily tips — they've helped me improve my brushing routine.",
    stars: 5,
    avatar: "/assets/profile/amina.webp",
  },
  {
    name: "Zubair H.",
    feedback:
      "I always forget to floss, but Dentie's tracker keeps me motivated! The interface is clean and helpful.",
    stars: 4,
    avatar: "/assets/profile/zubair.jpg",
  },
  {
    name: "Sara K.",
    feedback:
      "Such a warm and friendly experience. The AI chat answered my dental question better than Google!",
    stars: 5,
    avatar: "/assets/profile/sara.jpg",
  },
  {
    name: "Rafiq M.",
    feedback:
      "The streak tracker is a game changer! It really pushed me to stay consistent with my oral hygiene.",
    stars: 5,
    avatar: "/assets/profile/rafiq.webp",
  },
  {
    name: "Nadia S.",
    feedback:
      "I love how Dentie makes dental health approachable and fun with its friendly UI.",
    stars: 4,
    avatar: "/assets/profile/nadia.webp",
  },
  {
    name: "Simon T.",
    feedback:
      "The AI assistant gave me personalized advice that helped me choose the right toothbrush.",
    stars: 5,
    avatar: "/assets/profile/simon.webp",
  },
  {
    name: "Leila F.",
    feedback:
      "Daily tips are super useful, especially for busy people like me who tend to skip flossing.",
    stars: 4,
    avatar: "/assets/profile/lelia.jpg",
  },
  {
    name: "Julian K.",
    feedback:
      "Really impressed with how accurate and helpful the AI responses are. Makes dental care easy.",
    stars: 5,
    avatar: "/assets/profile/julian.webp",
  },
  {
    name: "Fatima N.",
    feedback:
      "The app reminds me to stay on top of my brushing and flossing. Highly recommend!",
    stars: 5,
    avatar: "/assets/profile/fatima.avif",
  },
  {
    name: "Yusuf A.",
    feedback:
      "Great design and user experience. The motivational streak feature keeps me coming back every day.",
    stars: 5,
    avatar: "/assets/profile/yusuf.jpg",
  },
  {
    name: "Hina P.",
    feedback:
      "Dentie made me more conscious about my oral hygiene. The reminders are perfectly timed!",
    stars: 5,
    avatar: "/assets/profile/hina.webp",
  },
  {
    name: "Sami R.",
    feedback:
      "I love the AI tips—they're practical and easy to follow. My dentist even noticed improvements!",
    stars: 4,
    avatar: "/assets/profile/sami.jpg",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsPerSlide = 3; // how many to show at once

  const totalSlides = Math.ceil(allTestimonials.length / testimonialsPerSlide);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  // Calculate the testimonials to display in current slide
  const displayedTestimonials = allTestimonials.slice(
    currentIndex * testimonialsPerSlide,
    currentIndex * testimonialsPerSlide + testimonialsPerSlide
  );

  return (
    <section className="flex flex-col gap-5 px-6">
      <h2 className="text-xl text-center md:text-2xl font-bold text-teal-700 mb-4">
        💬 What Our Users Say
      </h2>

      <div className="grid grid-cols-3 gap-2 md:gap-6 transition-all duration-500">
        {displayedTestimonials.map((t, index) => (
          <div
            key={index}
            className="bg-white border border-teal-100 flex flex-col rounded-lg shadow-sm p-1.5 md:p-3 lg:p-5 hover:shadow-md transition h-auto overflow-hidden"
          >
            <div className="flex items-center gap-1 md:gap-3 mb-3">
              <div className="shrink-0 w-10 h-10 md:w-20 md:h-20 rounded-full overflow-hidden">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-full h-full rounded-full object-cover border-2 border-teal-200 shadow-sm hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <p className="font-semibold text-xs md:text-base text-teal-600">{t.name}</p>
                <div className="flex items-center text-orange-400 text-[9px] md:text-xs">
                  {Array.from({ length: t.stars }, (_, i) => (
                    <FaStar key={i} className="mr-1" />
                  ))}
                </div>
              </div>
            </div>

            {/* Feedback */}
            <p className="text-gray-700 italic text-[10px] md:text-sm flex-1">
              “{t.feedback}”
            </p>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-5 h-5 rounded-full cursor-pointer ${
              currentIndex === i ? "bg-teal-600" : "bg-teal-300"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
