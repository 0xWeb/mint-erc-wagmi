"use client"

import Image from 'next/image'
import PageButton from "../components/PageButton";
import NavBar from '@/components/NavBar';




export default function Home() {

  return (

    <main className="flex min-h-screen flex-col lg:flex-row items-center justify-center  mx-4 ">
      <section className='flex flex-col bg-white  rounded-xl relative max-w-screen-xl w-full '>
        <div className='window-bg z-10'></div>
        <NavBar />

        <div className=' flex flex-col md:flex-row m-3 gap-3  z-20 justify-around '>
          <PageButton title={'ERC20 '} route={'/erc20'} />
          <PageButton title={'ERC721'} route={'/erc721'} />
          <PageButton title={'ERC1155'} route={'/erc1155'} />
        </div>
      </section >

    </main >
  )
}
