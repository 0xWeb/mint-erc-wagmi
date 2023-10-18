import { WagmiConfig } from 'wagmi'

import App from './App'


import { config } from '@/utils/WagmiConfig'

function ERC20() {

    return (
        <WagmiConfig config={config}>
            <App />
        </WagmiConfig>
    )
}

export default ERC20