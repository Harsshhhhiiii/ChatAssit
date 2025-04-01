import React from "react";

export const EscalationItem = ({ escalation }) => {
  return (
    <div className="relative h-[65px] w-full mb-4 last:mb-0">
      {/* Background */}
      <div
        className={`absolute inset-0 rounded ${
          escalation.isUrgent ? "bg-[#e639463d]" : "bg-[#f3f3f3]"
        }`}
      />
      
      {/* Content */}
      <div className="relative p-3 h-full flex items-start gap-2">
        {/* User Info */}
        <div className="flex gap-2">
          <img
            className="w-3.5 h-3.5 mt-[2px]"
            alt="User avatar"
            src={escalation.userIcon}
          />
          <div>
            <div className="[font-family:'Darker_Grotesque'] font-medium text-black text-xl tracking-[-0.6px]">
              {escalation.title}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="[font-family:'Darker_Grotesque'] font-medium text-[11px] text-[#a6a6a6] tracking-[-0.33px] underline">
                {escalation.group}
              </span>
              <span className="[font-family:'Darker_Grotesque'] text-[11px] tracking-[-0.33px]">
                {escalation.user}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};