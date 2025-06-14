
import React from 'react';
import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    {
      backgroundImage: "https://res.cloudinary.com/dvfk4g3wh/image/upload/v1749887293/ac0dac91-d055-4e4a-afcd-89e46ea9dcc5_qmh0pk.png",
      description: 'Instantly identify foods and ingredients with our advanced computer vision model..'
    },
    {
      backgroundImage: "https://res.cloudinary.com/dvfk4g3wh/image/upload/v1749887353/790551ae-2207-4861-bacf-17b51ae94bc0_kgfjtq.png",
      description: 'Detect banned or harmful additives instantly.'
    },
    {
      backgroundImage: "https://res.cloudinary.com/dvfk4g3wh/image/upload/v1749887407/e9f152b8-6565-4e8d-bdaf-bc76e865be47_ry0u8g.png",
      description: 'Works without internet connection, keeping your data on your device.'
    },
    {
      backgroundImage: "https://res.cloudinary.com/dvfk4g3wh/image/upload/v1749887533/1680dd25-0cbc-4ebf-88b2-68d57e61db5b_jnmpul.png",
      description: 'AI adapts to your preferences and dietary needs over time'
    }
  ];

  return (
<section
  id="features"
  className="pb-20 bg-gradient-to-b from-black via-blue-900 to-blue-800 relative"
>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Breul Grotesk B', 'Inter', sans-serif" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Features
          </motion.h2>
          <motion.div
            className="inline-block px-4 py-2 bg-blue-600/20 rounded-full border border-blue-400/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-blue-200 text-sm font-medium" style={{ fontFamily: "'Breul Grotesk B', 'Inter', sans-serif" }}>
              Powerful tools for smart food scanning and safety analysis
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="relative rounded-xl overflow-hidden h-96 bg-gray-900/50 backdrop-blur-sm border border-white/10">
                {/* Clear background image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${feature.backgroundImage})` }}
                />
                
                {/* Minimal overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-semibold leading-relaxed text-base" style={{ fontFamily: "'Breul Grotesk B', 'Inter', sans-serif" }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
