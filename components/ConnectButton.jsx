import MetamaskIcon from '../public/metamask.svg'
import Image from 'next/image'

function ConnectButton({ connect }) {

    const connectHandleClick = () => {
        connect()
    }

    return (
        <button
            type="button"
            className="flex  gap-3 justify-center text-center text-gray-900 bg-white hover:bg-gray-100 border border-gray-200  focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-lg px-5 py-2.5 items-center  dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 "
            onClick={connectHandleClick}
        >
            <Image src={MetamaskIcon} width={30} alt="SVG Metamask Icon" />
            Connect Wallet
        </button>
    )
}

export default ConnectButton