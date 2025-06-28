import express from 'express';
import Note from '../models/Note.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(auth);

// Get all notes for authenticated user
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    
    res.json(notes);
  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({ error: 'Server error fetching notes' });
  }
});

// Create new note
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;

    // Validation
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    if (title.length > 100) {
      return res.status(400).json({ error: 'Title must be less than 100 characters' });
    }

    if (content.length > 10000) {
      return res.status(400).json({ error: 'Content must be less than 10,000 characters' });
    }

    const note = new Note({
      title: title.trim(),
      content: content.trim(),
      userId: req.user._id
    });

    await note.save();

    res.status(201).json({
      message: 'Note created successfully',
      note
    });
  } catch (error) {
    console.error('Create note error:', error);
    res.status(500).json({ error: 'Server error creating note' });
  }
});

// Update note
router.put('/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    const noteId = req.params.id;

    // Validation
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    // Find note and check ownership
    const note = await Note.findOne({ _id: noteId, userId: req.user._id });
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Update note
    note.title = title.trim();
    note.content = content.trim();
    await note.save();

    res.json({
      message: 'Note updated successfully',
      note
    });
  } catch (error) {
    console.error('Update note error:', error);
    res.status(500).json({ error: 'Server error updating note' });
  }
});

// Delete note
router.delete('/:id', async (req, res) => {
  try {
    const noteId = req.params.id;

    // Find and delete note (only if user owns it)
    const note = await Note.findOneAndDelete({ _id: noteId, userId: req.user._id });
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Delete note error:', error);
    res.status(500).json({ error: 'Server error deleting note' });
  }
});

export default router;