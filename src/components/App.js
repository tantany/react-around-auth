import React from 'react';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import AroundUs from './AroundUs';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import * as auth from '../auth.js';
import InfoTooltip from './InfoTooltip';

function App(props) {
  //login
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loginPopupState, setLoginPopupState] = React.useState(false);
  const [mode, setMode] = React.useState(false);
  const [message, setMessage] = React.useState({message: ''});

  //userEmail
  const [userEmail, setUserEmail] = React.useState('');

  const history = useHistory();

  //login
  function closePopup() {
    setLoginPopupState(false);
  }

  function renderSuccess() {
    setMode(true);
    setLoginPopupState(true);
    setMessage({ message: 'Success! You have now been registered.' });
  }

  function renderFailure() {
    setMode(false);
    setLoginPopupState(true);
    setMessage({ message: 'Oops, something went wrong! Please try again.' });
  }

  //logout
  function signOut(){
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setUserEmail('');
    history.push('/login');
  }

  React.useEffect(() => {
    //token check
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      auth.getContent(jwt)
      .then((res) => {
        if(res) {
          setUserEmail(res.data.email);
          setLoggedIn(true);
          history.push('/around');
        }
      });
    }
  }, [loggedIn, history]);

  return (
    <div className='App'>
      <div className='page'>
        <Switch>
          <ProtectedRoute path='/around' loggedIn={loggedIn} email={userEmail} component={AroundUs} signOut={signOut} popupState={loginPopupState} closePopup={closePopup} message={message} mode={mode} />
          <Route path='/login'>
            <div className='loginContainer'>
              <Login loggedIn={loggedIn} title='Log in' value='Not a member yet? Sign up here!' link='/register' redirect='Sign up' handleLogin={setLoggedIn} signOut={signOut} renderFailure={renderFailure} renderSuccess={renderSuccess} />
              <InfoTooltip popupState={loginPopupState} closePopup={closePopup} message={message} mode={mode} />
            </div>
          </Route>
          <Route path='/register'>
            <div className='registerContainer'>
              <Register loggedIn={loggedIn} title='Sign up' value='Already a member? Log in here!' link='/login' redirect='Log in' signOut={signOut}/>
            </div>
          </Route>
          <Route>
            {loggedIn ? <Redirect to='/around' /> : <Redirect to='/login' />}
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
