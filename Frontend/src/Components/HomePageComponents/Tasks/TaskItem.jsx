import React from "react";

export const TaskItem = ({ task, onClick }) => {
  return (
    <div 
      className={`p-3 rounded-md cursor-pointer mb-3 ${
        task.status === "pending" ? "bg-red-400" : (task.status==="completed"?"bg-green-400":"bg-yellow-400")
      } hover:bg-opacity-80`}
      onClick={onClick}
      style={{ minHeight: "80px" }}
    >
      <div className="flex flex-col h-full justify-between">
        {/* Title row */}
        <div className="flex justify-between items-start">
          <div className="font-medium text-black text-lg truncate pr-2" style={{
            fontFamily: "'Darker_Grotesque', Helvetica",
            letterSpacing: "-0.6px",
            maxWidth: "80%"
          }}>
            {task.taskName}
          </div>
          {task.emoji && (
            <div className="text-lg" style={{
              fontFamily: "'Darker_Grotesque', Helvetica",
              letterSpacing: "-0.45px"
            }}>
              {task.emoji}
            </div>
          )}
        </div>

        {/* Bottom section */}
        <div className="flex justify-between items-end mt-2">
          <div className="text-xs underline text-[#a6a6a6]" style={{
            fontFamily: "'Darker_Grotesque', Helvetica",
            letterSpacing: "-0.33px"
          }}>
            view conversation
          </div>
          
          {/* {task.assignees.length > 0 && (
            <div className="flex space-x-1">
              {task.assignees.map((assignee, idx) => (
                <img
                  key={idx}
                  className="w-5 h-5 object-cover rounded-full border border-white"
                  alt={`Assignee ${idx + 1}`}
                  src={assignee}
                />
              ))}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};