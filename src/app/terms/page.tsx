'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-[#E43636] sm:text-5xl mb-4">
            Terms and Conditions
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#000000]">
            Please read these terms and conditions carefully before using our services
          </p>
        </motion.div>

        <div className="mt-16 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="prose prose-lg mx-auto text-[#000000]"
          >
            <div className="space-y-8">
              {/* Acceptance of Terms */}
              <section>
                <h2 className="text-2xl font-semibold text-[#E43636] mb-4">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using Exercise Strength Core (ESCP) services, including but not limited to our website, 
                  mobile applications, online courses, and fitness programs, you accept and agree to be bound by the terms 
                  and provision of this agreement.
                </p>
              </section>

              {/* Services Description */}
              <section>
                <h2 className="text-2xl font-semibold text-[#E43636] mb-4">2. Services Description</h2>
                <p>
                  ESCP provides fitness training services, including Pilates and Lagree fitness instruction, online courses, 
                  workout routines, and related fitness content. Our services are designed to promote health and wellness 
                  through proper exercise techniques and guidance.
                </p>
              </section>

              {/* User Responsibilities */}
              <section>
                <h2 className="text-2xl font-semibold text-[#E43636] mb-4">3. User Responsibilities</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Consult with a healthcare provider before beginning any fitness program</li>
                  <li>Use our services at your own risk and discretion</li>
                  <li>Follow safety guidelines and instructions provided in our content</li>
                  <li>Maintain appropriate equipment and exercise environment</li>
                  <li>Stop exercising if you experience pain, dizziness, or other concerning symptoms</li>
                </ul>
              </section>

              {/* Health Disclaimer */}
              <section>
                <h2 className="text-2xl font-semibold text-[#E43636] mb-4">4. Health Disclaimer</h2>
                <p>
                  ESCP is not a medical organization. Our instructors and staff cannot give you medical advice or diagnosis. 
                  All information provided is for educational purposes only. Exercise programs may not be suitable for everyone. 
                  You should consult your physician or other health care professional before starting any fitness program.
                </p>
              </section>

              {/* Payment and Subscription */}
              <section>
                <h2 className="text-2xl font-semibold text-[#E43636] mb-4">5. Payment and Subscription</h2>
                <p>
                  Payment is required for access to premium content and services. Subscription fees are billed in advance 
                  and are non-refundable except as required by law. We reserve the right to modify pricing with 30 days 
                  notice to existing subscribers.
                </p>
              </section>

              {/* Intellectual Property */}
              <section>
                <h2 className="text-2xl font-semibold text-[#E43636] mb-4">6. Intellectual Property</h2>
                <p>
                  All content, including but not limited to videos, text, graphics, logos, and software, is the property 
                  of ESCP and is protected by copyright and other intellectual property laws. You may not reproduce, 
                  distribute, or create derivative works without explicit permission.
                </p>
              </section>

              {/* Privacy Policy */}
              <section>
                <h2 className="text-2xl font-semibold text-[#E43636] mb-4">7. Privacy Policy</h2>
                <p>
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our 
                  services, to understand our practices regarding the collection and use of your personal information.
                </p>
              </section>

              {/* Limitation of Liability */}
              <section>
                <h2 className="text-2xl font-semibold text-[#E43636] mb-4">8. Limitation of Liability</h2>
                <p>
                  ESCP shall not be liable for any indirect, incidental, special, consequential, or punitive damages, 
                  including but not limited to loss of profits, data, or use, incurred by you or any third party, 
                  whether in an action in contract or tort, even if the other party has been advised of the possibility 
                  of such damages.
                </p>
              </section>

              {/* Termination */}
              <section>
                <h2 className="text-2xl font-semibold text-[#E43636] mb-4">9. Termination</h2>
                <p>
                  We may terminate or suspend your access to our services immediately, without prior notice or liability, 
                  for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
              </section>

              {/* Changes to Terms */}
              <section>
                <h2 className="text-2xl font-semibold text-[#E43636] mb-4">10. Changes to Terms</h2>
                <p>
                  We reserve the right to modify or replace these Terms at any time. If a revision is material, we will 
                  try to provide at least 30 days notice prior to any new terms taking effect.
                </p>
              </section>

              {/* Contact Information */}
              <section>
                <h2 className="text-2xl font-semibold text-[#E43636] mb-4">11. Contact Information</h2>
                <p>
                  If you have any questions about these Terms and Conditions, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium">Exercise Strength Core (ESCP)</p>
                  <p>Email: contact@escp.com</p>
                  <p>Website: <Link href="/" className="text-[#E43636] hover:underline">www.escp.com</Link></p>
                </div>
              </section>

              {/* Effective Date */}
              <section>
                <h2 className="text-2xl font-semibold text-[#E43636] mb-4">12. Effective Date</h2>
                <p>
                  These Terms and Conditions are effective as of {new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })} and will remain in effect except with respect to any changes in their provisions in the future.
                </p>
              </section>
            </div>

            <div className="mt-12 text-center">
              <Link 
                href="/"
                className="inline-flex items-center px-6 py-3 border border-[#E43636] text-[#E43636] bg-white rounded-md hover:bg-[#E43636] hover:text-white transition-colors duration-200 font-medium"
              >
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
