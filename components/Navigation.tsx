'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'Features', 'How It Works', 'FAQ', 'Start Scanning'];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-xl bg-white/10' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src="https://res.cloudinary.com/dvfk4g3wh/image/upload/v1749885256/a2f806a4-78db-4d76-9435-503f581d2b9f_dncbvo.png"
              alt="EatSmart Logo"
              className="h-20 w-auto"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
          {navItems.map((item) => {
  const isDashboard = item === 'Start Scanning';
  const href = isDashboard ? '/dashboard' : `#${item.toLowerCase().replace(' ', '-')}`;
  return (
    <motion.div key={item} whileHover={{ y: -2 }}>
      <Link
        href={href}
        className="text-white hover:text-blue-300 transition-colors duration-200 relative group font-medium"
        style={{ fontFamily: "'Breul Grotesk B', 'Inter', sans-serif" }}
        onClick={() => setIsMenuOpen(false)}
      >
        {item}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-300 to-blue-500 group-hover:w-full transition-all duration-300"></span>
      </Link>
    </motion.div>
  );
})}

          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden w-8 h-8 flex flex-col justify-center items-center space-y-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <motion.span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <motion.span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden absolute top-full left-0 right-0 backdrop-blur-xl bg-black/80 border-b border-white/20"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-6 py-4 space-y-4">
              {navItems.map((item, index) => {
  const isDashboard = item === 'Start Scanning';
  const href = isDashboard ? '/dashboard' : `#${item.toLowerCase().replace(' ', '-')}`;
  return isDashboard ? (
    <Link
      key={item}
      href={href}
      className="block text-white hover:text-blue-300 transition-colors duration-200 font-medium"
      style={{ fontFamily: "'Breul Grotesk B', 'Inter', sans-serif" }}
      onClick={() => setIsMenuOpen(false)}
      passHref
    >
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        {item}
      </motion.span>
    </Link>
  ) : (
    <motion.a
      key={item}
      href={href}
      className="block text-white hover:text-blue-300 transition-colors duration-200 font-medium"
      style={{ fontFamily: "'Breul Grotesk B', 'Inter', sans-serif" }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => setIsMenuOpen(false)}
    >
      {item}
    </motion.a>
  );
})}

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
