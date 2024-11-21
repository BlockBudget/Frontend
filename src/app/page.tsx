"use client";
import { ConnectBtn } from "@/components/ConnectBtn";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import React from "react";
import { useUserProfile } from "../hooks/RegisteredUser";
import WhyChooseUs from "@/components/WhyChooseUs";
import StartJourney from "@/components/StartJourney";

const LandingPage = () => {
	const { userProfile, isConnected } = useUserProfile();

	return (
		<>
			<div className="text-gray-300  ">
					<Navbar />
				<div className="w-11/12 m-auto ">
					<div className="relative overflow-hidden flex flex-col justify-center items-center pt-16">
						<div className="absolute inset-0 z-0">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-full h-full"
								preserveAspectRatio="xMidYMid slice"
							>
								<defs>
									<pattern
										id="grid"
										width="40"
										height="40"
										patternUnits="userSpaceOnUse"
									>
										<path
											d="M 40 0 L 0 0 0 40"
											fill="none"
											stroke="rgba(255, 255, 255, 0.1)"
											strokeWidth="1"
										/>
									</pattern>
								</defs>
								<rect
									width="100%"
									height="100%"
									fill="url(#grid)"
									transform="rotate(30)"
								/>
							</svg>
						</div>

						<div className="z-10 w-full space-y-8">
							<div className="w-2/3">
								<p className="text-xl font-museUserProfileedium text-gray-400">
									Take Control of Your Financial Future 
								</p>

								<p className="text-5xl mb-8  font-thin text-gray-400">
									Manage, save, and grow your finances through secure,
									decentralized solutions.
								</p>
								<h1 className="text-4xl md:text-7xl font-bold text-white leading-tight">
									BlockBudget
								</h1>
							</div>
							<div>
								<img src="/image.svg" alt="image" className="relative w-full h-60" />
								<img src="/pana.svg" alt="savings" className="absolute top-0 w-1/4" />
							</div>

							<div className="grid grid-cols-3 items-center gap-6">
								{isConnected ? (
									<Link href={`${userProfile?.isRegistered ? "/dashboard" : "/register"}`} className="px-6 py-2 border text-center bg-[#410f68e1]   text-sm text-white rounded-full shadow-md ">
										{userProfile?.isRegistered ? "Continue to Dashboard" : "Get Started"}
									</Link>
								) : (
									<ConnectBtn />
								)}

								<div className="relative flex items-center justify-center w-full my-8">
									<div className="h-[1px] bg-gray-500 w-full"></div>

									<div className="absolute right-0 flex items-center justify-center w-6 h-6 bg-gray-800 border-2 border-gray-500 rounded-full">
										<div className="w-2 h-2 bg-[#FFFFFF] blur-sm rounded-full"></div>
									</div>
								</div>
								<p className="text-base font-normal text-gray-400">
									Empower your financial journey with tools for savings,
									contributions, and investments – all on a decentralized
									network you can trust.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="w-11/12 m-auto">
			<div className="min-h-screen bg-white flex items-center justify-center">
				<div className="max-w-6xl mx-auto p-8 grid lg:grid-cols-2 gap-8">
					{/* Left Section */}
					<div className="flex flex-col justify-center space-y-6">
						<h1 className="text-4xl font-bold text-gray-900">
							Securely save, manage, & save your finances with ease.
						</h1>
						<p className="text-gray-600 text-lg">
							Empower your financial journey with flexible, reliable, and secure
							savings designed for your success.
						</p>
						<div className="flex space-x-4">
							{isConnected ? (
								<Link
									href={`${
										userProfile?.isRegistered ? "/dashboard" : "/register"
									}`}
									className="px-6 py-2 border text-center bg-[#410f68e1]   text-sm text-white rounded-full shadow-md "
								>
									{userProfile?.isRegistered
										? "Continue to Dashboard"
										: "Get Started"}
								</Link>
							) : (
								<ConnectBtn />
							)}
							<button className="px-6 py-3 border border-gray-300 text-blue-600 rounded-full hover:border-blue-600 transition">
								Learn more
							</button>
						</div>
					</div>

					{/* Right Section */}
					<div className="relative">
						<div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg -z-10"></div>
						<div className="relative z-10 p-6 rounded-lg bg-white">
							<h2 className="text-xl font-bold text-gray-800">BlockBudget</h2>
							<img
								src="https://via.placeholder.com/200" // Replace this with the actual image URL or import
								alt="BlockBudget Illustration"
								className="mt-4"
							/>
						</div>
					</div>
				</div>
			</div>
			<WhyChooseUs />
			<StartJourney />
			</div>
		</>
	);
};

export default LandingPage;
