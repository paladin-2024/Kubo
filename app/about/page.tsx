'use client'

import { MapPin, Users, Target, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useApp } from '@/components/Providers'

export default function AboutPage() {
  const { t } = useApp()
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t('about.title')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t('about.subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('about.ourStory')}</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('about.story1')}
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('about.story2')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t('about.ourMarkets')}</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {t('about.marketsDesc')}
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-gray-700 rounded-full" />
                  <span>{t('about.kampala')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-gray-700 rounded-full" />
                  <span>{t('about.kinshasa')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-gray-700 rounded-full" />
                  <span>{t('about.expanding')}</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900/30 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-gray-700 dark:text-accent-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t('about.ourMission')}</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('about.missionDesc')}
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl shadow-lg p-8 text-white"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Heart className="w-8 h-8" />
              <h3 className="text-2xl font-bold">{t('about.ourValues')}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">{t('about.safetyFirst')}</h4>
                <p className="text-gray-300 text-sm">
                  {t('about.safetyDesc')}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">{t('about.communityFocus')}</h4>
                <p className="text-gray-300 text-sm">
                  {t('about.communityDesc')}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">{t('about.innovation')}</h4>
                <p className="text-gray-300 text-sm">
                  {t('about.innovationDesc')}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Users className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t('about.joinUs')}</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('about.joinDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/contact"
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors"
              >
                {t('about.getInTouch')}
              </a>
              <a
                href="/rides"
                className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors"
              >
                {t('about.startUsing')}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
