import { IconSquareX } from "@tabler/icons-react"


function ConnectModal({ connectors, pendingConnector, connect, error, openModal, handleConnectModal, isConnected }) {

    return (
        <>
            {openModal && !isConnected ? <div className='h-screen w-full absolute bg-black bg-opacity-60 z-30' /> : ''}
            <section className={`${openModal && !isConnected ? 'show-connect-modal' : 'hidden'} max-w-[400px] w-full absolute flex h justify-center items-center z-40 transition-all`}>

                <article className='relative bg-white text-black flex flex-col text-xl max-w-[400px] w-full rounded-lg shadow-lg'>
                    <nav className='flex flex-col w-[100%] z-30' >
                        <section className='bg-[#1B1B1B] w-[100%] h-11  rounded-t-lg flex items-center justify-between px-4'>
                            <h2 className="text-white text-2xl">Connect Wallet</h2>
                            <IconSquareX className="text-white cursor-pointer" onClick={handleConnectModal} />
                        </section>
                    </nav>
                    <div className="flex flex-col px-12 p-6">
                        {connectors.map((connector, index) => (
                            <button
                                key={connector.id}
                                onClick={() => connect({ connector })}
                                className='text-left text-white border-2 border-black bg-[#1B1B1B] hover:bg-slate-100 hover:text-black transition-all duration-500 px-8 py-4 rounded-lg mb-3 flex'
                            >
                                {connector.name}
                                {connector?.id === pendingConnector?.id && error === null && ' (connecting...)'}
                            </button>
                        ))}
                    </div>
                </article>
            </section>
        </>
    )
}

export default ConnectModal