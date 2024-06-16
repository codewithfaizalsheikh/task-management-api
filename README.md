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
- [Postman Collection](#postman-collection)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

- Node.js (v12 or later)
- MongoDB (running locally or a DB_URI)

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
   PORT=5050
   ```

## Running the Server

To start the server, run:

```bash
npm start
nodemon
```

## API Documentation

```bash
npm test
```

## API Documentation

```bash
http://localhost:5000/api-docs
```

## Environment Variables

```bash
DB_URI=mongodb://localhost:27017/task-manager
PORT=5000
```
