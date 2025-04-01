import React from "react";

export const MenuItem = ({ item, isActive, isHovered }) => {
  const baseClasses = "relative w-[287px] h-[43px] rounded";
  const activeClasses = "bg-[#edffc8]";
  const hoverClasses = "bg-[#f0f0f0]";

  if (item.name === "Dashboard" || isActive) {
    return (
      <div className={`${baseClasses} ${activeClasses}`}>
        <div className="absolute top-1.5 left-[41px] [font-family:'Darker_Grotesque',Helvetica] font-medium text-black text-xl tracking-[-0.60px] leading-[normal]">
          {item.name}
        </div>

        <img
          className="absolute w-[23px] h-[23px] top-[11px] left-2.5"
          alt={`Icon ${item.name.toLowerCase()}`}
          src={item.icon}
        />

        {item.count > 0 && (
          <div className="absolute w-[21px] h-[19px] top-3 left-[241px]">
            <div className="relative w-[19px] h-[19px] bg-white rounded-[9.5px] border border-solid border-[#cacaca]">
              <div className="left-1.5 absolute -top-px [font-family:'Darker_Grotesque',Helvetica] font-medium text-black text-xs tracking-[-0.36px] leading-[normal]">
                {item.count}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`${baseClasses} ${isHovered ? hoverClasses : ""}`}>
      <div
        className={`${
          item.name === "Insights"
            ? "top-0 left-[31px]"
            : item.name === "Tasks"
              ? "top-0 left-[26px]"
              : "top-0 left-[29px]"
        } text-xl tracking-[-0.60px] absolute [font-family:'Darker_Grotesque',Helvetica] font-medium text-black leading-[normal]`}
      >
        {item.name}
      </div>

      {item.name === "Sales" ? (
        <div className="absolute w-[21px] h-[21px] top-px left-0 bg-[url(/group-1.svg)] bg-[100%_100%]" />
      ) : (
        <img
          className={`absolute ${
            item.name === "Insights"
              ? "w-[23px] h-[23px] top-1 left-0"
              : "w-[15px] h-[15px] top-2 left-0"
          }`}
          alt={`Icon ${item.name.toLowerCase()}`}
          src={item.icon}
        />
      )}
    </div>
  );
};