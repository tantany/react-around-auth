import React, { useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import Authorize from './Authorize';

function Register(props) {

  const history = useHistory();

  function handleSubmit(e){
    e.preventDefault()
    props.register()
    .then(() => history.push('/login'))
    .catch(err => {
      console.log(err);
      props.renderFailure()
    });
  }

  useEffect(() => {
    if(localStorage.getItem('jwt')) {
      history.push('/around');
    }
  }, [props.loggedIn])

  return(
    <Authorize signOut={props.signOut} link={props.link} title={props.title} userEmail={props.userEmail} userPassword={props.userPassword} redirect={props.redirect} handleSubmit={handleSubmit} value='Already a member? Log in here!' setUserEmail={props.setUserEmail} setUserPassword ={props.setUserPassword} />
  )
}

export default withRouter(Register);
