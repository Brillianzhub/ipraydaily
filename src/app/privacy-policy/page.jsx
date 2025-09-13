
import { Mail, Shield, Users, Database, Eye, Lock, Baby, FileText, Phone } from 'lucide-react';
import React from 'react'

const page = () => {
    return (
        <div className='min-h-screen'>
            <div className="w-full min-h-[400px] relative overflow-hidden">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#3FA9E0] via-[#0384C6] to-[#014060]"></div>
                {/* Content */}
                <div className="relative z-10 flex items-center justify-center min-h-[400px] px-6 py-16">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-5xl font-bold text-white mb-8 leading-tight">
                            IPray Daily Privacy Policy
                        </h1>

                        <p className="text-lg text-white/90 leading-relaxed max-w-3xl mx-auto font-light">
                            Effective Date:  01.07.2024
                        </p>

                    </div>
                </div>

            </div>
            <div className="bg-gray-50 min-h-screen mb-28">
                <div className="max-w-6xl mx-auto px-6 py-12">
                    {/* Header */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            iPray Daily (<strong>"we," "us," or "our"</strong>) is committed to protecting the privacy of our users (<strong>"you" or "your"</strong>). This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our mobile application (<strong>"App"</strong>).
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        {/* Section 1 */}
                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</span>
                                <Database className="w-6 h-6 mr-2 text-blue-600" />
                                Information We Collect
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">We collect the following information when you use our App:</p>
                            <div className="space-y-4">
                                <div className="bg-blue-50 rounded-lg p-4">
                                    <h3 className="font-semibold text-gray-900 mb-2">Personal Information:</h3>
                                    <p className="text-gray-600">When you create an account, you may provide us with certain personal information, such as your name, email address, and prayer requests (optional).</p>
                                </div>
                                <div className="bg-green-50 rounded-lg p-4">
                                    <h3 className="font-semibold text-gray-900 mb-2">Usage Data:</h3>
                                    <p className="text-gray-600">We collect information about how you use the App, such as the features you access, the frequency of your use, and the content you view.</p>
                                </div>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</span>
                                <Eye className="w-6 h-6 mr-2 text-blue-600" />
                                How We Use Your Information
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">We use the information we collect for the following purposes:</p>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-3 flex-shrink-0"></div>
                                    <span className="text-gray-600 leading-relaxed">To provide and operate the App, including to allow you to create an account and connect with other users.</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-3 flex-shrink-0"></div>
                                    <span className="text-gray-600 leading-relaxed">To personalize your experience with the App by recommending content and features we believe you will be interested in.</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-3 flex-shrink-0"></div>
                                    <span className="text-gray-600 leading-relaxed">To send you promotional communications, such as newsletters and marketing emails (with your consent).</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-3 flex-shrink-0"></div>
                                    <span className="text-gray-600 leading-relaxed">To analyze the use of the App and improve our services.</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-3 flex-shrink-0"></div>
                                    <span className="text-gray-600 leading-relaxed">To comply with the law and enforce our policies.</span>
                                </li>
                            </ul>
                        </section>

                        {/* Section 3 */}
                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">3</span>
                                <Users className="w-6 h-6 mr-2 text-blue-600" />
                                Sharing Your Information
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                We may share your information with third-party service providers who help us operate the App and provide our services. These service providers are contractually obligated to keep your information confidential and secure. We will not share your personal information with any third-party for marketing purposes without your consent.
                            </p>
                        </section>

                        {/* Section 4 */}
                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">4</span>
                                <Database className="w-6 h-6 mr-2 text-blue-600" />
                                Data Retention
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                We will retain your information for as long as your account is active or as needed to provide you with the services you request. We may also retain your information for a longer period if required by law or to comply with our regulatory obligations.
                            </p>
                        </section>

                        {/* Section 5 */}
                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">5</span>
                                <Shield className="w-6 h-6 mr-2 text-blue-600" />
                                Your Choices
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                You can access, update, or delete your personal information by contacting us at <strong>[Insert Your Email Address]</strong>. You can also opt out of receiving promotional communications from us by following the unsubscribe instructions in those communications.
                            </p>
                        </section>

                        {/* Section 6 */}
                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">6</span>
                                <Lock className="w-6 h-6 mr-2 text-blue-600" />
                                Security
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                We implement reasonable security measures to protect your information from unauthorized access, disclosure, alteration, or destruction. However, no internet transmission or electronic storage is 100% secure. As a result, we cannot guarantee the absolute security of your information.
                            </p>
                        </section>

                        {/* Section 7 */}
                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">7</span>
                                <Baby className="w-6 h-6 mr-2 text-blue-600" />
                                Children's Privacy
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                Our App is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian, and you believe your child has provided us with personal information, please contact us. If we learn that we have collected personal information from a child under 13, we will delete that information from our servers.
                            </p>
                        </section>

                        {/* Section 8 */}
                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">8</span>
                                <FileText className="w-6 h-6 mr-2 text-blue-600" />
                                Changes to This Privacy Policy
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                We may update this Privacy Policy from time to time to reflect changes in our practices or comply with legal requirements. We will notify you of any changes by posting the new Privacy Policy on our App.
                            </p>
                        </section>

                        {/* Section 9 */}
                        <section className="border-t border-gray-200 pt-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">9</span>
                                <Phone className="w-6 h-6 mr-2 text-blue-600" />
                                Contact Us
                            </h2>
                            <div className="bg-gray-50 rounded-xl p-6">
                                <p className="text-gray-600 leading-relaxed mb-3">
                                    If you have any questions about this Privacy Policy, please contact us at:
                                </p>
                                <div className="flex items-center space-x-2">
                                    <Mail className="w-5 h-5 text-gray-400" />
                                    <span className="text-gray-600">Email:</span>
                                    <a href="mailto:Contact@ipraysdaily.com" className="text-blue-600 hover:text-blue-700 font-medium">
                                        Contact@ipraysdaily.com
                                    </a>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page