import '@rainbow-me/rainbowkit/styles.css';
import { createConfig, http } from 'wagmi'
import { injected, metaMask, safe  } from 'wagmi/connectors'
import {
    mainnet,
    polygon,
    optimism,
    lisk,
    liskSepolia,
  } from 'wagmi/chains';

  declare module 'wagmi' {
    interface Register {
      config: typeof config
    }
  }
  
export const config = createConfig({
    chains: [liskSepolia, lisk,mainnet, polygon, optimism],
    connectors: [  safe()],
    transports: {
      [lisk.id]: http(),
      [mainnet.id]: http(),
      [polygon.id]: http(),
      [optimism.id]: http(),
      [liskSepolia.id]: http(),
    },
    ssr : true
});