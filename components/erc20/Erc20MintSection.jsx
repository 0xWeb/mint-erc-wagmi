
import { handleToast } from "@/utils/Toast"

function Erc20MintSection({ mintAmount, handleChange, write, address }) {

    const handleClickAmount = () => {
        handleToast('error', 'The Number Of Tokens Cannot Be Empty')
    }
    const handleClickWallet = () => {
        handleToast('error', 'Connect Wallet To Mint Tokens')
    }
    return (
        <>
            <input
                type="number"
                id="large-input"
                placeholder='45123'
                className="block w-full p-4 mb-4 rounded-lg bg-[#2C2C2C] placeholder-gray-400 text-white outline-none"
                onChange={(e) => {
                    handleChange(e.currentTarget.value)
                }}
            />
            <button
                type="button"
                className="flex w-full  justify-center text-center text-white bg-[#3f3f47] hover:scale-[103%] transition-all outline-none  font-medium rounded-lg text-lg px-5 py-2.5 items-center"
                onClick={address ? mintAmount == null || mintAmount == "" ? handleClickAmount : write : handleClickWallet}
            >
                Mint Tokens Now
            </button >
        </>
    )
}

export default Erc20MintSection