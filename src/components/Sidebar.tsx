"use client";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
	Settings,
	Home,
	Inbox,
	PieChart,
	PanelRightOpen,
	PanelLeftClose,
	Bot,
	UsersRound,
	GitMerge,
	LayoutGrid,
	PowerCircle,
} from "lucide-react";
import Image from "next/image";

export default function Sidebar({ isCollapsed, setIsCollapsed }: any) {
	const pathname = usePathname();

	const navs = [
		{
			title: "Dashboard",
			icon: <Home className="h-5 w-5" />,
			url: "/dashboard",
		},
		{
			title: "Create new savings",
			icon: <PieChart className="h-5 w-5" />,
			url: "/dashboard/create-savings",
		},
		{
			title: "Create new group",
			icon: <Inbox className="h-5 w-5" />,
			url: "/dashboard/create-locked-savings",
		},
		{
			title: "Savings",
			icon: <Bot className="h-5 w-5" />,
			url: "/dashboard/savings",
		},
		{
			title: "Groups",
			icon: <GitMerge className="h-5 w-5" />,
			url: "/flows",
		},
	];

	const settings = [
		{
			title: "Settings",
			icon: <Settings className="h-5 w-5" />,
			url: "/integrations",
		},
		{
			title: "Logout",
			icon: <PowerCircle className="h-5 w-5" />,
			url: "/settings",
		},
	];

	return (
		<aside
			className={`min-h-screen ${
				isCollapsed ? "w-16" : "w-52"
			} transition-all fixed duration-300  bg-gradient-to-r text-white from-gray-900 to-gray-800 border-r border-[#344054] py-2 px-4`}
		>
			<div className="flex justify-between items-center py-3">
				<div className="text-base font-medium flex space-x-3 ">
					{/* <Image src={Logo} alt="logo" className="h-7 w-10" /> */}
					<span>{!isCollapsed && "BlockBudget"}</span>
				</div>
				<button
					className={`absolute top-5 ${
						!isCollapsed ? "right-5" : "right-0"
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

			<nav className="mt-2 space-y-32">
				<div className="space-y-3">
					{navs.map((nav) => {
						const isActive = pathname === nav.url;
						return (
							<Link
								href={nav.url}
								key={nav.title}
								className={`flex items-center space-x-3 p-2 font-semibold  rounded-lg transition-colors ${
									isActive
										? "bg-gray-200  text-black"
										: "text-white bg-[#0E131E] hover:bg-[#F5F5F5]"
								}`}
							>
								<div className={`${isActive ? "text-black" : "text-white"}`}>
									{nav.icon}
								</div>
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
								className={`flex items-center space-x-3 p-2 font-semibold rounded-lg transition-colors ${
									isActive
										? "bg-gray-200  text-black"
										: "text-white bg-[#0E131E] hover:bg-[#F5F5F5]"
								}`}
							>
								<div
									className={`${isActive ? "text-black" : "text-white"}`}
								>
									{setting.icon}
								</div>
								{!isCollapsed && (
									<span className="text-sm font-medium">{setting.title}</span>
								)}
							</Link>
						);
					})}
				</div>
			</nav>
		</aside>
	);
}
