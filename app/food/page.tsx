'use client'

import { useState } from 'react'
import { Search, Star, Clock, MapPin, ShoppingCart, Plus, Minus, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '@/components/Providers'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

interface Restaurant {
  id: string
  name: string
  cuisine: string
  rating: number
  deliveryTime: string
  distance: string
  image: string
  menu: MenuItem[]
}

const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Kampala Delights',
    cuisine: 'Ugandan',
    rating: 4.8,
    deliveryTime: '25-35 min',
    distance: '2.5 km',
    image: '🍛',
    menu: [
      { id: '1', name: 'Matoke with Beef', description: 'Steamed plantains with tender beef stew', price: 12000, image: '🍌', category: 'Main' },
      { id: '2', name: 'Rolex', description: 'Chapati with eggs and vegetables', price: 5000, image: '🌯', category: 'Fast Food' },
      { id: '3', name: 'Chicken Luwombo', description: 'Traditional chicken in banana leaves', price: 15000, image: '🍗', category: 'Main' },
      { id: '4', name: 'Groundnut Sauce with Rice', description: 'Rich peanut sauce served with steamed rice', price: 10000, image: '🥜', category: 'Main' },
      { id: '5', name: 'Katogo', description: 'Matoke with offal and vegetables', price: 8000, image: '🍲', category: 'Main' },
      { id: '6', name: 'Muchomo', description: 'Grilled meat skewers with kachumbari', price: 12000, image: '🍢', category: 'Main' },
      { id: '7', name: 'Posho & Beans', description: 'Maize meal with stewed beans', price: 6000, image: '🫘', category: 'Main' },
      { id: '8', name: 'Chapatis (2 pieces)', description: 'Freshly made flatbread', price: 3000, image: '🫓', category: 'Side' },
    ],
  },
  {
    id: '2',
    name: 'Kinshasa Kitchen',
    cuisine: 'Congolese',
    rating: 4.6,
    deliveryTime: '30-40 min',
    distance: '3.2 km',
    image: '🍲',
    menu: [
      { id: '9', name: 'Fufu with Fish', description: 'Cassava fufu with grilled fish', price: 14000, image: '🐟', category: 'Main' },
      { id: '10', name: 'Moambe Chicken', description: 'Chicken in palm nut sauce', price: 16000, image: '🍖', category: 'Main' },
      { id: '11', name: 'Saka Saka', description: 'Cassava leaves with palm oil', price: 8000, image: '🥬', category: 'Vegetable' },
      { id: '12', name: 'Pondu', description: 'Cassava leaves cooked with fish', price: 12000, image: '🥘', category: 'Main' },
      { id: '13', name: 'Madesu', description: 'Beans cooked with palm oil', price: 7000, image: '🫘', category: 'Main' },
      { id: '14', name: 'Liboke', description: 'Fish or chicken steamed in banana leaves', price: 15000, image: '🐟', category: 'Main' },
      { id: '15', name: 'Chikwanga', description: 'Steamed cassava bread', price: 4000, image: '🍞', category: 'Side' },
      { id: '16', name: 'Beignets', description: 'Sweet fried doughnuts', price: 3000, image: '🍩', category: 'Dessert' },
    ],
  },
  {
    id: '3',
    name: 'Fast Bites Express',
    cuisine: 'Fast Food',
    rating: 4.5,
    deliveryTime: '15-25 min',
    distance: '1.8 km',
    image: '🍔',
    menu: [
      { id: '17', name: 'Chicken Burger', description: 'Crispy chicken burger with fries', price: 10000, image: '🍔', category: 'Fast Food' },
      { id: '18', name: 'Pizza Margherita', description: 'Classic pizza with cheese and tomato', price: 18000, image: '🍕', category: 'Fast Food' },
      { id: '19', name: 'French Fries', description: 'Crispy golden fries', price: 4000, image: '🍟', category: 'Side' },
      { id: '20', name: 'Beef Burger', description: 'Juicy beef patty with fresh vegetables', price: 12000, image: '🍔', category: 'Fast Food' },
      { id: '21', name: 'Chicken Wings (6 pcs)', description: 'Spicy fried chicken wings', price: 14000, image: '🍗', category: 'Fast Food' },
      { id: '22', name: 'Pizza Pepperoni', description: 'Pizza with pepperoni and cheese', price: 20000, image: '🍕', category: 'Fast Food' },
      { id: '23', name: 'Onion Rings', description: 'Crispy battered onion rings', price: 5000, image: '🧅', category: 'Side' },
      { id: '24', name: 'Milkshake', description: 'Chocolate, vanilla, or strawberry', price: 6000, image: '🥤', category: 'Drink' },
    ],
  },
  {
    id: '4',
    name: 'Nile Grill House',
    cuisine: 'Grill & BBQ',
    rating: 4.7,
    deliveryTime: '20-30 min',
    distance: '2.1 km',
    image: '🔥',
    menu: [
      { id: '25', name: 'Grilled Tilapia', description: 'Fresh grilled fish with vegetables', price: 18000, image: '🐟', category: 'Main' },
      { id: '26', name: 'Beef Skewers', description: 'Marinated beef skewers with sauce', price: 15000, image: '🍢', category: 'Main' },
      { id: '27', name: 'Grilled Chicken', description: 'Whole grilled chicken with spices', price: 20000, image: '🍗', category: 'Main' },
      { id: '28', name: 'Goat Meat', description: 'Tender grilled goat meat', price: 16000, image: '🍖', category: 'Main' },
      { id: '29', name: 'Grilled Vegetables', description: 'Mixed seasonal grilled vegetables', price: 8000, image: '🥗', category: 'Vegetable' },
      { id: '30', name: 'Ugali & Sukuma', description: 'Maize meal with collard greens', price: 7000, image: '🥬', category: 'Main' },
      { id: '31', name: 'Roasted Plantains', description: 'Sweet roasted plantains', price: 5000, image: '🍌', category: 'Side' },
    ],
  },
  {
    id: '5',
    name: 'Spice Garden',
    cuisine: 'Indian-African Fusion',
    rating: 4.9,
    deliveryTime: '30-40 min',
    distance: '3.5 km',
    image: '🌶️',
    menu: [
      { id: '32', name: 'Chicken Curry', description: 'Spicy chicken curry with rice', price: 14000, image: '🍛', category: 'Main' },
      { id: '33', name: 'Vegetable Biryani', description: 'Fragrant rice with mixed vegetables', price: 12000, image: '🍚', category: 'Main' },
      { id: '34', name: 'Samosas (3 pcs)', description: 'Crispy fried pastries with filling', price: 5000, image: '🥟', category: 'Appetizer' },
      { id: '35', name: 'Lentil Dal', description: 'Spiced lentil stew', price: 8000, image: '🫘', category: 'Main' },
      { id: '36', name: 'Naan Bread', description: 'Fresh baked flatbread', price: 4000, image: '🫓', category: 'Side' },
      { id: '37', name: 'Mango Lassi', description: 'Sweet yogurt drink with mango', price: 5000, image: '🥤', category: 'Drink' },
    ],
  },
  {
    id: '6',
    name: 'Sweet Treats Bakery',
    cuisine: 'Bakery & Desserts',
    rating: 4.6,
    deliveryTime: '15-20 min',
    distance: '1.5 km',
    image: '🧁',
    menu: [
      { id: '38', name: 'Chocolate Cake Slice', description: 'Rich chocolate cake', price: 5000, image: '🍰', category: 'Dessert' },
      { id: '39', name: 'Doughnuts (6 pcs)', description: 'Fresh glazed doughnuts', price: 6000, image: '🍩', category: 'Dessert' },
      { id: '40', name: 'Cinnamon Rolls', description: 'Warm cinnamon rolls with icing', price: 7000, image: '🥐', category: 'Dessert' },
      { id: '41', name: 'Croissants (2 pcs)', description: 'Buttery French croissants', price: 5000, image: '🥐', category: 'Breakfast' },
      { id: '42', name: 'Apple Pie', description: 'Homemade apple pie slice', price: 6000, image: '🥧', category: 'Dessert' },
      { id: '43', name: 'Coffee', description: 'Freshly brewed coffee', price: 3000, image: '☕', category: 'Drink' },
      { id: '44', name: 'Tea', description: 'Hot tea with milk', price: 2000, image: '🍵', category: 'Drink' },
    ],
  },
  {
    id: '7',
    name: 'Fresh Market Salads',
    cuisine: 'Healthy & Salads',
    rating: 4.4,
    deliveryTime: '20-30 min',
    distance: '2.8 km',
    image: '🥗',
    menu: [
      { id: '45', name: 'Caesar Salad', description: 'Fresh romaine with caesar dressing', price: 10000, image: '🥗', category: 'Salad' },
      { id: '46', name: 'Greek Salad', description: 'Mixed vegetables with feta cheese', price: 11000, image: '🥗', category: 'Salad' },
      { id: '47', name: 'Chicken Salad', description: 'Grilled chicken on mixed greens', price: 13000, image: '🥗', category: 'Salad' },
      { id: '48', name: 'Fruit Salad', description: 'Fresh seasonal fruits', price: 8000, image: '🍓', category: 'Salad' },
      { id: '49', name: 'Quinoa Bowl', description: 'Quinoa with vegetables and dressing', price: 12000, image: '🥙', category: 'Salad' },
      { id: '50', name: 'Fresh Juice', description: 'Orange, mango, or passion fruit', price: 5000, image: '🧃', category: 'Drink' },
    ],
  },
  {
    id: '8',
    name: 'Street Food Corner',
    cuisine: 'Street Food',
    rating: 4.3,
    deliveryTime: '10-15 min',
    distance: '1.2 km',
    image: '🌮',
    menu: [
      { id: '51', name: 'Roasted Maize', description: 'Fresh roasted corn on the cob', price: 2000, image: '🌽', category: 'Snack' },
      { id: '52', name: 'Grilled Plantains', description: 'Sweet grilled plantains', price: 3000, image: '🍌', category: 'Snack' },
      { id: '53', name: 'Mandazi (5 pcs)', description: 'Sweet fried bread', price: 3000, image: '🍩', category: 'Snack' },
      { id: '54', name: 'Roasted Peanuts', description: 'Freshly roasted peanuts', price: 3000, image: '🥜', category: 'Snack' },
      { id: '55', name: 'Boiled Eggs (2 pcs)', description: 'Hard boiled eggs', price: 2000, image: '🥚', category: 'Snack' },
      { id: '56', name: 'Fresh Coconut', description: 'Cold coconut water', price: 3000, image: '🥥', category: 'Drink' },
    ],
  },
]

