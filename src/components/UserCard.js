import React from 'react';

export const UserCard = ({user}) => {
  const {
    name,
    photo,
    email,
    phone,
    position 
  } = user;

  return (
    <div className='user-card'>
      <img className='user-avatar' src={photo} alt='User Photo'/>
      <p className='user-name'>{name}</p>
      <p>{position}</p>
      <p>{email}</p>
      <p>{phone}</p>
    </div>
  )
}