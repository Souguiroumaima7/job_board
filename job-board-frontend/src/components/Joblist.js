import React from 'react';

function JobList({ jobs }) {
  return (
    <div className="job-list">
      <h2>Available Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs available at the moment.</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job.id} className="job-item">
              <h3>{job.title}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Description:</strong> {job.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default JobList;