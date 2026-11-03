# CivicSocialPlus — Social Development Events Platform

### Bringing People Together to Create Meaningful Change.

CivicSocialPlus is a community-driven social development platform designed to connect people through meaningful community activities. It allows users to discover local initiatives, organize social events, and participate in activities that contribute to a better society.

From winter clothing distribution and tree plantation campaigns to community cleanups and donation drives, CivicSocialPlus makes it easier for people to come together, contribute their time, and create positive change.

The idea behind this project is simple: **Small actions can create meaningful differences when communities work together.**

---

## 🌐 Live Application & Repositories

| Resource | Link |
|---|---|
| 🌍 Live Website | [CivicSocialPlus](https://civicsocialpluse.vercel.app/) |
| 💻 Client Repository | [GitHub — Client](https://github.com/Rumi-Parvez/CivicSocialPluse) |
| ⚙️ Server Repository | [GitHub — Server](https://github.com/Rumi-Parvez/civicsocialpluse-server) |
| 🔗 Live Backend API | [CivicSocialPlus API](https://civicsocialpluseserver.vercel.app/) |

---

## ✨ Key Features

CivicSocialPlus provides a complete platform for organizing and participating in community development activities.

- **Community Event Discovery:** Explore upcoming social development events created by community members.
- **Create Events:** Authenticated users can organize their own community initiatives.
- **Event Management:** Update and delete events created by the logged-in user.
- **Join Community Events:** Participate in social activities and keep track of joined events.
- **Personalized Dashboard:** View joined events and manage personal event activities.
- **Secure Authentication:** Email/password authentication and Google sign-in using Better Auth.
- **Protected Routes:** Restrict private pages and sensitive API operations to authenticated users.
- **JWT Verification:** Verify authentication tokens on protected backend endpoints.
- **Event Details:** View event descriptions, dates, locations, and organizer information.
- **Participant Information:** Display event participation information.
- **Profile Management:** Update personal profile information and profile picture.
- **Theme Customization:** Switch between light and dark themes.
- **Responsive Design:** User-friendly layouts for mobile, tablet, and desktop screens.
- **Interactive Feedback:** Form validation, loading states, confirmation dialogs, and toast notifications.

---

## 🛠️ Technology Stack

### Frontend

- Next.js 16 (App Router)
- React.js 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- DaisyUI
- Lucide React
- React Icons
- React Hot Toast
- Next Themes

### Authentication & Security

- Better Auth
- Better Auth MongoDB Adapter
- JWT (JSON Web Token)
- Google OAuth
- JOSE

### Backend & Database

- Node.js
- Express.js
- MongoDB
- MongoDB Native Driver
- REST API

### Tools & Deployment

- Git & GitHub
- Vercel
- MongoDB Atlas
- npm

---

## 🏗️ Application Architecture

CivicSocialPlus follows a separate frontend and backend architecture.

```text
                   CivicSocialPlus
                          |
             +------------+------------+
             |                         |
          Frontend                  Backend
          Next.js                   Node.js
          React.js                  Express.js
             |                         |
             |------ REST API ----------|
             |                         |
         Better Auth                MongoDB
             |                         |
          JWT Client             JWT Verification
             |                         |
             +------ Protected API ----+
```

The frontend handles the user interface, navigation, authentication experience, and API communication.

The backend manages event operations, database interactions, JWT verification, and authorization.

---

## 📌 Main Application Sections

### 1. Home Page

The homepage introduces the platform and encourages visitors to participate in community development.

It includes:

- Community-focused hero section
- Platform features
- Recently added upcoming events retrieved dynamically from MongoDB
- Community activity gallery
- Newsletter subscription design
- Informative footer

### 2. Authentication System

Better Auth handles the application's authentication system.

Users can:

- Register using their name, email, photo URL, and password.
- Sign in using email and password.
- Authenticate using Google.
- Log out securely.
- Access private pages after authentication.

Registration includes password validation for uppercase letters, lowercase letters, and a minimum length of six characters.

### 3. Create Event

Authenticated users can organize community events by providing:

- Event title
- Description
- Event category
- Thumbnail image URL
- Event location
- Event date
- Creator information

Event date validation prevents users from creating events with past dates.

### 4. Upcoming Events

Users can explore upcoming community events created by other members.

Events are retrieved dynamically from MongoDB and displayed in a responsive card layout.

Each event provides access to a public details page.

### 5. Event Details & Joining

Every event has an individual public details page.

Visitors can view event information without authentication. However, users must sign in before joining an event.

After joining, the event and user participation information are stored in MongoDB.

### 6. Joined Events

Authenticated users can view all events they have joined.

This section includes:

- Personalized joined event list
- Event information and dates
- Events sorted by event date
- Option to leave an event

### 7. Manage Events

Users can manage events created through their own accounts.

Available operations include:

- View created events
- Update event information
- Delete events with confirmation

Backend ownership validation ensures that users can only update or delete their own events.

### 8. Profile & Theme Customization

Users can update their profile information, including their name and profile picture.

The application also provides a theme toggle for switching between light and dark modes.

---

## 🔐 Authentication & Security

Security and authorization are important parts of CivicSocialPlus.

The application uses Better Auth for authentication and JWT-based verification for protected backend operations.

Security implementations include:

- Authentication-based access to private pages.
- JWT verification through the backend.
- Authorization checks for event ownership.
- Server-side validation for event update and delete operations.
- Duplicate event-joining prevention.
- Backend-controlled creator identity.
- Environment variables for sensitive configuration.

---

## 🏗️ Localhost & Production Deployment

CivicSocialPlus is configured to run in both local development and production environments.

Environment variables are used to manage frontend URLs, backend URLs, database connections, authentication settings, and allowed origins.

### Local Development

| Service | URL |
|---|---|
| Frontend | `http://localhost:3000` |
| Backend | `http://localhost:5000` |
| Better Auth | `http://localhost:3000` |
| JWKS Endpoint | `http://localhost:3000/api/auth/jwks` |

### Production — Vercel

| Service | URL |
|---|---|
| Frontend | `https://civicsocialpluse.vercel.app` |
| Backend | `https://civicsocialpluseserver.vercel.app` |
| Better Auth | `https://civicsocialpluse.vercel.app` |
| JWKS Endpoint | `https://civicsocialpluse.vercel.app/api/auth/jwks` |

The application can be configured for other compatible hosting environments by updating environment variables, CORS settings, authentication origins, and deployment configuration.

---

# ⚙️ Installation & Setup Guide

Want to run CivicSocialPlus on your local machine? Follow the steps below to clone, install, configure, and run both the frontend and backend.

## 📋 Prerequisites

Before getting started, make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm (comes with Node.js)
- [Git](https://git-scm.com/)
- [MongoDB Atlas](https://www.mongodb.com/atlas) account or a MongoDB instance
- Google Cloud Console project for Google OAuth credentials

Use a Node.js version compatible with the project's Next.js version.

## 1. Clone the Frontend Repository

Open your terminal and run:

```bash
git clone https://github.com/Rumi-Parvez/CivicSocialPluse.git
```

Navigate to the client directory:

```bash
cd CivicSocialPluse
```

## 2. Install Frontend Dependencies

Run:

```bash
npm install
```

This command automatically reads `package.json` and installs all required frontend dependencies.

Some of the main packages include:

- Next.js and React
- Better Auth and MongoDB Adapter
- Tailwind CSS
- shadcn/ui and DaisyUI
- Lucide React and React Icons
- React Hot Toast
- Next Themes
- Other UI and utility packages

**You do not need to install these packages individually. Running `npm install` is enough.**

## 3. Configure Frontend Environment Variables

Create a `.env` file in the root directory of the frontend project.

```env
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_better_auth_secret
MONGODB_CLIENT_URL=your_mongodb_connection_string

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

NEXT_PUBLIC_CIVIC_SERVER_URL=http://localhost:5000
```

Replace the placeholder values with your own credentials.

## 4. Clone the Backend Repository

Open a new terminal window and clone the server repository:

```bash
git clone https://github.com/Rumi-Parvez/civicsocialpluse-server.git
```

Navigate to the server directory:

```bash
cd civicsocialpluse-server
```

## 5. Install Backend Dependencies

Run:

```bash
npm install
```

This installs the backend packages defined in the server's `package.json`, including:

- Express.js
- MongoDB
- JOSE
- CORS
- dotenv

## 6. Configure Backend Environment Variables

Create a `.env` file in the root directory of the backend project.

```env
PORT=5000
MONGODB_URL=your_mongodb_connection_string

BETTER_AUTH_URL=http://localhost:3000
CLIENT_URL=http://localhost:3000
```

Make sure the MongoDB connection string points to the database used by the frontend authentication configuration.

## 7. Start the Backend Server

Run:

```bash
npm run dev
```

The backend API should now be available at:

```text
http://localhost:5000
```

Test the backend health endpoint:

```text
http://localhost:5000/
```

## 8. Start the Frontend Application

Open another terminal, navigate to the frontend project, and run:

```bash
npm run dev
```

The frontend application should now be available at:

```text
http://localhost:3000
```

## 9. You're Ready!

If both servers are running successfully, open your browser and visit:

**http://localhost:3000**

You can now register an account, log in, create community events, join events, and explore the platform.

---

## 📦 Available Frontend Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Next.js development server |
| `npm run build` | Creates a production build |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint |

## 📦 Available Backend Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the backend development server |
| `npm start` | Starts the backend server in production |

---

## 🔑 Environment Configuration

CivicSocialPlus uses separate environment configurations for local development and production deployment.

### Local Development

Frontend `.env`:

```env
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_CIVIC_SERVER_URL=http://localhost:5000
```

Backend `.env`:

```env
BETTER_AUTH_URL=http://localhost:3000
CLIENT_URL=http://localhost:3000
PORT=5000
```

### Production Deployment

Configure the following values in the respective Vercel project settings.

Frontend environment:

```env
BETTER_AUTH_URL=https://civicsocialpluse.vercel.app
NEXT_PUBLIC_CIVIC_SERVER_URL=https://civicsocialpluseserver.vercel.app
```

Backend environment:

```env
BETTER_AUTH_URL=https://civicsocialpluse.vercel.app
CLIENT_URL=https://civicsocialpluse.vercel.app
```

Also configure the production MongoDB connection strings, Better Auth secret, and Google OAuth credentials in the appropriate project.

**Important:** The Better Auth URL must match the frontend origin that issues the JWT. The backend uses that URL to retrieve the JWKS public key and verify the token.

Never upload `.env` files, API secrets, OAuth secrets, or database credentials to GitHub.

---

## 🔗 Backend API Documentation

The Express.js backend provides REST API endpoints for managing events and user participation.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Backend health check |
| GET | `/events` | Retrieve events |
| GET | `/events/recent-upcoming` | Retrieve recent upcoming events |
| GET | `/events/completed` | Retrieve completed events |
| GET | `/events/:id` | Retrieve event details |
| POST | `/events` | Create an event |
| GET | `/events/my-events` | Retrieve authenticated user's events |
| PATCH | `/events/:id` | Update an event |
| DELETE | `/events/:id` | Delete an event |
| POST | `/join` | Join an event |
| GET | `/join/event/:eventId` | Retrieve event participation records |
| GET | `/join/:identifier` | Retrieve join information |
| DELETE | `/join/:eventId` | Leave an event |

Protected endpoints require a valid authentication token.

---

## 🎯 Learning Outcomes

Building CivicSocialPlus was an important milestone in my full-stack development journey.

Through this project, I gained practical experience with:

- Building a full-stack application using Next.js and Express.js.
- Implementing authentication with Better Auth.
- Understanding JWT generation and backend token verification.
- Connecting frontend applications with REST APIs.
- Working with MongoDB collections and database operations.
- Implementing protected routes and authorization.
- Managing user-generated content and event participation.
- Building reusable React components.
- Handling form validation, loading states, and error feedback.
- Configuring applications for local and production environments.
- Deploying frontend and backend applications using Vercel.

One of the most valuable experiences was understanding how frontend authentication, backend authorization, JWT verification, and database operations work together in a real-world application.

---

## 🚀 Future Improvements

There is always room to make CivicSocialPlus better. Some possible improvements include:

- Advanced event search and filtering.
- Event category-based discovery.
- Event reminders and notifications.
- Organizer analytics and participation reports.
- Community discussions and feedback.

---

## 👨‍💻 Developer

**Rumi Parvez**

Full-Stack Web Developer

I enjoy building practical web applications, exploring new technologies, and turning ideas into functional products.

- **GitHub:** [Rumi-Parvez](https://github.com/Rumi-Parvez)
- **Client Repository:** [CivicSocialPlus](https://github.com/Rumi-Parvez/CivicSocialPluse)
- **Server Repository:** [CivicSocialPlus Server](https://github.com/Rumi-Parvez/civicsocialpluse-server)
- **Live Website:** [CivicSocialPlus](https://civicsocialpluse.vercel.app/)

---

<div align="center">

### CivicSocialPlus

**Small Actions. Stronger Communities. Meaningful Change.**

Built with ❤️ by Rumi Parvez

</div>