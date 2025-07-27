import React from "react";
import { FaLeaf, FaTooth, FaSmile } from "react-icons/fa";

const recommendations = [
  {
    icon: <FaTooth className="text-2xl text-teal-600" />,
    name: "Soft-Bristle Toothbrush",
    tip: "Gentle on gums, effective on plaque. Recommended by most dentists."
  },
  {
    icon: <FaLeaf className="text-2xl text-green-600" />,
    name: "Clove Oil",
    tip: "Natural remedy for toothaches. Use a drop for instant relief."
  },
  {
    icon: <FaSmile className="text-2xl text-yellow-500" />,
    name: "Fluoride Toothpaste",
    tip: "Protects enamel and prevents cavities."
  },
  {
    icon: <FaTooth className="text-2xl text-blue-500" />,
    name: "Dental Floss",
    tip: "Removes debris between teeth where a brush can't reach."
  }
];

const DentieRecommends = () => {
  return (
    <div className="mt-12 max-w-6xl mx-auto">
      <h2 className="text-xl text-center md:text-2xl font-bold text-teal-700 mb-4">
        🦷 Dentie Recommends
      </h2>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {recommendations.map((item, index) => (
          <div
            key={index}
            className="min-w-[240px] p-4 bg-white border border-teal-100 rounded-xl shadow hover:shadow-md transition duration-300"
          >
            <div className="mb-2">{item.icon}</div>
            <h3 className="font-semibold text-teal-800 mb-1">{item.name}</h3>
            <p className="text-sm text-gray-600 leading-snug">{item.tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DentieRecommends;
