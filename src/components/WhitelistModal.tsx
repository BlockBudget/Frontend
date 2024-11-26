import { Plus, X } from "lucide-react";
import React, { useState } from "react";

const WhitelistModal = ({ setIsModalOpen, handleAddUsers }:any) => {
  const [addresses, setAddresses] = useState([""]); 

  const handleAddInput = () => {
    setAddresses([...addresses, ""]); 
  };

  const handleInputChange = (index:any, value:any) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index] = value; 
    setAddresses(updatedAddresses);
  };

  const handleRemoveInput = (index:any) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white border border-gray-500 space-y-5 p-6 rounded-lg shadow-lg max-w-lg w-full text-black">
      <h2 className="text-lg font-semibold mb-4">Whitelist User Addresses</h2>

      <div className="space-y-3">
        {addresses.map((address, index) => (
          <div key={index} className="flex items-center gap-3">
            <input
              type="text"
              placeholder={`Enter address #${index + 1}`}
              value={address}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="w-full px-6 py-1 border border-black  text-sm text-gray-500 rounded-md shadow-md"
            />
            {index === addresses.length - 1 ? (
              <button
                onClick={handleAddInput}
                className="px-1 py-1 border font-semibold border-black text-black rounded-md "
              >
                <Plus size={20}/>
              </button>
            ) : (
              <button
                onClick={() => handleRemoveInput(index)}
                className="px-1 py-1 border border-gray-500 font-semibold bg-[#1047bd] text-white rounded-md hover:bg-gray-800"
              >
                <X size={20}/>
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-4">
        <button
          onClick={() => setIsModalOpen(false)}
          className="px-4 py-2 bg-[#003ace88] hover:bg-gradient-to-r hover:from-[#003aceaf] hover:to-[#003ace77] rounded-lg text-sm hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          onClick={() => handleAddUsers(addresses)}
          className="px-6 py-2 bg-[#0039CE1A] hover:bg-gradient-to-r hover:from-[#003aceaf] hover:to-[#003ace77] text-sm text-black rounded-xl shadow-md"
        >
          Add Users
        </button>
      </div>
    </div>
  </div>
  );
};

export default WhitelistModal;
