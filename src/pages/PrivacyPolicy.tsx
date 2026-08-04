import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-lg max-w-none"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-black mb-8">Privacy Policy</h1>
          <p className="text-gray-500 mb-12">Last Updated: August 2026</p>
          
          <div className="space-y-8 text-gray-700 font-sans leading-relaxed">
            <section>
              <h2 className="text-2xl font-serif text-black mb-4">1. Introduction</h2>
              <p>Welcome to KS Design Studio ("we", "our", or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy informs you about how we look after your personal data when you visit our website (regardless of where you visit it from) and tells you about your privacy rights and how the law protects you.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-black mb-4">2. The Data We Collect About You</h2>
              <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
                <li><strong>Marketing and Communications Data</strong> includes your preferences in receiving marketing from us and our third parties and your communication preferences.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-black mb-4">3. How We Use Your Personal Data</h2>
              <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal obligation.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-black mb-4">4. Cookies and Web Beacons</h2>
              <p>We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-black mb-4">5. Google Consent Mode v2</h2>
              <p>In compliance with European Economic Area (EEA) and global privacy standards, we utilize Google Consent Mode v2. This ensures that Google tags (such as Google Analytics and Google Ads) adjust their behavior based on your consent status. If you deny analytics or ad cookies, these tags will not read or write cookies for those purposes, operating in a restricted, cookieless mode instead.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-black mb-4">6. Contact Us</h2>
              <p>If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
              <div className="mt-4 p-6 bg-gray-50 border border-gray-100">
                <p className="font-semibold text-black">KS Design Studio</p>
                <p>Pune, Maharashtra, India</p>
                <p>Email: privacy@ksdesignstudio.in</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
