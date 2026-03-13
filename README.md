# Simple Notes App

## Project Overview

The Simple Notes App is a web application that allows users to create and manage personal notes securely.
Users can register, log in, create notes, view their notes, delete notes, and view their profile information.

This application demonstrates the implementation of user authentication and CRUD operations.

## Features

* User Signup
* User Login
* Create Notes
* View Notes
* Delete Notes
* View Profile
* Notes stored per user

## Technologies Used

Frontend:

* HTML
* CSS
* JavaScript

Backend:

* Node.js
* Express.js

Database:

* JSON / Local storage

## Application Modules

### 1. Authentication

Users can create an account and log in securely using their email and password.

### 2. Notes Management

After logging in, users can:

* Create new notes
* View all created notes
* Delete notes

### 3. Profile Section

The profile page displays:

* User name
* Email
* Total number of notes created

## Project Structure

notes-app

* server

  * server.js
  * routes.js
  * users.json
  * notes.json

* client

  * login.html
  * signup.html
  * dashboard.html
  * profile.html
  * style.css
  * script.js

## How to Run the Project

1. Install dependencies

npm install

2. Start the server

npm start

3. Open the application in browser

http://localhost:3000

## Future Improvements

* Edit notes functionality
* Search notes
* Dark mode
* Cloud database integration

## Author

Student Lab Assignment Project
