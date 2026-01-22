'use client'

import { useState, useEffect } from 'react'
import { MapPin, Navigation, Clock, User, Phone, Car } from 'lucide-react'
import { motion } from 'framer-motion'
import { useApp } from '@/components/Providers'

export default function TrackingPage() {
  const { t } = useApp()
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<'waiting' | 'picked' | 'on-route' | 'arrived'>('waiting')
  const [driverPosition, setDriverPosition] = useState({ x: 20, y: 30 })

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setStatus('arrived')
          return 100
        }
        const newProgress = prev + 2
        if (newProgress > 30 && status === 'waiting') setStatus('picked')
        if (newProgress > 60 && status === 'picked') setStatus('on-route')
        return newProgress
      })

      setDriverPosition((prev) => ({
        x: Math.min(prev.x + 0.5, 80),
        y: Math.min(prev.y + 0.3, 70),
      }))
    }, 500)

    return () => clearInterval(interval)
  }, [status])

  const resetTracking = () => {
    setProgress(0)
    setStatus('waiting')
    setDriverPosition({ x: 20, y: 30 })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {t('tracking.title')}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map Area */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden h-[600px] relative">
                {/* Fake Map */}
                <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800">
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }} />

                  {/* Pickup Marker */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2"
                  >
                    <div className="w-8 h-8 bg-success-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-semibold bg-white dark:bg-gray-800 px-2 py-1 rounded shadow">
                      Pickup
                    </div>
                  </motion.div>

                  {/* Destination Marker */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute bottom-1/4 right-1/3 transform translate-x-1/2 translate-y-1/2"
                  >
                    <div className="w-8 h-8 bg-primary-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-semibold bg-white dark:bg-gray-800 px-2 py-1 rounded shadow">
                      Destination
                    </div>
                  </motion.div>

                  {/* Driver Marker (animated) */}
                  <motion.div
                    animate={{
                      left: `${driverPosition.x}%`,
                      top: `${driverPosition.y}%`,
                    }}
                    transition={{ duration: 0.5, ease: 'linear' }}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  >
                    <div className="relative">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-16 h-16 bg-gray-700/20 rounded-full absolute -inset-4"
                      />
                      <div className="w-12 h-12 bg-primary-600 dark:bg-primary-400 rounded-full border-4 border-white dark:border-gray-800 shadow-lg flex items-center justify-center relative z-10">
                        <Car className="w-6 h-6 text-white dark:text-gray-900" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Route Line */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <motion.line
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: progress / 100 }}
                      x1="33%"
                      y1="25%"
                      x2="67%"
                      y2="75%"
                      stroke="#9333ea"
                      strokeWidth="4"
                      strokeDasharray="10 5"
                    />
                  </svg>
                </div>

                {/* Map Controls */}
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <Navigation className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Tracking Info Panel */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('tracking.rideStatus')}
                </h2>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{t('tracking.progress')}</span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {Math.round(progress)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <motion.div
                        className="bg-gray-900 h-3 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`w-3 h-3 rounded-full ${
                        status === 'waiting' ? 'bg-yellow-500' :
                        status === 'picked' ? 'bg-accent-500' :
                        status === 'on-route' ? 'bg-primary-500' :
                        'bg-success-500'
                      }`} />
                      <span className="font-semibold text-gray-900 dark:text-white capitalize">
                        {status === 'waiting' ? 'Waiting for driver' :
                         status === 'picked' ? 'Picked up' :
                         status === 'on-route' ? 'On the way' :
                         'Arrived'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">John Mukasa</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">⭐ 4.8 • Honda CG 125</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-success-600 dark:text-success-400">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm font-medium">+256 700 123 456</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {t('tracking.estimatedArrival')}
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {Math.max(0, Math.round((100 - progress) / 2))} min
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{t('rides.distance')}</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {Math.max(0, (10 - (progress / 10)).toFixed(1))} km
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={resetTracking}
                    className="w-full mt-4 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white py-2 rounded-lg font-medium transition-colors"
                  >
                    {t('tracking.resetDemo')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
