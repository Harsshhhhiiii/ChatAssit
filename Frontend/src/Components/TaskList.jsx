import { useEffect, useState } from 'react';
import { format } from 'date-fns';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/tasks');
        const data = await response.json();
        console.log('Fetched Data:', data);

        // if (!data.tasks || !Array.isArray(data.tasks)) {
        //   throw new Error('Invalid data format');
        // }

        const pending = data.tasks.Tasks.filter(task => task.status === 'pending')
                          .sort((a, b) => new Date(a.dueOn || 0) - new Date(b.dueOn || 0));
        setTasks(pending);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-4 w-full h-full flex items-center justify-center">Loading...</div>;
  if (error) return <div className="p-4 w-full h-full text-red-500 flex items-center justify-center">Error: {error}</div>;

  return (
    <div className="w-full h-full p-4 flex flex-col items-center">
      <h1 className="text-xl font-bold mb-4 w-full text-center">
        Pending Tasks ({tasks.length})
      </h1>

      {tasks.length === 0 ? (
        <div className="text-center py-4 text-green-600 w-full">
          No pending tasks!
        </div>
      ) : (
        <div className="w-full space-y-3">
          {tasks.map((task) => (
            <div key={task.id || task.taskName} className="p-4 w-full border-l-4 border-red-500 bg-white shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{task.taskName}</h3>
                <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">
                  Pending
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{task.taskDescription}</p>
              
              <div className="text-sm text-gray-500">
                <div>Due: {task.dueOn ? format(new Date(task.dueOn), 'MMM dd, yyyy') : 'No Due Date'}</div>
                <div>Assigned to: #{task.assignedTo}</div>
              </div>

              {task.remarks && (
                <div className="mt-2 text-sm text-red-600">
                  Note: {task.remarks}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
