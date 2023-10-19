import Image from 'next/image'

function ConnectButton({ handleConnectModal }) {

    return (
        <button
            type="button"
            className="flex  gap-3 justify-end items-end text-center bg-[#1B1B1B] hover:scale-105 transition-all duration-500 border-[3px] border-black text-white font-medium rounded-lg text-lg px-4 py-2 m-4"
            onClick={handleConnectModal}
        >
            Connect Wallet
        </button>
    )
}

export default ConnectButton