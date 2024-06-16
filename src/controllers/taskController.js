const Task = require("../models/taskModel");

// Create a new task
exports.createTask = async (req, res) => {
  try {
    if (!req.body.title || req.body.title === "") {
      console.log("Title error");
      return res
        .status(400)
        .send({ statusCode: 400, message: "Title is required" });
    }
    if (!req.body.description || req.body.description === "") {
      return res
        .status(400)
        .send({ statusCode: 400, message: "Description is required" });
    }

    const task = await Task.create(req.body); //create task
    res.status(201).send({
      statusCode: 200,
      message: "Task created successfully",
      data: task,
    }); //response
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Retrieve all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find(); // fetch all data
    res.status(200).send({
      statusCode: 200,
      message: "Task fetched successfully",
      data: tasks,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Retrieve a task by its ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id); //fetch data by id
    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }
    res.status(200).send({
      statusCode: 200,
      message: "Task fetch successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Update a task by its ID
exports.updateTaskById = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }); //update by id
    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }
    res.status(200).send({
      statusCode: 200,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Delete a task by its ID
exports.deleteTaskById = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id); // delete by id
    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }
    res.status(200).send({
      statusCode: 200,
      message: "Task deleted successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// change status
exports.taskStatus = async (req, res) => {
  try {
    const status = await Task.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    ); // update or change the status of task

    return res.status(200).send({
      statusCode: 200,
      message: "status change",
      data: status,
    });
  } catch (error) {
    res.status().send({ error: error.message });
  }
};
