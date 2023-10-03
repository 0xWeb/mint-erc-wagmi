import Image from 'next/image'
import PageButton from "../components/PageButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col lg:flex-row items-center justify-center  gap-12 px-20">
      <PageButton title={'ERC20 - Token'} route={'/erc20'} />
      <PageButton title={'ERC721 - NFT'} route={'/erc721'} />
      <PageButton title={'ERC1155 - Multi NFT'} route={'/erc1155'} />
    </main>
  )
}
