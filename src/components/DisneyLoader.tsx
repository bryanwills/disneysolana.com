'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface DisneyLoaderProps {
  isVisible: boolean;
  onComplete?: () => void;
}

export default function DisneyLoader({ isVisible, onComplete }: DisneyLoaderProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onAnimationComplete={() => {
            // Delay completion to allow for the full Disney animation
            setTimeout(() => {
              onComplete?.();
            }, 3000);
          }}
        >
          {/* Disney Logo Animation */}
          <div className="relative flex flex-col items-center">
            {/* Main Disney Logo */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.2, 1],
                opacity: [0, 1, 1]
              }}
              transition={{ 
                duration: 2,
                times: [0, 0.6, 1],
                ease: "easeOut"
              }}
              className="relative w-64 h-32 mb-8"
            >
              <Image
                src="/images/Disney.webp"
                alt="Disney"
                fill
                className="object-contain filter brightness-0 invert"
                priority
              />
              
              {/* Magical sparkle effect */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 2],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 2.5,
                  delay: 1.5,
                  ease: "easeOut"
                }}
                className="absolute -top-4 -right-4 w-8 h-8 text-yellow-400"
              >
                ✨
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1.2, 1.8],
                  rotate: [0, -180, -360]
                }}
                transition={{ 
                  duration: 2.2,
                  delay: 1.8,
                  ease: "easeOut"
                }}
                className="absolute -bottom-2 -left-2 w-6 h-6 text-blue-400"
              >
                ✨
              </motion.div>
            </motion.div>

            {/* Disney++ Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1,
                delay: 1.5,
                ease: "easeOut"
              }}
              className="text-white text-4xl font-avenir-heavy tracking-wider"
            >
              Disney<span className="text-[#00DCFF]">++</span>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8,
                delay: 2.2,
                ease: "easeOut"
              }}
              className="text-gray-400 text-lg font-avenir-medium mt-2"
            >
              The Ultimate Streaming Experience
            </motion.div>

            {/* Loading dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="flex space-x-2 mt-8"
            >
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-3 h-3 bg-[#00DCFF] rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: index * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>

            {/* Arc effect around logo */}
            <motion.div
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, delay: 1 }}
              className="absolute inset-0 pointer-events-none"
            >
              <svg 
                className="w-full h-full" 
                viewBox="0 0 300 200"
                fill="none"
              >
                <motion.circle
                  cx="150"
                  cy="100"
                  r="80"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: [0, 1, 1, 0],
                    opacity: [0, 1, 1, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    delay: 0.5,
                    ease: "easeInOut"
                  }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00DCFF" />
                    <stop offset="50%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#00DCFF" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}