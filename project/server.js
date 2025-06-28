import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import noteRoutes from './routes/notes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB with better error handling
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not set');
    }
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.error('Please ensure you have:');
    console.error('1. Created a MongoDB Atlas account');
    console.error('2. Set up a cluster');
    console.error('3. Updated the MONGODB_URI in your .env file');
    process.exit(1);
  }
};

connectDB();

// Routes
app.use('/api/users', authRoutes);
app.use('/api/notes', noteRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'QuickNotes API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});