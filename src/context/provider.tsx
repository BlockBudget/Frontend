"use client";
import React, { useEffect } from "react";
// import { ThirdwebProvider } from "thirdweb/react";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { config } from "@/config/config";

const Providers = ({ children }: { children: React.ReactNode }) => {
	
	const queryClient = new QueryClient();
	return (
		<>
			<WagmiProvider config={config}>
				<QueryClientProvider client={queryClient}>
					<RainbowKitProvider modalSize="compact">
						{children}
					</RainbowKitProvider>
				</QueryClientProvider>
			</WagmiProvider>
		</>
	);
};

export default Providers;