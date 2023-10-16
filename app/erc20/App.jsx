"use client"

import Image from 'next/image'
import { Suspense, useEffect, useMemo, useState } from 'react'

import Erc20MintButton from '@/components/Erc20MintButton'
import ConnectButton from '@/components/ConnectButton'

import { useAccount, useConnect, useEnsName, useBalance, useToken, useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WeiPerEther, ethers, parseEther, toBigInt } from 'ethers';

import Arrow from '@/components/Icons/Arrow'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import WalletInfo from '@/components/WalletInfo'

import { contract, ABI } from '@/constants/erc20'
import ErcInfo from '@/components/ErcInfo'





function App() {

    const { address, isConnected } = useAccount()
    const [mintAmount, setMintAmount] = useState('')
    const [tokenSupply, setTokenSupply] = useState()
    const [userBalance, setUserBalance] = useState()
    const [mintHash, setMintHash] = useState()


    const { connect } = useConnect({
        connector: new InjectedConnector(),
    })
    const { data: balance, isError, isLoading } = useBalance({
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
    const handleChange = (amount) => {
        setMintAmount(parseEther(amount))
    }
    const { write: mintTokens, isSuccess } = useContractWrite({
        address: contract,
        abi: ABI,
        functionName: 'mintTokens',
        args: [mintAmount],
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



    return (
        <main className='flex min-h-screen flex-col lg:flex-row items-center justify-center  mx-4' >
            <button onClick={refetchBalance}>
                Click me
            </button>

            <section className='flex flex-col bg-white  rounded-xl relative max-w-screen-xl w-full z-30'>
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
                        <img src="erc20.gif" alt="" className='w-[200px] z-30' />
                        <Erc20MintButton handleChange={handleChange} write={mintTokens} />
                    </section>
                    <ErcInfo address={address} data={balance} userBalance={userBalance} contract={contract} tokenSupply={tokenSupply} />
                </article>
            </section>

        </main>
    )
}

export default App