
import React, { useState } from 'react';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';

// import { BrowserRouter as Router } from "react-router-dom";
// import { Switch, Route, Routes } from "react-router-dom";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  const [token, setToken] = useState();

  if(!token) {
    return <Login setToken={setToken} />
  }
  return (
    <div className="App">
      <div className="wrapper">        
        <Router>
          <Routes>
            <Route path="/dashboard" exact component={ Dashboard } />
          </Routes>          
        </Router>
      </div>
    </div>
  );
}

export default App;
