/* eslint-disable react/self-closing-comp */
import React, { useContext } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import AuthContext from '../context/AuthContext';
import CompanyAuthContext from '../context/CompanyAuthContext';
import img3 from '../assets/home1.svg';
import img7 from '../assets/home5.svg';
import img8 from '../assets/home6.svg';
import img9 from '../assets/home7.svg';

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const { company } = useContext(CompanyAuthContext);

  let mentor = false;
  if (user && user.group === 'Mentor') {
    mentor = true;
  }

  return (
    <div>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={5}>
            <Typography
              variant="h2"
              noWrap
              component="div"
              sx={{ mr: 2, my: 12, mx: 4, display: 'flex' }}
              color="secondary"
            >
              SheForum
            </Typography>
            <Typography
              gutterBottom
              variant="h4"
              color="textSecondary"
              sx={{ mr: 2, my: 4, mx: 4, display: { xs: '', md: 'flex' } }}
            >
              {' '}
              A platform for women to find right mentorship and a lot more.{' '}
            </Typography>
          </Grid>
          <Grid item xs={12} lg={2}></Grid>
          <Grid item xs={12} lg={5} sx={{ my: 8 }}>
            <img src={img3} alt="landing-1" width="90%" />
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          mt: 20,
          backgroundColor: 'primary.main',
          boxShadow: 4,
        }}
      >
        <Grid container spacing={1} sx={{ display: 'flex' }}>
          <Grid item xs={12} lg={5} sx={{ mx: 2 }}>
            <Paper elevation={5}>
              <Typography
                gutterBottom
                variant="h5"
                color="textSecondary"
                sx={{ my: 4, display: { xs: '', md: 'flex' }, p: 2 }}
              >
                {' '}
                When girls are educated, their countries become stronger and
                more prosperous.
                <br /> – Michelle Obama{' '}
              </Typography>
            </Paper>
          </Grid>
          <Grid item lg={5}></Grid>
          <Grid item lg={6}></Grid>
          <Grid item lg={5} xs={12} sx={{ mx: 2 }}>
            <Paper elevation={5}>
              <Typography
                gutterBottom
                variant="h5"
                color="textSecondary"
                sx={{
                  my: 4,
                  display: { xs: { fontSize: '12px' }, md: 'flex' },
                  p: 2,
                }}
              >
                {' '}
                The education and empowerment of women throughout the world
                cannot fail to result in a more caring, tolerant, just, and
                peaceful life for all. <br /> – Aung San Suu Kyi{' '}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ boxShadow: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={5}>
            <Typography
              gutterBottom
              variant="h4"
              color="textSecondary"
              sx={{
                mr: 2,
                my: { lg: 20, xs: 2 },
                mx: 4,
                display: { xs: '', md: 'flex' },
              }}
            >
              {' '}
              Schedule a video call with your mentor.{' '}
            </Typography>
          </Grid>
          <Grid item xs={12} lg={2}></Grid>
          <Grid item xs={12} lg={5} sx={{ my: { lg: 8, xs: 2 } }}>
            <img src={img7} alt="landing-1" width="90%" />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ backgroundColor: '#eeeeee', boxShadow: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={5} sx={{ my: 8 }}>
            <img src={img8} alt="landing-1" width="90%" />
          </Grid>

          <Grid item xs={12} lg={2}></Grid>

          <Grid item xs={12} lg={5}>
            <Typography
              gutterBottom
              variant="h4"
              color="textSecondary"
              sx={{
                mr: 2,
                my: { lg: 20, xs: 2 },
                mx: 4,
                display: { md: 'flex' },
              }}
            >
              {' '}
              Explore new oppportunities.{' '}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={5}>
            <Typography
              gutterBottom
              variant="h4"
              color="textSecondary"
              sx={{
                mr: 2,
                my: { lg: 20, xs: 2 },
                mx: 4,
                display: { xs: '', md: 'flex' },
              }}
            >
              {' '}
              Share your thoughts in the SheForum.{' '}
            </Typography>
          </Grid>
          <Grid item xs={12} lg={2}></Grid>
          <Grid item xs={12} lg={5} sx={{ my: { lg: 8, xs: 2 } }}>
            <img src={img9} alt="landing-1" width="90%" />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default HomePage;
