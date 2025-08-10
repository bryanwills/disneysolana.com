'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { contentSections as dataSections } from '@/data/content';

export default function HomePage() {
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollPositions, setScrollPositions] = useState<number[]>([]);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pageProgress, setPageProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [contentFilter, setContentFilter] = useState<string>('all');
  const [showProfileEditor, setShowProfileEditor] = useState(false);
  const [editingProfile, setEditingProfile] = useState<{ id: number; name: string; image: string } | null>(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState<Array<{
    name: string;
    logo: string;
    video: string;
    image: string;
    count: number;
  }>>([]);
  const [profiles, setProfiles] = useState([
    { id: 1, name: 'Ye', image: '/images/Ye_1.webp', isActive: true },
    { id: 2, name: 'Andrew', image: '/images/Andrew_1.webp', isActive: false },
    { id: 3, name: 'Donald', image: '/images/Trump_1.webp', isActive: false },
    { id: 4, name: 'Elon', image: '/images/Elon_1.webp', isActive: false },
  ]);
  const scrollRefs = useRef<(HTMLDivElement | null)[]>([]);



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

  const categories = useMemo(() => [
    {
      name: 'Disney',
      logo: '/images/Disney.webp',
      video: '/videos/Disney.mp4',
      image: '/images/Disney.webp',
      count: 150
    },
    {
      name: 'PIXAR',
      logo: '/images/Pixar_1.webp',
      video: '/videos/Pixar.mp4',
      image: '/images/Pixar_1.webp',
      count: 45
    },
    {
      name: 'MARVEL',
      logo: '/images/Marvel.webp',
      video: '/videos/Marvel.mp4',
      image: '/images/Marvel.webp',
      count: 89
    },
    {
      name: 'STAR WARS',
      logo: '/images/StarWars_1.webp',
      video: '/videos/Star-Wars.mp4',
      image: '/images/StarWars_1.webp',
      count: 67
    },
    {
      name: 'NATIONAL GEOGRAPHIC',
      logo: '/images/National-Geographic.webp',
      video: '/videos/National-Geographic.mp4',
      image: '/images/National-Geographic.webp',
      count: 234
    },
    {
      name: 'hulu',
      logo: '/images/Hulu_1.webp',
      video: '/videos/Hulu.mp4',
      image: '/images/Hulu_1.webp',
      count: 312
    },
  ], []);

  const contentSections = dataSections;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [bannerSlides.length]);

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        // Find the currently visible section and scroll it
        const visibleSection = scrollRefs.current.findIndex(ref => {
          if (!ref) return false;
          const rect = ref.getBoundingClientRect();
          return rect.top < window.innerHeight && rect.bottom > 0;
        });

        if (visibleSection !== -1) {
          scrollSection(visibleSection, event.key === 'ArrowLeft' ? 'left' : 'right');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Add smooth scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  // Add touch gesture support for mobile
  useEffect(() => {
    const containers = scrollRefs.current.filter(Boolean);

    containers.forEach((container) => {
      if (!container) return;

      let startX = 0;
      let startScrollLeft = 0;

      const handleTouchStart = (e: TouchEvent) => {
        startX = e.touches[0].clientX;
        startScrollLeft = container.scrollLeft;
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (!startX) return;

        const x = e.touches[0].clientX;
        const walk = (startX - x) * 2;
        container.scrollLeft = startScrollLeft + walk;
      };

      const handleTouchEnd = () => {
        startX = 0;
        startScrollLeft = 0;
      };

      container.addEventListener('touchstart', handleTouchStart, { passive: false });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('touchend', handleTouchEnd);

      return () => {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      };
    });
  }, []);

  // Add scroll position tracking for progress indicators
  useEffect(() => {
    const containers = scrollRefs.current.filter(Boolean);

    const handleScroll = () => {
      containers.forEach((container, index) => {
        if (container) {
          updateScrollPosition(index, container.scrollLeft);
        }
      });
    };

    containers.forEach(container => {
      if (container) {
        container.addEventListener('scroll', handleScroll, { passive: true });
      }
    });

    return () => {
      containers.forEach(container => {
        if (container) {
          container.removeEventListener('scroll', handleScroll);
        }
      });
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showProfileDropdown && !(event.target as Element).closest('.profile-dropdown')) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showProfileDropdown]);

  // Add page scroll progress tracking
  useEffect(() => {
    const handleScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setPageProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScrollProgress, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollProgress);
  }, []);

  // Add scroll-to-top functionality
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulate loading for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter categories based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  }, [searchQuery, categories]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Skeleton loading component
  const ContentSkeleton = ({ count = 6 }: { count?: number }) => (
    <div className="flex space-x-4 overflow-x-auto pb-4">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className="flex-shrink-0 w-48"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className="w-48 h-72 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg animate-pulse relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
          </div>
          <div className="mt-2 space-y-2">
            <div className="h-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded animate-pulse w-3/4" />
            <div className="h-3 bg-gradient-to-r from-gray-800 to-gray-900 rounded animate-pulse w-1/2" />
          </div>
        </motion.div>
      ))}
    </div>
  );

    const updateScrollPosition = (sectionIndex: number, scrollLeft: number) => {
    setScrollPositions(prev => {
      const newPositions = [...prev];
      newPositions[sectionIndex] = scrollLeft;
      return newPositions;
    });
  };

  const scrollSection = (sectionIndex: number, direction: 'left' | 'right') => {
    const container = scrollRefs.current[sectionIndex];
    if (container) {
      // Calculate scroll amount based on card width + gap  
      const cardWidth = 300; // Updated to 300px width
      const gap = 16; // space-x-4 = 16px
      const scrollAmount = direction === 'left' ? -(cardWidth + gap) * 4 : (cardWidth + gap) * 4;

      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      
      // Immediately update scroll position for responsive progress bar
      setTimeout(() => {
        updateScrollPosition(sectionIndex, container.scrollLeft + scrollAmount);
      }, 100);
    }
  };

  // Enhanced profile management
  const handleProfileSelect = (profileId: number) => {
    setSelectedProfile(profileId);
    setProfiles(prev => prev.map(p => ({ ...p, isActive: p.id === profileId })));
  };

  const handleProfileEdit = (profile: { id: number; name: string; image: string }) => {
    setEditingProfile(profile);
    setShowProfileEditor(true);
  };

  const handleProfileUpdate = (profileId: number, field: 'name' | 'image', value: string) => {
    setProfiles(prev => prev.map(p =>
      p.id === profileId ? { ...p, [field]: value } : p
    ));
  };

  const handleProfileAdd = () => {
    const newId = Math.max(...profiles.map(p => p.id)) + 1;
    setProfiles(prev => [...prev, {
      id: newId,
      name: 'New Profile',
      image: '/images/Add-Profile-Icon_1.webp',
      isActive: false
    }]);
  };

  const handleProfileSave = (updatedProfile: { id: number; name: string; image: string }) => {
    setProfiles(prev => prev.map(p =>
      p.id === updatedProfile.id ? { ...p, ...updatedProfile } : p
    ));
    setShowProfileEditor(false);
    setEditingProfile(null);
  };

  const handleProfileDelete = (profileId: number) => {
    setProfiles(prev => prev.filter(p => p.id !== profileId));
    if (selectedProfile === profileId) {
      setSelectedProfile(profiles[0]?.id || null);
    }
  };

  const handleProfileImageChange = (profileId: number, newImage: string) => {
    setProfiles(prev => prev.map(p =>
      p.id === profileId ? { ...p, image: newImage } : p
    ));
    setEditingProfile(null);
  };

    // Content filtering
  const filteredContent = useMemo(() => {
    if (contentFilter === 'all') return contentSections;
    return contentSections.filter(section =>
      section.title.toLowerCase().includes(contentFilter.toLowerCase()) ||
      section.items.some(item =>
        item.title.toLowerCase().includes(contentFilter.toLowerCase()) ||
        item.studio.toLowerCase().includes(contentFilter.toLowerCase())
      )
    );
  }, [contentSections, contentFilter]);

  // Search functionality
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const results: Array<{ section: string; item: any; studio: string }> = [];

    contentSections.forEach(section => {
      section.items.forEach(item => {
        if (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.studio.toLowerCase().includes(searchQuery.toLowerCase())) {
          results.push({
            section: section.title,
            item,
            studio: item.studio
          });
        }
      });
    });

    return results.slice(0, 10); // Limit to 10 results
  }, [searchQuery, contentSections]);

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
            <button
              onClick={() => setShowProfileEditor(true)}
              className="bg-gray-800 text-white px-6 py-2 rounded font-avenir-medium hover:bg-gray-700 transition-colors"
            >
              EDIT PROFILES
            </button>
          </div>
        </nav>

        {/* Profile Selection Content */}
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-4">
            <h1 className="text-4xl font-avenir-heavy mb-12">Who&apos;s locked in?</h1>

            <div className="flex justify-center items-center space-x-8 mb-8">
              {profiles.map((profile, index) => (
                <motion.div
                  key={profile.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center cursor-pointer group"
                  onClick={() => handleProfileSelect(profile.id)}
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



  // Profile Editor Modal
  if (showProfileEditor) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50">
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-lg p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-avenir-heavy text-[#00DCFF]">Edit Profiles</h2>
                <button
                  onClick={() => setShowProfileEditor(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {profiles.map((profile) => (
                  <div key={profile.id} className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg">
                    <img
                      src={profile.image}
                      alt={profile.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => handleProfileUpdate(profile.id, 'name', e.target.value)}
                        className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-[#00DCFF] focus:outline-none font-avenir-medium"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingProfile(profile)}
                        className="bg-[#00DCFF] text-black px-3 py-2 rounded text-sm font-avenir-medium hover:bg-[#00B8E6] transition-colors"
                      >
                        Change Image
                      </button>
                      <button
                        onClick={() => handleProfileDelete(profile.id)}
                        className="bg-red-600 text-white px-3 py-2 rounded text-sm font-avenir-medium hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => handleProfileAdd()}
                  className="bg-[#00DCFF] text-black px-6 py-3 rounded font-avenir-medium hover:bg-[#00B8E6] transition-colors"
                >
                  Add New Profile
                </button>
                <button
                  onClick={() => setShowProfileEditor(false)}
                  className="bg-gray-600 text-white px-6 py-3 rounded font-avenir-medium hover:bg-gray-500 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Application Interface
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Skip to Content Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-[#00DCFF] focus:text-black focus:px-4 focus:py-2 focus:rounded-lg focus:font-avenir-heavy"
      >
        Skip to main content
      </a>

      {/* Page Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00DCFF] to-[#00B8D4] z-50 origin-left"
        style={{ transform: `scaleX(${pageProgress / 100})` }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: pageProgress / 100 }}
        transition={{ duration: 0.1 }}
      />

      {/* Netflix-style Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-sm">
        <div className="flex items-center justify-between px-8 py-4">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-4"
          >
            <Image
              src="/images/Disney.png"
              alt="Disney++"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </motion.div>

          {/* Navigation Menu */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex items-center space-x-6 ml-16"
          >
            <div className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors cursor-pointer">
              <div className="relative w-4 h-4">
                <Image src="/images/Home-Icon_outlined.webp" alt="" fill sizes="16px" className="object-contain filter brightness-0 invert" />
              </div>
              <span className="text-xs font-medium uppercase tracking-wider">Home</span>
            </div>
            <div className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors cursor-pointer">
              <div className="relative w-4 h-4">
                <Image src="/images/Search-Icon_outlined_1.webp" alt="" fill sizes="16px" className="object-contain filter brightness-0 invert" />
              </div>
              <span className="text-xs font-medium uppercase tracking-wider">Search</span>
            </div>
            <div className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors cursor-pointer">
              <div className="relative w-4 h-4">
                <Image src="/images/Plus-Icon_outlined.webp" alt="" fill sizes="16px" className="object-contain filter brightness-0 invert" />
              </div>
              <span className="text-xs font-medium uppercase tracking-wider">Watchlist</span>
            </div>
            <div className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors cursor-pointer">
              <div className="relative w-4 h-4">
                <Image src="/images/Star-Icon_outlined.webp" alt="" fill sizes="16px" className="object-contain filter brightness-0 invert" />
              </div>
              <span className="text-xs font-medium uppercase tracking-wider">Originals</span>
            </div>
            <div className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors cursor-pointer">
              <div className="relative w-3.5 h-3.5">
                <Image src="/images/Film-Reel-Icon_1.webp" alt="" fill sizes="14px" className="object-contain filter brightness-0 invert" />
              </div>
              <span className="text-xs font-medium uppercase tracking-wider">Movies</span>
            </div>
            <div className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors cursor-pointer">
              <div className="relative w-3.5 h-3.5">
                <Image src="/images/Tv-Icon_1.webp" alt="" fill sizes="14px" className="object-contain filter brightness-0 invert" />
              </div>
              <span className="text-xs font-medium uppercase tracking-wider">Series</span>
            </div>
          </motion.nav>

          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative profile-dropdown"
          >
            <div 
              className="flex items-center space-x-4 cursor-pointer group"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <span className="text-white font-avenir-roman text-sm tracking-wide">
                {profiles.find(p => p.isActive)?.name || 'Ye'}
              </span>
              <div className="relative">
                <Image
                  src={profiles.find(p => p.isActive)?.image || '/images/Ye_1.webp'}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full w-10 h-10 group-hover:ring-2 group-hover:ring-white/50 transition-all"
                />
              </div>
            </div>

            {/* Profile Dropdown */}
            <AnimatePresence>
              {showProfileDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 w-64 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl z-50"
                >
                  {/* Profile Selection */}
                  <div className="p-4">
                    <h3 className="text-white font-avenir-medium text-sm mb-3">Switch Profile</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {profiles.map((profile) => (
                        <div
                          key={profile.id}
                          className={`flex flex-col items-center p-2 rounded-lg cursor-pointer transition-colors ${
                            profile.isActive ? 'bg-blue-600/20' : 'hover:bg-gray-700/50'
                          }`}
                          onClick={() => {
                            handleProfileSelect(profile.id);
                            setShowProfileDropdown(false);
                          }}
                        >
                          <Image
                            src={profile.image}
                            alt={profile.name}
                            width={32}
                            height={32}
                            className="rounded-full w-8 h-8 mb-1"
                          />
                          <span className="text-xs text-white font-avenir-medium">{profile.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-700"></div>

                  {/* Menu Options */}
                  <div className="p-2">
                    <button
                      onClick={() => {
                        setShowProfileEditor(true);
                        setShowProfileDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 text-white hover:bg-gray-700/50 rounded text-sm font-avenir-medium transition-colors"
                    >
                      Edit Profiles
                    </button>
                    <Link href="/settings" className="block w-full text-left px-3 py-2 text-white hover:bg-gray-700/50 rounded text-sm font-avenir-medium transition-colors">
                      Settings
                    </Link>
                    <Link href="/account" className="block w-full text-left px-3 py-2 text-white hover:bg-gray-700/50 rounded text-sm font-avenir-medium transition-colors">
                      Account
                    </Link>
                    <Link href="/whitepaper" className="block w-full text-left px-3 py-2 text-white hover:bg-gray-700/50 rounded text-sm font-avenir-medium transition-colors">
                      Whitepaper
                    </Link>
                    <Link href="/community" className="block w-full text-left px-3 py-2 text-white hover:bg-gray-700/50 rounded text-sm font-avenir-medium transition-colors">
                      Community
                    </Link>
                    <Link href="/telegram" className="block w-full text-left px-3 py-2 text-white hover:bg-gray-700/50 rounded text-sm font-avenir-medium transition-colors">
                      Telegram
                    </Link>
                    <Link href="/token" className="block w-full text-left px-3 py-2 text-white hover:bg-gray-700/50 rounded text-sm font-avenir-medium transition-colors">
                      Token
                    </Link>
                    <Link href="/help" className="block w-full text-left px-3 py-2 text-white hover:bg-gray-700/50 rounded text-sm font-avenir-medium transition-colors">
                      Help
                    </Link>
                    
                    {/* Divider */}
                    <div className="border-t border-gray-700 my-2"></div>
                    
                    <Link href="/" className="block w-full text-left px-3 py-2 text-red-400 hover:bg-gray-700/50 rounded text-sm font-avenir-medium transition-colors">
                      Log Out
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </header>

      <main id="main-content" className="pt-20">
        {/* Hero Slider with Parallax */}
        <section className="relative h-64 sm:h-80 lg:h-96 mb-6 md:mb-8 overflow-hidden mx-2 sm:mx-4 md:mx-8 rounded-lg">
          <div className="relative h-full">
            {bannerSlides.map((slide, index) => (
              <motion.div
                key={index}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{
                  opacity: index === currentSlide ? 1 : 0,
                  scale: index === currentSlide ? 1 : 1.1
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <Image
                    src={slide}
                    alt="Banner"
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40" />

                {/* Content overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="text-center text-white"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <h1 className="text-4xl md:text-6xl font-avenir-heavy mb-4 drop-shadow-2xl">
                      Disney++
                    </h1>
                    <p className="text-xl md:text-2xl font-avenir-medium mb-6 drop-shadow-lg">
                      The Ultimate Streaming Experience
                    </p>
                    <motion.button
                      className="bg-[#00DCFF] text-black px-8 py-3 rounded-lg font-avenir-medium hover:bg-[#00B8D4] transition-all duration-300 transform hover:scale-105 shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Start Watching
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            ))}

            {/* Enhanced Slide Indicators - Bottom Right */}
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 flex space-x-2 md:space-x-3">
              {bannerSlides.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-white shadow-lg shadow-white/30'
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <motion.button
              className="absolute left-2 md:left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-lg"
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? bannerSlides.length - 1 : prev - 1))}
              whileHover={{ scale: 1.1, x: -3 }}
              whileTap={{ scale: 0.95 }}
              style={{ zIndex: 10 }}
            >
              <svg className="w-5 h-5 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            <motion.button
              className="absolute right-2 md:right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-lg"
              onClick={() => setCurrentSlide((prev) => (prev === bannerSlides.length - 1 ? 0 : prev + 1))}
              whileHover={{ scale: 1.1, x: 3 }}
              whileTap={{ scale: 0.95 }}
              style={{ zIndex: 10 }}
            >
              <svg className="w-5 h-5 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </section>

        {/* Category Hub */}
        <section id="category-hub" className="px-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-avenir-heavy text-center mb-4">Explore Categories</h2>
            <p className="text-gray-400 text-center font-avenir-medium">Discover your favorite content</p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-md mx-auto mt-6"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for content..."
                  className="w-full px-4 py-3 pl-12 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00DCFF] focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400">
                  🔍
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {filteredCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group cursor-pointer"
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.95 }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    // Handle category selection
                  }
                }}
                aria-label={`Browse ${category.name} content`}
              >
                <div className="relative h-36 w-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  {/* Background Image */}
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Category Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-avenir-heavy text-lg mb-2">{category.name}</h3>
                    <p className="text-gray-300 text-sm font-avenir-medium">{category.count} items</p>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                    <motion.div
                      className="bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Content Section */}
        <section className="px-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-avenir-heavy text-center mb-4">Featured & Trending</h2>
            <p className="text-gray-400 text-center font-avenir-medium">What&apos;s hot right now</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "The Mandalorian",
                image: "/images/Banner1-Web.webp",
                category: "Star Wars",
                rating: "TV-14",
                year: "2023",
                description: "The travels of a lone bounty hunter in the outer reaches of the galaxy."
              },
              {
                title: "Loki",
                image: "/images/Banner7.webp",
                category: "Marvel",
                rating: "TV-14",
                year: "2023",
                description: "The mercurial villain Loki resumes his role as the God of Mischief."
              },
              {
                title: "Elemental",
                image: "/images/Banner9.webp",
                category: "PIXAR",
                rating: "PG",
                year: "2023",
                description: "Follows Ember and Wade, in a city where fire-, water-, earth- and air-residents live together."
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                className="group cursor-pointer"
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative h-64 w-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-[#00DCFF] text-black px-2 py-1 rounded font-avenir-medium">
                        {item.category}
                      </span>
                      <span className="text-xs text-gray-300">{item.rating}</span>
                      <span className="text-xs text-gray-300">{item.year}</span>
                    </div>
                    <h3 className="text-xl font-avenir-heavy text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-300 font-avenir-medium line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Play Button */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                    <motion.div
                      className="bg-[#00DCFF] rounded-full p-4 border-4 border-white/30"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </motion.div>
                  </div>
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

              <div className="relative group">
                {/* Scroll Progress Indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-150 shadow-sm group-hover:bg-red-500"
                    style={{
                      width: scrollRefs.current[sectionIndex] ?
                        `${Math.min(100, Math.max(0, (scrollPositions[sectionIndex] || 0) / Math.max(1, (scrollRefs.current[sectionIndex]!.scrollWidth - scrollRefs.current[sectionIndex]!.clientWidth)) * 100))}%` :
                        '0%'
                    }}
                  />
                </div>

                {/* Left Arrow */}
                <button
                  onClick={() => scrollSection(sectionIndex, 'left')}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-black/90 hover:bg-black text-white rounded-full p-2 opacity-80 hover:opacity-100 scroll-arrow transition-all duration-200 hover:scale-110"
                  aria-label="Scroll left"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Right Arrow */}
                <button
                  onClick={() => scrollSection(sectionIndex, 'right')}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-black/90 hover:bg-black text-white rounded-full p-2 opacity-80 hover:opacity-100 scroll-arrow transition-all duration-200 hover:scale-110"
                  aria-label="Scroll right"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Content Row */}
                <div
                  ref={(el) => {
                    scrollRefs.current[sectionIndex] = el;
                  }}
                  className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide snap-x scroll-smooth"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  onScroll={(e) => {
                    const target = e.target as HTMLDivElement;
                    updateScrollPosition(sectionIndex, target.scrollLeft);
                  }}
                >
                  {isLoading ? (
                    <ContentSkeleton />
                  ) : (
                    section.items.map((item, itemIndex) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: (sectionIndex * 0.1) + (itemIndex * 0.05) }}
                        className="flex-shrink-0 group cursor-pointer snap-start"
                        style={{ width: '300px' }}
                        whileHover={{ scale: 1.02, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link href={`/title/${encodeURIComponent(item.title)}`}>
                          <div className="relative overflow-hidden rounded-lg bg-gray-800">
                            <div className="relative w-full" style={{ height: '200px' }}>
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                                sizes="192px"
                              />

                              {/* Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                              {/* Title */}
                              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                                <h3 className="font-avenir-heavy text-sm leading-tight">{item.title}</h3>
                                <p className="text-xs text-gray-300 font-avenir-medium">{item.studio}</p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-20 px-8 py-12 bg-gradient-to-r from-gray-900 to-black">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-avenir-heavy text-white mb-4">DisneySolana</h3>
                <p className="text-gray-400 font-avenir-medium">
                  The future of entertainment on the blockchain
                </p>
              </div>

              <div>
                <h4 className="text-lg font-avenir-heavy text-white mb-4">Categories</h4>
                <ul className="space-y-2">
                  {categories.slice(0, 4).map((category) => (
                    <li key={category.name}>
                      <Link
                        href={`/category/${encodeURIComponent(category.name.toLowerCase())}`}
                        className="text-gray-400 hover:text-white transition-colors font-avenir-medium"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-avenir-heavy text-white mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/buy" className="text-gray-400 hover:text-white transition-colors font-avenir-medium">
                      Buy Tokens
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-gray-400 hover:text-white transition-colors font-avenir-medium">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-gray-400 hover:text-white transition-colors font-avenir-medium">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-avenir-heavy text-white mb-4">Connect</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center">
              <p className="text-gray-400 font-avenir-medium">
                © 2024 DisneySolana. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 bg-[#00DCFF] hover:bg-[#00B8D4] text-black rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl"
            aria-label="Scroll to top"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Page Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-800 z-50">
        <div
          className="h-full bg-gradient-to-r from-[#00DCFF] to-[#FF6B6B] transition-all duration-300"
          style={{ width: `${pageProgress}%` }}
        />
      </div>
    </div>
  );
}