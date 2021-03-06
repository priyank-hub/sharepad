import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';

import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';

import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
// import { getToken, removeUserSession, setUserSession } from './Utils/Common';

function App() {

  // const [authLoading, setAuthLoading] = useState(true);

  // useEffect(() => {
  //   const token = getToken();
  //   if (!token) {
  //     return;
  //   }
 
  //   axios.get(`http://localhost:4000/verifyToken?token=${token}`).then(response => {
  //     setUserSession(response.data.token, response.data.user);
  //     setAuthLoading(false);
  //   }).catch(error => {
  //       removeUserSession();
  //       setAuthLoading(false);
  //     });
  //   }, []);

  return (
    <div className="App">
      <Router>
        <div>
          <div className="header">
          </div>
          <div className="content">
            <Switch>
              {/* <Route exact path="/" component={Home} /> */}
              <PublicRoute path="/login" component={Login} />
              <PublicRoute path="/register" component={Register} />
              <PrivateRoute exact path="/" component={Dashboard} />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
