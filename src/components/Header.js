import React from 'react';
import './Header.scss';
import { Button } from './Button';

export const Header = () => {
  return (
    <header>
      <div className='container'>
        <div className='header-inner'>
          <div className='logo'>
            <img src={require('../img/Logo.png')} alt='Logo'/>
          </div>
          <div className='buttons'>
            <a href='#users-section'>
              <Button text='Users' type='button' disabled={false} />
            </a>
            <a href='#sign-up-section'>
              <Button text='Sign up' type='button' disabled={false} />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}