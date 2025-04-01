// GroupItem.js
import React from "react";

export const GroupItem = ({ group, index, isActive, onClick }) => {
  return (
    <div 
      className={`group-item-container relative mb-4 pl-12 pr-4 py-2 rounded-md cursor-pointer transition-colors ${
        isActive ? "bg-[#e639463d]" : "hover:bg-gray-100"
      }`}
      onClick={onClick}
    >
      {/* Group Icon */}
      <img
        className="absolute w-8 h-8 left-3 top-2 object-cover rounded-full"
        alt={`Image of ${group.name}`}
        src={group.icon}
      />

      {/* Group Name */}
      <div className="group-name text-lg font-medium text-black flex items-center justify-between">
        {group.name}
        
        {/* Group Count */}
        <div className="ml-2 w-5 h-5 flex items-center justify-center bg-white rounded-full border border-solid border-[#cacaca]">
          <span className="text-xs font-medium text-black">
            {group.count}
          </span>
        </div>
      </div>
    </div>
  );
};