import ContactHeroSection from '@/components/contact/ContactHero'
import ContactSection from '@/components/contact/ContactSection'
import PrayerTransform from '@/components/prayers/PrayerTransform'
import React from 'react'

const page = () => {
    return (
        <div>
            <ContactHeroSection />
            <ContactSection />
            <PrayerTransform />
        </div>
    )
}

export default page