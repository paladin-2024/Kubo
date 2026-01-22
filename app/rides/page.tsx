'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpDown, Car, Clock, Crosshair, DollarSign, MapPin, Navigation, Phone, User } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface Driver {
  id: string
  name: string
  rating: number
  vehicle: string
  distance: string
  eta: string
  phone: string
}

interface Location {
  id: string
  name: string
  address: string
  city: string
  country: string
  coordinates?: { lat: number; lng: number }
}

const mockLocations: Location[] = [
  // Uganda - Kampala
  { id: '1', name: 'Kampala Road', address: 'Kampala Road', city: 'Kampala', country: 'Uganda', coordinates: { lat: 0.3136, lng: 32.5811 } },
  { id: '2', name: 'Entebbe International Airport', address: 'Airport Road', city: 'Entebbe', country: 'Uganda', coordinates: { lat: 0.0424, lng: 32.4435 } },
  { id: '3', name: 'Nakumatt Oasis Mall', address: 'Yusuf Lule Road', city: 'Kampala', country: 'Uganda', coordinates: { lat: 0.3163, lng: 32.5822 } },
  { id: '4', name: 'Makerere University', address: 'Makerere Hill Road', city: 'Kampala', country: 'Uganda', coordinates: { lat: 0.3381, lng: 32.5715 } },
  { id: '5', name: 'Kololo Airstrip', address: 'Kololo Hill', city: 'Kampala', country: 'Uganda', coordinates: { lat: 0.3306, lng: 32.5953 } },
  { id: '6', name: 'Jinja Road', address: 'Jinja Road', city: 'Kampala', country: 'Uganda', coordinates: { lat: 0.3206, lng: 32.5851 } },
  { id: '7', name: 'Mukono Town', address: 'Main Street', city: 'Mukono', country: 'Uganda', coordinates: { lat: 0.3533, lng: 32.7553 } },
  { id: '8', name: 'Bweyogerere', address: 'Bweyogerere Road', city: 'Kampala', country: 'Uganda', coordinates: { lat: 0.3667, lng: 32.6667 } },
  { id: '9', name: 'Ntinda', address: 'Ntinda Road', city: 'Kampala', country: 'Uganda', coordinates: { lat: 0.3500, lng: 32.6167 } },
  { id: '10', name: 'Bugolobi', address: 'Bugolobi Road', city: 'Kampala', country: 'Uganda', coordinates: { lat: 0.3167, lng: 32.6167 } },
  // DRC - Kinshasa
  { id: '11', name: 'Avenue des Aviateurs', address: 'Avenue des Aviateurs', city: 'Kinshasa', country: 'DRC', coordinates: { lat: -4.3276, lng: 15.3136 } },
  { id: '12', name: 'N\'djili Airport', address: 'Airport Road', city: 'Kinshasa', country: 'DRC', coordinates: { lat: -4.3858, lng: 15.4446 } },
  { id: '13', name: 'Gombe', address: 'Gombe District', city: 'Kinshasa', country: 'DRC', coordinates: { lat: -4.3167, lng: 15.3167 } },
  { id: '14', name: 'Matonge', address: 'Matonge Market', city: 'Kinshasa', country: 'DRC', coordinates: { lat: -4.3333, lng: 15.3333 } },
  { id: '15', name: 'Lingwala', address: 'Lingwala District', city: 'Kinshasa', country: 'DRC', coordinates: { lat: -4.3500, lng: 15.3500 } },
  { id: '16', name: 'Kasa-Vubu', address: 'Kasa-Vubu Avenue', city: 'Kinshasa', country: 'DRC', coordinates: { lat: -4.3167, lng: 15.3000 } },
]

