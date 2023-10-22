import Image from "next/image";
import { useEffect, useState } from "react";

function Erc721Info({ address, data, tokensBalance, contract, tokenSupply, chain, supportedNetworks }) {

    const [textColor, setTextColor] = useState('white')
    const [selectedSection, setSelectedSection] = useState('wallet')
    const [textColorNonSelected, setTextColorNonSelected] = useState('black')
    const [marketLeft, setMarketLeft] = useState('0px')


    function indicator(e) {
        setMarketLeft(`${e.offsetLeft + "px"}`)
    }

    const handleChnageTextColor = () => {
        setTextColor(textColorNonSelected);
        setTextColorNonSelected(textColor);
    }

    const sectionButtonsStyle = `rounded-lg transition-all ${selectedSection === 'wallet' ? `absolute  h-full w-1/2 bg-black rounded-lg left-[0] duration-[600ms]  translate-x-[0]` : `absolute  h-full w-1/2 bg-black rounded-lg left-[0] duration-[600ms] translate-x-[100%]`}`



    return (
        <section className='hidden relative lg:flex flex-col justify-start items-center w-full mb-20 z-10 bg-[#1B1B1B] px-12 py-12  rounded-lg'>
            <nav className="flex text-center justify-center bg-slate-200 rounded-xl absolute -top-7 max-w-[210px] w-full">
                <div className='flex items-center relative text-white cursor-pointer'>
                    <div className={sectionButtonsStyle} />
                    <h2 className={`text-2xl px-6 py-3  text-${textColor}`} onClick={(e) => {
                        indicator(e.target)
                        setSelectedSection('wallet')
                        if (selectedSection !== 'wallet') {
                            handleChnageTextColor(e)
                        }
                    }}>Wallet</h2>
                    <h2 className={`text-2xl px-6 py-3 text-${textColorNonSelected}`} onClick={(e) => {
                        indicator(e.target)
                        if (selectedSection !== 'staked') {
                            handleChnageTextColor(e)
                        }
                        setSelectedSection('staked')
                    }}>Staked</h2>
                </div>
            </nav>
            {
                selectedSection === 'wallet'
                &&
                <div className='text-2xl flex gap-4'>

                    <Image width={200} height={200} loading='lazy' src="/ERC721.png" alt="" priority={false} className='rounded-lg' />
                    <Image width={200} height={200} loading='lazy' src="/ERC721.png" alt="" priority={false} className='rounded-lg' />

                </div>
            }

            {
                selectedSection === 'staked'
                &&
                <div className='text-2xl'>
                    <Image width={200} height={200} loading='lazy' src="/ERC721.png" alt="" priority={false} className='rounded-lg' />

                </div>
            }
        </section >
    )
}

export default Erc721Info