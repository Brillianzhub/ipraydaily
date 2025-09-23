import FeaturesSection from '@/components/landing/Features'
import HeroSection from '@/components/landing/Hero'
import Transform from '@/components/landing/Transform'
import Toolkit from '@/components/landing/Toolkit'
import React from 'react'
import GuidedPrayers from '@/components/landing/GuidedPrayers'
import TestimonialsSection from '@/components/landing/Testimonials'

const page = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <Toolkit />
      <GuidedPrayers />
      <TestimonialsSection />
      <Transform />
    </>
  )
}

export default page