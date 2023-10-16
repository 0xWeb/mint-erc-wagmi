import { WagmiConfig, useConfig, createConfig, configureChains, sepolia } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import App from './App'
import { alchemyProvider } from 'wagmi/providers/alchemy'

import { config, chains, publicClient } from '@/utils/WagmiConfig'

function ERC20() {

    return (
        <WagmiConfig config={config}>
            <App />
        </WagmiConfig>
    )
}

export default ERC20