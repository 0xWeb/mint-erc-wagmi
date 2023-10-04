"use client"
import { WagmiConfig, useConfig, createConfig, configureChains, sepolia } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import App from './App'

const { chains, publicClient } = configureChains(
    [sepolia],
    [publicProvider()],
)
const config = createConfig({
    autoConnect: true,
    publicClient,
})


function ERC20() {

    return (
        <WagmiConfig config={config}>
            <App />
        </WagmiConfig>
    )
}

export default ERC20