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
                    <div className="flex flex-row items-center gap-3 sm:gap-4">
                        <a
                            href="https://play.google.com/store/apps/details?id=com.brillianzhub.ipray"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Get it on Google Play"
                            className="shrink-0"
                        >
                            <img
                                src="/playstore.svg"
                                alt="Get it on Google Play"
                                className="h-12 w-auto transition-transform hover:scale-105 drop-shadow-sm"
                                loading="lazy"
                            />
                        </a>

                        <a
                            href="https://apps.apple.com/app/ipray-daily/id6746961354"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Download on the App Store"
                            className="shrink-0"
                        >
                            <img
                                src="/appstore.svg"
                                alt="Download on the App Store"
                                className="h-12 w-auto transition-transform hover:scale-105 drop-shadow-sm"
                                loading="lazy"
                            />
                        </a>
                    </div>

                    {/* <button className="bg-[#0284C7] text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                        Download App
                    </button> */}
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