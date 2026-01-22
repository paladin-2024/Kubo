export interface Restaurant {
  id: string
  name: string
  cuisine: string
  rating: number
  deliveryTime: string
  image: string
  menu: MenuItem[]
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

export interface Driver {
  id: string
  name: string
  rating: number
  vehicle: string
  plateNumber: string
  distance: string
  eta: string
  location: { lat: number; lng: number }
}

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Kampala Delights',
    cuisine: 'Ugandan',
    rating: 4.8,
    deliveryTime: '25-35 min',
    image: '🍛',
    menu: [
      {
        id: '1',
        name: 'Matoke with Groundnut Sauce',
        description: 'Steamed plantains with rich groundnut sauce',
        price: 15000,
        image: '🍌',
        category: 'Main Course',
      },
      {
        id: '2',
        name: 'Rolex',
        description: 'Chapati with eggs and vegetables',
        price: 5000,
        image: '🌯',
        category: 'Breakfast',
      },
      {
        id: '3',
        name: 'Luwombo',
        description: 'Traditional steamed dish with chicken',
        price: 20000,
        image: '🍗',
        category: 'Main Course',
      },
    ],
  },
  {
    id: '2',
    name: 'Kinshasa Kitchen',
    cuisine: 'Congolese',
    rating: 4.6,
    deliveryTime: '30-40 min',
    image: '🍲',
    menu: [
      {
        id: '4',
        name: 'Fufu with Pondu',
        description: 'Cassava fufu with palm nut leaves',
        price: 12000,
        image: '🥘',
        category: 'Main Course',
      },
      {
        id: '5',
        name: 'Moambe Chicken',
        description: 'Chicken in palm oil sauce',
        price: 18000,
        image: '🍖',
        category: 'Main Course',
      },
      {
        id: '6',
        name: 'Beignets',
        description: 'Sweet fried doughnuts',
        price: 3000,
        image: '🍩',
        category: 'Dessert',
      },
    ],
  },
  {
    id: '3',
    name: 'Fast Bites',
    cuisine: 'Fast Food',
    rating: 4.5,
    deliveryTime: '20-30 min',
    image: '🍔',
    menu: [
      {
        id: '7',
        name: 'Chicken Burger',
        description: 'Crispy chicken burger with fries',
        price: 10000,
        image: '🍔',
        category: 'Fast Food',
      },
      {
        id: '8',
        name: 'Pizza Margherita',
        description: 'Classic pizza with cheese and tomato',
        price: 15000,
        image: '🍕',
        category: 'Fast Food',
      },
    ],
  },
]

export const drivers: Driver[] = [
  {
    id: '1',
    name: 'John Mukasa',
    rating: 4.9,
    vehicle: 'Honda CG 125',
    plateNumber: 'UAB 123X',
    distance: '0.8 km',
    eta: '3 min',
    location: { lat: 0.3136, lng: 32.5811 },
  },
  {
    id: '2',
    name: 'Marie Kabila',
    rating: 4.7,
    vehicle: 'Yamaha YBR',
    plateNumber: 'KIN 456Y',
    distance: '1.2 km',
    eta: '5 min',
    location: { lat: -4.3276, lng: 15.3136 },
  },
  {
    id: '3',
    name: 'David Ochieng',
    rating: 4.8,
    vehicle: 'Suzuki DR 200',
    plateNumber: 'UAC 789Z',
    distance: '0.5 km',
    eta: '2 min',
    location: { lat: 0.3163, lng: 32.5822 },
  },
]

export const pricingPlans = {
  rides: [
    {
      name: 'Standard',
      baseFare: 3000,
      perKm: 1500,
      perMin: 200,
      description: 'Affordable rides for everyday travel',
    },
    {
      name: 'Express',
      baseFare: 5000,
      perKm: 2000,
      perMin: 300,
      description: 'Faster service with priority matching',
    },
    {
      name: 'Premium',
      baseFare: 8000,
      perKm: 3000,
      perMin: 400,
      description: 'Luxury rides with top-rated drivers',
    },
  ],
  delivery: [
    {
      name: 'Standard Delivery',
      fee: 2000,
      minOrder: 10000,
      description: 'Regular delivery within 30-45 minutes',
    },
    {
      name: 'Express Delivery',
      fee: 4000,
      minOrder: 15000,
      description: 'Fast delivery within 15-25 minutes',
    },
  ],
}
