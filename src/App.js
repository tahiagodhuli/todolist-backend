// import React, { useState, useEffect } from 'react';

// function App() {
//     const [tasks, setTasks] = useState([]); // State for tasks
//     const [newTask, setNewTask] = useState(''); // State for new task input
//     const [isAdding, setIsAdding] = useState(false); // Track if a task is being added
//     const [error, setError] = useState(null); // State for handling errors

//     // Fetch tasks from the backend
//     useEffect(() => {
//         setError(null); // Reset error state on every mount
//         fetch('https://todolist-backend-8g7f.onrender.com/tasks')
//             .then((response) => {
//                 console.log('Response Status:', response.status); // Log status code
//                 if (!response.ok) {
//                     throw new Error('Failed to load tasks');
//                 }
//                 return response.json();
//             })
//             .then((data) => setTasks(data))
//             .catch((error) => {
//                 console.error('Error fetching tasks:', error);
//                 setError('Failed to load tasks. Please try again later.');
//             });
//     }, []);

    // // Add a new task
    // const addTask = () => {
    //     if (newTask.trim() !== '') {
    //         console.log('Adding task:', newTask); // Log task being added
    //         setIsAdding(true); // Disable add button during request
    //         fetch('https://todolist-backend-8g7f.onrender.com/tasks', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ text: newTask }), // Send task text to backend
    //         })
    //             .then((response) => response.json())
    //             .then((task) => {
    //                 console.log('Task added:', task); // Log added task
    //                 setTasks([...tasks, task]); // Add task to the task list
    //                 setNewTask(''); // Clear input field
    //                 setIsAdding(false); // Enable the button
    //             })
    //             .catch((error) => {
    //                 console.error('Error adding task:', error);
    //                 setError('Failed to add task. Please try again later.');
    //                 setIsAdding(false); // Enable button after error
    //             });
    //     }
    // };

//     // Delete a task
//     const deleteTask = (id) => {
//         fetch(`https://todolist-backend-8g7f.onrender.com/tasks/${id}`, { method: 'DELETE' })
//             .then(() => setTasks(tasks.filter((task) => task._id !== id))) // Remove task from the list
//             .catch((error) => {
//                 console.error('Error deleting task:', error);
//                 setError('Failed to delete task. Please try again later.');
//             });
//     };

//     // Toggle task completion
//     const toggleTaskCompletion = (id, completed) => {
//         fetch(`https://todolist-backend-8g7f.onrender.com/tasks/${id}`, {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ completed: !completed }), // Toggle completion
//         })
//             .then((response) => response.json())
//             .then((updatedTask) => {
//                 setTasks(
//                     tasks.map((task) =>
//                         task._id === id ? { ...task, completed: updatedTask.completed } : task
//                     )
//                 );
//             })
//             .catch((error) => console.error('Error updating task:', error));
//     };

//     return (
//         <div style={{ textAlign: 'center', marginTop: '50px' }}>
//             <h1>My To-Do List</h1>
//             {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error message */}
//             <div>
//                 <input
//                     type="text"
//                     placeholder="Enter a new task"
//                     value={newTask}
//                     onChange={(e) => setNewTask(e.target.value)}
//                 />
//                 <button onClick={addTask} disabled={isAdding}>
//                     {isAdding ? 'Adding...' : 'Add Task'}
//                 </button>
//             </div>
//             <ul>
//                 {tasks.map((task) => (
//                     <li key={task._id}>
//                         <span
//                             style={{
//                                 textDecoration: task.completed ? 'line-through' : 'none',
//                                 cursor: 'pointer',
//                             }}
//                             onClick={() => toggleTaskCompletion(task._id, task.completed)}
//                         >
//                             {task.text}
//                         </span>
//                         <button onClick={() => deleteTask(task._id)}>Delete</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default App;







import React, { useState, useEffect, useMemo } from 'react';

