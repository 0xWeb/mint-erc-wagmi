import MetamaskIcon from '../public/metamask.svg'
import Image from 'next/image'

function ConnectButton({ connect }) {

    const connectHandleClick = () => {
        connect()
    }

    return (
        <button
            type="button"
            className="flex  gap-3 justify-end items-end text-center bg-[#1B1B1B] text-white font-medium rounded-lg text-lg px-5 py-2.5 m-4"
            onClick={connectHandleClick}
        >
            Connect Wallet
        </button>
    )
}

export default ConnectButton