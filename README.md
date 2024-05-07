# gear-gulf-auction-web

# Project Usage Guide

This document provides instructions on how to set up and run the project, which consists of a backend developed using Spring Boot with MySQL Database and a frontend developed using React with Material-UI (MUI).

## Prerequisite

- Code Editor (e.g., Visual Studio Code, IntelliJ IDEA)
- Node.js and npm installed.
- MySQL Database installed.

## Steps to Run the Project

### 1. Backend Setup

#### Step 1
Open the backend code using your preferred code editor.

#### Step 2
Create a MySQL database for the project. By default, the database is set to `bid_zone` with the database port `3306`. If your MySQL database is configured differently, update the database port, name, username, and password accordingly, in the `application-dev.yml` file.

#### Step 3
Run the backend application on `localhost:8080`. Ensure that your MySQL database is running and accessible.

### 2. Frontend Setup

#### Step 1
Open the frontend code using your preferred code editor.

#### Step 2
Navigate to the frontend directory in your terminal.

#### Step 3
Install the required Node.js modules by running `npm install`.

#### Step 4
In the `.env` file, update the `VITE_BASE_URL` variable to match the port on which your backend application is running. By default, it's set to `http://localhost:8080`.

### 3. Running the Application

With both the backend and frontend set up, you can now run the application.

1. Start the backend server if not already running.
2. In the frontend directory terminal, run the command `npm run dev` to start the frontend application.

Once both backend and frontend are running, you can access the application by navigating to `http://localhost:5173` in your web browser.

Sign up with a new account and Log in using your credentials to explore the functionalities.

