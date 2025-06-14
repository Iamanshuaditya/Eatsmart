
import React from 'react';
import { motion } from 'framer-motion';

const Mission = () => {
  return (
    <section className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-black"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-light mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Our Mission
          </h2>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            At EatSmart, we're on a mission to empower consumers with the truth about their food. 
            By bridging the gap between confusing labels and genuine transparency, we help you protect 
            your health, your family, and your peace of mind.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Mission;
