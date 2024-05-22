const mongoose = require('mongoose');
const todosSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true }
    },
    { timestamps: true, versionKey: false }
);

const todos = mongoose.model('todos', todosSchema);

module.exports = todos;
