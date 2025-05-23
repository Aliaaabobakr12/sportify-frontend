# Sportify - Sports Court Reservation System

![Sportify Logo](/public/logo.png)

Sportify is a **full-stack web application** that allows users to find, book, and manage reservations for various sports courts. It supports multiple sports, real-time availability, user profiles, and an admin panel for court and user management.

---

## Overview

Sportify offers a smooth and interactive experience for users. Built with **React (Vite)** on the frontend and **Node.js (Express)** with **PostgreSQL** on the backend, it allows sports enthusiasts to:
- Browse available courts
- Filter by location and sport type
- Book time slots
- Manage their reservations and profiles

---

## Features

### User Features
- **Signup & Login**: Secure authentication using JWT
- **Profile Management**: View and update personal details
- **Court Search**: Filter by sport (Football, Basketball, Tennis, Padel) and location
- **Reservation System**: Choose date, time, and court
- **Reservation Management**: View, edit, and cancel reservations
- **Real-Time Availability**: Instantly see open slots

---

## Tech Stack

### Frontend
- **React + Vite**
- **TailwindCSS** (styling)
- **Zustand** (state management)
- **React Query** (data fetching)
- **React Router** (navigation)
- **Framer Motion** (animations)

### Backend
- **Node.js + Express**
- **PostgreSQL** (database)
- **JWT** (authentication)
- **Bcrypt** (password hashing)
- **RESTful API** with structured endpoints

---

## API Endpoints

### Authentication
- `POST /api/auth/register` – Register a new user  
- `POST /api/auth/login` – Login and receive a JWT token

### Users
- `GET /api/users` – Get all users
- `GET /api/users/me` – Get current user info  
- `GET /api/users/:userId` – Get user by ID

### Courts
- `GET /api/courts` – Get all courts (with filters)  
- `GET /api/courts/:courtId` – Get specific court details  
- `POST /api/courts` – Add new court

### Reservations
- `GET /api/reservations` – All reservations
- `POST /api/reservations` – Create a reservation  
- `GET /api/reservations/:reservationId` – Get reservation details  
- `DELETE /api/reservations/:reservationId` – Cancel reservation  
- `GET /api/reservations/user/:userId` – Reservations by user  
- `GET /api/reservations/court/:courtId/date/:date` – Court availability on date

---

## Database Schema

### `users`
- `id`, `first_name`, `last_name`, `email`, `password`, `address` etc.

### `courts`
- `id`, `name`, `address`, `type`, `price`, etc.

### `reservations`
- `id`, `user_id`, `court_id`, `date`, `time_slot`

---

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the Repos**
   ```bash
   [git clone https://github.com/yourusername/sports-reserve.git](https://github.com/Aliaaabobakr12/sport-courts.git)
   cd sport-courts
   [git clone [https://github.com/yourusername/sports-reserve.git](https://github.com/Aliaaabobakr12/sports-reserve.git)]
   cd sports-reserve
   ```

2. **Install Frontend Dependencies**
   ```bash
   npm install
   npm run dev
   ```

3. **Install Backend Dependencies**
   ```bash
   npm install
   ```

4. **Configure Environment Variables**

   Create a `.env` file in the backend root:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/sport_courts
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```

5. **Set Up the Database**
   - Create a PostgreSQL database named `sport_courts`
   - Run the server to auto-create tables or use a migration script (if applicable)

6. **Run Backend Server**
   ```bash
   npm run start
   ```

---

## Authentication

JWT tokens are used to secure endpoints. Include the token in the `Authorization` header:
```
Authorization: Bearer <your_token>
```

---

## Live Demo

Access our live deployments:

### Frontend
[Visit Sportify Web App](sportify-seven-mu.vercel.app)

---

## Contributors

- [Aliaa Abobakr](https://github.com/Aliaaabobakr12)
- [Rowan Nour](https://github.com/Rowanour)
- [Sohaila Abdelgawad](https://github.com/SohailaAbdalgwad)
- [Shahd Mohmmed]()
