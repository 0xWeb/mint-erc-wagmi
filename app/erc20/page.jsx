import React from 'react'

function ERC20() {
    return (
        <main className='min-h-screen flex justify-center items-center' >
            <section>
                <h1>
                    Mint 0xWeb Tokens Now!
                </h1>

                <input type="number" name="Tokens To Mint" />
                <button>
                    Mint
                </button>
            </section>
        </main>
    )
}

export default ERC20