
// import React, { useState } from 'react';
// import Dashboard from './Pages/Dashboard';
// import Login from './Pages/Login';

// // import { BrowserRouter as Router } from "react-router-dom";
// // import { Switch, Route, Routes } from "react-router-dom";

// import { BrowserRouter, Routes, Route } from "react-router-dom";

// function App() {

//   const [token, setToken] = useState();

//   if(!token) {
//     return <Login setToken={setToken} />
//   }
//   return (
//     <BrowserRouter>
//       <div className="App">
//         <div className="wrapper">        
            
//             <Routes>
//               <Route path="/login" component={ Login } />
//               <Route path="/dashboard" component={ Dashboard } />
//             </Routes>          
//         </div>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';

import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';

import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <div className="header">
            {/* <NavLink exact activeClassName="active" to="/">Home</NavLink> */}
            {/* <NavLink activeClassName="active" to="/login">Login</NavLink><small>(Access without token only)</small>
            <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink><small>(Access with token only)</small> */}
          </div>
          <div className="content">
            <Switch>
              {/* <Route exact path="/" component={Home} /> */}
              <PublicRoute path="/login" component={Login} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
