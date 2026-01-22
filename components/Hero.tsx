'use client'

import Link from 'next/link'
import { ArrowRight, MapPin, UtensilsCrossed } from 'lucide-react'
import { useApp } from './Providers'
import { motion } from 'framer-motion'

export function Hero() {
  const { t } = useApp()

  return (
    <section className="relative bg-white dark:bg-gray-900 py-20 sm:py-32 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-10">
              {t('hero.subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/rides"
              className="group flex items-center justify-center space-x-2 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <MapPin className="w-5 h-5" />
              <span>{t('hero.cta.ride')}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/food"
              className="group flex items-center justify-center space-x-2 bg-gray-800 dark:bg-gray-200 hover:bg-gray-700 dark:hover:bg-gray-300 text-white dark:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <UtensilsCrossed className="w-5 h-5" />
              <span>{t('hero.cta.food')}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">10K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{t('hero.stats.riders')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">500+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{t('hero.stats.restaurants')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">50K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{t('hero.stats.customers')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">4.8★</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{t('hero.stats.rating')}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
