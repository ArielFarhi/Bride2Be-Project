const ChecklistTask = require("../models/Checklist");

async function getChecklistTask(req, res) {
    const checklistTasks = await ChecklistTask.find({});
    res.json(checklistTasks);
}

exports.checklistTasksController = { getChecklistTask };