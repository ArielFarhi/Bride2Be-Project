import React, { useEffect, useState } from 'react';
import checklistService from '../services/checklistService';

function Checklist() {
    const [checklistTasks, setChecklistTasks] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchChecklist() {
            try {
                setLoading(true);
                const tasks = await checklistService.query(); 
                setChecklistTasks(tasks);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchChecklist();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Checklist Tasks</h1>
            <ul>
                {checklistTasks.map((task) => (
                    <li key={task._id}>
                        <h3>{task.name}</h3>
                        <p>{task.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Checklist;