export default function FoodPage() {
  const { t } = useApp()
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)
  const [cart, setCart] = useState<Array<{ item: MenuItem; quantity: number }>>([])
  const [showCart, setShowCart] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((cartItem) => cartItem.item.id === item.id)
      if (existing) {
        return prev.map((cartItem) =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }
      return [...prev, { item, quantity: 1 }]
    })
    if ((window as any).showToast) {
      ;(window as any).showToast(`${item.name} ${t('food.addedToCart')}`, 'success')
    }
  }

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((cartItem) => cartItem.item.id !== itemId))
  }

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      const item = prev.find((cartItem) => cartItem.item.id === itemId)
      if (!item) return prev
      if (item.quantity + delta <= 0) {
        return prev.filter((cartItem) => cartItem.item.id !== itemId)
      }
      return prev.map((cartItem) =>
        cartItem.item.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity + delta }
          : cartItem
      )
    })
  }

  const totalPrice = cart.reduce((sum, cartItem) => sum + cartItem.item.price * cartItem.quantity, 0)

  const filteredRestaurants = mockRestaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {t('food.title')}
          </h1>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('food.searchPlaceholder')}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {!selectedRestaurant ? (
            /* Restaurant List */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map((restaurant) => (
                <motion.div
                  key={restaurant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer"
                  onClick={() => setSelectedRestaurant(restaurant)}
                >
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-6xl">
                    {restaurant.image}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {restaurant.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{restaurant.cuisine}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-semibold">{restaurant.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{restaurant.deliveryTime}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span>{restaurant.distance}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Menu View */
            <div>
              <button
                onClick={() => setSelectedRestaurant(null)}
                className="mb-6 text-primary-600 dark:text-primary-400 hover:text-gray-800 dark:hover:text-gray-400 flex items-center space-x-2"
              >
                <X className="w-5 h-5" />
                <span>{t('food.backToRestaurants')}</span>
              </button>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="text-5xl">{selectedRestaurant.image}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedRestaurant.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">{selectedRestaurant.cuisine}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedRestaurant.menu.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="text-4xl">{item.image}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {item.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-primary-600 dark:text-primary-400">
                              {item.price.toLocaleString()} UGX
                            </span>
                            <button
                              onClick={() => addToCart(item)}
                              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
                            >
                              <Plus className="w-4 h-4" />
                              <span>Add</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Cart Button */}
          {cart.length > 0 && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={() => setShowCart(true)}
              className="fixed bottom-6 right-6 bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg flex items-center space-x-2 z-40"
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="bg-white text-gray-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </motion.button>
          )}

          {/* Cart Sidebar */}
          <AnimatePresence>
            {showCart && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowCart(false)}
                  className="fixed inset-0 bg-black/50 z-50"
                />
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white dark:bg-gray-800 shadow-xl z-50 overflow-y-auto"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('food.cart')}</h2>
                      <button
                        onClick={() => setShowCart(false)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="space-y-4 mb-6">
                      {cart.map((cartItem) => (
                        <div
                          key={cartItem.item.id}
                          className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                        >
                          <div className="text-3xl">{cartItem.item.image}</div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {cartItem.item.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {(cartItem.item.price * cartItem.quantity).toLocaleString()} UGX
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(cartItem.item.id, -1)}
                              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-semibold">{cartItem.quantity}</span>
                            <button
                              onClick={() => updateQuantity(cartItem.item.id, 1)}
                              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                          Total
                        </span>
                        <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                          {totalPrice.toLocaleString()} UGX
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setShowCart(false)
                          setShowCheckout(true)
                        }}
                        className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors"
                      >
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Checkout Modal */}
          <AnimatePresence>
            {showCheckout && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowCheckout(false)}
                  className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6"
                  >
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      {t('food.checkout')}
                    </h2>

                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t('food.deliveryAddress')}
                        </label>
                        <input
                          type="text"
                          placeholder={t('food.addressPlaceholder')}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t('food.paymentMethod')}
                        </label>
                        <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                          <option>MTN Mobile Money</option>
                          <option>Airtel Money</option>
                          <option>Cash on Delivery</option>
                        </select>
                      </div>

                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-semibold text-gray-900 dark:text-white">{t('food.total')}</span>
                          <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                            {totalPrice.toLocaleString()} UGX
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <button
                        onClick={() => setShowCheckout(false)}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white py-3 rounded-lg font-semibold transition-colors"
                      >
                        {t('rides.cancel')}
                      </button>
                      <button
                        onClick={() => {
                          if ((window as any).showToast) {
                            ;(window as any).showToast(t('food.orderPlaced'), 'success')
                          }
                          setShowCheckout(false)
                          setShowCart(false)
                          setCart([])
                        }}
                        className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors"
                      >
                        {t('food.placeOrder')}
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
