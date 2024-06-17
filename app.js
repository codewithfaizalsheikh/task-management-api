const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const taskRoutes = require("./src/routes/taskRoutes");
const userRoutes = require("./src/routes/userRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const notFoundHandler = require("./src/middlewares/notFoundHandler");
const errorHandler = require("./src/middlewares/errorHandler");
const authMiddleware = require("./src/middlewares/authMiddleware");
require("dotenv").config();
const app = express();
app.use(bodyParser.json());
const corsOptions = {
  origin: "*", // Allow only this origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow these methods
  credentials: true, // Enable cookies
  optionsSuccessStatus: 204, // Response status for successful OPTIONS requests
};

app.use(cors(corsOptions));

// app.use("/task", authMiddleware);
app.use("/task", taskRoutes);
app.use("/user", userRoutes);
// app.use(notFoundHandler);
app.use(errorHandler);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
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
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Adjust the path as needed
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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

app.get("/", (req, res) => {
  res.send("Welcome to task managemet system!");
});

module.exports = app;
