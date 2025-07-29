'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Grid of thumbnail numbers to display
  const thumbnailGrid = [
    [13, 7, 16, 9, 101, 65], // Row 1
    [144, 131, 139, 107, 82, 121], // Row 2
    [23, 74, 48, 107, 82, 121], // Row 3
    [8, 15, 17, 18, 19, 20], // Row 4
  ];

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4"
      >
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-avenir-heavy">Disney</span>
          <span className="text-lg">+</span>
          <span className="text-2xl font-avenir-heavy">+</span>
        </div>
        <Link
          href="/home"
          className="bg-gray-800 text-white px-6 py-2 rounded font-avenir-medium hover:bg-gray-700 transition-colors"
        >
          LOG IN
        </Link>
      </motion.nav>

      {/* Background Thumbnail Grid */}
      <div className="absolute inset-0 opacity-30">
        <div className="grid grid-cols-6 gap-2 p-4">
          {thumbnailGrid.map((row, rowIndex) => (
            <div key={rowIndex} className="flex space-x-2">
              {row.map((num, colIndex) => (
                <div key={colIndex} className="flex-shrink-0">
                  <Image
                    src={`/images/Thumbnail${num}.webp`}
                    alt=""
                    width={160}
                    height={240}
                    className="rounded-lg"
                  />
                </div>
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
            <Link
              href="/home"
              className="bg-[#00DCFF] text-black px-12 py-4 rounded-lg text-xl font-avenir-medium hover:bg-[#00B8D4] transition-colors inline-block"
            >
              START MEMEING
            </Link>
          </motion.div>

          {/* Brand Logos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex justify-center items-center space-x-8 mt-16"
          >
            <Image src="/images/Disney.webp" alt="Disney" width={80} height={40} />
            <Image src="/images/Pixar_1.webp" alt="Pixar" width={60} height={30} />
            <Image src="/images/Marvel.webp" alt="Marvel" width={60} height={30} />
            <Image src="/images/StarWars_1.webp" alt="Star Wars" width={80} height={40} />
            <Image src="/images/National-Geographic.webp" alt="National Geographic" width={80} height={40} />
            <Image src="/images/Hulu_1.webp" alt="Hulu" width={60} height={30} />
          </motion.div>
        </div>
      </div>

      {/* Only on Disney++ Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-avenir-heavy mb-8">
            Only on Disney++
          </h2>
          <h3 className="text-xl md:text-2xl font-avenir-medium opacity-90">
            Exclusive series and Originals you won't find on any other memeing service.
          </h3>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-6 overflow-x-auto pb-8">
            {[131, 24, 36, 89, 104, 144, 139, 107].map((num) => (
              <div key={num} className="flex-shrink-0">
                <Image
                  src={`/images/Thumbnail${num}.webp`}
                  alt=""
                  width={300}
                  height={450}
                  className="rounded-lg hover:scale-105 transition-transform"
                />
              </div>
            ))}
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
            Enjoy the world's greatest memes - anytime, anywhere.
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
                  className="px-8 py-3 bg-white text-black rounded-lg font-avenir-medium hover:bg-gray-200 transition-colors"
                >
                  GET STARTED
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
