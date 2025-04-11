import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';

const faqs = [
  {
    category: "Orders & Delivery",
    questions: [
      {
        q: "What are your delivery hours?",
        a: "We deliver from 8 AM to 8 PM, seven days a week. Same-day delivery is available for orders placed before 2 PM."
      },
      {
        q: "How do I track my order?",
        a: "Once your order is confirmed, you'll receive a tracking link via email and SMS. You can also track your order in real-time through your account dashboard."
      },
      {
        q: "What is your minimum order value?",
        a: "Our minimum order value is $20. Orders above $50 qualify for free delivery."
      }
    ]
  },
  {
    category: "Returns & Refunds",
    questions: [
      {
        q: "What is your return policy?",
        a: "If you're not satisfied with your products, we offer a full refund or replacement within 24 hours of delivery. Simply contact our customer service team."
      },
      {
        q: "How do I request a refund?",
        a: "You can request a refund through your account dashboard or by contacting our customer service team. Refunds are typically processed within 3-5 business days."
      }
    ]
  },
  {
    category: "Account & Payment",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards, debit cards, and digital wallets including PayPal, Apple Pay, and Google Pay."
      },
      {
        q: "How do I reset my password?",
        a: "Click on the 'Forgot Password' link on the login page. You'll receive an email with instructions to reset your password."
      }
    ]
  },
  {
    category: "Products & Quality",
    questions: [
      {
        q: "Are your products organic?",
        a: "We offer both organic and conventional products. All organic products are clearly labeled and certified."
      },
      {
        q: "How do you ensure product quality?",
        a: "We work directly with trusted suppliers and conduct regular quality checks. All products are stored in temperature-controlled environments."
      }
    ]
  }
];

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <motion.div
    initial={false}
    className="border-b last:border-b-0"
  >
    <button
      className="w-full py-4 flex justify-between items-center text-left"
      onClick={onClick}
    >
      <span className="font-medium">{question}</span>
      <ChevronDown
        className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden"
        >
          <p className="pb-4 text-gray-600">{answer}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const FAQ = () => {
  const [openQuestions, setOpenQuestions] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenQuestions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => 
    selectedCategory === 'All' || category.category === selectedCategory
  );

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-gray-600">Find answers to frequently asked questions</p>
        </motion.div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === 'All'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            All
          </button>
          {faqs.map((category) => (
            <button
              key={category.category}
              onClick={() => setSelectedCategory(category.category)}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category.category
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category.category}
            </button>
          ))}
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {filteredFaqs.map((category, categoryIndex) => (
            category.questions.length > 0 && (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <h2 className="text-xl font-bold p-6 bg-gray-50">{category.category}</h2>
                <div className="divide-y">
                  {category.questions.map((faq, questionIndex) => (
                    <FAQItem
                      key={questionIndex}
                      question={faq.q}
                      answer={faq.a}
                      isOpen={openQuestions[`${categoryIndex}-${questionIndex}`]}
                      onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                    />
                  ))}
                </div>
              </motion.div>
            )
          ))}
        </div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center bg-white p-8 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Please contact our support team.
          </p>
          <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors">
            Contact Support
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;