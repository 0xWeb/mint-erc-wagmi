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

import { addressFormater } from '@/utils/addressFormater'


function App() {

    const [formatedAddress, setFormatedAddress] = useState('')

    const { address, isConnected } = useAccount({
        onConnect({ address, connector, isReconnected }) {
            setFormatedAddress(addressFormater(address))
        },
    })

    const { connect } = useConnect({
        connector: new InjectedConnector(),
    })

    const { data, isError, isLoading } = useBalance({
        address,
    })

    console.log(data?.formatted);
    return (
        <main className='flex min-h-screen flex-col lg:flex-row items-center justify-center  mx-4' >

            <section className='flex flex-col bg-white  rounded-xl relative max-w-screen-xl w-full z-30'>
                <div className='window-bg z-10'></div>
                <div className='flex items-center justify-between border-b gap-4'>
                    <NavBar></NavBar>
                </div>
                <div className='flex justify-end z-4 '>
                    {isConnected
                        ? <WalletInfo address={formatedAddress} balance={data?.formatted} />
                        : <ConnectButton connect={connect} />
                    }
                </div>

                <article className='flex justify-around items-center'>

                    <div className='flex flex-col justify-center items-center mb-20 mt-8 gap-6'>
                        <img src="erc20.gif" alt="" className='w-[200px] z-30' />
                        <Erc20MintButton />
                    </div>

                </article>
            </section>

        </main>
    )
}

export default App