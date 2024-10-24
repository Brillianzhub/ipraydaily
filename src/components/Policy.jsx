import React from 'react';
import '../pages/PrivacyPolicy/PrivacyPolicy.css';
import contact from '../assets/images/contact.png';


const PrivacyPolicy = () => {
    return (
        <div className="privacy-policy">
            <h1>IPray Daily Privacy Policy</h1>
            <p><strong>Effective Date:</strong> 01.07.2024</p>
            <p>IPray Daily ("we," "us," or "our") is committed to protecting the privacy of our users ("you" or "your").
                This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our
                mobile application ("App").</p>

            <h2>Information We Collect</h2>
            <p>We collect the following information when you use our App:</p>
            <ul>
                <li><strong>Personal Information:</strong> When you create an account, you may provide us with certain
                    personal information, such as your name, email address, and prayer requests (optional).</li>
                <li><strong>Usage Data:</strong> We collect information about how you use the App, such as the features
                    you access, the frequency of your use, and the content you view.</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul>
                <li>To provide and operate the App, including to allow you to create an account and connect with other users.</li>
                <li>To personalize your experience with the App by recommending content and features we believe you will be
                    interested in.</li>
                <li>To send you promotional communications, such as newsletters and marketing emails (with your consent).</li>
                <li>To analyze the use of the App and improve our services.</li>
                <li>To comply with the law and enforce our policies.</li>
            </ul>

            <h2>Sharing Your Information</h2>
            <p>We may share your information with third-party service providers who help us operate the App and provide our services.
                These service providers are contractually obligated to keep your information confidential and secure.
                We will not share your personal information with any third-party for marketing purposes without your consent.</p>

            <h2>Data Retention</h2>
            <p>We will retain your information for as long as your account is active or as needed to provide you with the services you request.
                We may also retain your information for a longer period if required by law or to comply with our regulatory obligations.</p>

            <h2>Your Choices</h2>
            <p>You can access, update, or delete your personal information by contacting us at [Insert Your Email Address].
                You can also opt out of receiving promotional communications from us by following the unsubscribe instructions in those communications.</p>

            <h2>Security</h2>
            <p>We implement reasonable security measures to protect your information from unauthorized access, disclosure, alteration, or destruction.
                However, no internet transmission or electronic storage is 100% secure. As a result, we cannot guarantee the absolute security of your information.</p>

            <h2>Children's Privacy</h2>
            <p>Our App is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13.
                If you are a parent or guardian, and you believe your child has provided us with personal information, please contact us.
                If we learn that we have collected personal information from a child under 13, we will delete that information from our servers.</p>

            <h2>Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time to reflect changes in our practices or comply with legal requirements.
                We will notify you of any changes by posting the new Privacy Policy on our App.</p>

            <h2>Contact Us</h2>

            <div className='contact-info'>
                <p>If you have any questions about this Privacy Policy, please contact us at
                    &nbsp;
                    <a href="mailto:contact.ipraydaily@gmail.com"><img src={contact} alt='Email' /></a>.</p>
            </div>

        </div>
    );
}

export default PrivacyPolicy;
