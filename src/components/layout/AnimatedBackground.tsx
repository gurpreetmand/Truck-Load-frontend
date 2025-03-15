import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Truck, Package, MapPin } from "lucide-react";

interface AnimatedBackgroundProps {
  theme?: "blue" | "orange" | "green";
  density?: "low" | "medium" | "high";
  animated?: boolean;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  theme = "blue",
  density = "medium",
  animated = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Define theme colors
  const getThemeColors = () => {
    switch (theme) {
      case "orange":
        return {
          primary: "#ea580c",
          secondary: "#fdba74",
          accent: "#9a3412",
          bg: "bg-orange-50",
        };
      case "green":
        return {
          primary: "#16a34a",
          secondary: "#86efac",
          accent: "#166534",
          bg: "bg-green-50",
        };
      case "blue":
      default:
        return {
          primary: "#2563eb",
          secondary: "#93c5fd",
          accent: "#1e40af",
          bg: "bg-blue-50",
        };
    }
  };

  const colors = getThemeColors();

  // Define number of elements based on density
  const getElementCount = () => {
    switch (density) {
      case "low":
        return 5;
      case "high":
        return 15;
      case "medium":
      default:
        return 10;
    }
  };

  const elementCount = getElementCount();

  // Generate random positions for elements
  const generateElements = () => {
    const elements = [];
    for (let i = 0; i < elementCount; i++) {
      const type =
        Math.random() > 0.6 ? "truck" : Math.random() > 0.5 ? "package" : "pin";
      const size = Math.floor(Math.random() * 20) + 10; // 10-30px
      const x = Math.random() * 100; // 0-100%
      const y = Math.random() * 100; // 0-100%
      const delay = Math.random() * 5; // 0-5s delay
      const duration = Math.random() * 20 + 20; // 20-40s duration
      const opacity = Math.random() * 0.2 + 0.05; // 0.05-0.25 opacity

      elements.push({ type, size, x, y, delay, duration, opacity });
    }
    return elements;
  };

  const elements = generateElements();

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 w-full h-full ${colors.bg} -z-10 overflow-hidden`}
    >
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{
            x: `${element.x}vw`,
            y: `${element.y}vh`,
            opacity: element.opacity,
          }}
          animate={
            animated
              ? {
                  x: [
                    `${element.x}vw`,
                    `${(element.x + 20) % 100}vw`,
                    `${(element.x - 10 + 100) % 100}vw`,
                    `${element.x}vw`,
                  ],
                  y: [
                    `${element.y}vh`,
                    `${(element.y + 15) % 100}vh`,
                    `${(element.y - 10 + 100) % 100}vh`,
                    `${element.y}vh`,
                  ],
                }
              : {}
          }
          transition={{
            repeat: Infinity,
            duration: element.duration,
            delay: element.delay,
            ease: "linear",
          }}
          style={{ color: index % 2 === 0 ? colors.primary : colors.secondary }}
        >
          {element.type === "truck" ? (
            <Truck size={element.size} />
          ) : element.type === "package" ? (
            <Package size={element.size} />
          ) : (
            <MapPin size={element.size} />
          )}
        </motion.div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/80" />
    </div>
  );
};

export default AnimatedBackground;
