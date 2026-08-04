import React from 'react';
import { motion } from 'framer-motion';

const TermsOfService = () => {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-lg max-w-none"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-black mb-8">Terms of Service</h1>
          <p className="text-gray-500 mb-12">Last Updated: August 2026</p>
          
          <div className="space-y-8 text-gray-700 font-sans leading-relaxed">
            <section>
              <h2 className="text-2xl font-serif text-black mb-4">1. Agreement to Terms</h2>
              <p>By accessing or using our website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-black mb-4">2. Use License</h2>
              <p>Permission is granted to temporarily download one copy of the materials (information or software) on KS Design Studio's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>modify or copy the materials;</li>
                <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                <li>attempt to decompile or reverse engineer any software contained on KS Design Studio's website;</li>
                <li>remove any copyright or other proprietary notations from the materials; or</li>
                <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-black mb-4">3. Disclaimer</h2>
              <p>The materials on KS Design Studio's website are provided on an 'as is' basis. KS Design Studio makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-black mb-4">4. Limitations</h2>
              <p>In no event shall KS Design Studio or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on KS Design Studio's website, even if KS Design Studio or a KS Design Studio authorized representative has been notified orally or in writing of the possibility of such damage.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-black mb-4">5. Revisions and Errata</h2>
              <p>The materials appearing on KS Design Studio's website could include technical, typographical, or photographic errors. KS Design Studio does not warrant that any of the materials on its website are accurate, complete, or current. KS Design Studio may make changes to the materials contained on its website at any time without notice.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-black mb-4">6. Governing Law</h2>
              <p>These terms and conditions are governed by and construed in accordance with the laws of Maharashtra, India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;
