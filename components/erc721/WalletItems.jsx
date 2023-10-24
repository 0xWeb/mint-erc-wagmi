import React, { useState } from 'react'
import { useContractRead } from 'wagmi';
import { contract, ABI, supported_networks } from '@/constants/erc721'
import { ethers } from 'ethers';
import { IconFlame } from '@tabler/icons-react';

function WalletItems({ address, index }) {

    const [indexOfNft, setIndexOfNft] = useState()
    const [URI, setURI] = useState()
    const [item, setItem] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)



    const tokenOfOwnerByIndex = useContractRead({
        address: contract,
        abi: ABI,
        functionName: 'tokenOfOwnerByIndex',
        watch: true,
        args: [address, index],
        onSettled() {
            setIsLoading(true)
        },
        onSuccess(data) {
            setIndexOfNft(ethers.formatUnits(data, "wei"))

        },
    })

    const { data } = useContractRead({
        address: contract,
        abi: ABI,
        functionName: 'tokenURI',
        watch: true,
        args: [indexOfNft],
        onSuccess(data) {
            getNFT(data)

        },
    })

    const getNFT = async (data) => {
        const res = await fetch(data)
        const info = await res.json()
        setItem(info)

    }


    return (
        <div className=' text-black flex flex-col relative gap-2 loading' >

            <p className='absolute text-3xl bg-white rounded-tl-lg'>{item?.name}</p>

            {
                item?.image ? <img src={item?.image} alt="" className='w-[150px] h-[240px] rounded-lg clas' loading='lazy' /> : <div class="skeleton-enmp8iheqvm"></div>
            }
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