"use client"

import Image from 'next/image'

import Erc20MintButton from '@/components/Erc20MintButton'
import ConnectButton from '@/components/ConnectButton'

import { useAccount, useConnect, useEnsName } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

import Arrow from '@/components/Icons/Arrow'
import Link from 'next/link'



function App() {
    const { address, isConnected } = useAccount()
    const { connect } = useConnect({
        connector: new InjectedConnector(),
    })


    return (
        <main className='h-screen flex justify-center items-center text-center' >
            <section className='flex flex-col max-w-screen-xl w-full bg-[#19191A] rounded-md  mx-4'>
                <div className=''>
                    <div className='flex items-center justify-between  border-b gap-4'>
                        <div className='flex items-center justify-center  py-6  gap-4'>
                            <Link href={'/'} className='p-2 border rounded-full ml-12'>
                                <Arrow className='' />
                            </Link>
                            <h1 className='text-4xl text-[#E8F1FC] ml-32'>
                                Mint 0xWeb
                            </h1>
                        </div>

                        <div className='py-6 pr-24'>
                            {isConnected
                                ? <Erc20MintButton />
                                : <ConnectButton connect={connect} />
                            }
                        </div>
                    </div>

                    <article className='flex justify-around items-center'>

                        <div className='flex flex-col justify-center items-center mb-20 mt-8 gap-6'>
                            <img src="erc20.gif" alt="" className='w-[200px] ' />
                            <Erc20MintButton />
                        </div>

                    </article>
                </div>
            </section>
        </main>
    )
}

export default App