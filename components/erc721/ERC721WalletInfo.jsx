import { IconArrowBigLeftFilled, IconArrowBigRightFilled } from '@tabler/icons-react'
import { addressFormater } from "@/utils/addressFormater";
import { handleToast } from "@/utils/Toast";

import WalletItems from './WalletItems'
import { useState } from 'react';

function ERC721WalletInfo({ address, contract, chain, data, tokenSupply, supportedNetworks, tokensBalance }) {

    const [slideIndex, setSlideIndex] = useState(1)
    const array = Array.from({ length: tokensBalance }, (_, i) => i)

    const nextSlide = () => {
        if (slideIndex < tokensBalance) {
            setSlideIndex(slideIndex + 1)
        } else handleToast('error', "You don't have more NFTs")
    }

    const prevSlide = () => {
        if (slideIndex >= 2) {
            setSlideIndex(slideIndex - 1)
        } else handleToast('error', "This is your first NFT")
    }

    return (
        <div className='text-2xl flex justify-around xl:justify-between xl:px-20 items-center'>
            <div className='hidden lg:flex lg:flex-col'>
                <h2 className='text-3xl border-b-2 mb-4'>Token & User Info</h2>
                <h4>Ethereum Balance: {address && data ? chain.id === supportedNetworks ? `${data.formatted?.slice(0, 6)} ETH` : 'Network not supported' : 'No wallet detected'}</h4>
                <h4>0XNFT Balance: {address && data
                    ? tokensBalance ? chain.id === supportedNetworks ? `${tokensBalance} W3T` : 'Network not supported' : 'Loading...'
                    : 'No wallet detected'}</h4>
                <br />
                <h4>ERC721 Address: {addressFormater(contract)}</h4>
                <h4>Token Symbol: 0XNFT</h4>
                <h4>Supply: {tokenSupply ? `${tokenSupply}` : 'Loading...'}</h4>
            </div>
            <div className=' text-2xl flex gap-4 justify-center items-center'>
                <button className="border-2 p-1 rounded-lg" onClick={prevSlide}>
                    <IconArrowBigLeftFilled className='text-white ' />
                </button>
                {address &&
                    array.slice(slideIndex - 1, slideIndex).map((index) => {
                        return <WalletItems key={index} index={index} address={address} />
                    })
                }
                <button className="border-2 p-1 rounded-lg" onClick={nextSlide}>
                    <IconArrowBigRightFilled className='text-white' />
                </button>
            </div>

        </div>
    )
}

export default ERC721WalletInfo