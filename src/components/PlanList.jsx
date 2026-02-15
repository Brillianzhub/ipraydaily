'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import io from "socket.io-client";


const PlanList = () => {
    const plans = [
        { id: '30mins', label: '30 mins Plan' },
        { id: '1hour', label: '1 Hour Plan' },
        { id: '1.5hour', label: '1.5 Hour Plan' },
        { id: '2hour', label: '2 Hour Plan' },
    ];

    const [selectedPlan, setSelectedPlan] = useState(null);
    const [roomId, setRoomId] = useState('');
    const [linkCopied, setLinkCopied] = useState(false);
    const [roomCreationVisible, setRoomCreationVisible] = useState(false);
    const [userName, setUserName] = useState("");
    const router = useRouter();

    const socketRef = useRef(null);

    useEffect(() => {
        // Initialize the socket connection
        socketRef.current = io("http://localhost:3002");

        // Listen for welcome message
        socketRef.current.on("welcome", (data) => {
            console.log("Server says:", data.message);
        });

        // Listen for updated user list
        socketRef.current.on("userList", (updatedUsers) => {
            setUsers(updatedUsers);
        });

        // Listen for a user joining
        socketRef.current.on("userJoined", ({ userName }) => {
            console.log(`${userName} joined the room`);
        });

        // Listen for a user leaving
        socketRef.current.on("userLeft", ({ userName }) => {
            console.log(`${userName} left the room`);
        });

        // Listen for meeting start
        socketRef.current.on("meetingStarted", ({ message }) => {
            console.log(message);
            // Optionally, you can redirect or show a notification
        });

        // Handle join error
        socketRef.current.on("joinError", ({ message }) => {
            alert(message);
        });

        // Handle start error
        socketRef.current.on("startError", ({ message }) => {
            alert(message);
        });

        // Cleanup on component unmount
        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const handleCreateRoom = async () => {
        if (!userName || !selectedPlan) {
            alert("Please enter your name and select a plan!");
            return;
        }

        try {
            const response = await fetch("http://localhost:3002/create-room", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userName, planId: selectedPlan.id }),
            });

            if (!response.ok) {
                const error = await response.json();
                alert(error.error);
                return;
            }

            const { roomId } = await response.json();
            setRoomId(roomId);
            setRoomCreationVisible(false);

            socketRef.current.emit("joinRoom", { roomId, userName, isCreator: true });
        } catch (error) {
            console.error("Error creating room:", error);
            alert("Failed to create room. Please try again.");
        }
    };

    const handleCopyLink = () => {
        const roomLink = `${window.location.origin}/bible-study/room/${roomId}`;
        navigator.clipboard.writeText(roomLink);
        setLinkCopied(true);
    };


    const handleStartMeeting = () => {
        if (!selectedPlan) {
            alert('Please select a plan first!');
            return;
        }
        if (roomId && selectedPlan) {
            socketRef.current.emit("startMeeting", roomId);
            router.push(`/bible-study/room/${roomId}?planId=${selectedPlan.id}`);
        } else {
            router.push(`/bible-study/${selectedPlan.id}`);
        }
    };

    return (
        <div>
            <h1>Select a Plan</h1>
            <input
                type="text"
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                style={{ marginBottom: "10px", display: "block" }}
            />
            <div>
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        onClick={() => setSelectedPlan(plan)}
                        style={{
                            cursor: 'pointer',
                            padding: '10px',
                            border: selectedPlan?.id === plan.id ? '2px solid blue' : '1px solid #ccc',
                            borderRadius: '4px',
                            marginBottom: '10px',
                            backgroundColor: selectedPlan?.id === plan.id ? '#f0f8ff' : 'transparent',
                        }}
                    >
                        {plan.label}
                    </div>
                ))}
            </div>

            <div style={{ marginTop: "20px" }}>
                {!roomId && (
                    <>
                        <p
                            onClick={() => setRoomCreationVisible(true)}
                            style={{
                                cursor: "pointer",
                                color: "blue",
                                textDecoration: "underline",
                                marginBottom: "10px",
                            }}
                        >
                            Create a room and invite your friends?
                        </p>

                        {roomCreationVisible && (
                            <button onClick={handleCreateRoom} style={{ marginTop: "10px" }}>
                                Create Room
                            </button>
                        )}
                    </>
                )}

                {roomId && (
                    <div>
                        <p>Room Created! Share this link with your friends:</p>
                        <p>
                            <code>{`${window.location.origin}/bible-study/room/${roomId}`}</code>
                        </p>
                        <button onClick={handleCopyLink}>
                            {linkCopied ? "Link Copied!" : "Copy Link"}
                        </button>

                        <div>
                            <button
                                onClick={handleStartMeeting}
                                style={{ marginTop: "10px" }}
                            >
                                Start Now!
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlanList;
