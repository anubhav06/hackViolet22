/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState, useEffect, useContext } from 'react';
import { Grid, Typography } from '@mui/material';
import AuthContext from '../context/AuthContext';
import Header from '../components/Header';
import CompanyAuthContext from '../context/CompanyAuthContext';
import img1 from '../assets/logo192.png';
import img2 from '../assets/home1.png';
import img3 from '../assets/home1.svg';
import img4 from '../assets/home2.svg';
import img5 from '../assets/home2.png';
import img6 from '../assets/home3.svg';

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const { company } = useContext(CompanyAuthContext);

  let mentor = false;
  if (user && user.group === 'Mentor') {
    mentor = true;
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={5} sx={12}>
          <Typography
            variant="h1"
            noWrap
            component="div"
            sx={{ mr: 2, my: 12, mx: 4, display: { md: 'flex' } }}
            color="secondary"
          >
            SheForum
          </Typography>
          <Typography
            gutterBottom
            variant="h3"
            color="textSecondary"
            sx={{ mr: 2, my: 4, mx: 4, display: { xs: 'none', md: 'flex' } }}
          >
            {' '}
            A platform for women to find right mentorship and a lot more .{' '}
          </Typography>
        </Grid>
        <Grid item xs={2} sx={12}></Grid>
        <Grid item xs={5} sx={12} sx={{ my: 8 }}>
          <img src={img3} alt="landing-1" width="500px" />
        </Grid>

        <Grid item xs={5} sx={12} sx={{ my: 8 }}>
          <img src={img4} alt="landing-1" width="500px" sx={{ ml: 4 }} />
        </Grid>

        <Grid item xs={2} sx={12}></Grid>

        <Grid item xs={5} sx={12}>
          <Typography
            variant="h1"
            noWrap
            component="div"
            sx={{ mr: 2, my: 12, mx: 4, display: { md: 'flex' } }}
            color="secondary"
          >
            {' '}
          </Typography>
          <Typography
            gutterBottom
            variant="h3"
            color="textSecondary"
            sx={{ mr: 2, my: 4, mx: 4, display: { xs: 'none', md: 'flex' } }}
          >
            {' '}
            When girls are educated, their countries become stronger and more
            prosperous. – Michelle Obama{' '}
          </Typography>
        </Grid>

        <Grid item xs={5} sx={12}>
          <Typography
            variant="h1"
            noWrap
            component="div"
            sx={{ mr: 2, my: 12, mx: 4, display: { md: 'flex' } }}
            color="secondary"
          >
            {' '}
          </Typography>
          <Typography
            gutterBottom
            variant="h3"
            color="textSecondary"
            sx={{ mr: 2, my: 4, mx: 4, display: { xs: 'none', md: 'flex' } }}
          >
            {' '}
            The education and empowerment of women throughout the world cannot
            fail to result in a more caring, tolerant, just, and peaceful life
            for all. – Aung San Suu Kyi{' '}
          </Typography>
        </Grid>
        <Grid item xs={2} sx={12}></Grid>
        <Grid item xs={5} sx={12} sx={{ my: 8 }} sx={{ my: 8 }}>
          <img src={img6} alt="landing-1" width="500px" />
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
