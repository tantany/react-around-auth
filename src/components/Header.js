import React from 'react';
import logo from '../images/logo.svg';
import { useHistory } from 'react-router-dom';

function Header(props) {
  const history = useHistory();

  function handleClick(){
    if(props.redirect === 'Sign up') {
      history.push('/register');
    }
    if(props.redirect === 'Log in') {
      history.push('/login');
    }
  }

  return (
    <header className='header'>
      <img src={logo} alt='logo' className='logo' />
      <ul className='header__container'>
        <li className='header__item'>{props.email}</li>
        <li className='header__item'><button className='header__button hover-button' onClick={props.redirect === 'Log out' ? props.signOut : handleClick}>{props.redirect}</button></li>
      </ul>
    </header>
  );
}

export default Header;
// onClick={props.redirect === 'Log out' ? console.log(props.signOut) : console.log(handleClick)}
