import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import NoteCard from './NoteCard';
import NoteForm from './NoteForm';
import api from '../services/api';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await api.get('/notes');
      setNotes(response.data);
    } catch (error) {
      setError('Failed to fetch notes');
      console.error('Fetch notes error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async (noteData) => {
    try {
      const response = await api.post('/notes', noteData);
      setNotes([response.data.note, ...notes]);
      setShowForm(false);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Failed to create note'
      };
    }
  };

  const handleUpdateNote = async (noteId, noteData) => {
    try {
      const response = await api.put(`/notes/${noteId}`, noteData);
      setNotes(notes.map(note => 
        note._id === noteId ? response.data.note : note
      ));
      setEditingNote(null);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Failed to update note'
      };
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      await api.delete(`/notes/${noteId}`);
      setNotes(notes.filter(note => note._id !== noteId));
    } catch (error) {
      setError('Failed to delete note');
      console.error('Delete note error:', error);
    }
  };

  const startEdit = (note) => {
    setEditingNote(note);
    setShowForm(true);
  };

  const cancelEdit = () => {
    setEditingNote(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your notes...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">QuickNotes</h1>
          <div className="user-info">
            <span>Welcome, {user?.username}!</span>
            <button onClick={logout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        {error && <div className="error-message">{error}</div>}
        
        <div className="dashboard-actions">
          <button
            onClick={() => setShowForm(true)}
            className="create-note-button"
            disabled={showForm}
          >
            + New Note
          </button>
        </div>

        {showForm && (
          <NoteForm
            note={editingNote}
            onSubmit={editingNote ? 
              (data) => handleUpdateNote(editingNote._id, data) : 
              handleCreateNote
            }
            onCancel={cancelEdit}
          />
        )}

        <div className="notes-container">
          {notes.length === 0 ? (
            <div className="empty-state">
              <h3>No notes yet</h3>
              <p>Create your first note to get started!</p>
            </div>
          ) : (
            <div className="notes-grid">
              {notes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onEdit={startEdit}
                  onDelete={handleDeleteNote}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;