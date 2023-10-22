"use client"

import { useEffect, useState } from 'react'

import ConnectButton from '@/components/ConnectButton'
import NavBar from '@/components/NavBar'
import WalletInfo from '@/components/WalletInfo'
import ConnectModal from '@/components/ConnectModal'

import { contract, ABI, supported_networks } from '@/constants/erc721'
import { handleToast } from "@/utils/Toast"

import { useAccount, useConnect, useContractRead, useContractWrite, useWaitForTransaction, useSwitchNetwork, useNetwork } from 'wagmi'


import { ethers, parseEther, } from 'ethers';
import { Toaster, toast } from 'sonner'
import { useGetBalance } from '@/hooks/useGetBalance'
import { useGetTokenBalance } from '@/hooks/useGetTokenBalance'
import Erc721Info from '@/components/erc721/Erc721Info'
import Erc721MintSection from '@/components/erc721/Erc721MintSection'
import WalletItems from '@/components/erc721/WalletItems'


function App() {
    const standard = '721'

    const [tokenSupply, setTokenSupply] = useState()
    const [mintHash, setMintHash] = useState()
    const [openModal, setOpenModal] = useState(false)


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
            setTokenSupply(ethers.formatUnits(data, "wei"))
        },
    })


    const { write: mintNFT } = useContractWrite({
        address: contract,
        abi: ABI,
        functionName: 'mintNFT',
        args: [address],
        onError(error) {
            handleToast('error', error.details)
        },
        onSuccess(data) {
            setMintHash(data.hash);
            console.log(mintNFT);
        }
    })

    const waitForTransaction = useWaitForTransaction({
        confirmations: 1,
        hash: mintHash,
        onSuccess() {
            getBalance.refetch()
            getTokensBalance.refetch()
            handleToast('success', `You succesfully minted your 0XNFT`)
        },
    })

    const handleConnectModal = () => {
        setOpenModal(!openModal)
    }

    const handleMint = () => {
        mintNFT()
    }
    useEffect(() => {
        if (isConnected && chain.id !== supported_networks.sepolia) {
            handleToast('error', 'Network Not Supported Swicht To Sepolia')
            switchNetwork()
        }
    }, [chain, isConnected, address])

    return (
        <main className='flex min-h-screen flex-col lg:flex-row items-center justify-center mx-4 ' >

            <ConnectModal handleConnectModal={handleConnectModal} openModal={openModal} isConnected={isConnected} connectors={connectors} pendingConnector={pendingConnector} connect={connect} error={connectError} />

            <section className={` flex flex-col bg-white z-20 rounded-xl relative max-w-screen-xl w-full`}>
                <Toaster richColors position="top-right" duration={2000} />
                <div className='window-bg z-10' />
                <NavBar url={'/721'} />
                <aside className='flex justify-end z-20 '>
                    {isConnected && chain.id === 11155111
                        ? <WalletInfo address={address} balance={balance?.formatted} />
                        : <ConnectButton handleConnectModal={handleConnectModal} />
                    }
                </aside>
                <article className='flex justify-center lg:justify-start items-center gap-6 md:mx-16'>



                    <Erc721MintSection address={address} handleMint={handleMint} />
                    <Erc721Info supportedNetworks={supported_networks.sepolia} chain={chain} address={address} data={balance} tokensBalance={tokensBalance} contract={contract} tokenSupply={tokenSupply} />

                </article>
            </section>

        </main>
    )
}

export default App