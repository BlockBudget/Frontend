import React from "react";

const Footer = () => {
	return (
		<>
			<div>
				<footer className="bg-dark text-white py-4">
                    <div className="bg-[url('/image.svg')] bg-[#003acec2]  flex justify-center items-center h-20 shadow-md w-full bg-cover bg-no-repeat bg-center">
                    <h1 className="text-xl md:text-4xl font-bold text-[#FFFFFFB2]  text-center ">
									BlockBudget
								</h1>
                    </div>
					<div className="container">
						<div className="row">
							<div className="col-md-6">
								<h5>About Us</h5>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
									euismod, nisl nec ultricies lacinia, nunc nisl aliquet nunc,
									vitae aliquam nisl nunc sit amet lorem.
								</p>
							</div>
						</div>
					</div>
				</footer>
			</div>
		</>
	);
};

export default Footer;
