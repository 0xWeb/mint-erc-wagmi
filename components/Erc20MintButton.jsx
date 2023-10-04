import React from 'react'
import MetamaskIcon from '../public/metamask.svg'
import Image from 'next/image'

function Erc20MintButton() {


    return (
        <>
            <input
                type="number"
                id="large-input"
                placeholder='Numbre of Tokens'
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:border-slate-100 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none mb-8" />
            <button
                type="button"
                className="flex w-3/4 gap-3 justify-center text-center text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 outline-none  font-medium rounded-lg text-lg px-5 py-2.5 items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 "
            >
                Mint Tokens Now
            </button>
        </>
    )
}

export default Erc20MintButton