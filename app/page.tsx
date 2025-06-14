 'use client'
 
 
import Navigation from '@/components/Navigation'
import FAQ from './FAQ'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Mission from '@/components/Mission'
import Download from '@/components/Download'
import Footer from '@/components/Footer'
   
export default function Home() {
  return (
     <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />
      <Hero />
      <Features />
      {/* <HowItWorks /> */}
      <Mission />
      <FAQ />
      <Download />
      <Footer />
    </div>
  ) 
}