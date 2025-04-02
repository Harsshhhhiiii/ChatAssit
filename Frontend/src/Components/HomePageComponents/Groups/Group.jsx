// Groups.js
import React, { useEffect, useState } from "react";
import { GroupItem } from "./GroupItem";
import { useNavigate } from 'react-router-dom';
const Groups = () => {
  const navigate=useNavigate()
  const [activeGroup, setActiveGroup] = useState(null);
  const [groups,setGroups]=useState([])
  const handleGroupClick = (group) => {
    setActiveGroup(group.name === activeGroup ? null : group.name);
    navigate(`/groups/${group.name}`);
  };
  useEffect(() => {
          const getGroups = async () => {
            const response = await fetch("https://chatassit.onrender.com/api/groups");
            const data = await response.json();
            console.log(data)
            setGroups(data.groups);
          };
          
          getGroups();
}, []);
    const handleClick = (groupName) => {
          navigate(`/groups/${groupName}`);
        };
  return (
    <div className="relative p-6">
      <h2 className="mb-6 [font-family:'Darker_Grotesque',Helvetica] font-medium text-black text-4xl tracking-[-1.08px] leading-[normal]">
        Groups
      </h2>

      <div className="space-y-2">
        {groups.map((group, index) => (
          <GroupItem
            key={index}
            group={group}
            index={index}
            isActive={group.name === activeGroup}
            onClick={() => handleGroupClick(group) && handleClick(group)}
          />
        ))}
      </div>
    </div>
  );
};

export default Groups;