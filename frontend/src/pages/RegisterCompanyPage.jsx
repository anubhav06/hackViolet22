import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import CompanyAuthContext from '../context/CompanyAuthContext';
import AuthContext from '../context/AuthContext';

function RegisterCompanyPage() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const { company, registerCompany } = useContext(CompanyAuthContext);

  if (localStorage.getItem('authTokens') !== null) {
    return (
      <p>
        {' '}
        You need to logout from your USER ACCOUNT to login with the COMPANY
        ACCOUNT !{' '}
      </p>
    );
  }

  if (localStorage.getItem('companyAuthTokens') !== null) {
    return (
      <p>
        {' '}
        You need to logout from your COMAPNY ACCOUNT to login with the USER
        ACCOUNT !{' '}
      </p>
    );
  }

  // To not allow login route to a user who is logged in. Redirect to '/'
  if (company) {
    return <Redirect to="/restaurants" />;
  }

  return (
    <>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register your account
        </Typography>

        <form onSubmit={registerCompany}>
          <Box onSubmit={registerCompany} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Company Name"
              name="company"
              autoComplete="name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Website"
              name="website"
              autoComplete="name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Company Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={() => {}}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              label="Password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={() => {}}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              label="Enter Password Again"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/register" variant="body2">
                  Register as a User
                </Link>
              </Grid>
              <Grid item>
                <Link href="/login-company" variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
            </Box>
        </form>
        
      </Box>
    </>
  );
}

export default RegisterCompanyPage;
