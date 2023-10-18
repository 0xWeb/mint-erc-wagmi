import Image from 'next/image'

function ConnectButton({ handleConnectModal }) {

    return (
        <button
            type="button"
            className="flex  gap-3 justify-end items-end text-center bg-[#1B1B1B] hover:bg-slate-300 hover:text-black transition-all duration-500 border-[3px] border-black text-white font-medium rounded-lg text-lg px-5 py-2.5 m-4"
            onClick={handleConnectModal}
        >
            Connect Wallet
        </button>
    )
}

export default ConnectButton