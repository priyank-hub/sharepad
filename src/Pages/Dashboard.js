import React, { useState } from 'react';
import { getUser, removeUserSession } from '../Utils/Common';
import Navigation from '../Components/Navigation';
import axios from 'axios';

function Dashboard(props) {

  const [newUser, setNewUser] = useState(
    {
        name: '',
        bio: '',
        photo: '',
    }
  );

  const user = getUser();

  const handleLogout = () => {   
    removeUserSession(); 
    props.history.push('/login');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', newUser.photo);
    formData.append('bio', newUser.bio);
    formData.append('name', newUser.name);
    console.log(formData);
    axios.post('http://localhost:5000/profile/upload/', formData)
         .then(res => {
            console.log(res);
         })
         .catch(err => {
            console.log(err);
         });
  }

  const handleChange = (e) => {
    setNewUser({...newUser, [e.target.name]: e.target.value});
  }

  const handlePhoto = (e) => {
      setNewUser({...newUser, photo: e.target.files[0]});
  }
  
  return(
    <div>
      <div className=''>
          <Navigation props={props}/>
          <div>
            
          </div>
      </div>
      <h2>Dashboard</h2>
      {/* <input type="button" onClick={handleLogout} value="Logout" /> */}
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