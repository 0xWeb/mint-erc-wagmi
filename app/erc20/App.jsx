"use client"

import Image from 'next/image'
import { useEffect, useState } from 'react'

import Erc20MintSection from '@/components/erc20/Erc20MintSection'
import ConnectButton from '@/components/ConnectButton'
import NavBar from '@/components/NavBar'
import WalletInfo from '@/components/WalletInfo'
import ErcInfo from '@/components/erc20/Erc20Info'
import ConnectModal from '@/components/ConnectModal'

import { contract, ABI, supported_networks } from '@/constants/erc20'
import { handleToast } from "@/utils/Toast"

import { useAccount, useConnect, useContractRead, useContractWrite, useWaitForTransaction, useSwitchNetwork, useNetwork } from 'wagmi'


import { ethers, parseEther, } from 'ethers';
import { Toaster, toast } from 'sonner'
import { useGetBalance } from '@/hooks/useGetBalance'
import { useGetTokenBalance } from '@/hooks/useGetTokenBalance'


function App() {

    const standard = '20'

    const [mintAmount, setMintAmount] = useState("")
    const [tokenSupply, setTokenSupply] = useState()
    const [mintHash, setMintHash] = useState()
    const [openModal, setOpenModal] = useState(false)
    const [tokensMinted, setTokensMinted] = useState()

    const { connect, error: connectError, connectors, pendingConnector } = useConnect()
    const { address, isConnected, onConnect } = useAccount({
        onConnect() {
            setOpenModal(false)
            getBalance.refetch()
            getTokensBalance.refetch()
            if (chain.id !== supported_networks.sepolia) {
                handleToast('error', 'Network Not Supported')
                switchNetwork()
            }
        }
    })

    const { chain } = useNetwork()
    const { chains, error, pendingChainId, switchNetwork } = useSwitchNetwork({
        chainId: 11155111,
        throwForSwitchChainNotSupported: true,
    })

    const { getTokensBalance, tokensBalance } = useGetTokenBalance({ address, contract, ABI, standard });
    const { getBalance, balance } = useGetBalance({ address });

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
            getBalance.refetch()
            getTokensBalance.refetch()
            handleToast('success', `You succesfully minted: ${tokensMinted} W3T`)
        },
    })

    const handleChange = (amount = 1) => {
        setMintAmount(parseEther(`${amount}`))

    }
    const handleConnectModal = () => {
        setOpenModal(!openModal)
    }

    useEffect(() => {
        if (isConnected && chain.id !== supported_networks.sepolia) {
            handleToast('error', 'Network Not Supported Swicht To Sepolia')
            switchNetwork()
        }
    }, [chain])


    return (
        <main className='flex min-h-screen flex-col lg:flex-row items-center justify-center mx-4' >

            <ConnectModal handleConnectModal={handleConnectModal} openModal={openModal} isConnected={isConnected} connectors={connectors} pendingConnector={pendingConnector} connect={connect} error={connectError} />

            <section className={` flex flex-col bg-white z-20 rounded-xl relative max-w-screen-xl w-full`}>
                <Toaster richColors position="top-right" duration={2000} />
                <div className='window-bg z-10' />
                <NavBar url={'/erc20'} />
                <aside className='flex justify-end z-20 '>
                    {isConnected && chain.id === 11155111
                        ? <WalletInfo address={address} balance={balance?.formatted} />
                        : <ConnectButton handleConnectModal={handleConnectModal} />
                    }
                </aside>


                <article className='flex justify-center lg:justify-start items-center gap-6 md:mx-16'>

                    <section className='flex flex-col md:min-w-[350px] justify-center items-center mb-20 z-20 bg-[#1B1B1B] px-12 py-8 rounded-lg'>
                        <Image width={200} height={200} loading='lazy' src="/erc20.gif" alt="" priority={false} />

                        <Erc20MintSection mintAmount={mintAmount} handleChange={handleChange} write={mintTokens} address={address} />
                    </section>
                    <ErcInfo supportedNetworks={supported_networks.sepolia} chain={chain} address={address} data={balance} tokensBalance={tokensBalance} contract={contract} tokenSupply={tokenSupply} />

                </article>
            </section>

        </main>
    )
}

export default App