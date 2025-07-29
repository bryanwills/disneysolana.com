'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const profiles = [
    { id: 1, name: 'Ye', image: '/images/Ye_1.webp' },
    { id: 2, name: 'Andrew', image: '/images/Andrew_1.webp' },
    { id: 3, name: 'Donald', image: '/images/Trump_1.webp' },
    { id: 4, name: 'Elon', image: '/images/Elon_1.webp' },
  ];

  const bannerSlides = [
    '/images/Banner1-Web.webp',
    '/images/Banner19.webp',
    '/images/Banner13.webp',
    '/images/Banner7.webp',
    '/images/Banner11.webp',
    '/images/Banner12.webp',
    '/images/Banner9.webp',
    '/images/Banner20.webp',
    '/images/Banner14.webp',
    '/images/Banner10.webp',
    '/images/Banner16.webp',
  ];

  const categories = [
    { name: 'Disney', logo: '/images/Disney.webp', video: 'https://dl.dropboxusercontent.com/scl/fi/c76j1600j06c0m7hued9e/Disney.mp4?rlkey=qrhowrc1l72iqtxt9j5h34w6i&st=kd6a539c&dl=0' },
    { name: 'PIXAR', logo: '/images/Pixar_1.webp', video: 'https://dl.dropboxusercontent.com/scl/fi/t18tvqecrk0377ro0g56c/Pixar.mp4?rlkey=v6sl237ag2mbptiky4ogelzw2&st=d47xiglc&dl=0' },
    { name: 'MARVEL', logo: '/images/Marvel.webp', video: 'https://dl.dropboxusercontent.com/scl/fi/gaxezlcsrimpaya2qbpv5/Marvel.mp4?rlkey=3sbs1sx3x3ahjjrwe7oea8rkj&st=w4suuksw&dl=0' },
    { name: 'STAR WARS', logo: '/images/StarWars_1.webp', video: 'https://dl.dropboxusercontent.com/scl/fi/tbyccjcdy81x6eeprmp86/Star-Wars.mp4?rlkey=muv0f9cd0sibdw8vvvxgthlgc&st=78ns2ibk&dl=0' },
    { name: 'NATIONAL GEOGRAPHIC', logo: '/images/National-Geographic.webp', video: 'https://dl.dropboxusercontent.com/scl/fi/k0i2xs4ms5rbj0ea7taps/National-Geographic.mp4?rlkey=h1pnqaptwviowbdryzcrcytpy&st=dtle8jco&dl=0' },
    { name: 'hulu', logo: '/images/Hulu_1.webp', video: 'https://dl.dropboxusercontent.com/scl/fi/ldtjd5d0vevt2gnb1c29j/Hulu.mp4?rlkey=h425rxb84624xd1bzub1vb5cz&st=m283cfhp&dl=0' },
  ];

  const contentSections = [
    {
      title: 'Recommended for You',
      items: [
        { title: 'EPSTEIN ISLAND', image: '/images/Thumbnail131.webp', studio: 'Disney PIXAR' },
        { title: 'MEET THE GRAHAMS', image: '/images/Thumbnail24.webp', studio: 'Disney' },
        { title: 'TOLL', image: '/images/Thumbnail36.webp', studio: 'PIXAR' },
        { title: 'IF THE GLOVE FITS', image: '/images/Thumbnail89.webp', studio: 'Disney' },
        { title: 'OFFICER DOWN: MAEGAN HALL', image: '/images/Thumbnail104.webp', studio: 'Disney PIXAR' },
        { title: 'PAY DAY', image: '/images/Thumbnail144.webp', studio: 'Disney PIXAR' },
        { title: 'KAREN', image: '/images/Thumbnail139.webp', studio: 'Disney PIXAR' },
        { title: 'THE FIE', image: '/images/Thumbnail107.webp', studio: 'Disney' },
      ]
    },
    {
      title: 'Because You Watched Goy Story',
      items: [
        { title: 'SANDY HOOK', image: '/images/Thumbnail1.webp', studio: 'Disney PIXAR' },
        { title: 'the ceo', image: '/images/Thumbnail2.webp', studio: 'PIXAR' },
        { title: 'ADOLF', image: '/images/Thumbnail3.webp', studio: 'Disney PIXAR' },
        { title: 'LONDON', image: '/images/Thumbnail4.webp', studio: 'Disney PIXAR' },
        { title: 'THE INCREDIBLE SULK', image: '/images/Thumbnail5.webp', studio: 'MARVEL STUDIOS' },
        { title: '$I', image: '/images/Thumbnail6.webp', studio: 'Disney' },
      ]
    },
    {
      title: 'Continue Watching',
      items: [
        { title: 'LA', image: '/images/Thumbnail7.webp', studio: 'Disney PIXAR' },
        { title: 'BLACKED', image: '/images/Thumbnail8.webp', studio: 'Disney PIXAR' },
        { title: 'Harambe', image: '/images/Thumbnail9.webp', studio: 'Disney PIXAR' },
        { title: 'WHITE PEOPLE RENOVATE HOMES', image: '/images/Thumbnail10.webp', studio: 'Disney' },
        { title: 'THE ZUCC', image: '/images/Thumbnail11.webp', studio: 'Disney' },
        { title: 'Mr', image: '/images/Thumbnail12.webp', studio: 'Disney' },
      ]
    },
    {
      title: 'Trending on Disney++',
      items: [
        { title: 'DUOLINGOHH', image: '/images/Thumbnail13.webp', studio: 'Disney PIXAR' },
        { title: 'MOLESTOR INK', image: '/images/Thumbnail14.webp', studio: 'PIXAR' },
        { title: 'SHEIN', image: '/images/Thumbnail15.webp', studio: 'Disney' },
        { title: 'FLOYD', image: '/images/Thumbnail16.webp', studio: 'Disney' },
        { title: '9/11', image: '/images/Thumbnail17.webp', studio: 'Disney' },
        { title: 'KOBE', image: '/images/Thumbnail18.webp', studio: 'Disney PIXAR' },
      ]
    },
    {
      title: 'New to Disney++',
      items: [
        { title: 'tinder', image: '/images/Thumbnail19.webp', studio: 'PIXAR' },
        { title: 'PURCHASED', image: '/images/Thumbnail20.webp', studio: 'Disney PIXAR' },
        { title: 'THE HUB', image: '/images/Thumbnail21.webp', studio: 'Disney PIXAR' },
        { title: 'GOING WOKE', image: '/images/Thumbnail22.webp', studio: 'Disney' },
        { title: 'KAREN', image: '/images/Thumbnail23.webp', studio: 'Disney PIXAR' },
        { title: 'THE FIE', image: '/images/Thumbnail24.webp', studio: 'Disney' },
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [bannerSlides.length]);

  // Profile Selection Screen
  if (selectedProfile === null) {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm">
          <div className="flex justify-between items-center px-8 py-4">
            <Image
              src="/images/Disney.png"
              alt="Disney++"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
            <button className="bg-gray-800 text-white px-6 py-2 rounded font-avenir-medium hover:bg-gray-700 transition-colors">
              EDIT PROFILES
            </button>
          </div>
        </nav>

        {/* Profile Selection Content */}
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-4">
            <h1 className="text-4xl font-avenir-heavy mb-12">Who's locked in?</h1>

            <div className="flex justify-center items-center space-x-8 mb-8">
              {profiles.map((profile, index) => (
                <motion.div
                  key={profile.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center cursor-pointer group"
                  onClick={() => setSelectedProfile(profile.id)}
                >
                  <div className="relative mb-4">
                    <Image
                      src={profile.image}
                      alt={profile.name}
                      width={120}
                      height={120}
                      className="rounded-full group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/20 rounded-full group-hover:bg-black/40 transition-colors" />
                  </div>
                  <h3 className="text-lg font-avenir-medium">{profile.name}</h3>
                </motion.div>
              ))}

              {/* Add Profile */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center cursor-pointer group"
              >
                <div className="relative mb-4">
                  <div className="w-30 h-30 rounded-full bg-gray-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <span className="text-4xl text-white">+</span>
                  </div>
                </div>
                <h3 className="text-lg font-avenir-medium">Add Profile</h3>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Application Interface
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm">
        <div className="flex justify-between items-center px-8 py-4">
          <div className="flex items-center space-x-8">
            <Image
              src="/images/Disney.png"
              alt="Disney++"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
            <div className="hidden md:flex items-center space-x-6">
              <button className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors">
                <Image src="/images/Home-Icon_outlined.webp" alt="Home" width={20} height={20} />
                <span className="font-avenir-medium">HOME</span>
              </button>
              <button className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors">
                <Image src="/images/Search-Icon_outlined_1.webp" alt="Search" width={20} height={20} />
                <span className="font-avenir-medium">SEARCH</span>
              </button>
              <button className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors">
                <Image src="/images/Plus-Icon_outlined.webp" alt="Watchlist" width={20} height={20} />
                <span className="font-avenir-medium">+ WATCHLIST</span>
              </button>
              <button className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors">
                <Image src="/images/Star-Icon_outlined.webp" alt="Originals" width={20} height={20} />
                <span className="font-avenir-medium">★ ORIGINALS</span>
              </button>
              <button className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors">
                <Image src="/images/Film-Reel-Icon_1.webp" alt="Movies" width={20} height={20} />
                <span className="font-avenir-medium">⨁ MOVIES</span>
              </button>
              <button className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors">
                <Image src="/images/Tv-Icon_1.webp" alt="Series" width={20} height={20} />
                <span className="font-avenir-medium">⌕ SERIES</span>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="font-avenir-medium">Ye</span>
            <Image
              src="/images/Ye_1.webp"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </nav>

      <div className="pt-20">
        {/* Hero Slider */}
        <section className="relative h-96 mb-8">
          <div className="relative h-full overflow-hidden">
            {bannerSlides.map((slide, index) => (
              <motion.div
                key={index}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentSlide ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={slide}
                  alt="Banner"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
              </motion.div>
            ))}

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {bannerSlides.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === currentSlide ? 'bg-red-500' : 'bg-white/50'}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Category Hub */}
        <section className="px-8 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group cursor-pointer"
              >
                <div className="relative h-32 rounded-lg overflow-hidden bg-gray-800">
                  <Image
                    src={category.logo}
                    alt={category.name}
                    fill
                    className="object-contain p-4"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                </div>
                <div className="mt-2 text-center">
                  <span className="text-sm font-avenir-medium">{category.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Content Sections */}
        <div className="px-8 space-y-8">
          {contentSections.map((section, sectionIndex) => (
            <section key={section.title}>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
                className="text-2xl font-avenir-heavy mb-6"
              >
                {section.title}
              </motion.h2>

              <div className="relative">
                <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                  {section.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: (sectionIndex * 0.1) + (itemIndex * 0.05) }}
                      className="flex-shrink-0 w-48 group cursor-pointer"
                    >
                      <div className="relative">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={192}
                          height={288}
                          className="rounded-lg group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/20 rounded-lg group-hover:bg-black/40 transition-colors" />
                        <div className="absolute top-2 left-2">
                          <span className="text-xs font-avenir-medium text-white bg-black/70 px-2 py-1 rounded">
                            {item.studio}
                          </span>
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <h3 className="text-sm font-avenir-medium text-white">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Scroll Arrow */}
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full p-2">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}