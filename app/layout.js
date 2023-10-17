import './globals.css'
import { VT323 } from 'next/font/google'

const vt323 = VT323({ subsets: ['latin'], weight: ['400'] })

export const metadata = {
  title: 'Mint All ERC',
  description: 'Mint all the ERC in one website',
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
