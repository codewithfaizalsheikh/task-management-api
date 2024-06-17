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
        url: `${process.env.SWAGGER_URL}`,
        description: `${process.env.SWAGGER_DESC}`, // Optional description
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
  swaggerOptions: {
    defaultModelsExpandDepth: -1,
    validatorUrl: null,
    cors: true,
    docExpansion: "list",
    apisSorter: "alpha",
    operationsSorter: "alpha",
    tagsSorter: "alpha",
  },
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
  res.send(
    `Welcome to Task Management System!\n\n` +
      `For API documentation, visit: http://16.171.175.94/api-docs/\n\n` +
      `To set up the project locally:\n` +
      `1. Clone the repository: git clone https://github.com/codewithfaizalsheikh/task-management-api.git\n` +
      `2. Change to the staging branch: git checkout staging\n` +
      `3. Install dependencies: npm install\n` +
      `4. Setup .env file\n` +
      `5. Start the server: nodemon\n` +
      `\n` +
      `For more information, check the README.md file.\n`
  );
});

module.exports = app;
