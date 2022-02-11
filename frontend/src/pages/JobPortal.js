import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
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
      <Typography alignCenter gutterBottom variant="h2" color="textSecondary">
        Job Portal
      </Typography>
      <div>
        <Paper>
          <Typography variant="h6" color="primary">
            All the jobs listed by all companies will show here
          </Typography>
          {jobs.map((job) => (
            <div key={job.id}>
              <Card sx={{ maxWidth: 'auto' }} variant="outlined">
                <CardHeader
                  title={job.name}
                  subheader={new Date(job.timestamp).toDateString()}
                />
                <CardContent>
                  {/* <Typography variant="body2"> ID: {job.id} </Typography> */}
                  {/* <Typography variant=""> NAME: {job.name} </Typography> */}
                  <Typography variant="body1">
                    {' '}
                    DESCRIPTION: {job.description}{' '}
                  </Typography>
                  <Typography variant="h5" color="textPrimary">
                    {' '}
                    Location: {job.location}{' '}
                  </Typography>
                  <Typography variant="h6"> Website: {job.website} </Typography>
                  {/* <Typography variant="body"> Timestamp: {job.timestamp} </Typography> */}
                  <Typography variant="h6">
                    {' '}
                    Poster: {job.poster.name}{' '}
                  </Typography>
                  <br />
                </CardContent>
              </Card>
            </div>
          ))}
        </Paper>
      </div>
    </div>
  );
};

export default JobPortal;
