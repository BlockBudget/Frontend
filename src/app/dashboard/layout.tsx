"use client"
import {Navbar2} from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
	return (
		<div className="flex font-montserrat h-screen gap-6">
			<Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
			<div className={`${isCollapsed ? "ml-20 w-11/12 m-auto" : "ml-56 w-4/5 m-auto"} flex flex-col `}>
				<Navbar2 />
				{children}
			</div>
		</div>
	);
};

export default RootLayout;
