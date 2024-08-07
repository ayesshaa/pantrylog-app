'use client'
import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const Home = () => {
    const router = useRouter(); // Initialize the router
  
    const handleSignUp = () => {
      router.push('/sign-up'); // Navigate to the sign-up page
    };
  
    const handleSignIn = () => {
      router.push('/sign-in'); // Navigate to the sign-in page
    };
  
    return (
      <Container maxWidth="sm">
        <Typography variant="h1" style={{ textAlign: 'center', marginTop: '2rem' }}>
          Welcome to Pantry Log!
        </Typography>
        <Typography variant="body1" style={{ textAlign: 'center', marginTop: '1rem' }}>
          Pantry Log helps you keep track of your pantry items, expiration dates, and shopping lists.
          Never forget what's in your pantry again!
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSignUp}
            style={{ marginRight: '1rem', background: '#92CBDE', color: '#fff' }}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleSignIn}
            style={{ background: '#f0f0f0', color: '#333' }}
          >
            Sign In
          </Button>
        </div>
        <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.8rem' }}>
          © 2024 Pantry Log. All rights reserved.
        </p>
      </Container>
    );
  };
  
  export default Home;
