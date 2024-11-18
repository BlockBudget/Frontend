import React from "react";
import { Command, PiggyBank, Target } from "lucide-react";


const CreateWatchlist = () => {
    return  (
		<div className="min-h-screen text-gray-300 p-6">
			<div className="max-w-6xl mx-auto">
				<div className="flex md:flex-row flex-col justify-between items-center my-10">
					<p className="text-gray-400">
						<span className="font-semibold text-white">Next payment due:</span>{" "}
						Oct 4, 2024
					</p>
					<div className="space-x-4">
						<button className="px-6 py-2 border border-gray-500 text-sm text-white rounded-xl shadow-md ">
							Pay Now
						</button>
						<button className="px-6 py-2 border border-gray-500 text-sm text-gray-300 rounded-xl hover:border-white">
							Pay All Now
						</button>
					</div>
				</div>

			
				<div className="overflow-x-auto bg-transparent flex flex-col items-center justify-center min-w-1/2">
                    <div className="flex items-center justify-between my-3 w-1/2">
						<input type="text" placeholder="Enter wallet address" className="px-6 py-2 border  border-gray-500 bg-black text-sm text-gray-500 rounded-md shadow-md w-1/2 " />
                        <button className="px-6 py-2 border border-gray-500 text-sm text-white rounded-xl shadow-md w-1/2 ">
                            Add Member
                        </button>
                    </div>
					<table className=" border-2 border-[#fff] text-sm text-left text-[#FFFFFF]">
						<thead className="bg-[#131418] text-gray-300">
							<tr>
								<th className="px-4 py-3">S/N</th>
								<th className="px-4 py-3">Address</th>
							</tr>
						</thead>
						<tbody>
							{[
								{
									id: 1,
									address: "0x6b175474e89094c44da98b954eedeac495271d0f",
                                    img:"https://avatars.dicebear.com/api/human/2.svg"
									
								},
								{
									id: 2,
									address: "0x0000000000000000000000000000000000000000",
                                    img:"https://avatars.dicebear.com/api/human/2.svg"

									
								},
								{
									id: 3,
									address: "0xdft11111111111111111111111111111111111111",
                                    img:"https://avatars.dicebear.com/api/human/2.svg"

									
								},
								{
									id: 4,
									address: "0x2222222222222222222222222222222222222222",
                                    img:"https://avatars.dicebear.com/api/human/2.svg"

								},
								{
									id: 5,
									address: "0x3333333333333333333333333333333333333333",
                                    img:"https://avatars.dicebear.com/api/human/2.svg"

									
								},
								{
									id: 6,
									address: "0x4444444444444444444444444444444444444444",
                                    img:"https://avatars.dicebear.com/api/human/2.svg"

									
								},
							].map((item) => (
								<tr
									key={item.id}
									className="border-t border-[#EAECF0] bg-transparent hover:bg-[#2D3748]"
								>
									<td className="px-4 py-3">{item.id}</td>
									<td className="px-4 py-3 flex items-center gap-1">
                                        <img src={item.img} className="rounded-full" alt="User avatar" height={20} width={20} /> 
                                        {item.address}
                                    </td>
									
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default CreateWatchlist;