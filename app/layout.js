import './globals.css'
import { VT323 } from 'next/font/google'

const vt323 = VT323({ subsets: ['latin'], weight: ['400'] })

export const metadata = {
  title: 'Mint All ERC',
  description: 'Mint all the ERC in one website',
  openGraph: {
    title: 'Next.js',
    description: 'Mint all the ERC in one website',
    url: 'https://nextjs.org',
    siteName: 'Next.js',
    images: [
      {
        url: 'https://miro.medium.com/v2/resize:fit:1358/1*AeqqL-tYqkp40dy6jnqreA.png',
        width: 800,
        height: 600,
      },
      {
        url: 'https://miro.medium.com/v2/resize:fit:1358/1*AeqqL-tYqkp40dy6jnqreA.png',
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`h-screen bg-[#131615] ${vt323.className}`}>
        <div className='h-screen grid-bg absolute w-full -z-10' />
        {children}
      </body>
    </html>
  )
}
