import React, { useState } from "react";
import { MenuItem } from "./MenuItem";
import { useNavigate } from "react-router-dom";

const Menu = ({ menuItems }) => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate();

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    // Map menu items to routes
    const routeMap = {
      Dashboard: "/dashboard",
      Insights: "/insights",
      Tasks: "/tasks",
      Sales: "/sales"
    };
    navigate(routeMap[itemName]);
  };

  const handleLogout = () => {
    // Add any logout logic here
    navigate('/logout');
  };

  return (
    <div className="relative w-[346px] h-[813px] bg-white p-8 shadow-lg">
      <h2 className="mb-8 text-4xl font-medium font-['Darker_Grotesque']">
        Menu
      </h2>

      <div className="space-y-4">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`relative cursor-pointer transition-all duration-300 p-4 rounded-lg ${
              activeItem === item.name 
                ? "bg-[#edffc8] shadow-md"
                : "hover:bg-gray-50"
            }`}
            onClick={() => handleItemClick(item.name)}
            onMouseEnter={() => setHoveredItem(item.name)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <MenuItem 
              item={item} 
              isActive={activeItem === item.name} 
              isHovered={hoveredItem === item.name} 
            />
            {item.count > 0 && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                {item.count}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Upgrade Plan Card */}
      <div className="mt-8 p-6 bg-[#edffc9] rounded-2xl shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold">Upgrade Plan</h3>
          <button className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
            <img src="/arrow-1.svg" alt="Arrow" className="w-3 h-3" />
          </button>
        </div>
        <p className="text-sm text-gray-600">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text since the 1500s.
        </p>
      </div>

      {/* Logout Button */}
      <div className="absolute bottom-8 left-8">
        <button 
          onClick={handleLogout}
          className="text-xl font-medium text-red-600 hover:text-red-700 transition-colors"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Menu;