export default function RidesPage() {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [pickupSuggestions, setPickupSuggestions] = useState<Location[]>([])
  const [destinationSuggestions, setDestinationSuggestions] = useState<Location[]>([])
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false)
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [driver, setDriver] = useState<Driver | null>(null)
  const [rideStatus, setRideStatus] = useState<'idle' | 'searching' | 'found' | 'confirmed'>('idle')
  const [estimatedFare, setEstimatedFare] = useState<number | null>(null)
  const [eta, setEta] = useState<string | null>(null)
  const pickupRef = useRef<HTMLDivElement>(null)
  const destinationRef = useRef<HTMLDivElement>(null)

  const mockDrivers: Driver[] = [
    {
      id: '1',
      name: 'John Mukasa',
      rating: 4.8,
      vehicle: 'Honda CG 125',
      distance: '2.5 km',
      eta: '5 min',
      phone: '+256 700 123 456',
    },
    {
      id: '2',
      name: 'Sarah Nakato',
      rating: 4.9,
      vehicle: 'Bajaj Boxer',
      distance: '1.8 km',
      eta: '4 min',
      phone: '+256 700 234 567',
    },
    {
      id: '3',
      name: 'Peter Okello',
      rating: 4.7,
      vehicle: 'TVS Star',
      distance: '3.2 km',
      eta: '7 min',
      phone: '+256 700 345 678',
    },
  ]

  // Handle location search
  const searchLocations = (query: string): Location[] => {
    if (!query.trim()) return []
    const lowerQuery = query.toLowerCase()
    return mockLocations.filter(
      (location) =>
        location.name.toLowerCase().includes(lowerQuery) ||
        location.address.toLowerCase().includes(lowerQuery) ||
        location.city.toLowerCase().includes(lowerQuery)
    )
  }

  // Handle pickup input change
  const handlePickupChange = (value: string) => {
    setPickup(value)
    if (value.trim()) {
      const suggestions = searchLocations(value)
      setPickupSuggestions(suggestions)
      setShowPickupSuggestions(suggestions.length > 0)
    } else {
      setPickupSuggestions([])
      setShowPickupSuggestions(false)
    }
  }

  // Handle destination input change
  const handleDestinationChange = (value: string) => {
    setDestination(value)
    if (value.trim()) {
      const suggestions = searchLocations(value)
      setDestinationSuggestions(suggestions)
      setShowDestinationSuggestions(suggestions.length > 0)
    } else {
      setDestinationSuggestions([])
      setShowDestinationSuggestions(false)
    }
  }

  // Select location
  const selectPickupLocation = (location: Location) => {
    setPickup(`${location.name}, ${location.city}`)
    setPickupSuggestions([])
    setShowPickupSuggestions(false)
  }

  const selectDestinationLocation = (location: Location) => {
    setDestination(`${location.name}, ${location.city}`)
    setDestinationSuggestions([])
    setShowDestinationSuggestions(false)
  }

  // Use current location (mock)
  const useCurrentLocation = (type: 'pickup' | 'destination') => {
    const mockCurrentLocation = 'Current Location, Kampala'
    if (type === 'pickup') {
      setPickup(mockCurrentLocation)
      if ((window as any).showToast) {
        ;(window as any).showToast('Location detected!', 'success')
      }
    } else {
      setDestination(mockCurrentLocation)
      if ((window as any).showToast) {
        ;(window as any).showToast('Location detected!', 'success')
      }
    }
  }

  // Swap pickup and destination
  const swapLocations = () => {
    const temp = pickup
    setPickup(destination)
    setDestination(temp)
    if ((window as any).showToast) {
      ;(window as any).showToast('Locations swapped', 'info')
    }
  }

  // Popular locations
  const popularLocations = [
    { name: 'Entebbe Airport', city: 'Entebbe' },
    { name: 'Makerere University', city: 'Kampala' },
    { name: 'Nakumatt Oasis Mall', city: 'Kampala' },
    { name: 'N\'djili Airport', city: 'Kinshasa' },
  ]

  const selectPopularLocation = (location: { name: string; city: string }, type: 'pickup' | 'destination') => {
    const fullLocation = `${location.name}, ${location.city}`
    if (type === 'pickup') {
      setPickup(fullLocation)
    } else {
      setDestination(fullLocation)
    }
  }

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickupRef.current && !pickupRef.current.contains(event.target as Node)) {
        setShowPickupSuggestions(false)
      }
      if (destinationRef.current && !destinationRef.current.contains(event.target as Node)) {
        setShowDestinationSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = () => {
    if (!pickup || !destination) {
      if ((window as any).showToast) {
        ;(window as any).showToast('Please enter both pickup and destination', 'error')
      }
      return
    }

    setIsSearching(true)
    setRideStatus('searching')
    setDriver(null)

    // Simulate driver search
    setTimeout(() => {
      const randomDriver = mockDrivers[Math.floor(Math.random() * mockDrivers.length)]
      setDriver(randomDriver)
      setRideStatus('found')
      setIsSearching(false)
      setEstimatedFare(Math.floor(Math.random() * 5000) + 3000)
      setEta(randomDriver.eta)
      if ((window as any).showToast) {
        ;(window as any).showToast('Driver found!', 'success')
      }
    }, 2000)
  }

  const handleConfirm = () => {
    setRideStatus('confirmed')
    if ((window as any).showToast) {
      ;(window as any).showToast('Ride confirmed! Driver is on the way.', 'success')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Book a Ride
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
                  {pickup && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2"
                    >
                      <div className="w-8 h-8 bg-success-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                    </motion.div>
                  )}

                  {/* Destination Marker */}
                  {destination && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute bottom-1/4 right-1/3 transform translate-x-1/2 translate-y-1/2"
                    >
                      <div className="w-8 h-8 bg-gray-900 dark:bg-gray-500 rounded-full border-4 border-white dark:border-gray-800 shadow-lg flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                    </motion.div>
                  )}

                  {/* Driver Marker (when found) */}
                  {driver && rideStatus !== 'idle' && (
                    <motion.div
                      initial={{ x: -100, y: -100 }}
                      animate={{ 
                        x: rideStatus === 'confirmed' ? [0, 50, 0] : 0,
                        y: rideStatus === 'confirmed' ? [0, 50, 0] : 0,
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: rideStatus === 'confirmed' ? Infinity : 0,
                        repeatType: 'reverse'
                      }}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    >
                      <div className="w-12 h-12 bg-primary-600 dark:bg-primary-400 rounded-full border-4 border-white dark:border-gray-800 shadow-lg flex items-center justify-center">
                        <Car className="w-6 h-6 text-white dark:text-gray-900" />
                      </div>
                    </motion.div>
                  )}

                  {/* Route Line */}
                  {pickup && destination && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <motion.line
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1 }}
                        x1="33%"
                        y1="25%"
                        x2="67%"
                        y2="75%"
                        stroke="#9333ea"
                        strokeWidth="4"
                        strokeDasharray="10 5"
                      />
                    </svg>
                  )}
                </div>

                {/* Map Controls Overlay */}
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <Navigation className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Booking Panel */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Where to?
                </h2>

                {/* Popular Locations */}
                <div className="mb-4">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Popular Locations</p>
                  <div className="flex flex-wrap gap-2">
                    {popularLocations.map((location, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (!pickup) {
                            selectPopularLocation(location, 'pickup')
                          } else if (!destination) {
                            selectPopularLocation(location, 'destination')
                          }
                        }}
                        className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-primary-900/30 text-gray-700 dark:text-gray-300 rounded-full transition-colors"
                      >
                        {location.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div ref={pickupRef} className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Pickup Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={pickup}
                        onChange={(e) => handlePickupChange(e.target.value)}
                        onFocus={() => pickup && setShowPickupSuggestions(pickupSuggestions.length > 0)}
                        placeholder="Enter pickup location"
                        className="w-full pl-10 pr-20 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                      <button
                        onClick={() => useCurrentLocation('pickup')}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                        title="Use current location"
                      >
                        <Crosshair className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                      </button>
                    </div>
                    <AnimatePresence>
                      {showPickupSuggestions && pickupSuggestions.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                        >
                          {pickupSuggestions.map((location) => (
                            <button
                              key={location.id}
                              onClick={() => selectPickupLocation(location)}
                              className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-start space-x-3"
                            >
                              <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 dark:text-white truncate">
                                  {location.name}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                  {location.address}, {location.city}, {location.country}
                                </p>
                              </div>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Swap Button */}
                  {pickup && destination && (
                    <div className="flex justify-center -my-2">
                      <button
                        onClick={swapLocations}
                        className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-primary-900/30 rounded-full transition-colors"
                        title="Swap locations"
                      >
                        <ArrowUpDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                  )}

                  <div ref={destinationRef} className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Destination
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={destination}
                        onChange={(e) => handleDestinationChange(e.target.value)}
                        onFocus={() => destination && setShowDestinationSuggestions(destinationSuggestions.length > 0)}
                        placeholder="Enter destination"
                        className="w-full pl-10 pr-20 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                      <button
                        onClick={() => useCurrentLocation('destination')}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                        title="Use current location"
                      >
                        <Crosshair className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                      </button>
                    </div>
                    <AnimatePresence>
                      {showDestinationSuggestions && destinationSuggestions.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                        >
                          {destinationSuggestions.map((location) => (
                            <button
                              key={location.id}
                              onClick={() => selectDestinationLocation(location)}
                              className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-start space-x-3"
                            >
                              <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 dark:text-white truncate">
                                  {location.name}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                  {location.address}, {location.city}, {location.country}
                                </p>
                              </div>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <button
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                  >
                    {isSearching ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Searching...</span>
                      </>
                    ) : (
                      <span>Find Driver</span>
                    )}
                  </button>
                </div>
              </div>

              {/* Driver Info Card */}
              <AnimatePresence>
                {driver && rideStatus !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Driver Found
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                          <User className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{driver.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            ⭐ {driver.rating} • {driver.vehicle}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Distance</span>
                          <span className="font-semibold text-gray-900 dark:text-white">{driver.distance}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            ETA
                          </span>
                          <span className="font-semibold text-gray-900 dark:text-white">{driver.eta}</span>
                        </div>
                        {estimatedFare && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                              <DollarSign className="w-4 h-4 mr-1" />
                              Estimated Fare
                            </span>
                            <span className="font-semibold text-primary-600 dark:text-primary-400">
                              {estimatedFare.toLocaleString()} UGX
                            </span>
                          </div>
                        )}
                      </div>

                      {rideStatus === 'found' && (
                        <div className="space-y-2 pt-4">
                          <button
                            onClick={handleConfirm}
                            className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors"
                          >
                            Confirm Ride
                          </button>
                          <button
                            onClick={() => {
                              setRideStatus('idle')
                              setDriver(null)
                            }}
                            className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white py-2 rounded-lg font-medium transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      )}

                      {rideStatus === 'confirmed' && (
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-center space-x-2 text-gray-900 dark:text-white mb-2">
                            <Phone className="w-4 h-4" />
                            <span className="text-sm font-medium">{driver.phone}</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Driver is on the way to your pickup location
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
