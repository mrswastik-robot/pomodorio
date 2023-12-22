import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pomodorio',
  description: 'Next Gen pomodoro timer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body className={`${inter.className} bg-red-600 dark:bg-blue-700`}>
        <Providers>
          {children}
        </Providers>
      </body>

    </html>
  )
}
