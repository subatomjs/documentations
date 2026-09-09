"use client";
import { motion } from "framer-motion";

export const BackgroundBeams = ({ className }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className || ""}`}>
      <div className="absolute inset-0 h-full w-full bg-transparent" />
      <div className="absolute top-40 left-0 right-0 h-150 w-full">
        <svg
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 1000 1000"
          fill="none"
        >
          <motion.path
            d="M-200 200C100 100 300 400 500 200C700 0 900 200 1200 100"
            stroke="url(#linearGradient1)"
            strokeWidth="2"
            strokeOpacity="0.6"
          />
          <motion.path
            d="M-100 400C200 300 400 600 600 400C800 200 1000 400 1300 300"
            stroke="url(#linearGradient2)"
            strokeWidth="2"
            strokeOpacity="0.7"
          />
          <defs>
            <linearGradient id="linearGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
              <stop offset="50%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="linearGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
              <stop offset="50%" stopColor="#34d399" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};
