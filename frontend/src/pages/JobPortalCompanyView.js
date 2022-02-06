/* eslint-disable react/button-has-type */
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import CompanyAuthContext from '../context/CompanyAuthContext';
import Header from '../components/Header';

const JobPortalCompanyView = () => {
  const [jobs, setJobs] = useState([]);
  const { company, companyAuthTokens } = useContext(CompanyAuthContext);

  const history = useHistory();

  useEffect(() => {
    // To fetch all the jobs listed by the logged in company
    const getCompanyJobs = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/job-portal/company/jobs/`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Provide the authToken when making API request to backend to access the protected route of that user
            Authorization: `Bearer ${String(companyAuthTokens.access)}`,
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

    getCompanyJobs();
  }, []);

  // Add new job method
  const removeJob = async (e) => {
    e.preventDefault();
    // Make a post request to the api with the user's credentials.
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/job-portal/delete/${e.target.value}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Provide the authToken when making API request to backend to access the protected route of that user
          Authorization: `Bearer ${String(companyAuthTokens.access)}`,
        },
      }
    );
    // Get the access and refresh tokens
    const data = await response.json();

    if (response.status === 200) {
      alert(data);
      // TODO: Refresh the page here
      history.push('/job-portal/company');
    } else {
      alert('ERROR: ', data);
    }
  };

  return (
    <div>
      <Header />

      <h1> --- Job Portal (Company's View)--- </h1>
      {company ? (
        <div>
          <a href="/job-portal/company/add"> Add a new job </a>
          <div>
            All the jobs listed by you will show here
            {jobs.map((job) => (
              <div key={job.id}>
                <p> ID: {job.id} </p>
                <p> NAME: {job.name} </p>
                <p> DESCRIPTION: {job.description} </p>
                <p> Location: {job.location} </p>
                <p> Website: {job.website} </p>
                <p> Timestamp: {job.timestamp} </p> <br />
                <button onClick={removeJob} value={job.id}>
                  {' '}
                  DELETE{' '}
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default JobPortalCompanyView;
