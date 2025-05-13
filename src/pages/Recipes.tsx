import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, ChevronDown, BookOpen, Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import LoginModal from '../components/LoginModal';

interface Recipe {
  id: number;
  name: string;
  image: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: string[];
  instructions: string[];
  category: string;
  calories: number;
}

const recipes: Recipe[] = [
  {
    id: 1,
    name: 'Veggie Stir Fry',
    image: 'https://th.bing.com/th/id/OSK.09e449ab013aa72a500c9a7bcf59fdb4?w=100&h=140&rs=2&qlt=100&r=0&o=6&cdv=1&dpr=7&pid=16.',
    description: 'Colorful stir-fried vegetables in a savory sauce',
    prepTime: '10 mins',
    cookTime: '15 mins',
    servings: 2,
    difficulty: 'Easy',
    ingredients: [
      '1 cup broccoli florets',
      '1 bell pepper, sliced',
      '1 carrot, sliced',
      '1 tbsp soy sauce',
      '1 tsp sesame oil',
      '1 garlic clove, minced',
      '1 tsp ginger, grated',
      '1 tbsp olive oil'
    ],
    instructions: [
      'Heat oil in a pan',
      'Add garlic and ginger, sauté briefly',
      'Add veggies and stir-fry for 5-7 minutes',
      'Add soy sauce and sesame oil',
      'Cook another 2-3 minutes',
      'Serve hot over rice or noodles'
    ],
    category: 'Main Course',
    calories: 180
  },
  {
    id: 2,
    name: 'Caprese Salad',
    image: 'https://th.bing.com/th/id/OSK.9e74da41f147f35c75d95e04a73e73a2?w=186&h=124&rs=2&qlt=80&r=0&o=6&cdv=1&dpr=7&pid=16.1',
    description: 'Simple and fresh Italian salad with tomatoes and mozzarella',
    prepTime: '10 mins',
    cookTime: '0 mins',
    servings: 2,
    difficulty: 'Easy',
    ingredients: [
      '2 large tomatoes, sliced',
      '1 ball fresh mozzarella, sliced',
      'Fresh basil leaves',
      '2 tbsp olive oil',
      '1 tbsp balsamic glaze',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Layer tomato and mozzarella slices',
      'Add basil leaves between layers',
      'Drizzle with olive oil and balsamic glaze',
      'Sprinkle salt and pepper to taste',
      'Serve immediately'
    ],
    category: 'Salads',
    calories: 220
  },
  {
    id: 3,
    name: 'Vegetable Biryani',
    image: 'https://th.bing.com/th/id/OSK.cc22dda3074a9ba81a7777a03e6c0496?w=186&h=186&rs=2&qlt=80&o=6&cdv=1&dpr=7&pid=16.1',
    description: 'Spiced rice dish packed with vegetables',
    prepTime: '20 mins',
    cookTime: '30 mins',
    servings: 4,
    difficulty: 'Medium',
    ingredients: [
      '2 cups basmati rice',
      '1 cup mixed vegetables',
      '1 onion, sliced',
      '1/2 cup yogurt',
      '1 tbsp biryani masala',
      '1 tsp turmeric',
      '2 tbsp oil',
      'Salt to taste'
    ],
    instructions: [
      'Cook rice until 70% done',
      'Fry onions and vegetables with spices',
      'Layer rice and veggies in a pot',
      'Add yogurt and biryani masala',
      'Cover and cook on low for 15 mins',
      'Serve hot with raita'
    ],
    category: 'Main Course',
    calories: 350
  },
  {
    id: 4,
    name: 'Paneer Tikka',
    image: 'https://th.bing.com/th/id/OSK.44763b52e5a78caef934be63feafc464?w=186&h=104&rs=2&qlt=80&r=0&o=6&cdv=1&dpr=7&pid=16.1',
    description: 'Grilled paneer cubes marinated in spices',
    prepTime: '15 mins',
    cookTime: '15 mins',
    servings: 3,
    difficulty: 'Medium',
    ingredients: [
      '200g paneer, cubed',
      '1/2 cup yogurt',
      '1 tsp garam masala',
      '1 tsp paprika',
      '1/2 tsp turmeric',
      '1 tbsp lemon juice',
      'Salt to taste',
      'Skewers for grilling'
    ],
    instructions: [
      'Mix yogurt, spices, and lemon juice',
      'Marinate paneer in the mixture for 1 hour',
      'Thread onto skewers',
      'Grill or bake at 200°C for 15 minutes',
      'Serve with mint chutney'
    ],
    category: 'Appetizers',
    calories: 280
  },
  {
    id: 5,
    name: 'Spinach Lasagna',
    image: 'https://th.bing.com/th/id/OSK.7b98bf4911981fbf394d20161a41bf24?w=186&h=186&rs=2&qlt=80&r=0&o=6&cdv=1&dpr=7&pid=16.1',
    description: 'Cheesy vegetarian lasagna with spinach',
    prepTime: '20 mins',
    cookTime: '40 mins',
    servings: 6,
    difficulty: 'Medium',
    ingredients: [
      '9 lasagna noodles',
      '2 cups ricotta cheese',
      '1 cup cooked spinach',
      '1 jar marinara sauce',
      '1 cup shredded mozzarella',
      '1/4 cup grated Parmesan',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Preheat oven to 375°F',
      'Boil noodles and set aside',
      'Mix ricotta, spinach, salt, and pepper',
      'Layer sauce, noodles, and cheese mix',
      'Top with mozzarella and Parmesan',
      'Bake for 35-40 minutes'
    ],
    category: 'Main Course',
    calories: 420
  },
  {
    id: 6,
    name: 'Vegetarian Omelette',
    image: 'https://th.bing.com/th/id/OSK.9a6521edafaf644b219f7574a2dec51f?w=186&h=279&rs=2&qlt=80&r=0&o=6&cdv=1&dpr=7&pid=16.1',
    description: 'Egg-free chickpea flour omelette with veggies',
    prepTime: '10 mins',
    cookTime: '10 mins',
    servings: 2,
    difficulty: 'Easy',
    ingredients: [
      '1 cup chickpea flour',
      '1/2 cup water',
      '1/4 cup chopped onions',
      '1/4 cup chopped bell peppers',
      '1 tsp turmeric',
      'Salt to taste',
      '1 tbsp oil'
    ],
    instructions: [
      'Mix chickpea flour, water, turmeric, and salt into a batter',
      'Stir in chopped veggies',
      'Heat oil in a non-stick pan',
      'Pour batter and spread like a pancake',
      'Cook both sides until golden brown',
      'Serve with chutney or ketchup'
    ],
    category: 'Breakfast',
    calories: 220
  },
  {
    id: 7,
    name: 'Avocado Toast',
    image: 'https://th.bing.com/th/id/OSK.ce2c434521532aca81b32a90bd00ea85?w=186&h=169&rs=2&qlt=80&r=0&o=6&cdv=1&dpr=7&pid=16.1',
    description: 'Crispy toast topped with creamy avocado and spices',
    prepTime: '5 mins',
    cookTime: '5 mins',
    servings: 1,
    difficulty: 'Easy',
    ingredients: [
      '2 slices whole grain bread',
      '1 ripe avocado',
      '1 tsp lemon juice',
      'Salt and pepper to taste',
      'Chili flakes (optional)'
    ],
    instructions: [
      'Toast the bread slices',
      'Mash avocado with lemon juice, salt, and pepper',
      'Spread mashed avocado on toast',
      'Sprinkle chili flakes if desired',
      'Serve immediately'
    ],
    category: 'Breakfast',
    calories: 300
  },
  {
    id: 8,
    name: 'Banana Oat Pancakes',
    image: 'https://th.bing.com/th/id/OSK.9a6b80a98201a35b032666014b646df4?w=186&h=124&rs=2&qlt=80&r=0&o=6&cdv=1&dpr=7&pid=16.1',
    description: 'Healthy pancakes made with bananas and oats',
    prepTime: '10 mins',
    cookTime: '15 mins',
    servings: 2,
    difficulty: 'Easy',
    ingredients: [
      '1 banana',
      '1 cup rolled oats',
      '1/2 cup milk (dairy or plant-based)',
      '1/2 tsp baking powder',
      '1 tsp vanilla extract',
      'Oil for cooking'
    ],
    instructions: [
      'Blend all ingredients into a smooth batter',
      'Heat a non-stick pan and grease lightly',
      'Pour batter and cook on both sides until golden',
      'Serve with honey or maple syrup'
    ],
    category: 'Breakfast',
    calories: 270
  },
  {
    id: 9,
    name: 'Poha',
    image: 'https://th.bing.com/th/id/OIP.ihzgnMqRMLgOIEUoVPZXLwHaHa?w=298&h=298&c=10&rs=1&bgcl=fffffe&r=0&o=6&dpr=7&pid=23.1',
    description: 'Flattened rice cooked with onions, peas, and spices',
    prepTime: '10 mins',
    cookTime: '10 mins',
    servings: 2,
    difficulty: 'Easy',
    ingredients: [
      '1 cup poha (flattened rice)',
      '1 small onion, chopped',
      '1/4 cup green peas',
      '1/2 tsp mustard seeds',
      '1 green chili, chopped',
      '1 tbsp oil',
      'Salt and turmeric to taste',
      'Lemon juice and coriander for garnish'
    ],
    instructions: [
      'Rinse poha and drain',
      'Heat oil and add mustard seeds, onions, chili, and peas',
      'Add turmeric and salt',
      'Mix in the poha and stir gently',
      'Cook for 3-4 minutes',
      'Garnish with lemon juice and coriander'
    ],
    category: 'Breakfast',
    calories: 210
  },
  {
    id: 10,
    name: 'Masala Idli',
    image: 'https://th.bing.com/th/id/OSK.8651ab189f20abb43bc27a7f32f29bf7?w=186&h=186&rs=2&qlt=80&r=0&o=6&cdv=1&dpr=7&pid=16.1',
    description: 'Fried idli cubes tossed with spices and vegetables',
    prepTime: '5 mins',
    cookTime: '10 mins',
    servings: 2,
    difficulty: 'Easy',
    ingredients: [
      '4 idlis, cut into cubes',
      '1/2 onion, chopped',
      '1/2 tomato, chopped',
      '1 green chili, chopped',
      '1 tsp mustard seeds',
      '1/2 tsp turmeric',
      'Salt to taste',
      '1 tbsp oil',
      'Fresh coriander for garnish'
    ],
    instructions: [
      'Heat oil and add mustard seeds',
      'Sauté onions, tomatoes, and chili',
      'Add turmeric and salt',
      'Toss in idli cubes and mix well',
      'Garnish and serve hot'
    ],
    category: 'Breakfast',
    calories: 250
  },
  {
    id: 11,
    name: 'Muesli with Yogurt',
    image: 'https://th.bing.com/th/id/OSK.HEROC_5Ng8eD0365ynLfczjp_nbmrlYMJSIiJM9PlSpghXE?w=312&h=200&c=7&rs=1&r=0&o=6&dpr=7&pid=SANGAM',
    description: 'A crunchy and creamy blend of oats, nuts, fruits, and yogurt',
    prepTime: '5 mins',
    cookTime: '0 mins',
    servings: 1,
    difficulty: 'Easy',
    ingredients: [
      '1/2 cup muesli',
      '1/2 cup plain yogurt',
      '1 tbsp honey',
      '1/4 cup chopped fruits (banana, apple, berries)',
      'Nuts or seeds for topping'
    ],
    instructions: [
      'In a bowl, mix muesli and yogurt',
      'Add chopped fruits and drizzle honey',
      'Top with nuts or seeds',
      'Serve chilled or immediately'
    ],
    category: 'Breakfast',
    calories: 280
  },
  {
    id: 12,
    name: 'Greek Salad',
    image: 'https://th.bing.com/th/id/OSK.2f97d28d01ba4c0fb6d95aacab77faac?w=167&h=93&rs=2&qlt=80&o=6&cdv=1&dpr=7&pid=16.1',
    description: 'Crisp veggies, olives, and feta tossed in a lemon vinaigrette',
    prepTime: '10 mins',
    cookTime: '0 mins',
    servings: 2,
    difficulty: 'Easy',
    ingredients: [
      '1 cucumber, chopped',
      '2 tomatoes, chopped',
      '1/2 red onion, sliced',
      '1/2 cup feta cheese, cubed',
      '1/4 cup black olives',
      '2 tbsp olive oil',
      '1 tbsp lemon juice',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Combine all chopped vegetables and feta in a bowl',
      'Add olives',
      'Drizzle olive oil and lemon juice',
      'Season with salt and pepper',
      'Toss and serve fresh'
    ],
    category: 'Salads',
    calories: 220
  },
  {
    id: 13,
    name: 'Chickpea Salad',
    image: 'https://th.bing.com/th/id/OSK.629421f5aa10c59a7e5a6dc3a0dd6a08?w=167&h=83&rs=2&qlt=80&r=0&o=6&cdv=1&dpr=7&pid=16.1',
    description: 'Protein-rich salad with chickpeas, tomatoes, and herbs',
    prepTime: '10 mins',
    cookTime: '0 mins',
    servings: 2,
    difficulty: 'Easy',
    ingredients: [
      '1 cup cooked chickpeas',
      '1 tomato, chopped',
      '1/4 red onion, chopped',
      '1/4 cup chopped parsley',
      '1 tbsp olive oil',
      '1 tsp lemon juice',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Mix chickpeas, tomato, onion, and parsley',
      'Add lemon juice, olive oil, salt, and pepper',
      'Toss and serve'
    ],
    category: 'Salads',
    calories: 200
  },
  {
    id: 14,
    name: 'Quinoa & Avocado Salad',
    image: 'https://th.bing.com/th/id/OSK.4b03c32b89b8763f61dfe80de599bc86?w=167&h=87&rs=2&qlt=80&r=0&o=6&cdv=1&dpr=7&pid=16.1',
    description: 'Fresh and filling salad with quinoa, avocado, and veggies',
    prepTime: '15 mins',
    cookTime: '15 mins',
    servings: 2,
    difficulty: 'Easy',
    ingredients: [
      '1 cup cooked quinoa',
      '1 avocado, diced',
      '1/2 bell pepper, chopped',
      '1/4 cup corn',
      '1 tbsp lime juice',
      '1 tbsp olive oil',
      'Salt and pepper to taste'
    ],
    instructions: [
      'In a bowl, mix all ingredients',
      'Drizzle with lime juice and olive oil',
      'Season and toss gently',
      'Serve chilled'
    ],
    category: 'Salads',
    calories: 300
  },
  {
    id: 15,
    name: 'Cucumber Yogurt Salad',
    image: 'https://th.bing.com/th/id/OSK.b1d1a650f11e803a9153756429978f1a?w=167&h=83&rs=2&qlt=80&r=0&o=6&cdv=1&dpr=7&pid=16.1',
    description: 'Cool and creamy salad perfect for summer',
    prepTime: '5 mins',
    cookTime: '0 mins',
    servings: 2,
    difficulty: 'Easy',
    ingredients: [
      '1 cucumber, thinly sliced',
      '1 cup plain yogurt',
      '1/2 tsp cumin powder',
      'Salt to taste',
      'Mint leaves for garnish'
    ],
    instructions: [
      'Mix cucumber with yogurt and cumin',
      'Add salt to taste',
      'Garnish with mint leaves and serve chilled'
    ],
    category: 'Salads',
    calories: 150
  },
  {
    id: 16,
    name: 'Beetroot Apple Salad',
    image: 'https://th.bing.com/th/id/OSK.83beb74f944e799f5cc8f76ae74d1125?w=167&h=93&rs=2&qlt=80&r=0&o=6&cdv=1&dpr=7&pid=16.1',
    description: 'Sweet and tangy salad with beets and apples',
    prepTime: '10 mins',
    cookTime: '0 mins',
    servings: 2,
    difficulty: 'Easy',
    ingredients: [
      '1 beetroot, grated',
      '1 apple, grated',
      '1 tbsp lemon juice',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Mix grated beetroot and apple',
      'Add lemon juice, salt, and pepper',
      'Toss well and serve'
    ],
    category: 'Salads',
    calories: 130
  }, {
    id: 17,
    name: 'Buddha Bowl',
    image: 'https://th.bing.com/th/id/OSK.HEROwukyWQQSVlNcbQipMIfcFTpVfa67cJylSmZEEP5Iy08?w=296&h=176&c=1&rs=2&r=0&o=6&dpr=7&pid=SANGAM',
    description: 'Colorful bowl with grains, veggies, and tahini dressing',
    prepTime: '15 mins',
    cookTime: '20 mins',
    servings: 2,
    difficulty: 'Medium',
    ingredients: [
      '1 cup cooked quinoa',
      '1/2 cup roasted chickpeas',
      '1/2 cup steamed broccoli',
      '1/2 cup shredded carrots',
      '1/2 avocado, sliced',
      '2 tbsp tahini',
      '1 tbsp lemon juice',
      'Salt to taste'
    ],
    instructions: [
      'Arrange quinoa, chickpeas, broccoli, carrots, and avocado in a bowl',
      'Mix tahini, lemon juice, and salt for the dressing',
      'Drizzle dressing over the bowl',
      'Serve fresh'
    ],
    category: 'Bowls',
    calories: 400
  },
  {
    id: 18,
    name: 'Mexican Burrito Bowl',
    image: 'https://th.bing.com/th/id/OSK.3ede7a743b4ef7b1ba47de49000539dc?w=167&h=83&rs=2&qlt=80&r=0&o=6&cdv=1&dpr=7&pid=16.1',
    description: 'Southwest-style bowl with rice, beans, corn, and salsa',
    prepTime: '10 mins',
    cookTime: '15 mins',
    servings: 2,
    difficulty: 'Easy',
    ingredients: [
      '1 cup cooked brown rice',
      '1/2 cup black beans',
      '1/4 cup corn',
      '1/4 cup salsa',
      '1/2 avocado, diced',
      '1 tbsp lime juice',
      'Fresh cilantro'
    ],
    instructions: [
      'Layer rice, beans, corn, salsa, and avocado in a bowl',
      'Drizzle with lime juice',
      'Top with fresh cilantro',
      'Serve with tortilla chips if desired'
    ],
    category: 'Bowls',
    calories: 380
  },
  {
    id: 19,
    name: 'Mediterranean Bowl',
    image: 'https://th.bing.com/th/id/OSK.0337fbc18c67b991e7984b833dde9cf2?w=167&h=87&rs=2&qlt=80&o=6&cdv=1&dpr=7&pid=16.1',
    description: 'A mix of couscous, veggies, olives, and hummus',
    prepTime: '15 mins',
    cookTime: '10 mins',
    servings: 2,
    difficulty: 'Easy',
    ingredients: [
      '1 cup cooked couscous',
      '1/2 cup cherry tomatoes',
      '1/2 cucumber, chopped',
      '1/4 cup black olives',
      '2 tbsp hummus',
      '1 tbsp olive oil',
      'Salt and oregano to taste'
    ],
    instructions: [
      'Combine couscous and veggies in a bowl',
      'Top with olives and hummus',
      'Drizzle with olive oil and season with salt and oregano',
      'Serve immediately'
    ],
    category: 'Bowls',
    calories: 360
  },
  {
    id: 20,
    name: 'Peanut Tofu Rice Bowl',
    image: 'https://th.bing.com/th/id/OSK.c7b872f8b220af0a301a0cbe0c685ac8?w=167&h=144&rs=2&qlt=80&r=0&o=6&cdv=1&dpr=7&pid=16.1',
    description: 'Protein-packed tofu bowl with creamy peanut sauce',
    prepTime: '15 mins',
    cookTime: '15 mins',
    servings: 2,
    difficulty: 'Medium',
    ingredients: [
      '1 cup cooked jasmine rice',
      '1/2 block tofu, cubed and pan-fried',
      '1/2 cup shredded cabbage',
      '1/4 cup grated carrots',
      '2 tbsp peanut butter',
      '1 tbsp soy sauce',
      '1 tsp lime juice',
      'Water as needed'
    ],
    instructions: [
      'Whisk peanut butter, soy sauce, lime juice, and water to make sauce',
      'Assemble rice, tofu, and veggies in a bowl',
      'Drizzle with peanut sauce',
      'Serve warm or cold'
    ],
    category: 'Bowls',
    calories: 420
  },
];

