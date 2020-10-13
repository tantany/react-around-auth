import React, { useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import Authorize from './Authorize';
import * as auth from '../auth.js';

function Register(props) {
  const [userEmail, setUserEmail] = React.useState('');
  const [userPassword, setUserPassword] = React.useState('');

  const history = useHistory();

  function resetForm() {
    setUserEmail('');
    setUserPassword('');
  }

  function handleSubmit(e){
    e.preventDefault();
    auth.register(userEmail, userPassword)
    .then((res) => {
      if(!res || res.statusCode === 400) {
        throw new Error('Oops, something went wrong!');
      }
      return res;
    })
    .then(resetForm)
    .then(() => history.push('/login'))
    .catch(err => console.log(err));
  }

  useEffect(() => {
    if(localStorage.getItem('jwt')) {
      history.push('/around');
    }
  }, [props.loggedIn])

  return(
    <Authorize signOut={props.signOut} link={props.link} title={props.title} userEmail={userEmail} userPassword={userPassword} redirect={props.redirect} handleSubmit={handleSubmit} value='Already a member? Log in here!' setUserEmail={setUserEmail} setUserPassword ={setUserPassword} />
  )
}

export default withRouter(Register);
