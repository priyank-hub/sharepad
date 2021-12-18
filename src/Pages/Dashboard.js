import React from 'react';
import { getUser, removeUserSession } from '../Utils/Common';
import Navigation from '../Components/Navigation';

function Dashboard(props) {

  const user = getUser();

  const handleLogout = () => {   
    removeUserSession(); 
    props.history.push('/login');
  }
  
  return(
    <div>
      <div className=''>
          <Navigation />
      </div>
      <h2>Dashboard</h2>
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
    
  );
}

export default Dashboard;