# QuickNotes - MERN Stack Note Taking App

A full-stack note-taking application built with MongoDB, Express.js, React, and Node.js. QuickNotes allows users to create, read, update, and delete personal notes with secure user authentication.

## Features

### Authentication
- User registration and login with JWT authentication
- Secure password hashing with bcrypt
- Protected routes and user-specific data access
- Automatic token refresh and logout on expiration

### Notes Management
- Create new notes with title and content
- View all personal notes in a responsive grid layout
- Edit existing notes with inline editing
- Delete notes with confirmation
- Real-time character count and validation
- Responsive design for all device sizes

### User Experience
- Clean, modern interface with smooth animations
- Loading states and error handling
- Mobile-first responsive design
- Intuitive navigation and user feedback

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - User interface library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **Context API** - State management
- **CSS3** - Modern styling with flexbox and grid

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd quicknotes-mern
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/quicknotes
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=5000
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system

5. **Run the application**
   ```bash
   # Development mode (runs both client and server)
   npm run dev
   
   # Or run separately:
   npm run server  # Backend only
   npm run client  # Frontend only
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login

### Notes (Protected Routes)
- `GET /api/notes` - Get all user notes
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

## Project Structure

```
quicknotes-mern/
├── src/                     # React frontend
│   ├── components/          # React components
│   │   ├── Dashboard.jsx    # Main notes dashboard
│   │   ├── Login.jsx        # Login form
│   │   ├── Register.jsx     # Registration form
│   │   ├── NoteCard.jsx     # Individual note display
│   │   ├── NoteForm.jsx     # Note creation/editing form
│   │   └── ProtectedRoute.jsx # Route protection
│   ├── context/             # React context
│   │   └── AuthContext.jsx  # Authentication context
│   ├── services/            # API services
│   │   └── api.js           # Axios configuration
│   ├── App.jsx              # Main app component
│   ├── App.css              # Application styles
│   └── main.jsx             # React entry point
├── models/                  # Mongoose models
│   ├── User.js              # User schema
│   └── Note.js              # Note schema
├── routes/                  # Express routes
│   ├── auth.js              # Authentication routes
│   └── notes.js             # Notes CRUD routes
├── middleware/              # Express middleware
│   └── auth.js              # JWT authentication middleware
├── server.js                # Express server setup
├── package.json             # Dependencies and scripts
└── .env                     # Environment variables
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Input validation and sanitization
- CORS configuration
- User data isolation

## Responsive Design

The application is fully responsive with breakpoints for:
- Mobile devices (< 768px)
- Tablets (768px - 1024px)  
- Desktop (> 1024px)

## Future Enhancements

- Note categories and tags
- Search and filter functionality
- Rich text editing
- File attachments
- Note sharing capabilities
- Dark mode theme
- Offline synchronization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.