"use client"

import Image from 'next/image'
import { Suspense, useState } from 'react'

import Erc20MintButton from '@/components/Erc20MintButton'
import ConnectButton from '@/components/ConnectButton'

import { useAccount, useConnect, useEnsName, useBalance, useToken, useContractRead, useContractWrite } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WeiPerEther, ethers, parseEther, toBigInt } from 'ethers';

import Arrow from '@/components/Icons/Arrow'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import WalletInfo from '@/components/WalletInfo'

import { contract, ABI } from '@/constants/erc20'




function App() {

    const { address, isConnected } = useAccount()
    const [mintAmount, setMintAmount] = useState('')
    const [tokenSupply, setTokenSupply] = useState()
    const [userBalance, setUserBalance] = useState()

    const { connect } = useConnect({
        connector: new InjectedConnector(),
    })
    const { data, isError, isLoading } = useBalance({
        address,
    })
    const token = useToken({
        address: contract
    })
    const { data: balanceOf } = useContractRead({
        address: contract,
        abi: ABI,
        functionName: 'balanceOf',
        args: [address],
        onSuccess(data) {
            setUserBalance(ethers.formatEther(data))
        }
    })
    const { data: totalSupply } = useContractRead({
        address: contract,
        abi: ABI,
        functionName: 'totalSupply',
        onSuccess(data) {
            setTokenSupply(ethers.formatEther(data))
        },
    })

    const handleChange = (amount) => {
        setMintAmount(parseEther(amount))
    }

    const { write: mintTokens } = useContractWrite({
        address: contract,
        abi: ABI,
        functionName: 'mintTokens',
        args: [mintAmount]
    })

    return (
        <main className='flex min-h-screen flex-col lg:flex-row items-center justify-center  mx-4' >

            <section className='flex flex-col bg-white  rounded-xl relative max-w-screen-xl w-full z-30'>
                <div className='window-bg z-10' />
                <NavBar url={'/erc20'} />

                <aside className='flex justify-end z-10 '>
                    {isConnected
                        ? <WalletInfo address={address} balance={data?.formatted} />
                        : <ConnectButton connect={connect} />
                    }
                </aside>

                <article className='flex justify-center lg:justify-start items-center gap-6 md:mx-16'>

                    <section className='flex flex-col md:min-w-[350px] justify-center items-center mb-20 z-10 bg-[#1B1B1B] px-12 py-8 rounded-lg'>
                        <img src="erc20.gif" alt="" className='w-[200px] z-30' />
                        <Erc20MintButton handleChange={handleChange} write={mintTokens} />
                    </section>

                    <section className='hidden lg:flex flex-col justify-start items-start w-full mb-20 z-10 bg-[#1B1B1B] px-12 py-8 rounded-lg'>
                        <h2 className='text-5xl border-b-2 mb-4'>Token & User Info</h2>
                        <div className='text-2xl'>
                            <h4>User Address: {address ? address : 'No wallet detected'}</h4>
                            <h4>Ethereum Balance: {address && data ? `${data.formatted?.slice(0, 6)} ETH` : 'No wallet detected'}</h4>
                            <h4>OxToken Balance: {address && data ? `${userBalance} W3T` : 'No wallet detected'}</h4>
                            <br />
                            <hr />
                            <br />
                            <h4>Token Address: {contract}</h4>
                            <h4>Token Symbol: W3T</h4>
                            <h4>Token Supply: {tokenSupply}</h4>
                        </div>
                    </section>

                </article>
            </section>

        </main>
    )
}

export default App