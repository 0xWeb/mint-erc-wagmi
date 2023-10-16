import CloseIcon from '@/components/Icons/Close';
import BigArrowLeft from '@/components/Icons/BigArrowLeft';
import Star from '@/components/Icons/Star';
import ShareIcon from './Icons/Share';
import InfoIcon from './Icons/Info';
import Link from 'next/link';

function NavBar({ url }) {
    return (
        <nav className='flex flex-col w-[100%] z-30' >
            <section className='bg-[#1B1B1B] w-[100%] h-11  rounded-t-xl flex items-center justify-end px-4'>
                <CloseIcon />
            </section>

            <section className='bg-white  w-[100%] flex items-center px-4 py-2'>
                <Link href={"/"} className=' border-2 rounded-md border-black p-2'>
                    <BigArrowLeft />
                </Link>
                <article className='flex justify-between w-[100%] border-2 rounded-md border-black  ml-2 text-black py-[6px] px-4  text-xl'>
                    https://minterc.com{url}
                    <div className='flex gap-4'>
                        <InfoIcon />
                        <ShareIcon />

                    </div>
                </article>
            </section>

            <section className='bg-[#1B1B1B]  w-[100%] flex items-center justify-center gap-6  py-3 font-semibold text-xl'>
                <p>ERC20 <span className='hidden sm:inline-block'>- TOKEN</span></p>
                <Star />
                <p>ERC721 <span className='hidden sm:inline-block'>- NFT</span></p>
                <Star />
                <p>ERC1155 <span className='hidden sm:inline-block'>- MULTI NFT</span></p>
            </section>
        </nav>
    )
}

export default NavBar