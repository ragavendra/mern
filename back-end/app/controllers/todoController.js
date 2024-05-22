const todos = require('../models/todosModel.js');

const store = async (req, res) => {
    try {
        const { name, description } = req.body;
        await todos.create({ name, description });
        return res.json({ message: 'Item created successfully' });
    } catch (error) {
        return res.json({ error: error.message || 'Internal Server Error' });
    }
};


const show = async (req, res) => {
    try {
        const todo = await todos.find();
        return res.json({message:"success",result:todo});
    } catch (error) {
        return res.json({ error: error.message || 'Internal Server Error' });
    }
};


const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        await todos.deleteOne({_id:id});
        return res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        return res.json({ error: error.message || 'Internal Server Error' });
    }
};

module.exports = { store, show, destroy };
