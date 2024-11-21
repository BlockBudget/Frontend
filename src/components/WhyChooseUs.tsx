import { PiggyBank } from "lucide-react";

const WhyChooseUs = () => {
	return (
		<div className=" py-10">
			{/* Why Choose Us Section */}
			<section className="max-w-7xl mx-auto mb-16">
				<h2 className="text-3xl font-medium text-gray-900 mb-3">
					Why Choose Us
				</h2>
				<p className="text-gray-600 text-lg mb-12">
					We offer everything you need to take control of your financial future.
				</p>
				<div className="grid md:grid-cols-5 text-center gap-4">
					<div className="px-3 py-5 border col-span-1 rounded-lg  shadow-md hover:shadow-lg space-y-4 transition">
						<div className="flex items-center justify-center mb-12 m-auto w-[40px] h-[40px] rounded-full bg-[#0039CE] shadow-sm">
							<PiggyBank className="text-white" />
						</div>
						<h3 className="text-xl font-semibold text-gray-800 mb-2">
							Flexibility
						</h3>
						<p className="text-gray-600">
							Save and grow your finances the way you want.
						</p>
					</div>
					<div className="px-3 py-5 border rounded-lg col-span-1 shadow-md hover:shadow-lg space-y-4 transition">
						<div className="flex items-center justify-center mb-12 m-auto w-[40px] h-[40px] rounded-full bg-[#0039CE] shadow-sm">
							<PiggyBank className="text-white" />
						</div>
						<h3 className="text-xl font-semibold text-gray-800 mb-2">
							Reliability
						</h3>
						<p className="text-gray-600">
							Count on our secure platform to keep your funds safe and growing.
						</p>
					</div>
					<div className="px-3 py-5 border rounded-lg col-span-1 shadow-md hover:shadow-lg space-y-4 transition">
						<div className="flex items-center justify-center m-auto w-[40px] mb-12 h-[40px] rounded-full bg-[#0039CE] shadow-sm">
							<PiggyBank className="text-white" />
						</div>
						<h3 className="text-xl font-semibold text-gray-800 mb-2">
							Security
						</h3>
						<p className="text-gray-600">
							Our top-notch security ensures your savings are always protected.
						</p>
					</div>
					{/* Gradient Image */}
          <div className="col-span-2 rounded-lg relative">

					<img src="/side.png" alt="side" className="object-cover absolute w-full h-full" />
          </div>
				</div>
			</section>

			{/* How It Works Section */}
			<section className="max-w-7xl mx-auto">
      <h2 className="text-3xl capitalize font-medium text-gray-900 mb-3">
					How it works
				</h2>
				<p className="text-gray-600 text-lg mb-12">
        A simple, step-by-step process to start saving securely.
				</p>
				<div className="grid lg:grid-cols-5 gap-12">
					{/* Illustration */}
					<div className="flex col-span-2 items-center justify-center">
						<img
							src="/rafiki.svg" 
							alt="How It Works Illustration"
							className="w-full max-w-2xl"
						/>
					</div>
					{/* Steps */}
					<div className="space-y-8 col-span-3">
						{[
							{
								step: "Step 1",
								title: "Connect Your Account",
								description: "Link your bank or crypto wallet to the platform.",
							},
							{
								step: "Step 2",
								title: "Set Your Savings Goal",
								description:
									"Define your savings target and timeline to get started.",
							},
							{
								step: "Step 3",
								title: "Start Saving & Contributing",
								description:
									"Make monthly contributions easily through a secure payment system.",
							},
							{
								step: "Step 4",
								title: "Watch Your Savings Grow",
								description: "Monitor your savings progress in real-time.",
							},
						].map((item, index) => (
							<div key={index} className="flex items-start gap-4">
								<div className="flex items-center justify-center  w-12 h-12 bg-blue-600 text-white font-bold rounded-full">
									{index + 1}
								</div>
								<div className="bg-[#FFFFFF] p-2 shadow-md border rounded-lg hover:shadow-lg w-4/5">
                <h5 className="text-[#263238] text-sm font-medium">Step {index + 1}</h5>
									<h3 className="text-lg font-semibold text-gray-800">
										{item.title}
									</h3>
									<p className="text-gray-600 text-sm font-medium">{item.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
};

export default WhyChooseUs;
