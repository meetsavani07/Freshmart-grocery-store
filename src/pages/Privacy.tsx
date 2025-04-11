import { motion } from 'framer-motion';

const Privacy = () => {
  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-8"
        >
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          
          <div className="space-y-6 text-gray-600">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">1. Introduction</h2>
              <p>
                At FreshMart, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">2. Information We Collect</h2>
              <p>We collect information that you provide directly to us, including:</p>
              <ul className="list-disc ml-6 mt-2">
                <li>Name and contact information</li>
                <li>Delivery address</li>
                <li>Payment information</li>
                <li>Order history</li>
                <li>Communication preferences</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">3. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc ml-6 mt-2">
                <li>Process and deliver your orders</li>
                <li>Communicate with you about your orders</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Improve our services</li>
                <li>Prevent fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">4. Information Sharing</h2>
              <p>
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc ml-6 mt-2">
                <li>Delivery partners</li>
                <li>Payment processors</li>
                <li>Service providers</li>
                <li>Law enforcement when required</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">5. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc ml-6 mt-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
                <li>Object to processing of your information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">7. Cookies</h2>
              <p>
                We use cookies and similar technologies to improve your browsing experience and analyze website traffic.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">8. Children's Privacy</h2>
              <p>
                Our services are not intended for children under 13. We do not knowingly collect information from children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any significant changes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">10. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-2">
                <p>Email: privacy@freshmart.com</p>
                <p>Phone: 1-800-FRESHMART</p>
                <p>Address: 123 Grocery Street, New York, NY 10001</p>
              </div>
            </section>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            <p>Last updated: March 15, 2024</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;