const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
const Task = require("../models/taskModel");

const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjZlZGRkMzYzYWNlYmQ1MzFjNGViNzMiLCJpYXQiOjE3MTg2NDM3MzgsImV4cCI6MTc1MDE3OTczOH0.Y9f5rmM9Tk3na1ihMRCp89het_JDm_2aTWN2AoN2axs"; // Replace with a valid token

// Test for database connection
beforeAll(async () => {
  await mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Test for connection close
afterAll(async () => {
  await mongoose.connection.close();
});

describe("Task API", () => {
  let taskId;

  // Test for creating a new task
  it("should create a new task", async () => {
    const res = await request(app)
      .post("/task/add")
      .set("Authorization", `Bearer ${AUTH_TOKEN}`)
      .send({
        title: "Test Task",
        description: "This is a test task",
        status: "pending",
      });
    expect(res.statusCode).toEqual(201); // status code 201
    expect(res.body).toHaveProperty("data"); // check response data
    expect(res.body.data).toHaveProperty("_id"); // check _id
    taskId = res.body.data._id;
  });

  // Test for retrieving all tasks
  it("should retrieve all tasks", async () => {
    const res = await request(app)
      .get("/task/get")
      .set("Authorization", `Bearer ${AUTH_TOKEN}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toBeInstanceOf(Array);
  });

  // Test for retrieving a task by ID
  it("should retrieve a task by id", async () => {
    const res = await request(app)
      .get(`/task/get/${taskId}`)
      .set("Authorization", `Bearer ${AUTH_TOKEN}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("_id", taskId);
  });

  // Test for updating a task by ID
  it("should update a task by id", async () => {
    const res = await request(app)
      .put(`/task/update/${taskId}`)
      .set("Authorization", `Bearer ${AUTH_TOKEN}`)
      .send({
        title: "Updated Task",
        description: "This is an updated test task",
        status: "completed",
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("title", "Updated Task");
  });

  // Test for deleting a task by ID
  it("should delete a task by id", async () => {
    const res = await request(app)
      .delete(`/task/delete/${taskId}`)
      .set("Authorization", `Bearer ${AUTH_TOKEN}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Task deleted successfully");
  });

  // Test for changing the status of a task by ID
  it("should change the status of a task by id", async () => {
    // Create a new task first for this specific test
    const taskRes = await request(app)
      .post("/task/add")
      .set("Authorization", `Bearer ${AUTH_TOKEN}`)
      .send({
        title: "Change Status Task",
        description: "This task is for changing status",
        status: "pending",
      });
    const newTaskId = taskRes.body.data._id;

    const res = await request(app)
      .post(`/task/change-status/${newTaskId}`)
      .set("Authorization", `Bearer ${AUTH_TOKEN}`)
      .send({
        status: "completed",
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("status", "completed");
  });
});