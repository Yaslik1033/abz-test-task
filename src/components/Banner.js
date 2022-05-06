import React from 'react';
import './Banner.scss';
import { Button } from './Button';

export const Banner = () => {
  return (
    <div className='banner container'>
      <h1 className='banner__heading heading'>Test assignment for front-end developer</h1>
      <p className='banner__text'>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
      <a href='#sign-up-section'>
        <Button text='Sign up' type='button' disabled={false}/>
      </a>
    </div>
  )
}