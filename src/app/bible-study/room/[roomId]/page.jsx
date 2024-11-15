"use client";
import React, { useState, useEffect } from "react";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import BannerSection from '@/components/BannerSection';
import Sidebar from '@/components/Sidebar';
import { useSearchParams } from "next/navigation";
import PlanDetail from "@/components/PlanDetail";
import planData from '@/assets/planData.json';

import '@/components/Home.css';


const RoomDetailPage = ({ params: roomId }) => {
    const params = React.use(roomId);
    console.log(params)
    const [plan, setPlan] = useState(null);
    const [users, setUsers] = useState([]);
    const [userName, setUserName] = useState('');
    const [joined, setJoined] = useState(false);
    const searchParams = useSearchParams();
    const planId = searchParams.get('planId');

    useEffect(() => {
        if (planId) {
            const selectedPlan = planData.plans[planId];
            setPlan(selectedPlan);

            if (users.length === 0) {
                setUsers([{ id: 'admin', name: 'Admin', role: 'Admin' }]);
                setJoined(true);
            }
        } else {
            console.error("Plan ID is missing in the query params!");
        }
    }, [planId]);

    const handleJoinRoom = () => {
        if (!userName) {
            alert('Please enter your name!')
            return;
        }

        const newUser = { id: Date.now(), name: userName, role: "Paricipant" };
        setUsers((prevUsers) => [...prevUsers, newUser]);
        setUserName('');
        setJoined(true);
    };

    if (!plan) {
        return <div>Loading...</div>;
    }


    return (
        <div className="home-container">
            <Navbar />
            <BannerSection />
            <div className="content-container">
                <div className="main-section">
                    {plan && <PlanDetail plan={plan} roomId={params} />}
                    {!joined ? (
                        <div className="participants-list">
                            <input
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="Enter your name"
                            />
                            <button onClick={handleJoinRoom}>Join Room</button>
                        </div>
                    ) : (
                        <div className="participants-list">
                            <h2>Participants:</h2>
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {users.map((user) => (
                                    <div
                                        key={user.id}
                                        style={{
                                            margin: '10px',
                                            padding: '10px',
                                            background: user.role === 'Admin' ? '#ffc107' : '#e0e0e0',
                                            borderRadius: '8px'
                                        }}
                                    >
                                        <strong>{user.name}</strong> {user.role === 'Admin' && '(Admin)'}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <Sidebar />
            </div>
            <Footer />
        </div>
    );
};

export default RoomDetailPage;


