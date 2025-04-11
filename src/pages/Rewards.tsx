import { motion } from 'framer-motion';
import { Star, Gift, Trophy, Award } from 'lucide-react';
import LoginModal from '../components/LoginModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const rewardTiers = [
  {
    name: "Bronze",
    points: "0-500",
    benefits: [
      "1 point per $1 spent",
      "Birthday reward",
      "Monthly newsletter"
    ]
  },
  {
    name: "Silver",
    points: "501-1000",
    benefits: [
      "1.5 points per $1 spent",
      "Free delivery on orders over $40",
      "Early access to sales",
      "Exclusive monthly offers"
    ]
  },
  {
    name: "Gold",
    points: "1001+",
    benefits: [
      "2 points per $1 spent",
      "Free delivery on all orders",
      "Priority customer service",
      "Double points events",
      "Exclusive seasonal gifts"
    ]
  }
];

const rewards = [
  {
    id: 1,
    name: "$5 Off Your Next Order",
    points: 100,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    name: "Free Delivery",
    points: 200,
    image: "https://images.unsplash.com/photo-1586880244406-556ebe35f282?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    name: "$10 Off Fresh Produce",
    points: 300,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 4,
    name: "Premium Member Box",
    points: 500,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
  }
];

const Rewards = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [userPoints, setUserPoints] = useState(750); // Demo points
  const [redeemStatus, setRedeemStatus] = useState<{ [key: number]: boolean }>({});
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleRedeemReward = (reward: typeof rewards[0]) => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }

    if (userPoints < reward.points) {
      alert('Not enough points to redeem this reward!');
      return;
    }

    // Update user points
    setUserPoints(prevPoints => prevPoints - reward.points);
    
    // Mark reward as redeemed
    setRedeemStatus(prev => ({
      ...prev,
      [reward.id]: true
    }));

    // Store redeemed status in localStorage
    const redeemedRewards = JSON.parse(localStorage.getItem('redeemedRewards') || '{}');
    redeemedRewards[reward.id] = true;
    localStorage.setItem('redeemedRewards', JSON.stringify(redeemedRewards));

    // Show success message
    alert(`Successfully redeemed ${reward.name}!`);

    // Navigate to profile page after successful redemption
    navigate('/profile');
  };

  const getUserTier = (points: number) => {
    if (points >= 1001) return "Gold";
    if (points >= 501) return "Silver";
    return "Bronze";
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">FreshMart Rewards</h1>
          <p className="text-gray-600">Earn points and enjoy exclusive benefits</p>
        </motion.div>

        {/* User Points (if logged in) */}
        {isLoggedIn && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6 mb-12 text-center"
          >
            <h2 className="text-2xl font-bold text-green-600">{userPoints} Points</h2>
            <p className="text-gray-600">{getUserTier(userPoints)} Member</p>
          </motion.div>
        )}

        {/* Reward Tiers */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center">Reward Tiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rewardTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex items-center justify-center mb-4">
                  {index === 0 && <Trophy className="w-12 h-12 text-bronze" />}
                  {index === 1 && <Award className="w-12 h-12 text-silver" />}
                  {index === 2 && <Star className="w-12 h-12 text-gold" />}
                </div>
                <h3 className="text-xl font-bold text-center mb-2">{tier.name}</h3>
                <p className="text-gray-600 text-center mb-4">{tier.points} points</p>
                <ul className="space-y-2">
                  {tier.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <Gift className="w-4 h-4 mr-2 text-green-600" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Available Rewards */}
        <section>
          <h2 className="text-2xl font-bold mb-8 text-center">Available Rewards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rewards.map((reward) => (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={reward.image}
                  alt={reward.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{reward.name}</h3>
                  <p className="text-gray-600 mb-4">{reward.points} points</p>
                  <button
                    onClick={() => handleRedeemReward(reward)}
                    disabled={redeemStatus[reward.id]}
                    className={`w-full py-2 rounded-md transition-colors ${
                      redeemStatus[reward.id]
                        ? 'bg-gray-300 cursor-not-allowed'
                        : userPoints >= reward.points
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {redeemStatus[reward.id]
                      ? 'Redeemed'
                      : userPoints >= reward.points
                      ? 'Redeem'
                      : 'Not Enough Points'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-lg shadow-md p-8"
        >
          <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Earn Points</h3>
              <p className="text-gray-600">Shop and earn points on every purchase</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Level Up</h3>
              <p className="text-gray-600">Unlock new tiers and benefits</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Redeem Rewards</h3>
              <p className="text-gray-600">Use your points for exclusive rewards</p>
            </div>
          </div>
        </motion.section>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
};

export default Rewards;