"use client";
import React from "react";
// import { ThirdwebProvider } from "thirdweb/react";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { config } from "@/config/config";

const Providers = ({ children }: { children: React.ReactNode }) => {
	
	const queryClient = new QueryClient();
	return (
		<div>
			<WagmiProvider config={config}>
				<QueryClientProvider client={queryClient}>
					{/* <ThirdwebProvider> */}
					<RainbowKitProvider modalSize="compact">
						{children}
					</RainbowKitProvider>
					{/* </ThirdwebProvider> */}
				</QueryClientProvider>
			</WagmiProvider>
		</div>
	);
};

export default Providers;
