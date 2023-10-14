import Link from 'next/link'

function PageButton({ title, route }) {
    return (
        <Link href={route} className="md:max-w-[275px] w-full  my-5 md:my-32 items-center justify-center  text-2xl md:text-3xl hover:scale-[103%] transition-all duration-300 button-sh rounded-lg relative">

            <p className="py-8 md:p-20 bg-[#1B1B1B]  flex justify-center items-center border text-center font-bold rounded-lg ">
                {title}
            </p>
        </Link>
    )
}

export default PageButton