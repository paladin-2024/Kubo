'use client'

import { useState } from 'react'
import { Users, Car, UtensilsCrossed, DollarSign, TrendingUp, Clock, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { useApp } from '@/components/Providers'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

const rideData = [
  { name: 'Mon', rides: 120, food: 80 },
  { name: 'Tue', rides: 150, food: 95 },
  { name: 'Wed', rides: 180, food: 110 },
  { name: 'Thu', rides: 200, food: 130 },
  { name: 'Fri', rides: 250, food: 160 },
  { name: 'Sat', rides: 300, food: 200 },
  { name: 'Sun', rides: 280, food: 180 },
]

const revenueData = [
  { name: 'Jan', revenue: 4500000 },
  { name: 'Feb', revenue: 5200000 },
  { name: 'Mar', revenue: 4800000 },
  { name: 'Apr', revenue: 6100000 },
  { name: 'May', revenue: 5500000 },
  { name: 'Jun', revenue: 6700000 },
]

const paymentData = [
  { name: 'MTN Mobile Money', value: 45, color: '#9333ea' },
  { name: 'Airtel Money', value: 30, color: '#0891b2' },
  { name: 'Cash', value: 25, color: '#14b8a6' },
]

const recentRides = [
  { id: '1', customer: 'John Doe', driver: 'Peter Okello', from: 'Kampala', to: 'Entebbe', fare: 15000, status: 'completed' },
  { id: '2', customer: 'Jane Smith', driver: 'Sarah Nakato', from: 'Kampala', to: 'Jinja', fare: 25000, status: 'in-progress' },
  { id: '3', customer: 'Mike Johnson', driver: 'John Mukasa', from: 'Kampala', to: 'Mukono', fare: 12000, status: 'completed' },
  { id: '4', customer: 'Sarah Williams', driver: 'Peter Okello', from: 'Kampala', to: 'Bweyogerere', fare: 8000, status: 'completed' },
]

const recentOrders = [
  { id: '1', customer: 'David Brown', restaurant: 'Kampala Delights', items: 3, total: 35000, status: 'delivered' },
  { id: '2', customer: 'Emma Davis', restaurant: 'Fast Bites Express', items: 2, total: 18000, status: 'preparing' },
  { id: '3', customer: 'James Wilson', restaurant: 'Kinshasa Kitchen', items: 4, total: 52000, status: 'delivered' },
  { id: '4', customer: 'Lisa Anderson', restaurant: 'Kampala Delights', items: 1, total: 12000, status: 'on-way' },
]

export default function DashboardPage() {
  const { t } = useApp()
  const [timeRange, setTimeRange] = useState('week')

  const stats = [
    { label: t('dashboard.totalRides'), value: '12,450', icon: Car, color: 'text-gray-900', bg: 'bg-gray-100' },
    { label: t('dashboard.foodOrders'), value: '8,920', icon: UtensilsCrossed, color: 'text-gray-900', bg: 'bg-gray-100' },
    { label: t('dashboard.activeDrivers'), value: '1,250', icon: Users, color: 'text-gray-900', bg: 'bg-gray-100' },
    { label: t('dashboard.totalRevenue'), value: '45.2M UGX', icon: DollarSign, color: 'text-gray-900', bg: 'bg-gray-100' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            {t('dashboard.title')}
          </h1>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="week">{t('dashboard.thisWeek')}</option>
              <option value="month">{t('dashboard.thisMonth')}</option>
              <option value="year">{t('dashboard.thisYear')}</option>
            </select>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.bg} dark:bg-opacity-30 rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${stat.color} dark:text-opacity-80`} />
                    </div>
                    <TrendingUp className="w-5 h-5 text-gray-700" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                </motion.div>
              )
            })}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Rides & Orders Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {t('dashboard.dailyActivity')}
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={rideData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="rides"
                    stroke="#9333ea"
                    strokeWidth={2}
                    name="Rides"
                  />
                  <Line
                    type="monotone"
                    dataKey="food"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                    name="Food Orders"
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Revenue Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {t('dashboard.monthlyRevenue')}
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip formatter={(value) => `${(value as number / 1000000).toFixed(1)}M UGX`} />
                  <Bar dataKey="revenue" fill="#9333ea" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Payment Methods Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Payment Methods Distribution
            </h2>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={paymentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#9ca3af"
                    dataKey="value"
                  >
                    {paymentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Rides */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {t('dashboard.recentRides')}
              </h2>
              <div className="space-y-4">
                {recentRides.map((ride) => (
                  <div
                    key={ride.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {ride.from} → {ride.to}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {ride.customer} • {ride.driver}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {ride.fare.toLocaleString()} UGX
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          ride.status === 'completed'
                            ? 'bg-gray-100 text-success-700 dark:bg-gray-800 dark:text-white'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-600'
                        }`}
                      >
                        {ride.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Orders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {t('dashboard.recentOrders')}
              </h2>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white mb-1">
                        {order.restaurant}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {order.customer} • {order.items} items
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {order.total.toLocaleString()} UGX
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          order.status === 'delivered'
                            ? 'bg-gray-100 text-success-700 dark:bg-gray-800 dark:text-white'
                            : order.status === 'on-way'
                            ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-600'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
