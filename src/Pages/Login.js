import React, { useState } from 'react';
import PropTypes from 'prop-types';


async function loginUser(credentials) {
  return fetch('http://localhost:5000/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(res => {
      return res.json();
    });
 }

export default function Login({ setToken }) {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useState();

  const handleSubmit = async e => {
    // console.log(email, password);
    e.preventDefault();
    const user = await loginUser({
      email,
      password
    });

    console.log(user);
    if (user.error) {
      
    }
    setUser(user);
    setToken(user.token);
  }

  return(
    <div>
      <div className="container-fluid mx-auto">
        <div className="bg-indigo-900 h-screen flex flex-column justify-center items-center">
          <div className="grid-cols-12">
            <form className="w-full max-w-sm" onSubmit={handleSubmit}>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                    Email
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input onChange={e => setEmail(e.target.value)} 
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded 
                                    w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none 
                                    focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" required/>
                </div>
              </div>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                    Password
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input onChange={e => setPassword(e.target.value)} required className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="password" placeholder="******************" />
                </div>
              </div>
              
              <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                  <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded shadow">
                    Sign Me In
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}


Login.propTypes = {
  setToken: PropTypes.func.isRequired
}