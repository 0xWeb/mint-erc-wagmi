import { useState } from "react";
import { useContractRead } from "wagmi";
import { ethers, parseEther, } from 'ethers';
import { contract, ABI, supported_networks } from '@/constants/erc721'

export const useGetErc721Balance = ({ address }) => {

    const [erc721Balance, setErc721Balance] = useState()
    const getErc721Balance = useContractRead({
        address: contract,
        abi: ABI,
        functionName: 'balanceOf',
        args: [address],
        onSuccess(data) {
            setErc721Balance(ethers.formatUnits(data, 'wei'))
        },
        cacheTime: 0,
        staleTime: 0,
        scopeKey: 'balanceOf',
    });
    return { getErc721Balance, erc721Balance }
}