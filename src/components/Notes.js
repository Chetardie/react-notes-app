import React from 'react'

export const Notes = ({notes, onRemove}) => (
  <ul className="list-group">
    {notes.map(note => (
      <li
        className="list-group-item note"
        key={note.id}
      >
        <div>
          <strong>{note.title}</strong>
          <small>{new Date(note.date).toLocaleDateString()}</small>
        </div>
        <button onClick={() => onRemove(note.id)} className="btn btn-outline-danger btn-sm" type="button">&times;</button>
      </li>
    ))}
  </ul>
)