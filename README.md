# KuboChain - On-Demand Platform Demo

A modern, responsive demonstration website for an African on-demand platform that combines ride-hailing and food delivery services. Built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

### 🚗 Ride-Hailing
- Interactive map-style UI with animated markers
- Pickup and destination input
- Simulated driver matching with animation
- Estimated fare and ETA display
- Driver information and contact details

### 🍔 Food Ordering
- Restaurant browsing with search functionality
- Menu items with descriptions and pricing
- Shopping cart with quantity management
- Checkout page with payment method selection
- Mock order placement

### 📍 Live Tracking
- Real-time progress tracking
- Animated driver movement on map
- Status updates (waiting, picked, on-route, arrived)
- Distance and ETA calculations

### 📊 Admin Dashboard
- Statistics overview (rides, orders, drivers, revenue)
- Interactive charts (line, bar, pie charts)
- Recent rides and orders list
- Payment methods distribution

### 🎨 UI/UX Features
- **Dark Mode**: Toggle between light and dark themes
- **Language Toggle**: Switch between English and French
- **Toast Notifications**: User feedback for actions
- **Smooth Animations**: Framer Motion animations throughout
- **Responsive Design**: Mobile-first, works on all devices
- **Africa-friendly Colors**: Warm, vibrant color scheme

### 📄 Pages
- **Landing Page**: Hero section, features, call-to-action
- **Ride-Hailing**: Book a ride with map interface
- **Food Ordering**: Browse restaurants and order food
- **Live Tracking**: Track your ride in real-time
- **Pricing**: Transparent pricing for all services
- **About**: Company information focused on Uganda & Congo
- **Contact**: Contact form (UI only, no backend)
- **Admin Dashboard**: Analytics and management interface

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Landing page
│   ├── globals.css         # Global styles
│   ├── rides/              # Ride-hailing page
│   ├── food/               # Food ordering page
│   ├── tracking/           # Live tracking page
│   ├── pricing/            # Pricing page
│   ├── about/              # About page
│   ├── contact/            # Contact page
│   └── dashboard/          # Admin dashboard
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Footer.tsx          # Site footer
│   ├── Hero.tsx            # Landing page hero
│   ├── Features.tsx        # Features section
│   ├── CTASection.tsx      # Call-to-action section
│   ├── Providers.tsx       # Context providers (theme, language)
│   └── Toast.tsx           # Toast notification system
└── public/                 # Static assets
```

## Key Features Explained

### Mock Data
All data is simulated - no backend or API calls. The app uses mock data for:
- Restaurants and menu items
- Drivers and ride information
- Order history
- Dashboard statistics

### Theme System
Dark mode is implemented using Tailwind's dark mode class and persisted in localStorage.

### Language System
Basic translation system with English and French support. Translations are stored in the Providers component.

### Toast Notifications
Global toast notification system accessible via `window.showToast(message, type)`.

## Customization

### Colors
Edit `tailwind.config.ts` to customize the color scheme. The current theme uses:
- Primary: Orange/red tones
- Accent: Blue tones
- Success: Green tones

### Mock Data
Update mock data in respective page components:
- Restaurants: `app/food/page.tsx`
- Drivers: `app/rides/page.tsx`
- Dashboard stats: `app/dashboard/page.tsx`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- This is a **frontend-only demo** - no backend functionality
- All interactions are simulated
- No real payments or API calls
- Perfect for pitching, demos, and concept validation

## License

This project is for demonstration purposes.
# Kubo
