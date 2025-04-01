import React from "react";
import { Badge } from "../ui/badge";
import { useAuthContext } from "../../context/AuthContext";

const Header = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="flex w-full items-center justify-between px-8 py-4">
      {/* Left Section */}
      <div className="flex items-center gap-6">
        <img
          className="w-16 h-16 object-cover"
          alt="Memoji of a man"
          src="/memoji-of-a-man-.svg"
        />
        <div className="flex flex-col">
          <h1 className="text-4xl font-medium [font-family:'Darker_Grotesque'] tracking-[-1.2px]">
            Good Morning, {authUser.username}
          </h1>
          <p className="text-xl text-[#a0a0a0] [font-family:'Lexend'] font-light mt-1">
            Hope your day goes organised !
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Icons Container */}
        <div className="flex items-center gap-2 relative">
          <div className="flex gap-1">
            <img
              className="w-8 h-8 object-cover"
              alt="Image of a house"
              src="/image-of-a-house-.svg"
            />
            <img
              className="w-8 h-8 object-cover"
              alt="Image of an office"
              src="/image-of-an-office.svg"
            />
            <img
              className="w-8 h-8 object-cover"
              alt="Image of people"
              src="/image-of-people-shaking-hands-.svg"
            />
            <img
              className="w-8 h-8 object-cover"
              alt="Image of superheroes"
              src="/image-of-superheroes-.svg"
            />
          </div>
          <span className="text-xl ml-2">...</span>
        </div>

        {/* Messages Badge */}
        <div className="flex flex-col items-end">
          <Badge className="bg-white border-[#dfdfdf] hover:bg-white px-2 py-1">
            <span className="text-base font-medium">@ 23</span>
          </Badge>
          <p className="text-right text-sm mt-1 [font-family:'Darker_Grotesque']">
            You have received{' '}
            <span className="text-[#e63946]">132</span> messages<br />
            since you last logged in
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;