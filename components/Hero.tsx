 import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 md:px-12 bg-gradient-to-b from-blue-900 to-black">
      {/* Optional overlay for glow/extra depth */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 left-20 w-[300px] h-[300px] bg-[#9256f6]/20 blur-3xl rounded-full" />
        <div className="absolute bottom-10 right-10 w-[260px] h-[180px] bg-[#5db8f8]/20 blur-2xl rounded-full" />
      </div>

      <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
        {/* Left - Image */}
        <motion.div
          className="flex justify-center lg:justify-start"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img 
            src="https://res.cloudinary.com/dvfk4g3wh/image/upload/v1749885317/a5a89ece-6223-4fa6-95f2-c62c7058ea05_qdqhjv.png"
            alt="EatSmart App Interface"
            className="w-full max-w-lg h-auto rounded-2xl shadow-2xl"
          />
        </motion.div>

        {/* Right - Content */}
        <motion.div
          className="text-center lg:text-left"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-white"
            style={{ fontFamily: "'Breul Grotesk B', 'Inter', sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            AI-
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9256f6] via-[#e67ee7] to-[#5db8f8] drop-shadow-lg">Powered</span>
            {" "}Food Safety & Transparency
          </motion.h1>
          
          <motion.button
            className="group relative px-12 py-4 bg-gradient-to-r from-[#9256f6] via-[#5db8f8] to-[#a259f7] rounded-full text-white font-bold text-lg shadow-xl border-none"
            style={{ fontFamily: "'Breul Grotesk B', 'Inter', sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Scanning
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
