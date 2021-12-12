import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../Utils/Common';

function Register(props) {
  const [loading, setLoading] = useState(false);
  const first_name = useFormInput('');
  const last_name = useFormInput('');
  const email = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);

  // handle button click of login form
  const handleRegister= () => {
    setError(null);
    setLoading(true);

    console.log('email', email.value, 'password', password.value);

    axios.post('http://localhost:5000/user/login', {
        first_name: first_name.value,
        last_name: last_name.value, 
        email: email.value, 
        password: password.value
    }).then(response => {
      setLoading(false);
      console.log('response', response);
      const user = {
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        email: response.data.email, 
      }
      setUserSession(response.data.token, user);
      props.history.push('/login');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Invalid Credentials, Please try again!");
    });
  }

  return (
      <div>
        <div className='container-fluid'> 
          <div className='flex flex-row h-screen justify-center items-center bg-indigo-900'>
            <div className='md:w-1/3 lg:w:2/3'>
              <form className="" onSubmit={handleRegister}>

                <div className="md:flex md:items-center mb-6"> 
                  <div className="md:w-1/3">
                    <label className="block text-white font-bold md:text-center mb-1 md:mb-0 pr-4" for="inline-full-name">
                      First Name
                    </label>
                  </div>
                  <div className="md:w-full">
                    <input {...first_name}
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
                                leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" 
                                type="text" required/>
                  </div>
                </div>

                <div className="md:flex md:items-center mb-6"> 
                  <div className="md:w-1/3">
                    <label className="block text-white font-bold md:text-center mb-1 md:mb-0 pr-4" for="inline-full-name">
                      Last Name
                    </label>
                  </div>
                  <div className="md:w-full">
                    <input {...last_name}
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
                                leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" 
                                type="text" required/>
                  </div>
                </div>

                <div className="md:flex md:items-center mb-6"> 
                  <div className="md:w-1/3">
                    <label className="block text-white font-bold md:text-center mb-1 md:mb-0 pr-4" for="inline-full-name">
                      Email
                    </label>
                  </div>
                  <div className="md:w-full">
                    <input {...email}
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
                                leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" 
                                type="email" required/>
                  </div>
                </div>
                
                <div className="md:flex md:items-center">
                  <div className="md:w-1/3">
                    <label className="block text-white font-bold md:text-center mb-1 md:mb-0 pr-4" for="inline-password">
                      Password
                    </label>
                  </div>
                  <div className="md:w-full">
                    <input {...password}
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
                                leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" 
                                type="password" placeholder="**********" required/>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className='flex flex-row'>
                    <div className="md:w-1/3">
                      
                    </div>
                    <div className="md:w-full my-5">
                      <input type="submit" value={loading ? 'Loading...' : 'Register'} disabled={loading} 
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