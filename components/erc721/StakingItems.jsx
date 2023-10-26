import React, { useState } from 'react'
import { useContractRead, useContractWrite } from 'wagmi';
import { contract, ABI, supported_networks, stakingContract, stakingABI } from '@/constants/erc721'
import { ethers } from 'ethers';
import { IconFlame } from '@tabler/icons-react';

function StakingItems({ address, index }) {

    const [indexOfStakedNft, setIndexOfStakedNft] = useState()
    const [URI, setURI] = useState()
    const [item, setItem] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [isApproved, setIsApproved] = useState(false)



    const tokenOfOwnerByIndex = useContractRead({
        address: stakingContract,
        abi: stakingABI,
        functionName: 'get',
        watch: true,
        args: [address, index],
        onSettled() {
            setIsLoading(true)
        },
        onSuccess(data) {
            setIndexOfStakedNft(ethers.formatUnits(data, "wei"))

        },
    })

    const { data } = useContractRead({
        address: contract,
        abi: ABI,
        functionName: 'tokenURI',
        watch: true,
        args: [indexOfStakedNft],
        onSuccess(data) {
            getNFT(data)

        },
    })

    const getNFT = async (data) => {
        const res = await fetch(data)
        const info = await res.json()
        setItem(info)

    }


    const { write: witdrawItem } = useContractWrite({
        address: stakingContract,
        abi: stakingABI,
        functionName: 'withdraw',
        args: [indexOfStakedNft]
    })





    return (
        <>
            {
                indexOfStakedNft < 1000000 &&
                <div className=' text-black flex flex-col relative gap-2 loading  ' >

                    <p className='absolute text-2xl px-2 bg-white z-10 rounded-tl-lg'>{item?.name}</p>

                    {
                        item?.image ? <img src={item?.image} alt="" className='w-[100%] h-[124px] rounded-lg clas' loading='lazy' /> : <div className="skeleton-2"></div>
                    }
                    <button className='bg-yellow-500 px-6 py-1 rounded-lg w-full' onClick={() => witdrawItem()}>
                        Witdraw
                    </button>
                </div>
            }
        </>

    )
}

export default StakingItems