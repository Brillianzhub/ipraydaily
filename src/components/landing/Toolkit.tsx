import React from 'react';

const Toolkit = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center">
                {/* Left Content */}
                <div className="space-y-6">
                    <h1 className="text-[2rem] font-bold text-gray-800 leading-tight">
                        A Comprehensive Prayer & <br></br> Worship Toolkit
                    </h1>

                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                        iPray Daily is designed to help every believer in Christ grow spiritually while maintaining a consistent prayer life. In today&apos;s busy and distracted world, having a reliable prayer companion can be life-changing.
                    </p>

                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                        Whether you&apos;re new to faith or a mature believer, this app is built to help you bridge the gap between knowledge and practice—so that the promises of God can find full expression in your life.
                    </p>

                    <button className="bg-[#0284C7] text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                        Download App
                    </button>
                </div>

                {/* Right Side - Abstract Design */}
                <div className="">
                    <img src="/toolkit.png" />
                </div>
            </div>
        </div>
    );
};

export default Toolkit;