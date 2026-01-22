'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useApp } from './Providers'

export function CTASection() {
  const { t } = useApp()
  
  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/rides"
              className="inline-flex items-center justify-center space-x-2 bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
            >
              <span>{t('cta.ride')}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/food"
              className="inline-flex items-center justify-center space-x-2 bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-800 transition-all transform hover:scale-105 shadow-lg"
            >
              <span>{t('cta.food')}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
