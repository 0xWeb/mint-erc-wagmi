import { useState } from "react";
import { useBalance } from "wagmi";

export const useGetBalance = ({ address }) => {

    const [balance, setBalance] = useState()
    const getBalance = useBalance({
        address,
        watch: true,
        onSuccess(data) {
            setBalance(data)
        },
    })
    return { getBalance, balance }
}