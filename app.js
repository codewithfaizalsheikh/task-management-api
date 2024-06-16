const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const taskRoutes = require("./src/routes/taskRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
require("dotenv").config();
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/task", taskRoutes);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0", // Add OpenAPI version
    info: {
      title: "Task Management API",
      version: "1.0.0",
      description: "API for managing tasks",
    },
    servers: [
      {
        url: "http://localhost:5050",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Adjust the path as needed
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// app.use(require("./middlewares/errorHandle"));

const PORT = 5050;
const DB_URI = process.env.DB_URI;

mongoose
  .connect(`${DB_URI}`)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});

module.exports = app;
