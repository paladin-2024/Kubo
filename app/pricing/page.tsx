'use client'

import { Check, Car, UtensilsCrossed, Package } from 'lucide-react'
import { motion } from 'framer-motion'
import { useApp } from '@/components/Providers'

const pricingPlans = [
  {
    name: 'Ride-Hailing',
    icon: Car,
    baseFare: 2000,
    perKm: 1500,
    perMin: 200,
    features: [
      'Base fare: 2,000 UGX',
      '1,500 UGX per kilometer',
      '200 UGX per minute',
      'Minimum fare: 3,000 UGX',
      '24/7 availability',
      'Live tracking',
    ],
  },
  {
    name: 'Food Delivery',
    icon: UtensilsCrossed,
    baseFare: 3000,
    perKm: 1000,
    perMin: 0,
    features: [
      'Base delivery fee: 3,000 UGX',
      '1,000 UGX per kilometer',
      'Free delivery over 15,000 UGX',
      'Fast delivery (15-45 min)',
      'Order tracking',
      'Multiple payment options',
    ],
  },
  {
    name: 'Package Delivery',
    icon: Package,
    baseFare: 5000,
    perKm: 2000,
    perMin: 0,
    features: [
      'Base fare: 5,000 UGX',
      '2,000 UGX per kilometer',
      'Same-day delivery',
      'Package insurance',
      'Real-time tracking',
      'Scheduled delivery',
    ],
  },
]

export default function PricingPage() {
  const { t } = useApp()
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t('pricing.title')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('pricing.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => {
              const Icon = plan.icon
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg mb-6 mx-auto">
                    <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                    {plan.name}
                  </h2>

                  <div className="mb-6">
                    <div className="text-center mb-4">
                      <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                        {plan.baseFare.toLocaleString()}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400"> UGX</span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 text-center space-y-1">
                      <p>{t('pricing.baseFare')}: {plan.baseFare.toLocaleString()} UGX</p>
                      {plan.perKm > 0 && <p>+ {plan.perKm.toLocaleString()} UGX {t('pricing.perKm')}</p>}
                      {plan.perMin > 0 && <p>+ {plan.perMin.toLocaleString()} UGX {t('pricing.perMin')}</p>}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors">
                    {t('pricing.getStarted')}
                  </button>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl p-8 text-center text-white"
          >
            <h2 className="text-2xl font-bold mb-4">{t('pricing.paymentMethods')}</h2>
            <p className="mb-6 text-gray-300">
              {t('pricing.paymentSubtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg font-semibold">
                MTN Mobile Money
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg font-semibold">
                Airtel Money
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg font-semibold">
                Cash on Delivery
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
