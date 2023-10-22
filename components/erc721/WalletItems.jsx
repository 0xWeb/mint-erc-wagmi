import React, { useState } from 'react'
import { useContractRead } from 'wagmi';
import { contract, ABI, supported_networks } from '@/constants/erc721'
import { ethers } from 'ethers';
import { IconFlame } from '@tabler/icons-react';

function WalletItems({ address, index }) {

    const [indexOfNft, setindexOfNft] = useState()
    const [URI, setURI] = useState()
    const [item, setItem] = useState()



    const tokenOfOwnerByIndex = useContractRead({
        address: contract,
        abi: ABI,
        functionName: 'tokenOfOwnerByIndex',
        watch: true,
        args: [address, 0],
        onSuccess(data) {
            setindexOfNft(ethers.formatUnits(data, "wei"))
            console.log(ethers.formatUnits(data, "wei"));
        },
    })

    const tokenUri = useContractRead({
        address: contract,
        abi: ABI,
        functionName: 'tokenURI',
        watch: true,
        args: [index + 1],
        onSuccess(data) {
            getNFT(data)
            console.log(data);
        },
    })

    const getNFT = async (data) => {
        const res = await fetch(data)
        const info = await res.json()
        setItem(info)
    }

    return (
        <div className=' text-black flex flex-col relative gap-2' >
            <p className='absolute text-3xl bg-white rounded-tl-lg'>{item?.name}</p>
            <img src={item?.image} alt="" className='w-[150px] rounded-lg' />
            <div className='flex justify-between'>
                <button className='bg-green-500 px-6 py-1 rounded-lg'>
                    Stake
                </button>
                <button className='bg-red-500 px-3 py-1 rounded-lg'>
                    <IconFlame />
                </button>
            </div>
        </div>
    )
}

export default WalletItems