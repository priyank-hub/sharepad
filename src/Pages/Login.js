import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../Utils/Common';
import logo from '../assets/logos/SharePadColored.png';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


function Login(props) {
  const [loading, setLoading] = useState(false);
  const email = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);

  // handle button click of login form
  const handleLogin= (e) => {
    setError(null);
    setLoading(true);
    e.preventDefault();
    console.log('handlelogin');
    axios.post('http://localhost:5000/user/login', { email: email.value, password: password.value }).then(response => {
      setLoading(false);
      console.log('response', response);
      const user = {
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        email: response.data.email, 
      }
      setUserSession(response.data.token, user);
      props.history.push('/dashboard');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Invalid Credentials, Please try again!");
    });
  }

  return (
      <div>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            p: 1,
            m: 1,
            alignItems: 'center',
            height: '100vh',
            margin: 'none',
            color: 'white',
          }}
        >
          {/* img #3C366B */}
          <div>
            <img src={logo} width={500}/>
          </div>

          {/* login form */}
          <form onSubmit={handleLogin} className='' style={{ minWidth: '30%', maxWidth: '80%'}}>
            <TextField {...email} type={'email'} fullWidth label="Email" id="fullWidth" className='my-3' required/>
            <TextField {...password} type={'Password'} fullWidth label="Password" id="fullWidth" className='my-3' required/>
            <input type="submit" className='btn' style={{ color: '#fff', backgroundColor: '#3C366B' }} value={loading ? 'Loading...' : 'Sign Me In'} disabled={loading}>
            </input>
          </form>
        </Box>
      </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;