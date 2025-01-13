import React, { useState } from "react";
import { FaCheck } from "react-icons/fa"; 
import Header from "./Header";

const TaskPath = ({ user }) => {
    const [tasks, setTasks] = useState([
        { name: "Guest List", completed: false },
        { name: "Venue Booking", completed: false },
        { name: "Hair & Makeup", completed: false },
        { name: "Photographer & DJ", completed: false },
        { name: "Dress Selection", completed: false },
        { name: "Preparation Location", completed: false },
        { name: "Magnet Photographer", completed: false },
        { name: "Invitations", completed: false },
        { name: "Accessories", completed: false },
    ]);

    const handleTaskClick = (index) => {
        if (index === 0 || tasks[index - 1].completed) {
            setTasks((prevTasks) =>
                prevTasks.map((task, i) =>
                    i === index ? { ...task, completed: !task.completed } : task
                )
            );
        } else {
            alert("You must complete the previous tasks first!");
        }
    };

    return (
        <div>
            <Header user={user} />
            <div className="task-path-container">
                <div className="task-path">
                    {tasks.map((task, index) => (
                        <div
                            key={index}
                            className={`task-node ${task.completed ? "completed" : ""}`}
                            onClick={() => handleTaskClick(index)}
                        >
                            <div className="task-circle">
                                {task.completed ? <FaCheck className="task-icon" /> : index + 1}
                            </div>
                            <div className="task-label">{task.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TaskPath;
