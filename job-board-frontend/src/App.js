import React, { useState, useEffect } from 'react';
import JobList from './components/Joblist';
import JobForm from './components/JobForm';

function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/jobs');
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const addJob = async (job) => {
    try {
      const response = await fetch('http://localhost:8080/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(job),
      });
      if (!response.ok) {
        throw new Error('Failed to add job');
      }
      const newJob = await response.json();
      setJobs([...jobs, newJob]);
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  return (
    <div className="App">
      <h1>Job Board</h1>
      <JobForm onSubmit={addJob} />
      <JobList jobs={jobs} />
    </div>
  );
}

export default App;