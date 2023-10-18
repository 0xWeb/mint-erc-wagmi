"use client"

import Image from 'next/image'
import { Suspense, useEffect, useMemo, useState } from 'react'

import Erc20MintButton from '@/components/Erc20MintButton'
import ConnectButton from '@/components/ConnectButton'
import NavBar from '@/components/NavBar'
import WalletInfo from '@/components/WalletInfo'
import ErcInfo from '@/components/ErcInfo'

import { contract, ABI } from '@/constants/erc20'
import { handleToast } from "@/utils/Toast"

import { useAccount, useConnect, useBalance, useContractRead, useContractWrite, useWaitForTransaction, useContractEvent } from 'wagmi'


import { ethers, parseEther } from 'ethers';
import { Toaster, toast } from 'sonner'

function App() {

    const { address, isConnected } = useAccount()
    const [mintAmount, setMintAmount] = useState('')
    const [tokenSupply, setTokenSupply] = useState()
    const [userBalance, setUserBalance] = useState()
    const [mintHash, setMintHash] = useState()

    const handleChange = (amount) => {
        setMintAmount(parseEther(amount))
    }

    const { connect, error, connectors, pendingConnector } = useConnect()

    const { data: balance } = useBalance({
        address,
        watch: true,
    })

    const useGetBalance = () => {
        return useContractRead({
            address: contract,
            abi: ABI,
            functionName: 'balanceOf',
            args: [address],
            onSuccess(data) {
                setUserBalance(ethers.formatEther(data))
            },
            cacheTime: 0,
            staleTime: 0,
            scopeKey: 'balanceOf',
        });
    }

    const { refetch: refetchBalance } = useGetBalance();

    const balanceOf = useContractRead({
        address: contract,
        abi: ABI,
        functionName: 'balanceOf',
        args: [address],
        onSuccess(data) {
            setUserBalance(ethers.formatEther(data))
        }
    })

    const totalSupply = useContractRead({
        address: contract,
        abi: ABI,
        functionName: 'totalSupply',
        watch: true,
        onSuccess(data) {
            setTokenSupply(ethers.formatEther(data))
        },
    })
    const { write: mintTokens, isSuccess, isError, isLoading } = useContractWrite({
        address: contract,
        abi: ABI,
        functionName: 'mintTokens',
        args: [mintAmount],

        onError(error) {
            handleToast('error', 'User denied transaction')
        },
        onSuccess(data) {
            setMintHash(data.hash);
        }
    })

    const waitForTransaction = useWaitForTransaction({
        confirmations: 1,
        hash: mintHash,
        onSuccess() {
            refetchBalance()
        },
    })

    const unwatch = useContractEvent({
        address: contract,
        abi: ABI,
        eventName: 'tokensMint',
        hash: mintHash,
        listener(log) {
            if (log[0].args.sender === address) {
                unwatch?.()
                handleToast('success', `You succesfully minted: ${ethers.formatEther(`${log[0].args.tokensMinted}`)} W3T`)
            }

        },
    })


    return (
        <main className='flex min-h-screen flex-col lg:flex-row items-center justify-center  mx-4' >
            <div className=' bg-red-500 flex flex-col px-12 py-4 gap-5 text-2xl'>
                {connectors.map((connector) => (
                    <button
                        key={connector.id}
                        onClick={() => connect({ connector })}
                    >
                        {connector.name}
                        {connector?.id === pendingConnector?.id && error === null && ' (connecting)'}
                    </button>
                ))}
            </div>

            {/* <section className='flex flex-col bg-white  rounded-xl relative max-w-screen-xl w-full z-30'>
                <Toaster richColors position="top-right" duration={2000} />
                <div className='window-bg z-10' />
                <NavBar url={'/erc20'} />
                <aside className='flex justify-end z-10 '>
                    {isConnected
                        ? <WalletInfo address={address} balance={balance?.formatted} />
                        : <ConnectButton connect={connect} />
                    }
                </aside>


                <article className='flex justify-center lg:justify-start items-center gap-6 md:mx-16'>

                    <section className='flex flex-col md:min-w-[350px] justify-center items-center mb-20 z-10 bg-[#1B1B1B] px-12 py-8 rounded-lg'>
                        <Image width={200} height={200} loading='lazy' src="/erc20.gif" alt="" className='z-30' />

                        <Erc20MintButton handleChange={handleChange} write={mintTokens} address={address} />
                    </section>
                    <ErcInfo address={address} data={balance} userBalance={userBalance} contract={contract} tokenSupply={tokenSupply} />

                </article>
            </section> */}

        </main>
    )
}

export default App