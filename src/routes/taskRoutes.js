const express = require("express");
const taskController = require("../controllers/taskController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management
 */

/**
 * @swagger
 *   /task/add:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - status
 *             properties:
 *               title:
 *                 type: string
 *                 example: complete the project on monday
 *               description:
 *                 type: string
 *                 example: create the documentation and git repo
 *               status:
 *                 type: string
 *                 enum: [pending, in-progress, completed]
 *                 example: pending, in-progress, completed
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal serval error
 */
router.post("/add", taskController.createTask);

/**
 * @swagger
 * /task/get:
 *   get:
 *     summary: Retrieve all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of all tasks
 *       500:
 *         description: Server error
 */
router.get("/get", taskController.getAllTasks);

/**
 * @swagger
 * /task/get/{id}:
 *   get:
 *     summary: Retrieve a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.get("/get/:id", taskController.getTaskById);

/**
 * @swagger
 * /task/update/{id}:
 *   put:
 *     summary: Update a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: complete the project on monday
 *               description:
 *                 type: string
 *                 example: create the documentation and git repo
 *               status:
 *                 type: string
 *                 enum: [pending, in-progress, completed]
 *                 example: pending, in-progress, completed
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Task not found
 */
router.put("/update/:id", taskController.updateTaskById);
/**
 * @swagger
 * /task/delete/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.delete("/delete/:id", taskController.deleteTaskById);

/**
 * @swagger
 * /task/change-status/{id}:
 *   post:
 *     summary: change the status of task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: task_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, in-progress, completed]
 *     responses:
 *       200:
 *         description: Task status change successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Task not found
 */
router.post("/change-status/:id", taskController.taskStatus);

module.exports = router;
