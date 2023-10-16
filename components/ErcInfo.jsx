import React, { Suspense } from 'react'

function ErcInfo({ address, data, userBalance, contract, tokenSupply }) {
    return (
        <section className='hidden lg:flex flex-col justify-start items-start w-full mb-20 z-10 bg-[#1B1B1B] px-12 py-8 rounded-lg'>
            <h2 className='text-5xl border-b-2 mb-4'>Token & User Info</h2>
            <div className='text-2xl'>
                <h4>User Address: {address ? address : 'No wallet detected'}</h4>
                <h4>Ethereum Balance: {address && data ? `${data.formatted?.slice(0, 6)} ETH` : 'No wallet detected'}</h4>
                <h4>OxToken Balance: {address && data
                    ? userBalance ? `${userBalance} W3T` : 'Loading...'
                    : 'No wallet detected'}</h4>
                <br />
                <hr />
                <br />
                <h4>Token Address: {contract}</h4>
                <h4>Token Symbol: W3T</h4>
                <h4>Token Supply: {tokenSupply ? tokenSupply : 'Loading...'}</h4>
            </div>
        </section>
    )
}

export default ErcInfo