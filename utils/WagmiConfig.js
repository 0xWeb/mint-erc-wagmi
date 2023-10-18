"use client"

import { createConfig, configureChains, sepolia } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

export const { chains, publicClient } = configureChains(
    [sepolia],
    [
        alchemyProvider({
            apiKey: process.env.ALCHEMY_API_KEY,
        }),
        publicProvider(),
    ],
    { stallTimeout: 5000 },
)
export const config = createConfig({
    autoConnect: true,
    connectors: [
        new MetaMaskConnector({
            chains, options: {
                shimDisconnect: false,
            },
        }),
        new CoinbaseWalletConnector({
            chains,
            options: {
                appName: 'wagmi',
            },
        }),
        new WalletConnectConnector({
            chains,
            options: {
                projectId: 'a3f27ab7aa7ca796529899ade00f2a63',
            },
        }),
        new InjectedConnector({
            chains,
            options: {
                name: 'Injected',
                shimDisconnect: false,
            },
        }),
    ],
    publicClient,
})
