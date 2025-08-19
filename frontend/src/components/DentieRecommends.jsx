import React, { useState } from "react";
import { FaLeaf, FaTooth, FaSmile } from "react-icons/fa";
import GradientButton from "./GradientButton";

const recommendations = [
  {
    icon: <FaTooth className="text-5xl text-teal-600" />,
    name: "Why dentists recommend soft bristles",
    tip: "Soft-bristle toothbrushes are gentle on your gums but still effective at removing plaque. Hard bristles can actually wear down enamel and irritate gum tissue over time. That’s why most dental associations advise soft bristles for everyday brushing — they clean thoroughly without harming your smile.",
  },
  {
    icon: <FaLeaf className="text-5xl text-green-600" />,
    name: "The science behind natural remedies",
    tip: "Clove oil, salt water rinses, and other natural remedies have been used for centuries to relieve tooth pain and fight bacteria. Clove oil, for example, contains eugenol, a natural antiseptic that numbs pain and reduces infection. While these remedies can help, they should complement — not replace — professional dental care.",
  },
  {
    icon: <FaSmile className="text-5xl text-yellow-500" />,
    name: "How fluoride protects enamel",
    tip: "Fluoride is a mineral that strengthens teeth by repairing weak enamel and making it more resistant to acid attacks from food and bacteria. Using fluoride toothpaste daily reduces cavities by up to 40%. That’s why it’s a key ingredient in modern preventive dentistry.",
  },
  {
    icon: <FaTooth className="text-5xl text-blue-500" />,
    name: "Why flossing prevents gum disease",
    tip: "Brushing only cleans about 60% of your teeth’s surface. The remaining 40% lies between teeth — where food and plaque hide. Flossing removes debris from these tight spaces, preventing gum inflammation (gingivitis) and lowering your risk of tooth loss later in life. Daily flossing is small effort with a huge payoff.",
  },
];

const DentieRecommends = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  return (
    <div className="flex flex-col gap-5 px-6">
      <h2 className="text-xl text-center md:text-2xl font-bold text-teal-700 mb-4">
        Dentie's Top Picks for a Healthier Smile
      </h2>
      <div className="flex gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide pb-2">
        {recommendations.map((item, index) => (
          <FlipCard
            key={index}
            item={item}
            index={index}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default DentieRecommends;

const FlipCard = ({ item, index, activeIndex, setActiveIndex }) => {
  const flipped = activeIndex === index;

  const handleFlip = () => {
    setActiveIndex(flipped ? null : index);
  };

  return (
    <div className="min-w-[240px] w-full">
      <div className="[perspective:1000px]">
        <div
          className={`relative w-full h-72 transition-transform duration-500 [transform-style:preserve-3d] ${
            flipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* Front */}
          <div className="absolute inset-0 bg-white/70 border border-teal-100 rounded-xl shadow p-4 backface-hidden">
            <div
              className={`h-full flex flex-col justify-between gap-1 transition-all duration-500 ${
                flipped
                  ? "opacity-0 translate-y-4"
                  : "opacity-100 translate-y-0"
              }`}
            >
              <div className="flex justify-center">{item.icon}</div>
              <h3 className="font-semibold text-teal-800 text-xl">{item.name}</h3>
              {/* <p className="flex-grow text-sm text-gray-600 leading-snug">
                {item.tip}
              </p> */}

              <GradientButton>
                <button
                  onClick={handleFlip}
                  className="w-full py-2 cursor-pointer"
                >
                  Learn More
                </button>
              </GradientButton>
            </div>
          </div>

          {/* Back */}
          <div className="absolute inset-0 bg-teal-700 text-white p-4 rounded-xl [transform:rotateY(180deg)] backface-hidden flex flex-col justify-center items-center">
            <div
              className={`h-full flex flex-col transition-all duration-500 ${
                flipped
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4"
              }`}
            >
              {/* <h3 className="text-lg font-bold mb-2">More Details</h3> */}
              <p className="">
                <strong>{item.name}</strong>.
              </p>
              <p className="flex-grow text-sm my-3 overflow-y-auto slim-scrollbar">{item.tip}</p>
              <button
                onClick={handleFlip}
                className="bg-white text-teal-700 font-semibold px-4 py-2 rounded-full mt-1 cursor-pointer"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
