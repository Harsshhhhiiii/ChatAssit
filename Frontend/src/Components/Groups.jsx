import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Groups = () => {
    const [groups, setGroups] = useState([]);
    const navigate = useNavigate();
      useEffect(() => {
        const getGroups = async () => {
          const response = await fetch("https://chatassit.onrender.com/api/groups");
          const data = await response.json();
          setGroups(data.groups);
        };
        getGroups();
      }, []);
      const handleClick = (groupName) => {
        navigate(`/groups/${groupName}`);
      };
  return (
    <>
    <h2 className="font-semibold text-gray-700 mb-2">Groups</h2>
            <ul>
              {groups.map((group, i) => {
                return (
                  <div onClick={() => handleClick(group)} key={i}>
                    <li className="p-2 bg-red-100 rounded-md mb-1 cursor-pointer hover:bg-red-200">{group}</li>
                  </div>
                );
              })}
            </ul>
    </>
  )
}

export default Groups