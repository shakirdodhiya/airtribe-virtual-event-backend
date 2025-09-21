# Virtual Events API

A Virtual Events Rest API build using **Node.js**, **Express**, **bcrypt**, **jwt** and **axios**

## Setup Instructions

### 1. Clone Repository

### 2. Go to directory and Install dependencies
cd airtribe-virtual-event-backend
npm install

### 3. Start server

node app.js

This command will start server on http://localhost:3000

## Features

- Store user data in db
- Generate jwt token at the time of login
- Verify token for other requests
- Manage events based on roles

## API Endpoints

### 1. Register

- Path : /users/register
- Method : POST
- Description : This API creates an user

### 2. Login

- Path : /users/login
- Method : POST
- Description : This API authenticates the user and returns token

### 3. Create Event

- Path : /events
- Method : POST
- Description : This API creates an event. A check is added that only "Organizer" can create event

### 4. Update Event

- Path : /events/:id
- Method : PUT
- Description : This API updates an event. A check is added that only "Organizer" can update event

### 5. Get Events

- Path : /events
- Method : GET
- Description : This API returns list of all events

### 6. Get Event

- Path : /events/:id
- Method : GET
- Description : This API returns event by id

### 7. Delete Event

- Path : /events/:id
- Method : DELETE
- Description : This API deletes an event. A check is added that only "Organizer" can delete event

### 8. Register to event

- Path : /events/:id/register
- Method : POST
- Description : This API register user to an event. A check is added that only "Attendee" can register to an event

### 9. Get participated events

- Path : /events/participated
- Method : GET
- Description : This API returns all events a user has register.

### 10. Cancel event participation

- Path : /events/:id/cancel-registration
- Method : PUT
- Description : This API cancels registration to an event.

## How to test

Open postman and enter "http://localhost:3000" with respective methods and paths
