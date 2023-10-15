import EthereumIcon from "./Icons/Ethereum"

function WalletInfo({ address, balance }) {

    return (
        <aside
            className="flex gap-2 justify-end items-end text-center m-4 z-40 text-xl"
        >
            <div className="flex gap-1 justify-end items-end text-center bg-[#1B1B1B] text-white font-medium rounded-lg  px-5 py-2.5">
                {address}
            </div>

            <div className="flex gap-1 justify-between items-center text-center bg-[#1B1B1B] text-white font-medium rounded-lg  px-4 py-2.5">
                {balance.slice(0, 6)} <EthereumIcon />
            </div>

        </aside>
    )
}

export default WalletInfo