'use client'

import { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'fr'
type Theme = 'light' | 'dark'

interface AppContextType {
  theme: Theme
  toggleTheme: () => void
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.rides': 'Book a Ride',
    'nav.food': 'Order Food',
    'nav.tracking': 'Live Tracking',
    'nav.pricing': 'Pricing',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.dashboard': 'Dashboard',
    'hero.title': 'Your On-Demand Platform for Africa',
    'hero.subtitle': 'Ride-hailing and food delivery, all in one app. Fast, safe, and reliable.',
    'hero.cta.ride': 'Book a Ride',
    'hero.cta.food': 'Order Food',
    'hero.stats.riders': 'Active Riders',
    'hero.stats.restaurants': 'Restaurants',
    'hero.stats.customers': 'Happy Customers',
    'hero.stats.rating': 'Average Rating',
    'features.title': 'Why Choose Us',
    'features.subtitle': 'Experience the best of on-demand services with cutting-edge features designed for Africa',
    'features.tracking': 'Live Tracking',
    'features.tracking.desc': 'Track your ride or order in real-time',
    'features.payment': 'Mobile Money',
    'features.payment.desc': 'Pay with MTN, Airtel, and more',
    'features.delivery': 'Fast Delivery',
    'features.delivery.desc': 'Quick and reliable service',
    'features.safety': 'Safety First',
    'features.safety.desc': 'Verified drivers and secure payments',
    'cta.title': 'Ready to Get Started?',
    'cta.subtitle': 'Join thousands of satisfied customers across Uganda and Congo',
    'cta.ride': 'Book Your First Ride',
    'cta.food': 'Order Food Now',
    'rides.title': 'Book a Ride',
    'rides.whereTo': 'Where to?',
    'rides.pickup': 'Pickup Location',
    'rides.destination': 'Destination',
    'rides.pickupPlaceholder': 'Enter pickup location',
    'rides.destinationPlaceholder': 'Enter destination',
    'rides.findDriver': 'Find Driver',
    'rides.searching': 'Searching...',
    'rides.popularLocations': 'Popular Locations',
    'rides.driverFound': 'Driver Found',
    'rides.distance': 'Distance',
    'rides.eta': 'ETA',
    'rides.estimatedFare': 'Estimated Fare',
    'rides.confirmRide': 'Confirm Ride',
    'rides.cancel': 'Cancel',
    'rides.confirmed': 'Ride confirmed! Driver is on the way.',
    'rides.driverOnWay': 'Driver is on the way to your pickup location',
    'rides.locationDetected': 'Location detected!',
    'rides.locationsSwapped': 'Locations swapped',
    'rides.enterBoth': 'Please enter both pickup and destination',
    'rides.driverFoundToast': 'Driver found!',
    'food.title': 'Order Food',
    'food.searchPlaceholder': 'Search restaurants or cuisine...',
    'food.backToRestaurants': 'Back to Restaurants',
    'food.add': 'Add',
    'food.cart': 'Cart',
    'food.total': 'Total',
    'food.proceedCheckout': 'Proceed to Checkout',
    'food.checkout': 'Checkout',
    'food.deliveryAddress': 'Delivery Address',
    'food.addressPlaceholder': 'Enter your address',
    'food.paymentMethod': 'Payment Method',
    'food.placeOrder': 'Place Order',
    'food.orderPlaced': 'Order placed successfully!',
    'food.addedToCart': 'added to cart',
    'tracking.title': 'Live Tracking',
    'tracking.progress': 'Progress',
    'tracking.rideStatus': 'Ride Status',
    'tracking.waiting': 'Waiting for driver',
    'tracking.picked': 'Picked up',
    'tracking.onRoute': 'On the way',
    'tracking.arrived': 'Arrived',
    'tracking.estimatedArrival': 'Estimated Arrival',
    'tracking.resetDemo': 'Reset Demo',
    'pricing.title': 'Transparent Pricing',
    'pricing.subtitle': 'Simple, fair pricing for all our services. No hidden fees, no surprises.',
    'pricing.paymentMethods': 'Payment Methods',
    'pricing.paymentSubtitle': 'We accept all major mobile money services and cash payments',
    'pricing.getStarted': 'Get Started',
    'pricing.baseFare': 'Base fare',
    'pricing.perKm': 'per kilometer',
    'pricing.perMin': 'per minute',
    'about.title': 'About KuboChain',
    'about.subtitle': 'Connecting Africa, one ride and meal at a time',
    'about.ourStory': 'Our Story',
    'about.story1': 'KuboChain was born from a simple vision: to make transportation and food delivery accessible, affordable, and reliable for everyone across Uganda and the Democratic Republic of Congo. We understand the unique challenges and opportunities in these vibrant markets, and we\'ve built our platform specifically to address them.',
    'about.story2': 'Since our launch, we\'ve connected thousands of riders with passengers and customers with their favorite restaurants. Our commitment to safety, transparency, and community empowerment drives everything we do.',
    'about.ourMarkets': 'Our Markets',
    'about.marketsDesc': 'We\'re proud to serve communities across Uganda and the Democratic Republic of Congo. From the bustling streets of Kampala to the vibrant neighborhoods of Kinshasa, we\'re building connections that matter.',
    'about.kampala': 'Kampala, Uganda',
    'about.kinshasa': 'Kinshasa, DRC',
    'about.expanding': 'Expanding to more cities',
    'about.ourMission': 'Our Mission',
    'about.missionDesc': 'To empower local communities by providing safe, affordable, and convenient transportation and delivery services. We\'re committed to creating economic opportunities for drivers and restaurant partners while making life easier for our customers.',
    'about.ourValues': 'Our Values',
    'about.safetyFirst': 'Safety First',
    'about.safetyDesc': 'Every driver is verified, and every ride is tracked for your peace of mind.',
    'about.communityFocus': 'Community Focus',
    'about.communityDesc': 'We\'re not just a platform; we\'re part of the communities we serve.',
    'about.innovation': 'Innovation',
    'about.innovationDesc': 'Constantly improving our technology to serve you better.',
    'about.joinUs': 'Join Us',
    'about.joinDesc': 'Whether you\'re a driver looking to earn, a restaurant wanting to reach more customers, or a customer seeking convenience, we\'d love to have you as part of the KuboChain family.',
    'about.getInTouch': 'Get in Touch',
    'about.startUsing': 'Start Using KuboChain',
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.address': 'Address',
    'contact.sendMessage': 'Send us a Message',
    'contact.name': 'Name',
    'contact.emailLabel': 'Email',
    'contact.phoneLabel': 'Phone',
    'contact.subject': 'Subject',
    'contact.selectSubject': 'Select a subject',
    'contact.general': 'General Inquiry',
    'contact.support': 'Customer Support',
    'contact.driver': 'Become a Driver',
    'contact.restaurant': 'Partner Restaurant',
    'contact.other': 'Other',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.thankYou': 'Thank you! We\'ll get back to you soon.',
    'dashboard.title': 'Admin Dashboard',
    'dashboard.totalRides': 'Total Rides',
    'dashboard.foodOrders': 'Food Orders',
    'dashboard.activeDrivers': 'Active Drivers',
    'dashboard.totalRevenue': 'Total Revenue',
    'dashboard.dailyActivity': 'Daily Activity',
    'dashboard.monthlyRevenue': 'Monthly Revenue',
    'dashboard.paymentDistribution': 'Payment Methods Distribution',
    'dashboard.recentRides': 'Recent Rides',
    'dashboard.recentOrders': 'Recent Orders',
    'footer.description': 'Your trusted on-demand platform for ride-hailing and food delivery across Africa.',
    'footer.services': 'Services',
    'footer.company': 'Company',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.rides': 'Réserver un Trajet',
    'nav.food': 'Commander de la Nourriture',
    'nav.tracking': 'Suivi en Direct',
    'nav.pricing': 'Tarifs',
    'nav.about': 'À Propos',
    'nav.contact': 'Contact',
    'nav.dashboard': 'Tableau de Bord',
    'hero.title': 'Votre Plateforme à la Demande pour l\'Afrique',
    'hero.subtitle': 'Transport et livraison de nourriture, le tout dans une seule application. Rapide, sûr et fiable.',
    'hero.cta.ride': 'Réserver un Trajet',
    'hero.cta.food': 'Commander de la Nourriture',
    'hero.stats.riders': 'Conducteurs Actifs',
    'hero.stats.restaurants': 'Restaurants',
    'hero.stats.customers': 'Clients Satisfaits',
    'hero.stats.rating': 'Note Moyenne',
    'features.title': 'Pourquoi Nous Choisir',
    'features.subtitle': 'Découvrez le meilleur des services à la demande avec des fonctionnalités de pointe conçues pour l\'Afrique',
    'features.tracking': 'Suivi en Direct',
    'features.tracking.desc': 'Suivez votre trajet ou commande en temps réel',
    'features.payment': 'Mobile Money',
    'features.payment.desc': 'Payez avec MTN, Airtel et plus',
    'features.delivery': 'Livraison Rapide',
    'features.delivery.desc': 'Service rapide et fiable',
    'features.safety': 'Sécurité d\'Abord',
    'features.safety.desc': 'Chauffeurs vérifiés et paiements sécurisés',
    'cta.title': 'Prêt à Commencer?',
    'cta.subtitle': 'Rejoignez des milliers de clients satisfaits en Ouganda et au Congo',
    'cta.ride': 'Réservez Votre Premier Trajet',
    'cta.food': 'Commandez de la Nourriture Maintenant',
    'rides.title': 'Réserver un Trajet',
    'rides.whereTo': 'Où allez-vous?',
    'rides.pickup': 'Lieu de Prise en Charge',
    'rides.destination': 'Destination',
    'rides.pickupPlaceholder': 'Entrez le lieu de prise en charge',
    'rides.destinationPlaceholder': 'Entrez la destination',
    'rides.findDriver': 'Trouver un Conducteur',
    'rides.searching': 'Recherche...',
    'rides.popularLocations': 'Lieux Populaires',
    'rides.driverFound': 'Conducteur Trouvé',
    'rides.distance': 'Distance',
    'rides.eta': 'Temps Estimé',
    'rides.estimatedFare': 'Tarif Estimé',
    'rides.confirmRide': 'Confirmer le Trajet',
    'rides.cancel': 'Annuler',
    'rides.confirmed': 'Trajet confirmé! Le conducteur est en route.',
    'rides.driverOnWay': 'Le conducteur est en route vers votre lieu de prise en charge',
    'rides.locationDetected': 'Localisation détectée!',
    'rides.locationsSwapped': 'Lieux échangés',
    'rides.enterBoth': 'Veuillez entrer le lieu de prise en charge et la destination',
    'rides.driverFoundToast': 'Conducteur trouvé!',
    'food.title': 'Commander de la Nourriture',
    'food.searchPlaceholder': 'Rechercher des restaurants ou cuisines...',
    'food.backToRestaurants': 'Retour aux Restaurants',
    'food.add': 'Ajouter',
    'food.cart': 'Panier',
    'food.total': 'Total',
    'food.proceedCheckout': 'Passer à la Caisse',
    'food.checkout': 'Paiement',
    'food.deliveryAddress': 'Adresse de Livraison',
    'food.addressPlaceholder': 'Entrez votre adresse',
    'food.paymentMethod': 'Méthode de Paiement',
    'food.placeOrder': 'Passer la Commande',
    'food.orderPlaced': 'Commande passée avec succès!',
    'food.addedToCart': 'ajouté au panier',
    'tracking.title': 'Suivi en Direct',
    'tracking.progress': 'Progression',
    'tracking.rideStatus': 'Statut du Trajet',
    'tracking.waiting': 'En attente du conducteur',
    'tracking.picked': 'Récupéré',
    'tracking.onRoute': 'En route',
    'tracking.arrived': 'Arrivé',
    'tracking.estimatedArrival': 'Arrivée Estimée',
    'tracking.resetDemo': 'Réinitialiser la Démo',
    'pricing.title': 'Tarification Transparente',
    'pricing.subtitle': 'Tarification simple et équitable pour tous nos services. Pas de frais cachés, pas de surprises.',
    'pricing.paymentMethods': 'Méthodes de Paiement',
    'pricing.paymentSubtitle': 'Nous acceptons tous les principaux services de mobile money et les paiements en espèces',
    'pricing.getStarted': 'Commencer',
    'pricing.baseFare': 'Tarif de base',
    'pricing.perKm': 'par kilomètre',
    'pricing.perMin': 'par minute',
    'about.title': 'À Propos de KuboChain',
    'about.subtitle': 'Connecter l\'Afrique, un trajet et un repas à la fois',
    'about.ourStory': 'Notre Histoire',
    'about.story1': 'KuboChain est né d\'une vision simple: rendre le transport et la livraison de nourriture accessibles, abordables et fiables pour tous en Ouganda et en République Démocratique du Congo. Nous comprenons les défis et opportunités uniques de ces marchés dynamiques, et nous avons construit notre plateforme spécifiquement pour y répondre.',
    'about.story2': 'Depuis notre lancement, nous avons connecté des milliers de conducteurs avec des passagers et des clients avec leurs restaurants préférés. Notre engagement envers la sécurité, la transparence et l\'autonomisation communautaire guide tout ce que nous faisons.',
    'about.ourMarkets': 'Nos Marchés',
    'about.marketsDesc': 'Nous sommes fiers de servir les communautés en Ouganda et en République Démocratique du Congo. Des rues animées de Kampala aux quartiers vibrants de Kinshasa, nous construisons des connexions qui comptent.',
    'about.kampala': 'Kampala, Ouganda',
    'about.kinshasa': 'Kinshasa, RDC',
    'about.expanding': 'Expansion vers plus de villes',
    'about.ourMission': 'Notre Mission',
    'about.missionDesc': 'Autonomiser les communautés locales en fournissant des services de transport et de livraison sûrs, abordables et pratiques. Nous nous engageons à créer des opportunités économiques pour les conducteurs et les partenaires restaurants tout en facilitant la vie de nos clients.',
    'about.ourValues': 'Nos Valeurs',
    'about.safetyFirst': 'Sécurité d\'Abord',
    'about.safetyDesc': 'Chaque conducteur est vérifié et chaque trajet est suivi pour votre tranquillité d\'esprit.',
    'about.communityFocus': 'Focus Communautaire',
    'about.communityDesc': 'Nous ne sommes pas seulement une plateforme; nous faisons partie des communautés que nous servons.',
    'about.innovation': 'Innovation',
    'about.innovationDesc': 'Amélioration constante de notre technologie pour mieux vous servir.',
    'about.joinUs': 'Rejoignez-Nous',
    'about.joinDesc': 'Que vous soyez un conducteur cherchant à gagner, un restaurant souhaitant atteindre plus de clients, ou un client recherchant la commodité, nous serions ravis de vous avoir dans la famille KuboChain.',
    'about.getInTouch': 'Contactez-Nous',
    'about.startUsing': 'Commencer à Utiliser KuboChain',
    'contact.title': 'Contactez-Nous',
    'contact.subtitle': 'Nous serions ravis d\'avoir de vos nouvelles. Envoyez-nous un message et nous répondrons dès que possible.',
    'contact.phone': 'Téléphone',
    'contact.email': 'E-mail',
    'contact.address': 'Adresse',
    'contact.sendMessage': 'Envoyez-nous un Message',
    'contact.name': 'Nom',
    'contact.emailLabel': 'E-mail',
    'contact.phoneLabel': 'Téléphone',
    'contact.subject': 'Sujet',
    'contact.selectSubject': 'Sélectionnez un sujet',
    'contact.general': 'Demande Générale',
    'contact.support': 'Support Client',
    'contact.driver': 'Devenir Conducteur',
    'contact.restaurant': 'Restaurant Partenaire',
    'contact.other': 'Autre',
    'contact.message': 'Message',
    'contact.send': 'Envoyer le Message',
    'contact.thankYou': 'Merci! Nous vous répondrons bientôt.',
    'dashboard.title': 'Tableau de Bord Administrateur',
    'dashboard.totalRides': 'Total des Trajets',
    'dashboard.foodOrders': 'Commandes de Nourriture',
    'dashboard.activeDrivers': 'Conducteurs Actifs',
    'dashboard.totalRevenue': 'Revenu Total',
    'dashboard.dailyActivity': 'Activité Quotidienne',
    'dashboard.monthlyRevenue': 'Revenu Mensuel',
    'dashboard.paymentDistribution': 'Répartition des Méthodes de Paiement',
    'dashboard.recentRides': 'Trajets Récents',
    'dashboard.recentOrders': 'Commandes Récentes',
    'footer.description': 'Votre plateforme de confiance pour le transport et la livraison de nourriture à travers l\'Afrique.',
    'footer.services': 'Services',
    'footer.company': 'Entreprise',
    'footer.contact': 'Contact',
    'footer.rights': 'Tous droits réservés.',
  },
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [language, setLanguage] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') as Theme
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedTheme) setTheme(savedTheme)
    if (savedLanguage) setLanguage(savedLanguage)
  }, [])

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle('dark', theme === 'dark')
      localStorage.setItem('theme', theme)
    }
  }, [theme, mounted])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('language', language)
    }
  }, [language, mounted])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'fr' : 'en'))
  }

  const t = (key: string) => {
    return translations[language][key] || key
  }

  // Always provide the context, even during SSR
  // Use default values until mounted to avoid hydration issues
  const contextValue = {
    theme: mounted ? theme : 'light',
    toggleTheme,
    language: mounted ? language : 'en',
    toggleLanguage,
    t,
  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within a Provider')
  }
  return context
}
