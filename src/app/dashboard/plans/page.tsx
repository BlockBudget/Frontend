import { Vault } from "lucide-react";
import Link from "next/link";
import React from "react";

const SavingsOptions = () => {
  return (
    <>
    
    <div className="flex justify-end w-11/12 mb-3 m-auto">
				<Link href="/dashboard" className=" flex space-x-2">
					<Vault className="text-white " size={20} />{" "}
					<span className="text-white font-montserrat font-semibold text-base">
						Savings
					</span>
				</Link>
			</div>
    
    <div className="flex flex-col items-center justify-center min-h-[85vh]  text-white">
      <div className="flex flex-col items-center w-full">

      <h1 className="text-lg font-normal mb-9">Please select a savings type</h1>
      <div className="grid grid-cols-2 w-3/4 m-auto gap-6">
        {/* Option 1 */}
        <Link href="/dashboard/create-locked-savings" className="flex bg-[#00000052] border-2 border-borderColor  items-center justify-center h-44 hover:bg-[#0f0f0f52] rounded-[30px] shadow-lg transition-all cursor-pointer">
          <p className="font-semibold text-lg">Create new saving</p>
        </Link>

        {/* Option 2 */}
        <Link href="/dashboard/create-locked-savings"  className="flex bg-[#00000052] border-2 border-borderColor  items-center justify-center h-44  hover:bg-[#0f0f0f52] rounded-[30px] shadow-lg transition-all cursor-pointer">
          <p className="font-semibold text-lg">Create new Locked saving</p>
        </Link>
      </div>
      </div>
    </div>
    </>
  );
};

export default SavingsOptions;
