const NoteCard = ({ note, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="note-card">
      <div className="note-header">
        <h3 className="note-title">{truncateText(note.title, 50)}</h3>
        <div className="note-actions">
          <button 
            onClick={() => onEdit(note)} 
            className="edit-button"
            title="Edit note"
          >
            ✏️
          </button>
          <button 
            onClick={() => onDelete(note._id)} 
            className="delete-button"
            title="Delete note"
          >
            🗑️
          </button>
        </div>
      </div>
      
      <div className="note-content">
        <p>{truncateText(note.content, 200)}</p>
      </div>
      
      <div className="note-footer">
        <small className="note-date">
          Created: {formatDate(note.createdAt)}
        </small>
        {note.updatedAt !== note.createdAt && (
          <small className="note-date">
            Updated: {formatDate(note.updatedAt)}
          </small>
        )}
      </div>
    </div>
  );
};

export default NoteCard;