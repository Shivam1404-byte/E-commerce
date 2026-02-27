# E-Commerce Backend (Work in Progress)

## Overview
This project is the backend foundation of an e-commerce platform.  
Currently, authentication and user registration are implemented.  
Future modules will include product management, cart system, order processing, and role-based access control.

## Current Features
- User Registration
- User Login
- Password hashing using bcrypt
- JWT-based authentication
- Structured architecture (Controller-Service pattern)

## Tech Stack
- Node.js
- Express
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT
- Bcrypt

## Project Structure
src/
 ├── controllers/
 ├── services/
 ├── routes/
 ├── middlewares/
 ├── prisma/

## API Endpoints

### POST /auth/register
Registers a new user.

### POST /auth/login
Authenticates user and returns JWT.

## Setup Instructions

```bash
git clone https://github.com/Shivam1404-byte/E-commerce.git
cd E-commerce
npm install
cp .env.example .env
npx prisma migrate dev
npm run dev
```

## Environment Variables
- DATABASE_URL
- JWT_SECRET
- PORT

## Roadmap
- Implement role-based access control (Admin, Vendor, Customer)
- Product management
- Cart functionality
- Order creation
- Payment integration