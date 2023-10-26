import React, { useState } from 'react'
import { useContractRead, useContractWrite } from 'wagmi';
import { contract, ABI, supported_networks, stakingContract, stakingABI } from '@/constants/erc721'
import { ethers } from 'ethers';
import { IconFlame } from '@tabler/icons-react';

function WalletItems({ address, index }) {

    const [indexOfNft, setIndexOfNft] = useState()
    const [URI, setURI] = useState()
    const [item, setItem] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [isApproved, setIsApproved] = useState(false)



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

    const { write: approveTokenToStake } = useContractWrite({
        address: contract,
        abi: ABI,
        functionName: 'approve',
        args: [stakingContract, indexOfNft],
    })

    const isTokenApproved = useContractRead({
        address: contract,
        abi: ABI,
        watch: true,
        functionName: 'getApproved',
        args: [indexOfNft],
        onSuccess(data) {
            console.log(data);
            if (data === stakingContract) {
                setIsApproved(true)
            }
        },
    })

    const { write: stakeItem } = useContractWrite({
        address: stakingContract,
        abi: stakingABI,
        functionName: 'stake',
        args: [indexOfNft]
    })





    return (
        <div className=' text-black flex flex-col relative gap-2 loading' >

            <p className='absolute text-3xl bg-white rounded-tl-lg z-10'>{item?.name}</p>

            {
                item?.image ? <img src={item?.image} alt="" className='w-[150px] h-[240px] rounded-lg clas' loading='lazy' /> : <div className="skeleton-enmp8iheqvm"></div>
            }
            <div className='flex justify-between'>
                {
                    isApproved
                        ? <button className='bg-green-500 px-6 py-1 rounded-lg' onClick={() => stakeItem()}>
                            Stake
                        </button>
                        : <button className='bg-green-500 px-4 py-1 rounded-lg' onClick={() => approveTokenToStake()}>
                            Approve
                        </button>
                }
                <button className='bg-red-500 px-3 py-1 rounded-lg'>
                    <IconFlame />
                </button>
            </div>

        </div>
    )
}

export default WalletItems