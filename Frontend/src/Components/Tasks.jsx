import React, { useState ,useEffect} from 'react'

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        const getTasks = async () => {
            const response = await fetch("http://localhost:3001/api/tasks");
            const data = await response.json();
            console.log(data.tasks.Tasks)
            const taskArray = data.tasks.Tasks.filter((e) => e.assignedTo == 101);
            
            setTasks(taskArray);
          };
          getTasks();
          }, []);
  return (
    <>
    <h2 className="font-semibold text-gray-700 mb-2">Tasks</h2>
            <ul>
              {tasks.map((task, i) => {
                return (
                  <li className="p-2 bg-gray-100 rounded-md mb-1" key={i}>
                    {task.taskName}
                  </li>
                );
              })}
            </ul>
    </>
  )
}

export default Tasks