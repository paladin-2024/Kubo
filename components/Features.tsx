'use client'

import { MapPin, Smartphone, Zap, Shield } from 'lucide-react'
import { useApp } from './Providers'
import { motion } from 'framer-motion'

const features = [
  {
    icon: MapPin,
    titleKey: 'features.tracking',
    descKey: 'features.tracking.desc',
    color: 'text-primary-600 dark:text-primary-400',
    bgColor: 'bg-primary-100 dark:bg-primary-900/30',
  },
  {
    icon: Smartphone,
    titleKey: 'features.payment',
    descKey: 'features.payment.desc',
    color: 'text-accent-600 dark:text-accent-400',
    bgColor: 'bg-accent-100 dark:bg-accent-900/30',
  },
  {
    icon: Zap,
    titleKey: 'features.delivery',
    descKey: 'features.delivery.desc',
    color: 'text-success-600 dark:text-success-400',
    bgColor: 'bg-success-100 dark:bg-success-900/30',
  },
  {
    icon: Shield,
    titleKey: 'features.safety',
    descKey: 'features.safety.desc',
    color: 'text-primary-600 dark:text-primary-400',
    bgColor: 'bg-primary-100 dark:bg-primary-900/30',
  },
]

export function Features() {
  const { t } = useApp()

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('features.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{t(feature.descKey)}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
