import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../Utils/Common';
import logo from '../assets/logos/1.png';

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
        <div className='container-fluid'> 
          <div className='flex flex-col h-screen justify-center items-center bg-indigo-900'>
            <div>
              <img src={logo} width={300}/>
            </div>
            <div className='md:w-1/3'>
              <form className="" onSubmit={handleLogin}>
                <div className="md:flex md:items-center flex-col mb-3"> 
                  <div className="md:w-full mb-2">
                    <label className="block text-white font-bold text-left mb-1 md:mb-0 pr-4" for="inline-full-name">
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
                  <div className="md:w-full mb-2">
                    <label className="block text-white font-bold text-left mb-1 md:mb-0 pr-4" for="inline-password">
                      Password
                    </label>
                  </div>
                  <div className="md:w-full">
                    <input {...password}
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
                                leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" 
                                type="password" placeholder="**********" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className='flex flex-row'>
                    <div className="md:w-full">
                      <div className="my-3">
                        {error && <><small style={{ color: 'white' }}>{error}</small><br /></>}
                      </div>
                      <input type="submit"  value={loading ? 'Loading...' : 'Sign Me In'} disabled={loading}
                            className="shadow text-indigo-900 focus:shadow-outline focus:outline-none
                            font-bold py-2 px-4 rounded" style={{ backgroundColor: 'white' }} />
                      <br />
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

export default Login;