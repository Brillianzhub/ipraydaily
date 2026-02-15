import { Mail } from 'lucide-react'
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
                            IPray Daily Terms
                        </h1>

                        <p className="text-lg text-white/90 leading-relaxed max-w-3xl mx-auto font-light">
                            Last updated
                        </p>

                    </div>
                </div>

            </div>
            <div className="bg-gray-50 mb-28">
                <div className="max-w-6xl mx-auto px-6 py-12">
                    {/* Header */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to iPray Daily</h1>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            These Terms of Service govern your use of the iPray Daily app provided by Brillianz Hub. By using our app, you agree to these terms. Please read them carefully.
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        {/* Section 1 */}
                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</span>
                                Data Collection & Usage
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We collect and use your personal information (such as name, email, and prayer notes) to provide personalized prayer and Bible study experiences. For details on what data we collect and why, please review our{' '}
                                <a href="#" className="text-blue-600 hover:text-blue-700 underline font-medium">Privacy Policy</a>.
                            </p>
                        </section>

                        {/* Section 2 */}
                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</span>
                                User Responsibilities
                            </h2>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-3 flex-shrink-0"></div>
                                    <span className="text-gray-600 leading-relaxed">You agree to use the app for lawful purposes only.</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-3 flex-shrink-0"></div>
                                    <span className="text-gray-600 leading-relaxed">You must not share harmful or offensive content.</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-3 flex-shrink-0"></div>
                                    <span className="text-gray-600 leading-relaxed">You are responsible for keeping your account information secure.</span>
                                </li>
                            </ul>
                        </section>

                        {/* Section 3 */}
                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">3</span>
                                Account & Data Deletion
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                You may request deletion of your personal data at any time without deleting your account by visiting our{' '}
                                <a href="#" className="text-blue-600 hover:text-blue-700 underline font-medium">Manage Account page</a>{' '}
                                or emailing us at{' '}
                                <a href="mailto:support@ipraydaily.net" className="text-blue-600 hover:text-blue-700 underline font-medium">support@ipraydaily.net</a>.{' '}
                                We will process your request within 7 business days.
                            </p>
                        </section>

                        {/* Section 4 */}
                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">4</span>
                                Data Retention
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                Some information may be retained for legal or security purposes, such as transaction logs (up to 90 days) and security logs (up to 30 days).
                            </p>
                        </section>

                        {/* Section 5 */}
                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">5</span>
                                Third-Party Services
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                Our app may use trusted third-party services such as analytics or crash reporting tools. These services comply with applicable data protection regulations.
                            </p>
                        </section>

                        {/* Section 6 */}
                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">6</span>
                                Updates to Terms
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                We may update these terms from time to time. Continued use of the app after changes means you accept the updated terms.
                            </p>
                        </section>

                        {/* Contact Section */}
                        <section className="border-t border-gray-200 pt-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                            <div className="bg-gray-50 rounded-xl p-6">
                                <p className="text-gray-600 leading-relaxed mb-3">
                                    If you have any questions about these Terms, please contact us at:
                                </p>
                                <div className="flex items-center space-x-2">
                                    <Mail className="w-5 h-5 text-gray-400" />
                                    <span className="text-gray-600">Email:</span>
                                    <a href="mailto:support@ipraydaily.net" className="text-blue-600 hover:text-blue-700 font-medium">
                                        support@ipraydaily.net
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