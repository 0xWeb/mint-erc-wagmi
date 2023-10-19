import { useState } from "react";
import { useContractRead } from "wagmi";
import { contract, ABI } from '@/constants/erc20'
import { ethers, parseEther, } from 'ethers';

export const useGetTokenBalance = ({ address }) => {

    const [tokensBalance, setTokensBalance] = useState()
    const getTokensBalance = useContractRead({
        address: contract,
        abi: ABI,
        functionName: 'balanceOf',
        args: [address],
        onSuccess(data) {
            setTokensBalance(ethers.formatEther(data))

        },
        cacheTime: 0,
        staleTime: 0,
        scopeKey: 'balanceOf',
    });
    return { getTokensBalance, tokensBalance }
}