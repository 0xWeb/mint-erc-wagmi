"use client"

import Image from 'next/image'
import PageButton from "../components/PageButton";

import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()],
)

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
})

export default function Home() {
  return (
    <WagmiConfig config={config}>
      <main className="flex min-h-screen flex-col lg:flex-row items-center justify-center  gap-12 px-20">
        <h1 className='absolute top-20 lg:top-32 font-extrabold text-3xl lg:text-5xl text-center'>
          SEPOLIA ERCS MINTER
        </h1>
        <PageButton title={'ERC20 - Token'} route={'/erc20'} />
        <PageButton title={'ERC721 - NFT'} route={'/erc721'} />
        <PageButton title={'ERC1155 - Multi NFT'} route={'/erc1155'} />
      </main>
    </WagmiConfig>
  )
}
