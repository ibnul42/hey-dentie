import { useState } from "react";

export default function GradientButton({ children }) {
  const [gradientPos, setGradientPos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    if (!isHovering) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGradientPos({ x, y });
  };

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
      style={{
        background: isHovering
          ? `radial-gradient(circle at ${gradientPos.x}% ${gradientPos.y}%, #14b8a6, #115e59)`
          : "linear-gradient(to right, #00786f, #00786f)", // default gradient
      }}
      className="w-full text-white rounded-full cursor-pointer transition-all duration-300"
    >
      {children}
    </div>
  );
}
