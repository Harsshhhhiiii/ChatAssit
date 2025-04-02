import React from 'react'
import { FiLogOut } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
    const navigate = useNavigate();
  return (
    <>
      <aside className="w-1/5 bg-white shadow-md p-6 rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-700">Menu</h2>
          <FiLogOut
            className="text-red-500 text-2xl cursor-pointer hover:text-red-700"
            onClick={() => navigate("/logout")}
          />
        </div>
        <ul className="space-y-4">
          <li className="p-3 rounded-lg cursor-pointer bg-green-100 text-green-700 font-semibold">Dashboard</li>
          <li className="p-3 cursor-pointer hover:bg-gray-200 rounded-lg">Insights</li>
          <li className="p-3 cursor-pointer hover:bg-gray-200 rounded-lg">Tasks</li>
          <li className="p-3 cursor-pointer hover:bg-gray-200 rounded-lg">Sales</li>
        </ul>
      </aside>
    </>
  )
}

export default SideBar