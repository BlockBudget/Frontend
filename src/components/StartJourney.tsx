import { useUserProfile } from "@/hooks/RegisteredUser";
import Link from "next/link";
import { ConnectBtn } from "./ConnectBtn";

const StartJourney = () => {
	const { userProfile, isConnected } = useUserProfile();
	return (
		<div className=" py-16">
			<div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
				<div>
					<h2 className="text-3xl font-medium text-gray-900 mb-3">
						Start Your Journey Today!
					</h2>
					<p className="text-gray-600 text-lg mb-12">
						Join thousands of satisfied users in achieving financial freedom.
					</p>

					<p className="text-gray-600 mb-8">
						It's time to take control of your financial future in a secure,
						simple, and innovative way to manage your savings, contribute to
						your goals, and grow your wealth. Start your journey today and
						experience a seamless, transparent, and empowering financial
						experience.
					</p>
					{isConnected ? (
						<Link
							href={`${userProfile?.isRegistered ? "/dashboard" : "/register"}`}
							className="px-6 py-2 border text-center bg-[#410f68e1]   text-sm text-white rounded-full shadow-md "
						>
							{userProfile?.isRegistered
								? "Continue to Dashboard"
								: "Get Started"}
						</Link>
					) : (
						<ConnectBtn />
					)}
				</div>

				{/* Right Content */}
				<div className="flex items-center justify-center">
						<img
							src="/side.png"
							alt="Piggy Bank"
							className="w-full max-w-sm"
						/>
					
				</div>
			</div>
		</div>
	);
};

export default StartJourney;
