import React, { useState, useEffect } from 'react';
import Header from './HomePageComponents/Header';

const Full_Tasks = () => {
    const [tasks, setTasks] = useState([]);
    
    useEffect(() => {
        const getTasks = async () => {
            const response = await fetch("https://chatassit.onrender.com/api/tasks");
            const data = await response.json();
            console.log(data.tasks.Tasks)
            const taskArray = data.tasks.Tasks.filter((e) => e.assignedTo == 101);
            setTasks(taskArray);
        };
        getTasks();
    }, []);

    return (
        <div className="min-h-screen bg-[#f5f5f5]">
            <Header />
            
            <div className="p-8 max-w-6xl mx-auto">
                {/* Page Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Tasks</h1>
                    <button className="bg-[#edffc8] hover:bg-[#d8e9b5] text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-200">
                        + New Task
                    </button>
                </div>

                {/* Task Filters */}
                <div className="flex space-x-4 mb-6">
                    <button className="px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50">
                        All Tasks
                    </button>
                    <button className="px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50">
                        Active
                    </button>
                    <button className="px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50">
                        Completed
                    </button>
                    <button className="px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50">
                        Overdue
                    </button>
                </div>

                {/* Task List */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="grid grid-cols-12 bg-gray-50 p-4 border-b border-gray-200">
                        <div className="col-span-6 font-medium text-gray-600">Task Name</div>
                        <div className="col-span-2 font-medium text-gray-600">Due Date</div>
                        <div className="col-span-2 font-medium text-gray-600">Status</div>
                        <div className="col-span-2 font-medium text-gray-600">Actions</div>
                    </div>
                    
                    {tasks.length > 0 ? (
                        tasks.map((task, i) => (
                            <div key={i} className="grid grid-cols-12 p-4 border-b border-gray-100 hover:bg-gray-50 transition duration-150">
                                <div className="col-span-6 flex items-center">
                                    <input type="checkbox" className="mr-3 h-5 w-5 rounded border-gray-300" />
                                    <span className="font-medium">{task.taskName}</span>
                                </div>
                                <div className="col-span-2 text-gray-600">May 15, 2023</div>
                                <div className="col-span-2">
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#edffc8] text-gray-800">
                                        In Progress
                                    </span>
                                </div>
                                <div className="col-span-2 flex space-x-2">
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                        </svg>
                                    </button>
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            No tasks found. Create a new task to get started!
                        </div>
                    )}
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-3 gap-6 mt-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-gray-500 text-sm font-medium mb-1">Total Tasks</h3>
                        <p className="text-2xl font-bold text-gray-800">{tasks.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-gray-500 text-sm font-medium mb-1">Completed</h3>
                        <p className="text-2xl font-bold text-gray-800">0</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-gray-500 text-sm font-medium mb-1">Overdue</h3>
                        <p className="text-2xl font-bold text-gray-800">0</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Full_Tasks;