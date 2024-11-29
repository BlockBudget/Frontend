"use client";
import { ConnectBtn } from "@/components/ConnectBtn";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import React, { useEffect } from "react";
import { useUserProfile } from "../hooks/RegisteredUser";
import WhyChooseUs from "@/components/WhyChooseUs";
import StartJourney from "@/components/StartJourney";
import Footer from "@/components/Footer";

const LandingPage = () => {
	const { userProfile, isConnected } = useUserProfile();
	

	return (
		<>
			<div className="text-gray-300  ">
				<Navbar />
				<div className="w-11/12 m-auto ">
					<div className="relative overflow-hidden flex flex-col justify-center items-center pt-16">
						<div className="z-10 w-full space-y-8">
							<div className="w-1/2">
								<h1 className="text-3xl font-semibold text-gray-900">
									Securely save, manage, & save your finances with ease.
								</h1>
								<p className="text-gray-600 text-lg">
									Empower your financial journey with flexible, reliable, and
									secure savings designed for your success.
								</p>
							</div>
							<div className="bg-[url('/image.svg')] bg-[#003ace9a] h-60 shadow-md border w-full bg-cover bg-no-repeat bg-center rounded-[12px]">
								<h1 className="text-4xl md:text-7xl font-bold text-[#FFFFFFB2] pl-10 pt-16">
									BlockBudget
								</h1>
								<img
									src="/pana.svg"
									alt="savings"
									className="absolute w-2/5 right-0 bottom-0"
								/>
							</div>

							<div className="grid  w-1/2 grid-cols-2 items-center gap-4">
								{isConnected ? (
									<Link
										href={`${
											userProfile?.isRegistered ? "/dashboard" : "/create-wallet"
										}`}
										className="px-6 py-3 border text-center bg-[#003acec2]  text-sm text-white rounded-full shadow-md "
									>
										{userProfile?.isRegistered
											? "Continue to Dashboard"
											: "Get Started"}
									</Link>
								) : (
									<ConnectBtn />
								)}

								<button className="px-6 py-3 border border-gray-300 text-[#003ace9a] rounded-full hover:border-blue-600 transition">
									Learn more
								</button>
							</div>
						</div>
					</div>
					<div className="absolute right-0 top-0 w-1/2">
						<img src="/home.png" alt="" />
					</div>
				</div>
			</div>
				
				<WhyChooseUs />
				<StartJourney />
				<Footer/>
		</>
	);
};

export default LandingPage;
