"use client"

import Image from 'next/image'
import PageButton from "../components/PageButton";
import NavBar from '@/components/NavBar';
import { useState } from 'react';




export default function Home() {

  const [startPage, setStartPage] = useState(true)

  const handleClick = () => {
    setStartPage(!startPage)
  }

  return (
    <>
      <section className={`${startPage ? 'flex' : 'hidden'} cursor-pointer absolute bg-black h-screen w-full flex justify-center items-center z-50 text-9xl`} onClick={handleClick}>
        <p className='flicker'>Touch To Start</p>
      </section>

      <main className={`flex min-h-screen flex-col lg:flex-row items-center justify-center  mx-4 ${startPage ? '' : 'window'}`}>
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
    </>
  )
}
