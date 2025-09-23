import BlogHeroSection from '@/components/blog/BlogHero'
import PrayerBlogSection from '@/components/blog/BlogSection'
import PrayerTransform from '@/components/prayers/PrayerTransform'
import React from 'react'

const page = () => {
    return (
        <>
            <BlogHeroSection />
            <PrayerBlogSection />
            <PrayerTransform />
        </>
    )
}

export default page