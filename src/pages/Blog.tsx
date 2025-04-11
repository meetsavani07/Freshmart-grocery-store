import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: "The Benefits of Organic Produce",
    excerpt: "Discover why organic produce is not just a trend but a healthier choice for you and the environment.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "2024-03-15",
    author: "Sarah Johnson",
    category: "Health"
  },
  {
    id: 2,
    title: "Seasonal Cooking: Spring Edition",
    excerpt: "Make the most of spring produce with these delicious and healthy recipes.",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "2024-03-10",
    author: "Michael Chen",
    category: "Recipes"
  },
  {
    id: 3,
    title: "Sustainable Shopping Guide",
    excerpt: "Learn how to make environmentally conscious choices while grocery shopping.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "2024-03-05",
    author: "Emma Wilson",
    category: "Sustainability"
  }
];

const categories = ["All", "Health", "Recipes", "Sustainability", "News", "Tips"];

const Blog = () => {
  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">FreshMart Blog</h1>
          <p className="text-gray-600">Stay updated with the latest news, tips, and recipes</p>
        </motion.div>

        {/* Categories */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full bg-white text-gray-600 hover:bg-green-600 hover:text-white transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md overflow-hidden mb-12"
        >
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <span className="text-green-600 font-semibold">{blogPosts[0].category}</span>
              <h2 className="text-2xl font-bold mt-2 mb-4">{blogPosts[0].title}</h2>
              <p className="text-gray-600 mb-6">{blogPosts[0].excerpt}</p>
              <div className="flex items-center text-gray-500 text-sm mb-6">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(blogPosts[0].date).toLocaleDateString()}
                <User className="w-4 h-4 ml-4 mr-2" />
                {blogPosts[0].author}
              </div>
              <button className="flex items-center text-green-600 hover:text-green-700">
                Read More <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className="text-green-600 font-semibold">{post.category}</span>
                <h3 className="text-xl font-bold mt-2 mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(post.date).toLocaleDateString()}
                  <User className="w-4 h-4 ml-4 mr-2" />
                  {post.author}
                </div>
                <button className="flex items-center text-green-600 hover:text-green-700">
                  Read More <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-green-600 text-white rounded-lg p-8 mt-12"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="mb-6">Get the latest articles and recipes delivered to your inbox</p>
            <form className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md text-gray-900"
              />
              <button
                type="submit"
                className="bg-white text-green-600 px-6 py-2 rounded-md font-semibold hover:bg-gray-100"
              >
                Subscribe
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;