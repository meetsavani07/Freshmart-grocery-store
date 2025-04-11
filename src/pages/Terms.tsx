import { motion } from 'framer-motion';

const Terms = () => {
  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-8"
        >
          <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
          
          <div className="space-y-6 text-gray-600">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">1. Introduction</h2>
              <p>
                Welcome to FreshMart. By accessing and using our website and services, you agree to be bound by these Terms and Conditions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">2. Definitions</h2>
              <p>
                "Service" refers to the FreshMart website and all services provided through it.
                "User" refers to anyone who accesses or uses our Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">3. Use of Service</h2>
              <p>
                You must be at least 18 years old to use our Service. You agree to provide accurate and complete information when creating an account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">4. Account Registration</h2>
              <p>
                To access certain features of our Service, you may need to create an account. You are responsible for maintaining the confidentiality of your account information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">5. Orders and Delivery</h2>
              <p>
                All orders are subject to availability and confirmation of the order price. Delivery times may vary depending on your location and other factors.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">6. Pricing and Payment</h2>
              <p>
                All prices are in USD unless otherwise stated. We reserve the right to change prices at any time. Payment must be made in full before delivery.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">7. Returns and Refunds</h2>
              <p>
                We accept returns within 24 hours of delivery for fresh products. Refunds will be processed within 3-5 business days.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">8. Privacy</h2>
              <p>
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect and use your information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">9. Intellectual Property</h2>
              <p>
                All content on our Service is owned by FreshMart and protected by copyright and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">10. Modifications</h2>
              <p>
                We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">11. Contact Us</h2>
              <p>
                If you have any questions about these Terms and Conditions, please contact us at support@freshmart.com.
              </p>
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

export default Terms;