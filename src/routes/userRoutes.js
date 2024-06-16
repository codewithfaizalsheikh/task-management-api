const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User registration
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Authenticate user and generate JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: fs@mailinator.com
 *               password:
 *                 type: string
 *                 example: password
 *     responses:
 *       200:
 *         description: Login Successfull
 *       401:
 *         description: Unauthorized - Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post("/login", userController.userLogin);

/**
 * @swagger
 *   /user/add:
 *   post:
 *     summary: Create a new user
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Faizal Sheikh
 *               email:
 *                 type: string
 *                 example: fs@mailinator.com
 *               password:
 *                 type: string
 *                 example: password
 *     responses:
 *       201:
 *         description: user register successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal serval error
 */
router.post("/add", userController.createUser);

/**
 * @swagger
 * /user/get:
 *   get:
 *     summary: Retrieve all users
 *     tags: [users]
 *     responses:
 *       200:
 *         description: List of all users
 *       500:
 *         description: Server error
 */
router.get("/get", userController.getAllUsers);

/**
 * @swagger
 * /user/get/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: user ID
 *     responses:
 *       200:
 *         description: user retrieved successfully
 *       404:
 *         description: user not found
 *       500:
 *         description: Server error
 */
router.get("/get/:id", userController.getUserById);

/**
 * @swagger
 * /user/update/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Faizal
 *               email:
 *                 type: string
 *                 example: fs@mailinator.com
 *               password:
 *                 type: string
 *                 example: password
 *     responses:
 *       200:
 *         description: user updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: user not found
 */
router.put("/update/:id", userController.updateUserById);
/**
 * @swagger
 * /user/delete/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: user ID
 *     responses:
 *       200:
 *         description: user deleted successfully
 *       404:
 *         description: user not found
 *       500:
 *         description: Server error
 */
router.delete("/delete/:id", userController.deleteUserById);

module.exports = router;
