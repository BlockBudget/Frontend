"use client";

import {  useState } from "react";
import { useRouter } from "next/navigation";
import CreateWallet from "@/components/CreateWallet";
import Registration from "@/components/Registration";


const LoginForm = () => {
	const router = useRouter();
	const [hasWallet, setHasWallet] = useState(false);


	return (
		<div className="min-h-screen flex items-center gap-8 justify-center">
		

				{hasWallet ? ( 
					// Wallet Creation Step
					<CreateWallet setHasWallet={setHasWallet} />
				) : (  
					// Registration Form
					<Registration />
			 )}  
			</div>
		
	);
};

export default LoginForm;
