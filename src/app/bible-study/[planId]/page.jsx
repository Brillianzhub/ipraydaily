"use client";
import React from "react";
import Footer from '@/components/Footer';
import Navbar from '../../../components/Navbar';
import BannerSection from '../../../components/BannerSection';
import Sidebar from '../../../components/Sidebar';

import '../../../components/Home.css';



import { notFound } from 'next/navigation';
import PlanDetail from '../../../components/PlanDetail';
import planData from '../../../assets/planData.json';

export default function PlanPage({ params: paramsPromise }) {
    const params = React.use(paramsPromise);
    const { planId } = params;
    const plan = planData.plans[planId];

    if (!plan) {
        return notFound();
    }

    return (
        <div className="home-container">
            <Navbar />
            <BannerSection />
            <div className="content-container">
                <div className="main-section">
                    <PlanDetail plan={plan} />
                </div>
                <Sidebar />
            </div>
            <Footer />
        </div>
    );
}
