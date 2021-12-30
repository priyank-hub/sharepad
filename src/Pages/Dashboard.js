import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';

import Profile from './Profile/Profile';
import EditProfile from './Profile/EditProfile';
import Posts from '../Pages/Posts/Posts';

import PrivateRoute from '../Utils/PrivateRoute';
import { getUser, removeUserSession } from '../Utils/Common';
import Navigation from '../Components/Navigation';
import axios from 'axios';

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

  return(
    <div>
      <Router>
        <div className=''>
          <Navigation props={props}/>
        </div>
        <div className="content">
          <Switch>
            <PrivateRoute exact path="/profile/edit" component={EditProfile} />
            <PrivateRoute exact path="/profile/:name" component={Profile} />
            <PrivateRoute path="/" component={Posts} />
          </Switch>
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
      </Router>
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