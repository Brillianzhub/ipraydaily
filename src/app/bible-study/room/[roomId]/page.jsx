"use client";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import BannerSection from '@/components/BannerSection';
import Sidebar from '@/components/Sidebar';

import PlanDetail from "@/components/PlanDetail";
import planData from '@/assets/planData.json';
import '@/components/Home.css';



import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useSearchParams } from "next/navigation";

let socket;

const RoomDetailPage = ({ params }) => {
    const searchParams = useSearchParams();
    const planId = searchParams.get("planId");
    const [plan, setPlan] = useState(null);
    const [roomId, setRoomId] = useState(null);
    const [userName, setUserName] = useState("");
    const [joined, setJoined] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function unwrapParams() {
            const unwrappedParams = await params;
            setRoomId(unwrappedParams.roomId); // Unwrap the roomId
        }
        unwrapParams();
    }, [params]);

    useEffect(() => {
        if (!roomId) return;

        socket = io("http://localhost:3002");

        socket.on("userList", (updatedUsers) => {
            setUsers(updatedUsers);
        });

        return () => {
            socket.disconnect();
        };
    }, [roomId]);


    

    const handleJoinRoom = () => {
        if (!userName) {
            alert("Please enter your name!");
            return;
        }

        if (!roomId) {
            alert("Room ID is missing!");
            return;
        }

        socket.emit("joinRoom", { roomId, userName });
        setJoined(true);
    };

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
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {!joined ? (
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Enter your name"
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                        />
                                        <button onClick={handleJoinRoom}>Join Room</button>
                                    </div>
                                ) : (
                                    <div>
                                        <h3>Participants:</h3>
                                        <ul>
                                            {users.map((user) => (
                                                <li key={user.id}>
                                                    {user.name} {user.role === "Admin" && "(Admin)"}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
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

{/* <div className="room-detail">
    {!joined ? (
        <div>
            <input
                type="text"
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <button onClick={handleJoinRoom}>Join Room</button>
        </div>
    ) : (
        <div>
            <h3>Participants:</h3>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} {user.role === "Admin" && "(Admin)"}
                    </li>
                ))}
            </ul>
        </div>
    )}
</div> */}