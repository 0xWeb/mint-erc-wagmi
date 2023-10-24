import Image from 'next/image'
import { handleToast } from "@/utils/Toast"

function Erc721MintSection({ address, handleMint }) {

    const handleClickWallet = () => {
        handleToast('error', 'Connect Wallet To Mint Tokens')
    }
    return (
        <section className='flex flex-col md:min-w-[350px] justify-center items-center z-20 bg-[#E6EFFA] px-12 py-8 rounded-lg gap-4 shadow-lg shadow-black '>
            <Image width={190} height={260} loading='lazy' src="/ERC721.png" alt="" className='rounded-lg' />
            <button className='bg-[#1B1B1B] w-[200px] font-medium rounded-lg text-lg px-5 py-2.5'
                onClick={address ? handleMint : handleClickWallet}>Mint</button>
        </section>
    )
}

export default Erc721MintSection