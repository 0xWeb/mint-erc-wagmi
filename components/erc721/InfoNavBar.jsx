

function InfoNavBar({ sectionButtonsStyle, textColor, textColorNonSelected, setSelectedSection, selectedSection, handleChnageTextColor }) {
    return (
        <nav className=" text-center bg-slate-200 rounded-xl absolute -top-7  l-0 max-w-[210px] w-full">
            <div className='flex items-center justify-center relative text-white cursor-pointer'>
                <div className={sectionButtonsStyle} />
                <h2 className={`text-2xl px-6 py-3  text-${textColor}`} onClick={(e) => {
                    setSelectedSection('wallet')
                    if (selectedSection !== 'wallet') {
                        handleChnageTextColor(e)
                    }
                }}>Wallet</h2>
                <h2 className={`text-2xl px-6 py-3 text-${textColorNonSelected}`} onClick={(e) => {
                    if (selectedSection !== 'staked') {
                        handleChnageTextColor(e)
                    }
                    setSelectedSection('staked')
                }}>Staked</h2>
            </div>
        </nav>
    )
}

export default InfoNavBar