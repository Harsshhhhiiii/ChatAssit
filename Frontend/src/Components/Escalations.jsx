import React from 'react'

const Escalations = () => {
  return (
    <>
        <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <h2 className="font-semibold text-gray-700 mb-2">Escalations ⚠️</h2>
            <ul>
              <li className="p-2 bg-red-100 rounded-md mb-1">Playground issue</li>
              <li className="p-2 bg-gray-100 rounded-md">Bug report</li>
            </ul>
          </div>
    </>
  )
}

export default Escalations