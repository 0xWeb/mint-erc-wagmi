
import { useState } from "react";
import WalletItems from "./WalletItems";
import { IconArrowBigLeftFilled, IconArrowBigRightFilled } from "@tabler/icons-react";
import ERC721WalletInfo from "./ERC721WalletInfo";
import InfoNavBar from "./InfoNavBar";
import ERC721StakingInfo from "./ERC721StakingInfo";

function Erc721Info({ address, data, tokensBalance, contract, tokenSupply, chain, supportedNetworks }) {

    const [textColor, setTextColor] = useState('white')
    const [selectedSection, setSelectedSection] = useState('wallet')
    const [textColorNonSelected, setTextColorNonSelected] = useState('black')

    const handleChnageTextColor = () => {
        setTextColor(textColorNonSelected);
        setTextColorNonSelected(textColor);
    }

    const sectionButtonsStyle = ` ${selectedSection === 'wallet' ? `absolute  h-full w-1/2 bg-black rounded-lg left-[0] duration-[600ms]  translate-x-[0]` : `absolute  h-full w-1/2 bg-black rounded-lg left-[0] duration-[600ms] translate-x-[100%] `}`

    return (
        <section className='hidden relative md:flex justify-center items-center w-full min-h-[300px] max-h-[400px] h-full z-10 bg-[#1B1B1B]   py-16  rounded-lg'>
            <InfoNavBar sectionButtonsStyle={sectionButtonsStyle} textColor={textColor} textColorNonSelected={textColorNonSelected} setSelectedSection={setSelectedSection} selectedSection={selectedSection} handleChnageTextColor={handleChnageTextColor} />
            {
                address
                    ?
                    <section className="w-full">
                        {
                            selectedSection === 'wallet'
                            &&
                            <ERC721WalletInfo
                                address={address} data={data} tokenSupply={tokenSupply} supportedNetworks={supportedNetworks} tokensBalance={tokensBalance} contract={contract} chain={chain}
                            />
                        }

                        {
                            selectedSection === 'staked'
                            &&
                            <ERC721StakingInfo
                                address={address} data={data} supportedNetworks={supportedNetworks} tokensBalance={tokensBalance} contract={contract} chain={chain}
                            />
                        }
                    </section>
                    :
                    <article className="w-full max-h-[300px] h-full text-center text-4xl">
                        <p>
                            Connect Wallet To Display Your NFTs
                        </p>
                    </article>
            }
        </section >
    )
}

export default Erc721Info