const categories = ['All', 'Breakfast', 'Salads', 'Bowls', 'Main Course', 'Desserts'];

const RecipeCard = ({ recipe, onSave, isSaved }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => onSave(recipe)}
          className={`absolute top-2 right-2 p-2 rounded-full ${
            isSaved ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
          } hover:bg-red-100 hover:text-red-600 transition-colors`}
        >
          <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{recipe.name}</h3>
        <p className="text-gray-600 mb-4">{recipe.description}</p>
        
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 text-gray-500 mr-1" />
            <span className="text-sm text-gray-500">{recipe.prepTime}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 text-gray-500 mr-1" />
            <span className="text-sm text-gray-500">{recipe.servings} servings</span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs ${
            recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
            recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {recipe.difficulty}
          </span>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full py-2 text-green-600 hover:text-green-700"
        >
          <span className="font-semibold">View Recipe</span>
          <ChevronDown className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>

        {isExpanded && (
          <div className="mt-4 space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Ingredients</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Instructions</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Category: {recipe.category}</span>
                <span>{recipe.calories} calories per serving</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Recipes = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const filteredRecipes = recipes.filter(recipe => {
    const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSaveRecipe = (recipe) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }

    const recipeItem = {
      id: recipe.id,
      name: recipe.name,
      price: 0,
      image: recipe.image
    };

    if (isInWishlist(recipe.id)) {
      removeFromWishlist(recipe.id);
    } else {
      addToWishlist(recipeItem);
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4"
          >
            Recipes & Meal Ideas
          </motion.h1>
          <p className="text-gray-600">Discover delicious and healthy recipes for every occasion</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <BookOpen className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full ${
                    selectedCategory === category
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onSave={handleSaveRecipe}
              isSaved={isInWishlist(recipe.id)}
            />
          ))}
        </div>

        {/* No Results Message */}
        {filteredRecipes.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No recipes found matching your criteria.</p>
          </div>
        )}
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
};

export default Recipes;