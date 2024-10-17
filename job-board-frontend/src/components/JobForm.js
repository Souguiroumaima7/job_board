import React, { useState } from 'react';

function JobForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, company, description });
    setTitle('');
    setCompany('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="job-form">
      <h2>Add New Job</h2>
      <div>
        <label htmlFor="title">Job Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="company">Company:</label>
        <input
          type="text"
          id="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Job Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Job</button>
    </form>
  );
}

export default JobForm;