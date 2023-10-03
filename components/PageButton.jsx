import Link from 'next/link'

function PageButton({ title, route }) {
    return (
        <Link href={route} className="max-w-5xl h-full w-full items-center justify-center font-mono text-2xl md:text-3xl hover:scale-105 transition-all duration-300">
            <p className=" max-h-16 py-16 px-2 lg:py-44 flex justify-center items-center border rounded-3xl border-neutral-800  from-zinc-200  bg-zinc-800/20 bg-blur-2xl  text-center font-bold shadow-lg shadow-slate-700">
                {title}
            </p>
        </Link>
    )
}

export default PageButton