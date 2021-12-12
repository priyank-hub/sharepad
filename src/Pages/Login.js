// import React, { useState } from 'react';
// import PropTypes from 'prop-types';


// async function loginUser(credentials) {
//   return fetch('http://localhost:5000/user/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(credentials)
//   })
//     .then(res => {
//       return res.json();
//     });
//  }

// export default function Login({ setToken }) {

//   const [email, setEmail] = useState();
//   const [password, setPassword] = useState();
//   const [user, setUser] = useState();

//   const handleSubmit = async e => {
//     // console.log(email, password);
//     e.preventDefault();
//     const user = await loginUser({
//       email,
//       password
//     });

//     console.log(user);
//     if (user.error) {
      
//     }
//     setUser(user);
//     setToken(user.token);
//   }

//   return(
//     <div>
//       <div className="container-fluid mx-auto">
//         <div className="bg-indigo-900 h-screen flex flex-column justify-center items-center">
//           <div className="grid-cols-12">
//             <form className="w-full max-w-sm" onSubmit={handleSubmit}>
//               <div className="md:flex md:items-center mb-6">
//                 <div className="md:w-1/3">
//                   <label className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
//                     Email
//                   </label>
//                 </div>
//                 <div className="md:w-2/3">
//                   <input onChange={e => setEmail(e.target.value)} 
//                         className="bg-gray-200 appearance-none border-2 border-gray-200 rounded 
//                                     w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none 
//                                     focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" required/>
//                 </div>
//               </div>
//               <div className="md:flex md:items-center mb-6">
//                 <div className="md:w-1/3">
//                   <label className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
//                     Password
//                   </label>
//                 </div>
//                 <div className="md:w-2/3">
//                   <input onChange={e => setPassword(e.target.value)} required className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="password" placeholder="******************" />
//                 </div>
//               </div>
              
//               <div className="md:flex md:items-center">
//                 <div className="md:w-1/3"></div>
//                 <div className="md:w-2/3">
//                   <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded shadow">
//                     Sign Me In
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


// Login.propTypes = {
//   setToken: PropTypes.func.isRequired
// }

import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../Utils/Common';

function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post('http://localhost:5000/user/login', { email: username.value, password: password.value }).then(response => {
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
    // <div>
    //   Login<br /><br />
    //   <div>
    //     Username<br />
    //     <input type="text" {...username} autoComplete="new-password" className='border border-gray-500'/>
    //   </div>
    //   <div style={{ marginTop: 10 }}>
    //     Password<br />
    //     <input type="password" {...password} autoComplete="new-password" className='border border-gray-500'/>
    //   </div>
    //   {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
    //   <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
    // </div>

      <div>
        <div className='container-fluid'>
          <div className='flex flex-row h-screen justify-center items-center bg-indigo-900'>
            <div className='col-12'>
              <form class="w-full max-w-sm">
                <div class="md:flex md:items-center mb-6">
                  <div class="md:w-1/3">
                    <label class="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                      Email
                    </label>
                  </div>
                  <div class="md:w-2/3">
                    <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value="priyank@test.com" />
                  </div>
                </div>
                <div class="md:flex md:items-center mb-6">
                  <div class="md:w-1/3">
                    <label class="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                      Password
                    </label>
                  </div>
                  <div class="md:w-2/3">
                    <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="password" placeholder="******************" />
                  </div>
                </div>
                <div class="md:flex md:items-center mb-6">
                  <div class="md:w-1/3"></div>
                  <label class="md:w-2/3 block text-gray-500 font-bold">
                    <input class="mr-2 leading-tight" type="checkbox" />
                    <span class="text-sm">
                      Send me your newsletter!
                    </span>
                  </label>
                </div>
                <div class="md:flex md:items-center">
                  <div class="md:w-1/3"></div>
                  <div class="md:w-2/3">
                    <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                      Sign Up
                    </button>
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