"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const ContributionList = () => {
	const router = useRouter();

	const contributions = [
		{
			id: 1,
			name: "December Savings",
			total: "₦632,000",
			dueDate: "Oct 4, 2024",
		},
		{
			id: 2,
			name: "January Savings",
			total: "₦500,000",
			dueDate: "Jan 10, 2025",
		},
		{
			id: 3,
			name: "February Savings",
			total: "₦450,000",
			dueDate: "Feb 15, 2025",
		},
	];

	const handleClick = (id:any) => {
		router.push(`/dashboard/contribution/${id}`);
	};

	return (
		<div className="min-h-screen  text-[#000]">
			<div className="flex justify-between mb-20">
				<h1 className="text-2xl font-bold ">All Contributions</h1>
				<Link href="/dashboard/create-contribution" className="px-6 py-2  border bg-gradient-to-r from-[#9d2cf3cc] to-[#9d2cf3a6] border-gray-500 text-sm text-white rounded-xl shadow-md ">
					Create Contribution
				</Link>
			</div>
			<div className="space-y-4">
				{contributions.map((contribution) => (
					<div
						key={contribution.id}
						
						className="flex justify-between items-center bg-[] hover:bg-[#0e131a] px-6 py-4 rounded-lg cursor-pointer shadow-md"
					>
						<div>
							<h2 className="text-lg font-semibold">{contribution.name}</h2>
							<p className="text-sm text-gray-400">
								Due: {contribution.dueDate}
							</p>
						</div>
						<div className="">
							<p>Target Savings</p>
							<span className="text-lg font-bold">{contribution.total}</span>
							</div>
						<button className="px-6 py-2  border bg-[#0E131E] border-gray-500 text-sm text-white rounded-xl shadow-md " onClick={()=>handleClick(contribution.id)}>
							view details
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default ContributionList;
