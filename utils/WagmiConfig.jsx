"use client"

import { WagmiConfig, useConfig, createConfig, configureChains, sepolia } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

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
    publicClient,
})
