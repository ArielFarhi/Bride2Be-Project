import React, { useEffect, useState } from "react";
import Header from "./Header";
import ProgressBar from "./ProgressBar";

function CheckList({ user }) {
    const [tasks, setTasks] = useState([]);
    const [sections, setSections] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const userId = localStorage.getItem("token");

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);

                const tasksResponse = await fetch(`http://localhost:8080/api/checklist?userId=${userId}`);
                if (!tasksResponse.ok) {
                    throw new Error("Failed to fetch tasks");
                }
                const tasksData = await tasksResponse.json();

                const groupedTasks = tasksData.reduce((acc, task) => {
                    if (!acc[task.section]) {
                        acc[task.section] = [];
                    }
                    acc[task.section].push(task);
                    return acc;
                }, {});

                setTasks(groupedTasks);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [userId]);

    const calculateTotalProgress = () => {
        const allTasks = Object.values(tasks).flat();
        const totalTasks = allTasks.length;
        const completedTasks = allTasks.filter((task) => task.completed).length;
        return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    };

    const toggleSection = (section) => {
        setSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const toggleTaskCompletion = async (taskId, completed) => {
        try {
            await fetch(`http://localhost:8080/api/users/${userId}/checklist`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ taskId, completed }),
            });

            setTasks((prevTasks) => {
                const updatedTasks = { ...prevTasks };
                Object.keys(updatedTasks).forEach((section) => {
                    updatedTasks[section] = updatedTasks[section].map((task) =>
                        task._id === taskId ? { ...task, completed: !completed } : task
                    );
                });
                return updatedTasks;
            });
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="checklist-container">
            <Header user={user} />
            <h1>Checklist Tasks</h1>

            {/* <div className="overall-progress">
                <h2>Total Progress: {calculateTotalProgress()}%</h2>
                <div className="progress-bar">
                    <div
                        className="progress-bar-fill"
                        style={{ width: `${calculateTotalProgress()}%` }}
                    ></div>
                </div>
            </div> */}

            <ProgressBar progress={calculateTotalProgress()} />

            {Object.entries(tasks).map(([section, sectionTasks]) => (
                <div key={section} className="section">
                    <div className="section-header" onClick={() => toggleSection(section)}>
                        <span>{section}</span>
                        <span>{sections[section] ? "▼" : "►"}</span>
                    </div>
                    {sections[section] && (
                        <ul className="task-list">
                            {sectionTasks.map((task) => (
                                <li
                                    key={task._id}
                                    className={`task-item ${task.completed ? "completed" : ""}`}
                                >
                                    <span
                                        className={`task-title ${task.completed ? "completed" : ""
                                            }`}
                                    >
                                        {task.title}
                                    </span>
                                    <div className="task-actions">
                                        <input
                                            type="checkbox"
                                            checked={task.completed}
                                            onChange={() =>
                                                toggleTaskCompletion(task._id, task.completed)
                                            }
                                        />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
}

export default CheckList;
