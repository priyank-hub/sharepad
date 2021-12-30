import React, { useState } from 'react';
import { getUser, removeUserSession } from '../Utils/Common';
import Navigation from '../Components/Navigation';
import axios from 'axios';

import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

function Dashboard(props) {

  const [newUser, setNewUser] = useState(
    {
        name: '',
        bio: '',
        photo: null,
    }
  );

  

  const handleLogout = () => {   
    removeUserSession(); 
    props.history.push('/login');
  }

  // const handleSubmit = (e) => {
  //   const user = getUser();
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append('file', newUser.photo);
  //   formData.append('bio', newUser.bio);
  //   formData.append('name', newUser.name);
  //   formData.append('user', user);
  //   console.log(user);
  //   axios.post('http://localhost:5000/profile/upload/', formData)
  //        .then(res => {
  //           console.log(res);
  //        })
  //        .catch(err => {
  //           console.log(err);
  //        });
  // }

  // const handleChange = (e) => {
  //   setNewUser({...newUser, [e.target.name]: e.target.value});
  // }

  // const handlePhoto = (e) => {
  //     setNewUser({...newUser, photo: e.target.files[0]});
  // }
  
  let skeleton = [];
  for (let i=0; i<10; i++) {
    skeleton.push(
      <div>
        <div className='d-flex flex-row justify-content-start align-items-center'>
          <Skeleton variant="circular" width={50} height={50} className='mb-2 mt-4'/>
          <div className='d-flex flex-column justify-content-end'>
            <Skeleton variant="rectangular" height={10} width={100} className='m-3'/>
            <Skeleton variant="rectangular" height={10} width={300} className='mx-3 '/>
          </div>
        </div>
        <Skeleton variant="rectangular" height={350} />
      </div>
    );
  }

  return(
    <div>
      <div className=''>
        <Navigation props={props}/>
      </div>
      <div className='container my-4'>
        <div className='row'>
          <div className='col-12 col-md-6 mx-auto'>
            <Stack spacing={1}>
              {skeleton}
            </Stack>
          </div>
        </div>
      </div>

      {/* <div>
        <form onSubmit={handleSubmit} encType='multipart/form-data' className='flex flex-col'>
          <input 
              type="file" 
              accept=".png, .jpg, .jpeg"
              name="photo"
              onChange={handlePhoto}
          />

          <input 
              type="text"
              placeholder="name"
              name="name"
              value={newUser.name}
              onChange={handleChange}
          />

            <input 
              type="text"
              placeholder="name"
              name="bio"
              value={newUser.bio}
              onChange={handleChange}
            />

          <input 
              type="submit"
          />
        </form>
      </div> */}
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

export default Dashboard;