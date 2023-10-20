import { useState } from "react";
import { useContractRead } from "wagmi";
import { ethers, parseEther, } from 'ethers';

export const useGetTokenBalance = ({ address, contract, ABI, standard }) => {

    const [tokensBalance, setTokensBalance] = useState()
    const getTokensBalance = useContractRead({
        address: contract,
        abi: ABI,
        functionName: 'balanceOf',
        args: [address],
        onSuccess(data) {
            if (standard === '20') {
                setTokensBalance(ethers.formatEther(data))
            } else if (standard === '721') {
                setTokensBalance(data)
            } else {
                setTokensBalance(data)
            }



        },
        cacheTime: 0,
        staleTime: 0,
        scopeKey: 'balanceOf',
    });
    return { getTokensBalance, tokensBalance }
}