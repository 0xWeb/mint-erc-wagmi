"use client"

import Image from 'next/image'
import { useState } from 'react'

import Erc20MintButton from '@/components/Erc20MintButton'
import ConnectButton from '@/components/ConnectButton'
import NavBar from '@/components/NavBar'
import WalletInfo from '@/components/WalletInfo'
import ErcInfo from '@/components/ErcInfo'

import { contract, ABI } from '@/constants/erc20'
import { handleToast } from "@/utils/Toast"

import { useAccount, useConnect, useBalance, useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi'


import { ethers, parseEther, } from 'ethers';
import { Toaster, toast } from 'sonner'

import { IconSquareX } from '@tabler/icons-react'
import ConnectModal from '@/components/ConnectModal'

function App() {
    const [mintAmount, setMintAmount] = useState('')
    const [tokenSupply, setTokenSupply] = useState()
    const [userBalance, setUserBalance] = useState()
    const [mintHash, setMintHash] = useState()
    const [openModal, setOpenModal] = useState(false)
    const [tokensMinted, setTokensMinted] = useState()

    const { connect, error: connectError, connectors, pendingConnector } = useConnect()
    const { address, isConnected } = useAccount()

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
            handleToast('error', error.details)
        },
        onSuccess(data) {
            setMintHash(data.hash);
            setTokensMinted(ethers.formatEther(mintAmount))
        }
    })

    const waitForTransaction = useWaitForTransaction({
        confirmations: 1,
        hash: mintHash,
        onSuccess() {
            refetchBalance()
            handleToast('success', `You succesfully minted: ${tokensMinted} W3T`)
        },
    })

    const handleChange = (amount) => {
        setMintAmount(parseEther(amount))
    }
    const handleConnectModal = () => {
        setOpenModal(!openModal)
    }

    return (
        <main className='flex min-h-screen flex-col lg:flex-row items-center justify-center mx-4' >

            <ConnectModal handleConnectModal={handleConnectModal} openModal={openModal} isConnected={isConnected} connectors={connectors} pendingConnector={pendingConnector} connect={connect} error={connectError} />

            <section className={` flex flex-col bg-white z-20 rounded-xl relative max-w-screen-xl`}>
                <Toaster richColors position="top-right" duration={2000} />
                <div className='window-bg z-10' />
                <NavBar url={'/erc20'} />
                <aside className='flex justify-end z-20 '>
                    {isConnected
                        ? <WalletInfo address={address} balance={balance?.formatted} />
                        : <ConnectButton handleConnectModal={handleConnectModal} />
                    }
                </aside>


                <article className='flex justify-center lg:justify-start items-center gap-6 md:mx-16'>

                    <section className='flex flex-col md:min-w-[350px] justify-center items-center mb-20 z-20 bg-[#1B1B1B] px-12 py-8 rounded-lg'>
                        <Image width={200} height={200} loading='lazy' src="/erc20.gif" alt="" />

                        <Erc20MintButton handleChange={handleChange} write={mintTokens} address={address} />
                    </section>
                    <ErcInfo address={address} data={balance} userBalance={userBalance} contract={contract} tokenSupply={tokenSupply} />

                </article>
            </section>

        </main>
    )
}

export default App