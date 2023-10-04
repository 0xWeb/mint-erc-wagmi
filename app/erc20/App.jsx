"use client"

import Erc20MintButton from '@/components/Erc20MintButton'
import ConnectButton from '@/components/ConnectButton'

import { useAccount, useConnect, useEnsName } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'



function App() {
    const { address, isConnected } = useAccount()
    const { connect } = useConnect({
        connector: new InjectedConnector(),
    })


    return (
        <main className='min-h-screen flex justify-center items-center text-center' >
            <section className='flex flex-col justify-center items-center text-center px-20 py-20 border rounded-3xl border-neutral-800  from-zinc-200  bg-zinc-800/20 bg-blur-2xl  font-bold shadow-lg shadow-slate-700'>
                <h1 className='text-5xl mb-8'>
                    Mint 0xWeb Tokens!
                </h1>

                {isConnected
                    ? <Erc20MintButton />
                    : <ConnectButton connect={connect} />
                }
            </section>
        </main>
    )
}

export default App