import React from "react";
import Avatar from "@/components/Avatar";

function CreateLockedSavings() {
    return(
        <>
            <div className="avatar  flex items-center ml-5">
                <div className="avatar-main">
                <Avatar src="/avatar.svg" alt="User avatar" size={50} />
                </div>
                <div className="greet-and-name ml-5 flex justify-between flex-col">
                    <p className="greeting text-white p-2 font-montserrat">Welcome Back!</p>
                    <p className="name text-white p-2 font-extrabold">Jerome Bell</p>
                </div>
            </div>
            <div className="contribution-table flex flex-col">
                <div className="contribution-header text-center">
                    <p className="name text-white p-2 mb-5 font-bold">My locked savings</p>
                </div>
                
                <table className="mx-10">
                <thead>
					<tr className="bg-black">
						<th className="border-none pl-2 py-2 text-white text-left">S/N</th>
						<th className="border-none py-2 text-white text-left">Saving name</th>
						<th className="border-none py-2 text-white text-left">Target Amount</th>
						<th className="border-none py-2 text-white text-left">Close Date</th>
					</tr>
				</thead>
                <tbody>
                        <tr>
						  <td className="border-l-0 pl-2 border-r-0 border  py-2 text-gray-500">1</td>
						  <td className="border-l-0 border-r-0 border  py-2 text-white">December Savings</td>
						  <td className="border-l-0 border-r-0 border  py-2 text-white">N10,000</td>
						  <td className="border-l-0 border-r-0 border  py-2 text-white">Oct 24, 2024</td>
						</tr>
                        <tr>
						  <td className="border-l-0 pl-2 border-r-0 border py-2 text-gray-500">2</td>
						  <td className="border-l-0 border-r-0 border py-2 text-white">December Savings</td>
						  <td className="border-l-0 border-r-0 border py-2 text-white">N10,000</td>
						  <td className="border-l-0 border-r-0 border py-2 text-white">Oct 24, 2024</td>
						</tr>
                </tbody>
                </table>
            </div>
        </>
    )
}

export default CreateLockedSavings