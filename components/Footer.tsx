'use client'

import Link from 'next/link'
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react'
import { useApp } from './Providers'

export function Footer() {
  const { t } = useApp()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">K</span>
              </div>
              <span className="text-xl font-bold text-white">KuboChain</span>
            </div>
            <p className="text-sm">
              {t('footer.description')}
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.services')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/rides" className="hover:text-primary-400 transition-colors">
                  {t('nav.rides')}
                </Link>
              </li>
              <li>
                <Link href="/food" className="hover:text-primary-400 transition-colors">
                  {t('nav.food')}
                </Link>
              </li>
              <li>
                <Link href="/tracking" className="hover:text-primary-400 transition-colors">
                  {t('nav.tracking')}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-primary-400 transition-colors">
                  {t('nav.pricing')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.company')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-primary-400 transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-400 transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+256 700 000 000</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@kubochain.com</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-primary-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 KuboChain. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  )
}
