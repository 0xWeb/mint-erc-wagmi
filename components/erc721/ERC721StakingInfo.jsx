import { IconArrowBigLeftFilled, IconArrowBigRightFilled } from '@tabler/icons-react'
import { addressFormater } from "@/utils/addressFormater";
import { handleToast } from "@/utils/Toast";

import { useState } from 'react';
import StakingItems from './StakingItems';
import { useContractRead, useContractWrite } from 'wagmi';
import { stakingABI, stakingContract } from '@/constants/erc721';
import { ethers } from 'ethers';

function ERC721StakingInfo({ address, contract, chain, supportedNetworks }) {

    const [slideIndex, setSlideIndex] = useState(1)
    const [userStakedItems, setUserStakedItems] = useState(0)
    const [userRewards, setUserRewards] = useState(0)
    const [lengthBalance, setLengthBalance] = useState(0)
    const array = Array.from({ length: lengthBalance }, (_, i) => i)

    const nextSlide = () => {
        if (slideIndex < lengthBalance) {
            setSlideIndex(slideIndex + 1)
        } else handleToast('error', "You don't have more NFTs in staking")
    }

    const prevSlide = () => {
        if (slideIndex >= 2) {
            setSlideIndex(slideIndex - 1)
        } else handleToast('error', "This is your first staed NFT")
    }

    const getLengthBalance = useContractRead({
        address: stakingContract,
        abi: stakingABI,
        functionName: 'getLength',
        args: [address],
        onSuccess(data) {
            setLengthBalance(ethers.formatUnits(data, "wei"))
        }
    })


    const getUserStaedItem = useContractRead({
        address: stakingContract,
        abi: stakingABI,
        functionName: 'balanceOf',
        args: [address],
        onSuccess(data) {
            setUserStakedItems(ethers.formatUnits(data, "wei"))
        }
    })
    const getUserRewards = useContractRead({
        address: stakingContract,
        abi: stakingABI,
        watch: true,
        functionName: 'available',
        args: [address],
        onSuccess(data) {

            setUserRewards(ethers.formatUnits(data, "wei"))
        }
    })

    const { write: redeemTokens } = useContractWrite({
        address: stakingContract,
        abi: stakingABI,
        functionName: 'redeem',
    })

    const stakedStyles = userStakedItems <= 3 ? 'content-center' : ''

    return (
        <div className='text-2xl flex justify-around xl:justify-between xl:px-10  items-center'>
            <div className=' text-2xl flex gap-4 justify-center items-center'>
                {/* <button className="border-2 p-1 rounded-lg" onClick={prevSlide}>
                    <IconArrowBigLeftFilled className='text-white ' />
                </button>
                {address &&
                    array.slice(slideIndex - 1, slideIndex).map((index) => {
                        return <StakingItems key={index} index={index} address={address} />
                    })
                }
                <button className="border-2 p-1 rounded-lg" onClick={nextSlide}>
                    <IconArrowBigRightFilled className='text-white' />
                </button> */}

                <div className={`grid grid-cols-3 gap-4 ${stakedStyles} px-3 overflow-scroll h-[300px] staked`}>
                    {address &&
                        array.map((index) => {
                            return <StakingItems key={index} index={index} address={address} />
                        })
                    }
                </div>
            </div>
            <div className='hidden lg:flex lg:flex-col'>
                <h2 className='text-3xl border-b-2 mb-4'>Staking Info</h2>
                <h4>NFTs Staked: {address
                    ? chain.id === supportedNetworks ? `${userStakedItems} W3T` : 'Network not supported' : 'No wallet detected'}</h4>
                <h4>Staking Address: {addressFormater(contract)}</h4>
                <h4 className='font-medium'>Rewards/day: {chain.id === supportedNetworks ? `${userStakedItems * 1000} 0XT` : 'Network not supported'}</h4>
                <h4 className='font-bold'>0xToken Reward: {chain.id === supportedNetworks ? `${userRewards} 0XT` : 'Network not supported'}</h4>
                <br />
                <button
                    className='border py-4 rounded-lg hover:bg-white hover:text-black transition-all duration-500'
                    onClick={() => redeemTokens()}
                >
                    Claim Rewards
                </button>
            </div>

        </div>
    )
}

export default ERC721StakingInfo