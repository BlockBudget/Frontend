import { useUserProfile } from "@/hooks/RegisteredUser";
import Link from "next/link";
import { ConnectBtn } from "./ConnectBtn";

const StartJourney = () => {
	const { userProfile, isConnected } = useUserProfile();
	return (
		<div className="mx-auto w-11/12 py-16">
			<div className="  grid lg:grid-cols-2 gap-12 items-center">
				<div>
					<h2 className="text-3xl font-medium text-gray-900 mb-3">
						Start Your Journey Today!
					</h2>
					<p className="text-gray-600 text-lg mb-12">
						Join thousands of satisfied users in achieving financial freedom.
					</p>
					<div className="grid grid-cols-3">
						<div className="col-span-2">
							<p className="text-gray-600 font-normal text-[15px] mb-8">
								It's time to take control of your financial future in a secure,
								simple, and innovative way to manage your savings, contribute to
								your goals, and grow your wealth. Start your journey today and
								experience a seamless, transparent, and empowering financial
								experience.
							</p>
							{isConnected ? (
								<Link
									href={`${
										userProfile?.isRegistered ? "/dashboard" : "/register"
									}`}
									className="px-6 py-3 border bg-[#003aced7]  text-sm text-white rounded-full shadow-md "
								>
									{userProfile?.isRegistered
										? "Continue to Dashboard"
										: "Get Started"}
								</Link>
							) : (
								<ConnectBtn />
							)}
						</div>
						
						<div className="col-span-1 border-b">
							<img src="/Hand.png" alt="hand" className="m-auto w-28 h-28" />
							<div className="flex gap-4">
								<img src="/piggy-bank.png" alt="hand" className="h-28 w-28" />
								<img src="/Plants.png" alt="hand" className="h-28 w-28"/>
							</div>
						</div>
					</div>
				</div>

				{/* Right Content */}
				<div className="flex items-center justify-center">
					<img src="/side.png" alt="Piggy Bank" className="w-full max-w-sm" />
				</div>
			</div>
		</div>
	);
};

export default StartJourney;
