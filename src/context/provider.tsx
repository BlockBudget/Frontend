"use client";
import React, { Children } from "react";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { config } from "@/config/config";

const Providers = ({ children }: { children: React.ReactNode }) => {
	// const myCustomTheme: Theme = {
	//   blurs: {
	//     modalOverlay: '...',
	//   },
	//   colors: {
	//     accentColor: 'white',
	//     accentColorForeground: 'white',
	//     actionButtonBorder: '...',
	//     actionButtonBorderMobile: '...',
	//     actionButtonSecondaryBackground: '...',
	//     closeButton: '...',
	//     closeButtonBackground: '...',
	//     connectButtonBackground: '...',
	//     connectButtonBackgroundError: '...',
	//     connectButtonInnerBackground: '...',
	//     connectButtonText: '...',
	//     connectButtonTextError: '...',
	//     connectionIndicator: '...',
	//     downloadBottomCardBackground: '...',
	//     downloadTopCardBackground: '...',
	//     error: '...',
	//     generalBorder: '...',
	//     generalBorderDim: '...',
	//     menuItemBackground: '...',
	//     modalBackdrop: '...',
	//     modalBackground: 'black',
	//     modalBorder: '...',
	//     modalText: '',
	//     modalTextDim: '...',
	//     modalTextSecondary: '...',
	//     profileAction: '...',
	//     profileActionHover: '...',
	//     profileForeground: '...',
	//     selectedOptionBorder: '...',
	//     standby: '...',
	//   },
	//   fonts: {
	//     body: '...',
	//   },
	//   radii: {
	//     actionButton: '...',
	//     connectButton: '...',
	//     menuButton: '...',
	//     modal: '...',
	//     modalMobile: '...',
	//   },
	//   shadows: {
	//     connectButton: '...',
	//     dialog: '...',
	//     profileDetailsAction: '...',
	//     selectedOption: '...',
	//     selectedWallet: '...',
	//     walletLogo: '...',
	//   },
	// };
	const queryClient = new QueryClient();
	return (
		<div>
			<WagmiProvider config={config}>
				<QueryClientProvider client={queryClient}>
					<RainbowKitProvider modalSize="compact" theme={darkTheme()}>
						{children}
					</RainbowKitProvider>
				</QueryClientProvider>
			</WagmiProvider>
		</div>
	);
};

export default Providers;
