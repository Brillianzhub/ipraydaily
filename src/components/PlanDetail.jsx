import React, { useState, useEffect } from "react";
import './PlanDetail.css';

const PlanDetail = ({ plan }) => {
    const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(plan[0].duration * 60);

    const goToNextActivity = () => {
        setCurrentActivityIndex((prevIndex) =>
            prevIndex === plan.length - 1 ? 0 : prevIndex + 1
        );
        setTimeLeft(plan[(currentActivityIndex + 1) % plan.length].duration * 60);
    };

    useEffect(() => {
        if (timeLeft <= 0) {
            goToNextActivity();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };


    useEffect(() => {
        if (plan.length === 0) return;

        const currentActivity = plan[currentActivityIndex];
        const durationInMins = currentActivity.duration * 60 * 1000;

        const timer = setTimeout(() => {
            setCurrentActivityIndex((prevIndex) =>
                prevIndex === plan.length - 1 ? 0 : prevIndex + 1
            );
        }, durationInMins);

        return () => clearTimeout(timer);
    }, [currentActivityIndex, plan])

    return (
        <div>
            <div className="main-activity">
                <div className="activity-screen">
                    <div className="timer">
                        <p>Time Left: {formatTime(timeLeft)}</p>
                    </div>
                    <h1>{plan[currentActivityIndex].activity}</h1>
                </div>
                <div className="activity-list">
                    {plan.map((activity, index) => (
                        <div key={index} className="activity-menu">
                            <h2>{activity.activity}</h2>
                            <p>Duration: {activity.duration} mins</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PlanDetail;
