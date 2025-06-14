
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What harmful additives can EatSmart detect?",
      answer: "EatSmart can detect over 3,000 food additives, preservatives, artificial colors, and chemicals that are banned or restricted in various countries. This includes substances like BHT, BHA, artificial food dyes, and many others that may pose health risks."
    },
    {
      question: "How accurate and updated is your safety database?",
      answer: "Our database is updated daily with information from FDA, WHO, EFSA, and other international food safety authorities. We maintain 99.5% accuracy through machine learning algorithms and expert verification of all safety data."
    },
    {
      question: "Does EatSmart work on all packaged foods?",
      answer: "EatSmart works with the vast majority of packaged foods that have barcodes. Our database covers over 2 million products globally and is constantly expanding. For products not in our database, you can manually input ingredients for analysis."
    },
    {
      question: "Can I personalize alerts for specific dietary needs?",
      answer: "Absolutely! You can set up custom profiles for allergies, dietary restrictions (vegan, keto, etc.), and personal health goals. The app will provide personalized alerts and recommendations based on your specific needs and preferences."
    }
  ];

  return (
    <section id="faq" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-gray-900/60"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-light mb-6 text-white">
            Frequently Asked
            <span className="block bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors duration-200"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}
              >
                <h3 className="text-lg font-medium text-white pr-4">{faq.question}</h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </motion.button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
