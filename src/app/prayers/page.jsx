import React from 'react'
import PrayerHeroSection from '@/components/prayers/PrayerHero'
import PrayerCategoriesSection from '@/components/prayers/PrayerCategories'
import Transform from '@/components/landing/Transform'
import PrayerTransform from '@/components/prayers/PrayerTransform'

const page = () => {
    return (
        <>
            <PrayerHeroSection />
            <PrayerCategoriesSection />
            <PrayerTransform />
        </>
    )
}

export default page