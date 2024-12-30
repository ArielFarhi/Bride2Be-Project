const { Schema, model } = require('mongoose');

const checklistTaskSchema = new Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, required: true },
    section: { type: String, required: true },
}, { collection: 'checklistTasks' });

const ChecklistTask = model('ChecklistTask', checklistTaskSchema);

module.exports = ChecklistTask;