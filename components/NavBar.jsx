
import Link from 'next/link';

import { IconArrowBigLeftFilled, IconSquareX, IconNorthStar, IconShare, IconInfoHexagon } from '@tabler/icons-react';

function NavBar({ url }) {
    return (
        <nav className='flex flex-col w-[100%] z-30' >
            <section className='bg-[#1B1B1B] w-[100%] h-11  rounded-t-xl flex items-center justify-end px-4'>
                <IconSquareX />
            </section>

            <section className='bg-white  w-[100%] flex items-center px-4 py-2'>
                <Link href={"/"} aria-label='Back' className=' border-2 rounded-md border-black p-2 hover:scale-[101%] transition-all hover:bg-slate-100'>
                    <IconArrowBigLeftFilled className='text-black' />
                </Link>
                <article className=' flex justify-between w-[100%] border-2 rounded-md border-black  ml-2 text-black py-[6px] px-4  text-xl'>
                    https://minterc.com{url}
                    <div className='flex gap-4'>
                        <IconInfoHexagon />
                        <IconShare />

                    </div>
                </article>
            </section>

            <section className='bg-[#1B1B1B]  w-[100%] flex items-center justify-center gap-6  py-3 font-semibold text-xl'>
                <p>ERC20 <span className='hidden sm:inline-block'>- TOKEN</span></p>
                <IconNorthStar />
                <p>ERC721 <span className='hidden sm:inline-block'>- NFT</span></p>
                <IconNorthStar />
                <p>ERC1155 <span className='hidden sm:inline-block'>- MULTI NFT</span></p>
            </section>
        </nav>
    )
}

export default NavBar