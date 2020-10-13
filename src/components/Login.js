import React, { useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import Authorize from './Authorize';
import * as auth from '../auth.js';

function Login(props) {
  const [userEmail, setUserEmail] = React.useState('');
  const [userPassword, setUserPassword] = React.useState('');

  const history = useHistory();

  function resetForm() {
    setUserEmail('');
    setUserPassword('');
  }

  function handleSubmit(e){
    e.preventDefault();
    if (!userEmail || !userPassword) {
      return;
    }
    auth.authorize(userEmail, userPassword)
    .then((data) => {
      if(!data) {
        props.renderFailure();
        throw new Error('Oops, something went wrong!');
      }
      if (data.token) {
        props.handleLogin(true);
        props.renderSuccess();
      }
    })
    .then(resetForm)
    .then(() => history.push('/around'))
    .catch(err => {
      props.renderFailure();
    });
  }

  useEffect(() => {
    if(localStorage.getItem('jwt')) {
      history.push('/around');
    }
  }, [history])

  return(
      <Authorize signOut={props.signOut} link={props.link} title={props.title} userEmail={userEmail} userPassword={userPassword} redirect={props.redirect} handleSubmit={handleSubmit} value="Not a member yet? Sign up here!" setUserEmail={setUserEmail} setUserPassword ={setUserPassword} />
  )
}

export default withRouter(Login);