function App() {
    const [tasks, setTasks] = useState([]); // State for tasks
    const [newTask, setNewTask] = useState(''); // State for new task input
    const [isAdding, setIsAdding] = useState(false); // Track if a task is being added
    const [error, setError] = useState(null); // State for handling errors

    // Memoize the API Endpoints to avoid unnecessary re-renders
    const API_BASE_URL = 'https://todolist-backend-8g7f.onrender.com/tasks';
    const ENDPOINTS = useMemo(() => ({
        getAllTasks: `${API_BASE_URL}/get`, // Get all tasks
        addTask: `${API_BASE_URL}/save`, // Add new task
        updateTask: `${API_BASE_URL}/update`, // Update task
        deleteTask: `${API_BASE_URL}/delete`, // Delete task
    }), []); // Only create this once on initial render

    // Fetch tasks from the backend
    useEffect(() => {
        setError(null); // Reset error state on every mount
        fetch(ENDPOINTS.getAllTasks)
            .then((response) => {
                console.log('Response Status:', response.status); // Log status code
                if (!response.ok) {
                    throw new Error('Failed to load tasks');
                }
                return response.json();
            })
            .then((data) => setTasks(data))
            .catch((error) => {
                console.error('Error fetching tasks:', error);
                setError('');
            });
    }, [ENDPOINTS.getAllTasks]); // Use memoized ENDPOINTS.getAllTasks in the dependency array


    //add
const addTask = () => {
    if (newTask.trim() !== '') {
        console.log('Adding task:', newTask); // Log task being added
        setIsAdding(true); // Disable add button during request
        
        // Log the request payload
        console.log('Sending payload:', { text: newTask });

        fetch('https://todolist-backend-8g7f.onrender.com/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: newTask }), // Send task text to backend
        })
            .then((response) => {
                console.log('Response Status:', response.status); // Log status code
                return response.json();
            })
            .then((task) => {
                console.log('Task added:', task); // Log added task
                setTasks([...tasks, task]); // Add task to the task list
                setNewTask(''); // Clear input field
                setIsAdding(false); // Enable the button
            })
            .catch((error) => {
                console.error('Error adding task:', error);
                setError('Failed to add task. Please try again later.');
                setIsAdding(false); // Enable button after error
            });
    }
};

    
    

    // Delete a task
    const deleteTask = (id) => {
        fetch(`${ENDPOINTS.deleteTask}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        })
            .then(() => setTasks(tasks.filter((task) => task._id !== id))) // Remove task from the list
            .catch((error) => {
                console.error('Error deleting task:', error);
                setError('Failed to delete task. Please try again later.');
            });
    };

    // Toggle task completion
    const toggleTaskCompletion = (id, completed) => {
        fetch(`${ENDPOINTS.updateTask}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, completed: !completed }), // Toggle completion
        })
            .then((response) => response.json())
            .then((updatedTask) => {
                setTasks(
                    tasks.map((task) =>
                        task._id === id ? { ...task, completed: updatedTask.completed } : task
                    )
                );
            })
            .catch((error) => console.error('Error updating task:', error));
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>My To-Do List</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error message */}
            <div>
                <input
                    type="text"
                    placeholder="Enter a new task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button onClick={addTask} disabled={isAdding}>
                    {isAdding ? 'Adding...' : 'Add Task'}
                </button>
            </div>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        <span
                            style={{
                                textDecoration: task.completed ? 'line-through' : 'none',
                                cursor: 'pointer',
                            }}
                            onClick={() => toggleTaskCompletion(task._id, task.completed)}
                        >
                            {task.text}
                        </span>
                        <button onClick={() => deleteTask(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>
            
            {/* Display the Endpoint Links */}
            <div>
                <h3>API Endpoints:</h3>
                <ul>
                    <li><strong>Get All Tasks</strong>: <a href={ENDPOINTS.getAllTasks} target="_blank" rel="noopener noreferrer">{ENDPOINTS.getAllTasks}</a></li>
                    <li><strong>Add Task</strong>: <a href={ENDPOINTS.addTask} target="_blank" rel="noopener noreferrer">{ENDPOINTS.addTask}</a></li>
                    <li><strong>Update Task</strong>: <a href={ENDPOINTS.updateTask} target="_blank" rel="noopener noreferrer">{ENDPOINTS.updateTask}</a></li>
                    <li><strong>Delete Task</strong>: <a href={ENDPOINTS.deleteTask} target="_blank" rel="noopener noreferrer">{ENDPOINTS.deleteTask}</a></li>
                </ul>
            </div>
        </div>
    );
}

export default App;
