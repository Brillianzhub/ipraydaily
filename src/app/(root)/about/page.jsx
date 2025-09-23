import AboutHeroSection from '@/components/about/AboutHero'
import AboutUsSection from '@/components/about/AboutSection'
import VisionSection from '@/components/about/AboutVision'
import CoreValuesSection from '@/components/about/Corevalues'
import OfferSection from '@/components/about/Offers'
import OurStorySection from '@/components/about/OurStory'
import PrayerTransform from '@/components/prayers/PrayerTransform'
import React from 'react'

const page = () => {
    return (
        <>
            <AboutHeroSection />
            <AboutUsSection />
            <VisionSection />
            <CoreValuesSection />
            <OurStorySection />
            <OfferSection />
            <PrayerTransform />
        </>
    )
}

export default page