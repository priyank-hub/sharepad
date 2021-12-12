import React from 'react';
import { getUser, removeUserSession } from '../Utils/Common';

function Dashboard(props) {

  const user = getUser();

  const handleLogout = () => {   
    removeUserSession(); 
    props.history.push('/login');
  }
  
  return(
    <>
      <h2>Dashboard</h2>
      <input type="button" onClick={handleLogout} value="Logout" />
    </>
    
  );
}

export default Dashboard;