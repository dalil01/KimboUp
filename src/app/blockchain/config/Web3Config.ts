import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { cookieStorage, createConfig, createStorage, http, useChains } from 'wagmi'
import { sepolia, avalanche } from 'wagmi/chains'
import { w3mProvider } from '@web3modal/ethereum'
import { defineChain } from "viem";
import { injected } from "@wagmi/core";

// Get projectId at https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

if (!projectId) throw new Error("Project ID is not defined")

const metadata: any = {
    name: "$KimboUp",
    description: "",
    url: process.env.NEXT_PUBLIC_URL + '', // origin must match your domain & subdomain
    icons: ["https://avatars.githubusercontent.com/u/37784886"]
}

const kimbo = defineChain({
    id: 28979,
    name: "Kimbo",
    nativeCurrency: {
        decimals: 18,
        name: 'Kimbo',
        symbol: 'KIMBO',
    },
    rpcUrls: {
        default: { http: ["https://api.ash-test.center/kimbonet/rpc"] },
    },
    blockExplorers: {
        default: {
            name: "Kimbonet",
            url: "https://kimbonet.explorer.ash-test.center",
            apiUrl: "https://kimbonet.explorer.ash-test.center/api/v2"
        }
    }
});

// Create wagmiConfig
const chains = [kimbo] as const;

export const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    ssr: true,
    storage: createStorage({
        storage: cookieStorage
    }),
    connectors: [injected()]
});