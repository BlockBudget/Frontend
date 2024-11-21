"use client";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
	Settings,
	Inbox,
	PieChart,
	PanelRightOpen,
	PanelLeftClose,
	ChartNoAxesCombined,
	PiggyBank,
	LogOut,
	Bell,
	Users,
	Vault,
	HandCoins,
} from "lucide-react";
import Image from "next/image";
import { useUserProfile } from "../hooks/RegisteredUser";

export default function Sidebar({ isCollapsed, setIsCollapsed }: any) {
	const pathname = usePathname();
	const { userProfile } = useUserProfile();

	const navs = [
		{
			title: "Dashboard",
			icon: <ChartNoAxesCombined className="h-5 w-5" />,
			url: "/dashboard",
		},
		{
			title: "Contribution",
			icon: <HandCoins className="h-5 w-5" />,
			url: "/dashboard/contribution",
		},
		{
			title: "Plans",
			icon: <Vault className="h-5 w-5" />,
			url: "/dashboard/plans",
		},
		{
			title: "Goal Savings",
			icon: <PiggyBank className="h-5 w-5" />,
			url: "/dashboard/opened-savings",
		},
		{
			title: "Locked Savings",
			icon: <Users className="h-5 w-5" />,
			url: "/dashboard/locked-savings-details",
		},
	];

	const settings = [
		{
			title: "Settings",
			icon: <Settings className="h-5 w-5" />,
			url: "/integrations",
		},
		{
			title: "Notifications",
			icon: <Bell className="h-5 w-5" />,
			url: "#",
		},
		{
			title: "Logout",
			icon: <LogOut className="h-5 w-5" />,
			url: "/",
		},
	];

	return (
		<aside
			className={`min-h-screen ${
				isCollapsed ? "w-16" : "w-52"
			} transition-all fixed duration-300  bg-[#ffff] text-black  border-r border-[#0039CE66] py-2 px-2`}
		>
			<div className="flex justify-between items-center py-3 px-2">
				<Link
					href="/"
					className="text-base font-semibold items-center flex space-x-3 "
				>
					<img src="/Frame.png" alt="logo" className="h-8 w-8" />
					<span>{!isCollapsed && "BlockBudget"}</span>
				</Link>
				<button
					className={`absolute top-5 ${
						!isCollapsed ? "right-2" : "right-0"
					} text-gray-600`}
					onClick={() => setIsCollapsed(!isCollapsed)}
				>
					{isCollapsed ? (
						<PanelRightOpen className="-mr-3" size={20} />
					) : (
						<PanelLeftClose size={20} />
					)}
				</button>
			</div>

			<nav className="mt-2  flex flex-col justify-between h-[85vh]">
				<div className="space-y-3">
					{navs.map((nav) => {
						const isActive = pathname === nav.url;
						return (
							<Link
								href={nav.url}
								key={nav.title}
								className={`flex items-center space-x-3  py-2 ${
									isCollapsed ? "px-3" : "px-4"
								} border border-[#FFFFFF1A] font-semibold transition-colors ${
									isActive
										? "bg-gradient-to-r from-[#9C2CF3] to-[#3A6FF9] text-white"
										: "text-[#7108c2fb] bg-[#9d2cf317] hover:text-white hover:bg-gradient-to-r hover:from-[#9C2CF3] hover:to-[#3A6FF9]"
								}`}
							>
								<div>{nav.icon}</div>
								{!isCollapsed && (
									<span className="text-sm font-medium">{nav.title}</span>
								)}
							</Link>
						);
					})}
				</div>
				<div className="space-y-3">
					{settings.map((setting) => {
						const isActive = pathname === setting.url;
						return (
							<Link
								href={setting.url}
								key={setting.title}
								className={`flex items-center space-x-3 py-2 ${
									isCollapsed ? "px-3" : "px-4"
								}  border border-[#FFFFFF1A] font-semibold transition-colors ${
									isActive
										? "bg-gradient-r from-[#9C2CF3] to-[#3A6FF9] text-white"
										: "text-[#7108c2fb] bg-[#9d2cf317] hover:text-white hover:bg-gradient-r hover:from-[#9C2CF3] hover:to-[#3A6FF9]"
								}`}
							>
								<div>{setting.icon}</div>
								{!isCollapsed && (
									<span className="text-sm font-medium">{setting.title}</span>
								)}
							</Link>
						);
					})}
					<div className="mt-4 cursor-pointer flex gap-3 items-center ">
						<img
							src="/user10.jpg"
							alt="user icon"
							className="object-cover rounded-full h-7 w-7"
						/>
						{!isCollapsed && (
							<span className="text-sm overflow-hidden text-ellipsis font-medium">
								{userProfile?.userAddress}
							</span>
						)}
					</div>
				</div>
			</nav>
		</aside>
	);
}
