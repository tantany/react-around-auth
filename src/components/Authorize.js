import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

function Authorize(props) {
  return(
    <div className='authorize'>
       < Header redirect={props.redirect} link='/authorize' signOut={props.signOut} />
      <p className='authorize__title'>{props.title}</p>
      <form onSubmit={props.handleSubmit} className='authorize__form'>
        <input required className='authorize__input' id='email' name='email' placeholder ='email' type='text' value={props.userEmail} onChange={e => props.setUserEmail(e.target.value)} />
        <input required className='authorize__input' id='password' name='password' placeholder ='password' type='password' value={props.userPassword} onChange={e => props.setUserPassword(e.target.value)} />
        <button type='submit' className='authorize__button hover-button'>{props.title}</button>
      </form>
      <Link to={props.link} className='authorize__register-link hover-button'>{props.value}</Link>
    </div>
  )
}

export default Authorize;
