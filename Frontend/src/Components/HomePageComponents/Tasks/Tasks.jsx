import React, { useEffect, useState } from "react";
import { TaskItem } from "./TaskItem";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
  const handleTaskClick = (task) => {
    console.log("Task clicked:", task.title);
    // Add your task click logic here
  };
  const [tasks, setTasks] = useState([]);
      useEffect(() => {
          const getTasks = async () => {
              const response = await fetch("http://localhost:3001/api/tasks");
              const data = await response.json();
              console.log(data.tasks.Tasks)
              // const taskArray = data.tasks.Tasks.filter((e) => e.assignedTo == 101);
              console.log(data.tasks.Tasks.length)
              setTasks(data.tasks.Tasks);
            };
            getTasks();
            }, []);
    const handleClick = (groupName) => {
          navigate(`/groups/${groupName}`);
        };

  return (
    <div className="p-4 h-full flex flex-col">
      <h2
        className="text-3xl mb-4 font-medium text-black"
        style={{
          fontFamily: "'Darker_Grotesque', Helvetica",
          letterSpacing: "-1.08px",
        }}
      >
        Tasks
      </h2>

      <div
        className="flex-1 overflow-y-auto pr-2 custom-scrollbar"
        style={{
          maxHeight: "calc(100% - 100px)", // Adjust based on your layout
        }}
      >
        <div className="space-y-3">
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <TaskItem
                key={index}
                task={task}
                onClick={() => handleTaskClick(task)}
              />
            ))
          ) : (
            <div className="text-gray-500 text-center py-4">
              No tasks available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
