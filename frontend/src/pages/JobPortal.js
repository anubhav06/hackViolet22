import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import AuthContext from '../context/AuthContext';

const JobPortal = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // To fetch all the jobs listed by all the companies
    const getJobs = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/job-portal/get-jobs/`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();

      if (response.status === 200) {
        setJobs(data);
      } else {
        alert('ERROR: ', data);
      }
    };

    getJobs();
  }, []);

  console.log('JOBSSS: ', jobs);

  return (
    <div>
      <Header />

      <h1> --- Job Portal --- </h1>
      <div>
        All the jobs listed by all companies will show here
        {jobs.map((job) => (
          <div key={job.id}>
            <p> ID: {job.id} </p>
            <p> NAME: {job.name} </p>
            <p> DESCRIPTION: {job.description} </p>
            <p> Location: {job.location} </p>
            <p> Website: {job.website} </p>
            <p> Timestamp: {job.timestamp} </p>
            <p> Poster: {job.poster.name} </p>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobPortal;
