// src/components/SignUp.js
'use client'
import { useState } from 'react';
import { TextField, Button, Container, Paper, Typography, Link } from '@mui/material';
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {auth} from '@/firebase'
import {useRouter} from 'next/navigation';


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()
  const [CreateUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);


  const handleSignUp = async () => {
    try {
        const res = await CreateUserWithEmailAndPassword(email, password)
        console.log(res)
        localStorage.setItem('user', true)
        setEmail('');
        setPassword('');
        router.push('/')
    } catch(e) {
        console.error();
        
    }
  };

  return (
    <Container maxWidth="sm">
        <Typography variant={'h1'} style={{textAlign: 'center', marginTop: '2rem'}}> PantryLog </Typography>
      <Paper elevation={3} style={{ padding: '2rem', background: '#f0f0f0', marginTop: '2rem' }}>
        <h2 style={{color: '#333'}}>Sign Up</h2>
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
            onClick={handleSignUp}
            style={{marginTop: '1rem', background: '#92CBDE', color:'#fff'}}
          >
            Sign Up
          </Button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Already have an account?{' '}
          <Link href="/sign-in" style={{ color: '#92CBDE' }} underline="hover">
            Sign In here
          </Link>
        </p>
      </Paper>
    </Container>
  );
};

export default SignUp;
