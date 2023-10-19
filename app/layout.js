import './globals.css'
import { VT323 } from 'next/font/google'

const vt323 = VT323({ subsets: ['latin'], weight: ['400'] })

export const metadata = {
  title: 'ERC Minter',
  description: 'Mint all the ERC in one website',
  openGraph: {
    title: 'ERC Minter',
    description: 'Mint all the ERC in one website',
    url: 'https://mint-erc-wagmi.vercel.app/',
    siteName: 'ERC Minter',
    images: [
      {
        url: 'https://cdn.discordapp.com/attachments/913843318859911168/1164629289824686222/image.png',
        width: 800,
        height: 600,
      },
      {
        url: 'https://cdn.discordapp.com/attachments/913843318859911168/1164629289824686222/image.png',
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
