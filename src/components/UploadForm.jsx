import { useState } from 'react';

export default function UploadForm({ onSubmit, progress }) {
  const [title, setTitle] = useState('');

  return (
    <section className="upload-form">
      <h2>Upload Wallpaper</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Wallpaper title" />
      <button className="primary-btn" onClick={() => onSubmit(title)}>
        Select & Upload
      </button>
      <div className="progress-wrapper">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <p>{progress > 0 ? `Upload Progress: ${progress}%` : 'No upload in progress'}</p>
    </section>
  );
}
