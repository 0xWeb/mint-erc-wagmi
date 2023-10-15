import React from 'react'
import MetamaskIcon from '../public/metamask.svg'
import Image from 'next/image'

function Erc20MintButton() {


    return (
        <>
            <input
                type="number"
                id="large-input"
                placeholder='Amount To Mint'
                className="block w-full p-4 mb-4 rounded-lg bg-[#2C2C2C] placeholder-gray-400 text-white outline-none" />
            <button
                type="button"
                className="flex w-full  justify-center text-center text-white bg-[#3f3f47] hover:scale-[103%] transition-all outline-none  font-medium rounded-lg text-lg px-5 py-2.5 items-center d "
            >
                Mint Tokens Now
            </button>
        </>
    )
}

export default Erc20MintButton