import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const allTestimonials = [
  {
    name: "Amina R.",
    feedback:
      "Hey Dentie makes dental care so easy! I love the daily tips — they've helped me improve my brushing routine.",
    stars: 5,
  },
  {
    name: "Zubair H.",
    feedback:
      "I always forget to floss, but Dentie's tracker keeps me motivated! The interface is clean and helpful.",
    stars: 4,
  },
  {
    name: "Sara K.",
    feedback:
      "Such a warm and friendly experience. The AI chat answered my dental question better than Google!",
    stars: 5,
  },
  {
    name: "Rafiq M.",
    feedback:
      "The streak tracker is a game changer! It really pushed me to stay consistent with my oral hygiene.",
    stars: 5,
  },
  {
    name: "Nadia S.",
    feedback:
      "I love how Dentie makes dental health approachable and fun with its friendly UI.",
    stars: 4,
  },
  {
    name: "Javed T.",
    feedback:
      "The AI assistant gave me personalized advice that helped me choose the right toothbrush.",
    stars: 5,
  },
  {
    name: "Leila F.",
    feedback:
      "Daily tips are super useful, especially for busy people like me who tend to skip flossing.",
    stars: 4,
  },
  {
    name: "Omar K.",
    feedback:
      "Really impressed with how accurate and helpful the AI responses are. Makes dental care easy.",
    stars: 5,
  },
  {
    name: "Fatima N.",
    feedback:
      "The app reminds me to stay on top of my brushing and flossing. Highly recommend!",
    stars: 5,
  },
  {
    name: "Yusuf A.",
    feedback:
      "Great design and user experience. The motivational streak feature keeps me coming back every day.",
    stars: 5,
  },
];

function getRandomTestimonials(arr, n) {
  const result = [];
  const takenIndices = new Set();

  while (result.length < n && result.length < arr.length) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    if (!takenIndices.has(randomIndex)) {
      takenIndices.add(randomIndex);
      result.push(arr[randomIndex]);
    }
  }

  return result;
}

const Testimonials = () => {
  const [displayedTestimonials, setDisplayedTestimonials] = useState([]);

  useEffect(() => {
    setDisplayedTestimonials(getRandomTestimonials(allTestimonials, 3));
  }, []);

  return (
    <section className="mt-12 max-w-5xl mx-auto px-4">
      <h2 className="text-xl text-center md:text-2xl font-bold text-teal-700 mb-6">
        💬 What Our Users Say
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {displayedTestimonials.map((t, index) => (
          <div
            key={index}
            className="bg-white border border-teal-100 rounded-lg shadow-sm p-5 hover:shadow-md transition"
          >
            <div className="flex items-center gap-2 mb-2 text-orange-400">
              {Array.from({ length: t.stars }, (_, i) => (
                <FaStar key={i} className="text-sm" />
              ))}
            </div>
            <p className="text-gray-700 italic mb-3">“{t.feedback}”</p>
            <p className="text-sm font-semibold text-teal-600">— {t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
