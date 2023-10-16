"use client"

import Image from 'next/image'
import { useState } from 'react'

import Erc20MintButton from '@/components/Erc20MintButton'
import ConnectButton from '@/components/ConnectButton'

import { useAccount, useConnect, useEnsName, useBalance } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

import Arrow from '@/components/Icons/Arrow'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import WalletInfo from '@/components/WalletInfo'




function App() {

    const { address, isConnected } = useAccount()

    const { connect } = useConnect({
        connector: new InjectedConnector(),
    })

    const { data, isError, isLoading } = useBalance({
        address,
    })

    return (
        <main className='flex min-h-screen flex-col lg:flex-row items-center justify-center  mx-4' >

            <section className='flex flex-col bg-white  rounded-xl relative max-w-screen-xl w-full z-30'>
                <div className='window-bg z-10' />
                <div className='flex items-center justify-between border-b gap-4'>
                    <NavBar url={'/erc20'} />
                </div>
                <div className='flex justify-end z-10 '>
                    {isConnected
                        ? <WalletInfo address={address} balance={data?.formatted} />
                        : <ConnectButton connect={connect} />
                    }
                </div>

                <article className='flex justify-center md:justify-start items-center gap-6 md:mx-16'>

                    <section className='flex flex-col md:min-w-[350px] justify-center items-center mb-20 z-10 bg-[#1B1B1B] px-12 py-8 rounded-lg'>
                        <img src="erc20.gif" alt="" className='w-[200px] z-30' />
                        <Erc20MintButton />
                    </section>

                    <section className='hidden md:flex flex-col justify-start items-start w-full mb-20 z-10 bg-[#1B1B1B] px-12 py-8 rounded-lg'>
                        <h2 className='text-5xl border-b-2 mb-4'>Token & User Info</h2>
                        <div className='text-2xl'>
                            <h4>User Address: {address ? address : 'No wallet detected'}</h4>
                            <h4>Ethereum Balance: {data ? `${data.formatted?.slice(0, 6)} ETH` : 'No wallet detected'}</h4>
                            <h4>OxToken Balance: {data ? `${data.formatted?.slice(0, 6)} 0XW` : 'No wallet detected'}</h4>

                            <h4>Token Supply: {address ? address : 'No wallet detected'}</h4>
                            <h4>Tokens Minted: {address ? address : 'No wallet detected'}</h4>
                            <h4>User Address: {address ? address : 'No wallet detected'}</h4>
                        </div>
                    </section>

                </article>
            </section>

        </main>
    )
}

export default App