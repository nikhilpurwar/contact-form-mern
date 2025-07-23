# Contact Form MERN Application

A full-stack contact form application built with the MERN stack (MongoDB, Express, React, Node.js).  
The backend uses **Express** and **Mongoose** to connect to a **MongoDB Atlas** cloud database.  
The frontend is built with **React** featuring file uploads and form validation.  

---
## Technologies Used

- **Frontend:** React, React Hooks, CSS Modules
- **Backend:** Node.js, Express.js, Multer for file uploads, Mongoose for MongoDB
- **Database:** MongoDB Atlas (cloud)
- **Other tools:** dotenv for environment variables, CORS enabled

## Features

- Contact form with 6 fields: Name, Phone, Email, Subject, Message, and Attach multiple files
- File uploads handled using `multer` and stored on the backend server
- Validation on the frontend with clear error messages
- Responsive NeoPop-inspired UI design
- Backend API stores contact submissions in MongoDB Atlas
- CORS enabled for frontend-backend communication

---

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later recommended)  
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)  
- MongoDB Atlas account (free tier) — [Sign up here](https://cloud.mongodb.com/)  
- (Optional) [Git](https://git-scm.com/) for cloning this repository

---

## Getting Started

### 1. Clone the repository


OR download and unzip the project folder.

---

### 2. Setup Backend

Change directory into `backend` folder:


#### a) Install backend dependencies


#### b) Create `.env` file

Create a `.env` file inside the `backend` folder with the following content:


- Replace `your_mongodb_atlas_connection_string` with your actual MongoDB connection string from Atlas (make sure to URL-encode any special characters in your username/password).

---

### 3. Setup Frontend

Open a new terminal, navigate to the frontend folder:


#### a) Install frontend dependencies


---

## Running the Project Locally

### 1. Start Backend Server

In the `backend` folder terminal run:


This will start your backend API on `http://localhost:5000` (or the port you specified in `.env`).

---

### 2. Start Frontend Server

In the `frontend` folder terminal run:


This will start the React app on `http://localhost:3000` and open your default browser.

---

## Using the Application

- Fill in the contact form fields.
- Attach one or more files (max 5).
- Submit the form.
- Form submissions are saved into your MongoDB Atlas cluster.
- Uploaded files are saved in the backend `/uploads` folder.

---

## Important Notes

- Ensure your MongoDB Atlas cluster allows connections from your IP or `0.0.0.0/0` for development.
- URL-encode any special characters in your MongoDB password in the connection string.
- Backend stores uploaded files locally. For production, consider cloud storage like AWS S3.
- Backend API URL is hardcoded to `http://localhost:5000/api/contact`; change if deploying.

---

## Folder Structure

