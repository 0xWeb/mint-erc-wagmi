import { WagmiConfig } from 'wagmi'

import App from './App'


import { config } from '@/utils/WagmiConfig'

export const metadata = {
    title: 'ERC20',
    description: 'Mint ERC20 Tokens on Sepolia Network',
    openGraph: {
        title: 'Next.js',
        description: 'The React Framework for the Web',
        url: 'https://nextjs.org',
        siteName: 'Next.js',
        images: [
            {
                url: 'https://nextjs.org/og.png',
                width: 800,
                height: 600,
            },
            {
                url: 'https://nextjs.org/og-alt.png',
                width: 1800,
                height: 1600,
                alt: 'My custom alt',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
}

function ERC20() {

    return (
        <WagmiConfig config={config}>
            <App />
        </WagmiConfig>
    )
}

export default ERC20