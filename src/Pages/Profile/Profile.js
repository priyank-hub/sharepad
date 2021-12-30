import React, { useState } from 'react';
import axios from 'axios';
import { getUser, setUserSession } from '../../Utils/Common';
import { NavLink } from "react-router-dom";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


function Profile(props) {

  const user = getUser();
  console.log('user', user);
  return (
      <div>
        Profile Page<br />
        {user.first_name} 
        {user.last_name}
        <br/>
        {user.email}
      </div>
  );
}

export default Profile;