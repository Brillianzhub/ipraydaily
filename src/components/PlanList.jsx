'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

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
    const router = useRouter();

    const generateRoomId = () => {
        return Math.random().toString(36).substr(2, 9); // Generate a unique ID
    };

    const handleCreateRoom = () => {
        const newRoomId = generateRoomId();
        setRoomId(newRoomId);
        setLinkCopied(false); // Reset copied state
    };

    const handleCopyLink = () => {
        const roomLink = `${window.location.origin}/bible-study/room/${roomId}`;
        navigator.clipboard.writeText(roomLink);
        setLinkCopied(true);
    };


    const handleStart = () => {
        if (!selectedPlan) {
            alert('Please select a plan first!');
            return;
        }
        if (roomId && selectedPlan) {
            router.push(`/bible-study/room/${roomId}?planId=${selectedPlan.id}`);
        } else {
            router.push(`/bible-study/${selectedPlan.id}`);
        }
    };

    return (
        <div>
            <h1>Select a Plan</h1>
            <div>
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        onClick={() => setSelectedPlan(plan)} // Select the plan
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

            <div style={{ marginTop: '20px' }}>
                <p onClick={() => setRoomCreationVisible(true)} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
                    Create a room and invite your friends?
                </p>

                {roomCreationVisible && !roomId && (
                    <div>
                        <button onClick={handleCreateRoom} style={{ marginTop: '10px' }}>
                            Create Room
                        </button>
                    </div>
                )}

                {roomId && (
                    <div>
                        <p>Room Created! Share this link with your friends:</p>
                        <p>
                            <code>{`${window.location.origin}/bible-study/room/${roomId}`}</code>
                        </p>
                        <button onClick={handleCopyLink}>
                            {linkCopied ? 'Link Copied!' : 'Copy Link'}
                        </button>
                    </div>
                )}
                <div>
                    <button onClick={handleStart} style={{ marginTop: '10px' }}>
                        Start Now!
                    </button>
                </div>

            </div>
        </div>
    );
};

export default PlanList;
