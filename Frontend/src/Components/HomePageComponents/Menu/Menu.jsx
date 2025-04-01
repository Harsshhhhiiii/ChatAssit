import React, { useState } from "react";
import { MenuItem } from "./MenuItem";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Menu = ({ menuItems }) => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogout = () => {
    // You can add any logout logic here before redirecting
    // For example, clearing user session, tokens, etc.
    
    // Then redirect to the logout route
    navigate('/logout'); // Change this to your actual logout route
  };

  return (
    <div className="relative w-[346px] h-[813px]">
      <h2 className="absolute top-[33px] left-[37px] [font-family:'Darker_Grotesque',Helvetica] font-medium text-black text-4xl tracking-[-1.08px] leading-[normal]">
        Menu
      </h2>

      <img
        className="absolute w-[19px] h-[17px] top-[53px] left-[293px]"
        alt="Collapse button"
        src="/collapse-button.png"
      />

      {menuItems.map((item, index) => (
        <div
          key={index}
          className={`absolute w-[289px] h-[43px] ${
            activeItem === item.name
              ? "top-[105px] left-7 bg-[#edffc8] rounded"
              : "bg-transparent"
          }`}
          style={{
            top: `${105 + index * 58}px`,
            left: "28px",
            backgroundColor: hoveredItem === item.name ? "#f0f0f0" : activeItem === item.name ? "#edffc8" : "transparent",
            borderRadius: "4px",
            transition: "background-color 0.2s ease",
            cursor: "pointer"
          }}
          onClick={() => setActiveItem(item.name)}
          onMouseEnter={() => setHoveredItem(item.name)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <MenuItem item={item} isActive={activeItem === item.name} isHovered={hoveredItem === item.name} />
        </div>
      ))}

      {/* Upgrade Plan Card */}
      <div className="absolute w-[291px] h-[148px] top-[503px] left-7">
        <div className="relative w-[287px] h-[148px] bg-[#edffc9] rounded-[20px]">
          <div className="absolute top-[15px] left-[23px] [font-family:'Darker_Grotesque',Helvetica] font-semibold text-black text-xl tracking-[-0.60px] leading-[normal]">
            Upgrade Plan
          </div>

          <p className="absolute w-[195px] top-[52px] left-[23px] [font-family:'Lexend',Helvetica] font-light text-black text-xs tracking-[0] leading-[normal]">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&#39;s standard dummy text
            ever since the 1500s.
          </p>

          <div className="absolute w-[31px] h-[31px] top-[15px] left-32 bg-white rounded-[15.5px] border border-solid border-[#dedede]">
            <img
              className="absolute w-[13px] h-[13px] top-[9px] left-[9px]"
              alt="Arrow"
              src="/arrow-1.svg"
            />
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="absolute w-[60px] h-[73px] top-[689px] left-[67px]">
        <div 
          className="absolute top-[46px] left-0 [font-family:'Darker_Grotesque',Helvetica] font-medium text-[#e63946] text-xl tracking-[-0.60px] leading-[normal] hover:underline cursor-pointer"
          onClick={handleLogout}
        >
          Log Out
        </div>
      </div>
    </div>
  );
};

export default Menu;