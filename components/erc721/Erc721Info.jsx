import Image from "next/image";
import { useState } from "react";

function Erc721Info({ address, data, tokensBalance, contract, tokenSupply, chain, supportedNetworks }) {

    const [textColor, setTextColor] = useState('white')
    const [selectedSection, setSelectedSection] = useState('wallet')
    const [textColorNonSelected, setTextColorNonSelected] = useState('black')
    let marker = document.querySelector(".marker");
    let item = document.querySelectorAll("nav h2");

    function indicator(e) {
        marker.style.left = e.offsetLeft + "px";
        marker.style.width = e.offsetWidth + "px";

    }
    const handleChnageTextColor = () => {
        setTextColor(textColorNonSelected);
        setTextColorNonSelected(textColor);
    }

    const sectionButtonsStyle = selectedSection === 'wallet' ? `text-2xl px-6 py-3  text-${textColor}` : `text-2xl px-6 py-3 text-${textColorNonSelected}`


    return (
        <section className='hidden relative lg:flex flex-col justify-start items-center w-full mb-20 z-10 bg-[#1B1B1B] px-12 py-12  rounded-lg'>
            <nav className="flex text-center justify-center bg-slate-200 rounded-xl absolute -top-7 max-w-[210px] w-full">
                <div className='flex items-center relative text-white cursor-pointer'>
                    <div className="marker rounded-lg"></div>
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
            {selectedSection === 'wallet'
                &&
                <div className='text-2xl flex gap-4'>

                    <Image width={200} height={200} loading='lazy' src="/ERC721.png" alt="" priority={false} className='rounded-lg' />
                    <Image width={200} height={200} loading='lazy' src="/ERC721.png" alt="" priority={false} className='rounded-lg' />

                </div>}

            {
                selectedSection === 'staked'
                &&
                <div className='text-2xl'>
                    <h4>User Address: {address ? chain.id === supportedNetworks ? address : 'Network not supported' : 'No wallet detected'}</h4>
                    <h4>Ethereum Balance: {address && data ? chain.id === supportedNetworks ? `${data.formatted?.slice(0, 6)} ETH` : 'Network not supported' : 'No wallet detected'}</h4>
                    <h4>OxToken Balance: {address && data
                        ? tokensBalance ? chain.id === supportedNetworks ? `${tokensBalance} 0XNFT` : 'Network not supported' : 'Loading...'
                        : 'No wallet detected'}</h4>
                    <br />
                    <hr />
                    <br />
                    <h4>Token Address: {contract}</h4>
                    <h4>Token Symbol: 0XNFT</h4>
                    <h4>Token Supply: {tokenSupply ? tokenSupply : 'Loading...'}</h4>
                </div>
            }
        </section>
    )
}

export default Erc721Info