import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../Utils/Common';
import logo from '../assets/logos/SharePadColored.png';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function Register(props) {
  const [loading, setLoading] = useState(false);
  const first_name = useFormInput('');
  const last_name = useFormInput('');
  const email = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);

  const logIn = () => {
    axios.post('http://localhost:5000/user/login', { email: email.value, password: password.value })
    .then(response => {
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

  // handle button click of login form
  const handleRegister= (e) => {
    setError(null);
    setLoading(true);
    e.preventDefault();

    axios.post('http://localhost:5000/user/register', {
        first_name: first_name.value,
        last_name: last_name.value, 
        email: email.value, 
        password: password.value
    }).then(response => {
        // setLoading(false);
        console.log('response', response);
        logIn();

    }).catch(error => {
        console.log('error', error);
      setLoading(false);
      // if (error.response.status === 401) setError(error.response.data.message);
      // else if (error.response.status === 409) {
      //   setError('User Already Exist. Please Login');
      // }
    });
  }

  return (
      <div>

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
            <form onSubmit={handleRegister} className='' style={{ minWidth: '30%', maxWidth: '70%'}}>
              <TextField {...first_name} fullWidth label="First Name" className='my-3' required/>
              <TextField {...last_name} fullWidth label="Last Name" className='my-3' required/>
              <TextField {...email} type={'email'} fullWidth label="Email" className='my-3' required/>
              <TextField {...password} type={'password'} fullWidth label="Password" className='my-3' required/>
              <input type="submit" className='btn' style={{ color: '#fff', backgroundColor: '#3C366B' }} value={loading ? 'Loading...' : 'Sign Me In'} disabled={loading}>
              </input>
            </form>
          </Box>
        </div>

        <div className='d-none container-fluid bg-indigo-900' style={{ minHeight: '100vh' }}> 
          <div className='flex flex-col justify-center items-center'>
            <div>
              <img src={logo} width={200}/>
            </div>
            <div className='md:w-1/3 lg:w-1/3 mb-4'>
              <form className="" onSubmit={handleRegister}>

                <div className="md:flex flex-col md:items-center mb-6"> 
                  <div className="md:w-full">
                    <label className="block text-white font-bold text-left mb-1 pr-4" for="inline-full-name">
                      First Name
                    </label>
                  </div>
                  <div className="md:w-full">
                    <input {...first_name}
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
                                leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" 
                                type="text" placeholder="John" required/>
                  </div>
                </div>

                <div className="md:flex flex-col md:items-center mb-6"> 
                  <div className="md:w-full">
                    <label className="block text-white font-bold text-left mb-1 pr-4" for="inline-full-name">
                      Last Name
                    </label>
                  </div>
                  <div className="md:w-full">
                    <input {...last_name}
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
                                leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" 
                                type="text" placeholder="Doe" required/>
                  </div>
                </div>

                <div className="md:flex flex-col md:items-center mb-6"> 
                  <div className="md:w-full">
                    <label className="block text-white font-bold text-left mb-1 pr-4" for="inline-full-name">
                      Email
                    </label>
                  </div>
                  <div className="md:w-full">
                    <input {...email}
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
                                leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" 
                                type="email" placeholder="john@doe.com" required/>
                  </div>
                </div>
                
                <div className="md:flex flex-col md:items-center">
                  <div className="md:w-full">
                    <label className="block text-white font-bold text-left mb-1 pr-4" for="inline-password">
                      Password
                    </label>
                  </div>
                  <div className="md:w-full">
                    <input {...password}
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
                                leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" 
                                type="password" placeholder="********" required/>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className='flex flex-row'>
                    <div className="md:w-full">
                        <div className="my-3">
                            {error && <><small style={{ color: 'white' }}>{error}</small><br /></>}
                        </div>
                      <input type="submit" value={loading ? 'Logging you In...' : 'Register'} disabled={loading} 
                            className="shadow text-indigo-900 focus:shadow-outline focus:outline-none
                            font-bold py-2 px-4 rounded" style={{ backgroundColor: 'white' }}/><br />
                    </div>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>
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

export default Register;