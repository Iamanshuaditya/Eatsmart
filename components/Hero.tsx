 "use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  const goToScanner = () => router.push("/dashboard");  

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-blue-900 to-black px-4 md:px-12">
      {/* soft blobs */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-32 left-20 h-[300px] w-[300px] rounded-full bg-[#9256f6]/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-[180px] w-[260px] rounded-full bg-[#5db8f8]/20 blur-2xl" />
      </div>

      <div className="relative z-10 grid min-h-[80vh] items-center gap-16 lg:grid-cols-2">
        {/* image */}
        <motion.div
          className="flex justify-center lg:justify-start"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://res.cloudinary.com/dvfk4g3wh/image/upload/v1749885317/a5a89ece-6223-4fa6-95f2-c62c7058ea05_qdqhjv.png"
            alt="EatSmart App Interface"
            className="h-auto w-full max-w-lg rounded-2xl shadow-2xl"
          />
        </motion.div>

        {/* text & CTA */}
        <motion.div
          className="text-center lg:text-left"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="mb-8 text-5xl font-bold leading-tight text-white md:text-7xl"
            style={{ fontFamily: "'Breul Grotesk B', 'Inter', sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            AI-
            <span className="bg-gradient-to-r from-[#9256f6] via-[#e67ee7] to-[#5db8f8] bg-clip-text text-transparent drop-shadow-lg">
              Powered
            </span>{" "}
            Food Safety&nbsp;&amp; Transparency
          </motion.h1>

          <motion.button
            onClick={goToScanner}
            className="relative px-12 py-4 rounded-full bg-gradient-to-r from-[#9256f6] via-[#5db8f8] to-[#a259f7] text-lg font-bold text-white shadow-xl"
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
