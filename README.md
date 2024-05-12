# Todo App API

This is a Todo App API built with NestJS and MongoDB, featuring authentication, authorization, and Swagger documentation. This API allows users to manage their todo lists.

## Features

- RESTful API endpoints for managing todo lists and tasks.
- JWT-based authentication and authorization middleware.
- MongoDB integration for storing todo lists and tasks.
- Swagger documentation for API endpoints.

## Requirements

- Node.js and npm installed on your machine.
- MongoDB server running locally or remotely.
- Basic knowledge of NestJS, MongoDB, and Swagger.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yvexeldev/todo-app-api.git
   ```

2. Install dependencies:

   ```bash
   cd todo-app-api
   npm install
   ```

3. Set up the MongoDB database:

   - Create a MongoDB database.
   - Update the MongoDB connection string in the `.env` file (Check `.example.env`)

4. Start the server:

   ```bash
   npm run start:dev
   ```

5. View Swagger documentation:

   Open your browser and navigate to `http://localhost:<PORT>/api/docs`.

## Technologies Used

- NestJS - A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- MongoDB - A document-oriented NoSQL database.
- Swagger - A tool for API documentation.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.
