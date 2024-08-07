// src/components/SignIn.js
'use client'
import React, { useState } from 'react';
import { TextField, Button, Container, Paper, Typography, Link } from '@mui/material';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'; // Import the appropriate hook
import { auth } from '@/firebase';
import {useRouter} from 'next/navigation';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth); 
  const router = useRouter()

  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      console.log(res);
      localStorage.setItem('user', true)
      setEmail('');
      setPassword('');
      router.push('/') 
    } catch (error) {
      console.error(error);
      // Handle any error messages or display them to the user
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h1" style={{ textAlign: 'center', marginTop: '2rem' }}>
        PantryLog
      </Typography>
      <Paper elevation={3} style={{ padding: '2rem', background: '#f0f0f0', marginTop: '2rem' }}>
        <h2 style={{ color: '#333' }}>Sign In</h2>
        <form>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSignIn}
            style={{ marginTop: '1rem', background: '#92CBDE', color: '#fff' }}
          >
            Sign In
          </Button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" style={{ color: '#92CBDE' }} underline="hover">
            Sign Up here
          </Link>
        </p>
      </Paper>
    </Container>
  );
};

export default SignIn;
