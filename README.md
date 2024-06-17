# Task Management API

A robust and scalable RESTful API for a task management system built with Node.js, Express, and MongoDB.

## Features

- Create, retrieve, update, and delete tasks.
- Tasks have a title, description, and status.
- Input validation and error handling.
- Comprehensive documentation using Swagger.
- Unit and integration tests.
- Deployed on a staging server.

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- Express-validator
- Swagger
- jest for testing

## Table of Contents

- [Installation](#installation)
- [Running the Server](#running-the-server)
- [Running Tests](#running-tests)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Postman Collection](#postman-collection)

## Installation

### Prerequisites

- Node.js (v12 or later)
- MongoDB (running locally or a MongoDB URI)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/codewithfaizalsheikh/task-management-api.git
   cd task-management-api
   ```

2. Change Branch:

   ```bash
   git checkout staging
   git pull
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your MongoDB URI:
   ```env
   DB_URI=your_mongodb_uri
   SECRET=yoursecretkey
   ```

## Running the Server

To start the server, run:

```bash
npm start
```

```bash
nodemon
```

## Running Tests

To run tests, use:

```bash
npm test
```

## API Documentation

API documentation is available via Swagger. Once the server is running, visit:

```bash
http://localhost:5050/api-docs
```

## Environment Variables

```bash
DB_URI=mongodb://localhost:27017/task-management
SECRET=yoursecretkey
```

## Postman Collection

A Postman collection is included to help you test the API. Import the TaskManager.postman_collection.json file into Postman.

### Importing Postman Collection

1. Open Postman.
2. Click on the Import button.
3. Select the TaskManager.postman_collection.json file.
4. Click Open to import.

## Deployment

The API is deployed on an AWS EC2 instance. You can access the deployed API at:

```bash
http://16.171.19.237/
```

### Accessing Swagger Documentation on Deployment

Visit the following URL to access the Swagger documentation for the deployed API:

```bash
http://16.171.19.237/api-docs
```
