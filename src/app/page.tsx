'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import DisneyLoader from '@/components/DisneyLoader';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleStartMemeing = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowLoader(true);
  };

  const handleLoaderComplete = () => {
    router.push('/home');
  };

  // Grid of thumbnail numbers to display
  const thumbnailGrid = [
    [13, 7, 16, 9, 101, 65], // Row 1
    [144, 131, 139, 107, 82, 121], // Row 2
    [23, 74, 48, 107, 82, 121], // Row 3
    [8, 15, 17, 18, 19, 20], // Row 4
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4"
      >
        <div className="flex items-center">
          <Image
            src="/images/Disney-p-500.png"
            alt="Disney++"
            width={120}
            height={40}
            className="h-8 w-auto"
          />
        </div>
        <Link
          href="/home"
          style={{
            backgroundColor: '#374151',
            color: 'white',
            padding: '8px 24px',
            borderRadius: '8px',
            fontWeight: '500',
            textDecoration: 'none',
            border: '1px solid #4b5563',
            display: 'inline-block',
            transition: 'all 0.2s ease-in-out'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#1f2937';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#374151';
          }}
        >
          LOG IN
        </Link>
      </motion.nav>

      {/* Background Thumbnail Grid */}
      <div className="absolute inset-0 opacity-20 overflow-hidden">
        <div className="grid grid-cols-6 gap-4 p-4 h-full">
          {thumbnailGrid.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-col space-y-4">
              {row.map((num, colIndex) => (
                <motion.div 
                  key={colIndex} 
                  className="relative h-48 w-full"
                  initial={{ opacity: 0, x: 100, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.8,
                    delay: (rowIndex * 0.3) + (colIndex * 0.2),
                    ease: "easeOut"
                  }}
                >
                  <Image
                    src={`/images/Thumbnail${num}.webp`}
                    alt=""
                    fill
                    sizes="160px"
                    className="rounded-lg object-cover"
                  />
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Hero Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-4">
          <motion.h1
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-avenir-heavy mb-8"
          >
            Endless entertainment for all.
          </motion.h1>

          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-4xl font-avenir-medium mb-4"
          >
            Lock in for $0.00 a month
          </motion.h2>

          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl mb-8 opacity-80"
          >
            *All content is based as fuck. No subscription required.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button
              onClick={handleStartMemeing}
              style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '16px 48px',
                borderRadius: '8px',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.2s ease-in-out'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#2563eb';
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#3b82f6';
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
              }}
            >
              START MEMEING
            </button>
          </motion.div>

          {/* Brand Logos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex justify-center items-center space-x-8 mt-16 flex-wrap"
          >
            <div className="relative h-12 w-24 flex items-center justify-center">
              <Image src="/images/Disney.webp" alt="Disney" fill className="object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity" />
            </div>
            <div className="relative h-12 w-24 flex items-center justify-center">
              <Image src="/images/Pixar_1.webp" alt="Pixar" fill className="object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity" />
            </div>
            <div className="relative h-12 w-24 flex items-center justify-center">
              <Image src="/images/Marvel.webp" alt="Marvel" fill className="object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity" />
            </div>
            <div className="relative h-12 w-24 flex items-center justify-center">
              <Image src="/images/StarWars_1.webp" alt="Star Wars" fill className="object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity" />
            </div>
            <div className="relative h-12 w-24 flex items-center justify-center">
              <Image src="/images/National-Geographic.webp" alt="National Geographic" fill className="object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity" />
            </div>
            <div className="relative h-12 w-24 flex items-center justify-center">
              <Image src="/images/Hulu_1.webp" alt="Hulu" fill className="object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Only on Disney++ Section (Marquee) */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-avenir-heavy mb-8">Only on Disney++</h2>
          <h3 className="text-xl md:text-2xl font-avenir-medium opacity-90">Exclusive series and Originals you won&apos;t find on any other memeing service.</h3>
        </div>

        <div className="overflow-hidden">
          <div className="relative">
            {/** Duplicate strip for seamless loop */}
            {[0, 1].map((strip) => (
              <motion.div
                key={strip}
                className="flex space-x-6 absolute left-0 right-0"
                initial={{ x: strip === 0 ? 0 : '100%' }}
                animate={{ x: ['0%', '-100%'] }}
                transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
              >
                {[131, 24, 36, 89, 104, 144, 139, 107, 131, 24, 36, 89].map((num, idx) => (
                  <div key={`${strip}-${idx}-${num}`} className="flex-shrink-0">
                    <Image
                      src={`/images/Thumbnail${num}.webp`}
                      alt=""
                      width={260}
                      height={390}
                      className="rounded-lg"
                    />
                  </div>
                ))}
              </motion.div>
            ))}
            <div className="pb-8" />
          </div>
        </div>
      </section>

      {/* Meme the way you want Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-avenir-heavy mb-8">
            Meme the way you want
          </h2>
          <h3 className="text-xl md:text-2xl font-avenir-medium opacity-90 mb-12">
            Enjoy the world&apos;s greatest memes - anytime, anywhere.
          </h3>
          <div className="mb-16">
            <Image
              src="/images/Device-Mockups.webp"
              alt="Device Mockups"
              width={800}
              height={400}
              className="mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Sign Up Section */}
      <section className="py-20 px-4 bg-gray-900 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-avenir-heavy mb-12">
            Sign up to escape the trenches
          </h2>

          {isClient && (
            <form className="max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Email address"
                  className="flex-1 px-4 py-3 rounded-lg bg-white text-black font-avenir-medium"
                  required
                />
                <button
                  type="submit"
                  style={{
                    padding: '12px 32px',
                    backgroundColor: 'white',
                    color: 'black',
                    borderRadius: '8px',
                    fontWeight: '500',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#e5e7eb';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'white';
                  }}
                >
                  GET STARTED
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Disney Loader */}
      <DisneyLoader 
        isVisible={showLoader} 
        onComplete={handleLoaderComplete}
      />
    </main>
  );
}
