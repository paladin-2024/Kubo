import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Providers } from '@/components/Providers'
import { ToastContainer } from '@/components/Toast'
import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono'
})

export const metadata: Metadata = {
  title: 'KuboChain - On-Demand Platform for Africa',
  description: 'Ride-hailing and food delivery platform for Uganda and Congo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={jetbrainsMono.className}>
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <ToastContainer />
        </Providers>
      </body>
    </html>
  )
}
